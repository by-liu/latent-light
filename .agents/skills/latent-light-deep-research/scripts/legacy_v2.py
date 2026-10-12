#!/usr/bin/env python3
"""Read legacy research schema 2 without modifying its records."""

from __future__ import annotations

import json
import re
from datetime import date, datetime
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


REQUIRED_FILES = (
    "state/task_spec.md",
    "state/progress.json",
    "state/sources.jsonl",
    "state/claims.jsonl",
    "state/runs.jsonl",
    "state/visuals.jsonl",
    "report.md",
)

PROGRESS_STATUSES = {
    "initialized",
    "researching",
    "verifying",
    "synthesizing",
    "complete",
    "blocked",
    "refresh-needed",
}
REPORT_STATUSES = {"working", "reviewed", "refresh-needed"}
QUALITY_KEYS = {
    "evidence_verified",
    "contradictions_reviewed",
    "report_reviewed",
    "visuals_reviewed",
}
SOURCE_TYPES = {
    "paper",
    "standard",
    "official-doc",
    "filing",
    "dataset",
    "repository",
    "reporting",
    "analysis",
    "informal",
    "other",
}
CLAIM_ROLES = {
    "definition",
    "mechanism",
    "measurement",
    "current-state",
    "critique",
    "context",
    "anecdote",
}
CLAIM_KINDS = {"fact", "calculation", "inference", "anecdote", "hypothesis"}
CLAIM_STATUSES = {"verified", "provisional", "disputed", "withdrawn"}
CONFIDENCE_LEVELS = {"high", "medium", "low"}
EVIDENCE_RELATIONS = {"supports", "contradicts"}
LOCATOR_TYPES = {
    "page",
    "section",
    "heading",
    "timestamp",
    "cell",
    "commit",
    "fragment",
    "other",
}
RUN_RESULTS = {"productive", "stale", "blocked"}
VISUAL_TYPES = {
    "landscape",
    "architecture",
    "flowchart",
    "timeline",
    "taxonomy",
    "matrix",
    "chart",
    "map",
    "evidence-map",
    "source-figure",
    "other",
}
VISUAL_PROVENANCE = {
    "reproduced",
    "adapted",
    "source-excerpt",
    "eclipse-derivation",
    "eclipse-synthesis",
}
CREATION_METHODS = {"source", "code", "chart", "image-model", "manual"}
VISUAL_STATUSES = {"planned", "draft", "verified", "retired"}
LICENSE_STATUSES = {"verified", "unverified", "restricted", "not-applicable"}
REPORT_HEADINGS = {
    "Executive answer",
    "Visual overview",
    "Key findings",
    "Detailed analysis",
    "Counterevidence and uncertainty",
    "Implications",
    "Open questions and future research",
    "Sources",
}
TASK_SPEC_HEADINGS = {
    "Primary question",
    "Intended reader and use",
    "Scope and time boundary",
    "Exclusions",
    "Deliverables",
    "Report contract",
    "Visual contract",
    "Research map",
    "Budget and checkpoints",
    "Success criteria",
    "User-supplied facts",
    "Assumptions and decisions",
}
ID_PATTERNS = {
    "source": re.compile(r"^S\d{3,}$"),
    "claim": re.compile(r"^C\d{3,}$"),
    "run": re.compile(r"^R\d{3,}$"),
    "visual": re.compile(r"^V\d{3,}$"),
}


class WorkspaceValidator:
    def __init__(self, root: Path) -> None:
        self.root = root
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)

    def load_json(self, relative: str) -> Any:
        path = self.root / relative
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            self.error(f"{relative}: invalid JSON: {exc}")
            return None

    def load_jsonl(self, relative: str) -> list[dict[str, Any]]:
        path = self.root / relative
        records: list[dict[str, Any]] = []
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except OSError as exc:
            self.error(f"{relative}: cannot read file: {exc}")
            return records

        for line_number, line in enumerate(lines, start=1):
            if not line.strip():
                continue
            try:
                record = json.loads(line)
            except json.JSONDecodeError as exc:
                self.error(f"{relative}:{line_number}: invalid JSON: {exc.msg}")
                continue
            if not isinstance(record, dict):
                self.error(f"{relative}:{line_number}: record must be a JSON object")
                continue
            record["__line__"] = line_number
            records.append(record)
        return records

    def check_required_files(self) -> bool:
        missing = [relative for relative in REQUIRED_FILES if not (self.root / relative).is_file()]
        for relative in missing:
            self.error(f"missing required file: {relative}")
        return not missing

    def validate(self) -> None:
        if not self.check_required_files():
            return

        progress = self.load_json("state/progress.json")
        sources = self.load_jsonl("state/sources.jsonl")
        claims = self.load_jsonl("state/claims.jsonl")
        runs = self.load_jsonl("state/runs.jsonl")
        visuals = self.load_jsonl("state/visuals.jsonl")

        task_spec = self.validate_task_spec()
        source_map = self.validate_sources(sources)
        claim_map, superseded_claims = self.validate_claims(claims, source_map)
        run_map = self.validate_runs(runs, claim_map)
        visual_map = self.validate_visuals(
            visuals, source_map, claim_map, superseded_claims
        )
        report = self.validate_report(progress, visual_map)
        self.validate_progress(
            progress,
            report,
            task_spec,
            claim_map,
            superseded_claims,
            run_map,
            visual_map,
        )

    def validate_task_spec(self) -> str:
        relative = "state/task_spec.md"
        try:
            text = (self.root / relative).read_text(encoding="utf-8")
        except OSError as exc:
            self.error(f"{relative}: cannot read file: {exc}")
            return ""
        headings = set(re.findall(r"^##\s+(.+?)\s*$", text, flags=re.MULTILINE))
        for heading in sorted(TASK_SPEC_HEADINGS - headings):
            self.error(f"{relative}: missing required heading '## {heading}'")
        return text

    def validate_ids(
        self, records: list[dict[str, Any]], kind: str, relative: str
    ) -> dict[str, dict[str, Any]]:
        result: dict[str, dict[str, Any]] = {}
        pattern = ID_PATTERNS[kind]
        for record in records:
            line = record["__line__"]
            record_id = record.get("id")
            if not isinstance(record_id, str) or not pattern.fullmatch(record_id):
                self.error(
                    f"{relative}:{line}: id must match {pattern.pattern} for a {kind}"
                )
                continue
            if record_id in result:
                self.error(f"{relative}:{line}: duplicate id {record_id}")
                continue
            result[record_id] = record
        return result

    def validate_sources(
        self, records: list[dict[str, Any]]
    ) -> dict[str, dict[str, Any]]:
        relative = "state/sources.jsonl"
        source_map = self.validate_ids(records, "source", relative)
        for source_id, record in source_map.items():
            line = record["__line__"]
            self.require_text(record, "title", relative, line)
            self.require_text(record, "url", relative, line)
            self.require_enum(record, "source_type", SOURCE_TYPES, relative, line)
            self.require_string_list(record, "claim_roles", relative, line)
            if not record.get("claim_roles"):
                self.error(f"{relative}:{line}: {source_id} needs at least one claim role")
            for role in record.get("claim_roles", []):
                if role not in CLAIM_ROLES:
                    self.error(f"{relative}:{line}: {source_id} has invalid claim role {role!r}")
            self.require_string_list(record, "authors", relative, line)
            if not self.valid_date(record.get("accessed")):
                self.error(f"{relative}:{line}: {source_id} has invalid accessed date")
            if not isinstance(record.get("primary"), bool):
                self.error(f"{relative}:{line}: {source_id}.primary must be boolean")
            if record.get("inspected") is not True:
                self.error(f"{relative}:{line}: {source_id} must be inspected before recording")
            self.validate_license(record.get("license"), relative, line, required=False)
        return source_map

    def validate_claims(
        self,
        records: list[dict[str, Any]],
        source_map: dict[str, dict[str, Any]],
    ) -> tuple[dict[str, dict[str, Any]], set[str]]:
        relative = "state/claims.jsonl"
        claim_map = self.validate_ids(records, "claim", relative)
        superseded: set[str] = set()
        edges: dict[str, list[str]] = {}

        for claim_id, record in claim_map.items():
            line = record["__line__"]
            self.require_text(record, "claim", relative, line)
            self.require_enum(record, "kind", CLAIM_KINDS, relative, line)
            self.require_enum(record, "confidence", CONFIDENCE_LEVELS, relative, line)
            self.require_enum(record, "status", CLAIM_STATUSES, relative, line)
            self.require_string_list(record, "caveats", relative, line)
            self.require_string_list(record, "tags", relative, line)
            if not self.valid_timestamp(record.get("ts")):
                self.error(f"{relative}:{line}: {claim_id} has invalid ts")

            evidence_refs = record.get("evidence_refs")
            if not isinstance(evidence_refs, list):
                self.error(f"{relative}:{line}: {claim_id}.evidence_refs must be a list")
                evidence_refs = []
            for index, evidence_ref in enumerate(evidence_refs):
                label = f"{relative}:{line}: {claim_id}.evidence_refs[{index}]"
                if not isinstance(evidence_ref, dict):
                    self.error(f"{label} must be an object")
                    continue
                source_id = evidence_ref.get("source_id")
                if source_id not in source_map:
                    self.error(f"{label} references missing source {source_id!r}")
                if evidence_ref.get("relation") not in EVIDENCE_RELATIONS:
                    self.error(f"{label}.relation must be supports or contradicts")
                self.validate_locator(evidence_ref.get("locator"), label)
                if not isinstance(evidence_ref.get("note"), str) or not evidence_ref["note"].strip():
                    self.error(f"{label}.note must explain the evidence relationship")

            if record.get("status") == "verified" and not evidence_refs:
                self.error(f"{relative}:{line}: verified claim {claim_id} needs evidence")
            relations = {
                evidence_ref.get("relation")
                for evidence_ref in evidence_refs
                if isinstance(evidence_ref, dict)
            }
            if record.get("status") == "verified" and "supports" not in relations:
                self.error(f"{relative}:{line}: verified claim {claim_id} needs supporting evidence")
            if record.get("status") == "disputed" and not {"supports", "contradicts"}.issubset(relations):
                self.error(
                    f"{relative}:{line}: disputed claim {claim_id} needs supporting and contradicting evidence"
                )

            replacements = record.get("supersedes")
            if not isinstance(replacements, list) or not all(
                isinstance(item, str) for item in replacements
            ):
                self.error(f"{relative}:{line}: {claim_id}.supersedes must be a string list")
                replacements = []
            edges[claim_id] = replacements
            for replaced_id in replacements:
                if replaced_id == claim_id:
                    self.error(f"{relative}:{line}: {claim_id} cannot supersede itself")
                elif replaced_id not in claim_map:
                    self.error(f"{relative}:{line}: {claim_id} supersedes missing claim {replaced_id}")
                else:
                    superseded.add(replaced_id)

        self.validate_acyclic(edges, relative)
        return claim_map, superseded

    def validate_runs(
        self,
        records: list[dict[str, Any]],
        claim_map: dict[str, dict[str, Any]],
    ) -> dict[str, dict[str, Any]]:
        relative = "state/runs.jsonl"
        run_map = self.validate_ids(records, "run", relative)
        for run_id, record in run_map.items():
            line = record["__line__"]
            for field in ("direction", "strategy", "deliverable"):
                self.require_text(record, field, relative, line)
            self.require_enum(record, "result", RUN_RESULTS, relative, line)
            for field in (
                "source_classes",
                "claim_ids",
                "questions_resolved",
                "claims_falsified",
                "coverage_changes",
            ):
                self.require_string_list(record, field, relative, line)
            for field in ("claim_ids", "claims_falsified"):
                for claim_id in record.get(field, []):
                    if claim_id not in claim_map:
                        self.error(
                            f"{relative}:{line}: {run_id}.{field} references missing claim {claim_id}"
                        )
            started = self.parse_timestamp(record.get("started"))
            ended = self.parse_timestamp(record.get("ended"))
            if started is None:
                self.error(f"{relative}:{line}: {run_id} has invalid started timestamp")
            if ended is None:
                self.error(f"{relative}:{line}: {run_id} has invalid ended timestamp")
            if started is not None and ended is not None and ended < started:
                self.error(f"{relative}:{line}: {run_id} ends before it starts")
            next_direction = record.get("next_direction")
            if next_direction is not None and not isinstance(next_direction, str):
                self.error(f"{relative}:{line}: {run_id}.next_direction must be string or null")
        return run_map

    def validate_visuals(
        self,
        records: list[dict[str, Any]],
        source_map: dict[str, dict[str, Any]],
        claim_map: dict[str, dict[str, Any]],
        superseded_claims: set[str],
    ) -> dict[str, dict[str, Any]]:
        relative = "state/visuals.jsonl"
        visual_map = self.validate_ids(records, "visual", relative)
        for visual_id, record in visual_map.items():
            line = record["__line__"]
            revision = record.get("revision")
            if not isinstance(revision, int) or isinstance(revision, bool) or revision < 1:
                self.error(f"{relative}:{line}: {visual_id}.revision must be a positive integer")
            self.require_text(record, "section", relative, line)
            self.require_text(record, "purpose", relative, line)
            self.require_enum(record, "type", VISUAL_TYPES, relative, line)
            self.require_enum(record, "provenance", VISUAL_PROVENANCE, relative, line)
            self.require_enum(record, "creation_method", CREATION_METHODS, relative, line)
            self.require_enum(record, "status", VISUAL_STATUSES, relative, line)
            self.require_string_list(record, "source_ids", relative, line)
            self.require_string_list(record, "claim_ids", relative, line)

            source_ids = record.get("source_ids", [])
            claim_ids = record.get("claim_ids", [])
            for source_id in source_ids:
                if source_id not in source_map:
                    self.error(f"{relative}:{line}: {visual_id} references missing source {source_id}")
            for claim_id in claim_ids:
                if claim_id not in claim_map:
                    self.error(f"{relative}:{line}: {visual_id} references missing claim {claim_id}")
                elif record.get("status") == "verified" and claim_id in superseded_claims:
                    self.error(f"{relative}:{line}: verified {visual_id} uses superseded claim {claim_id}")

            provenance = record.get("provenance")
            source_based = provenance in {"reproduced", "adapted", "source-excerpt"}
            visual_status = record.get("status")
            if source_based and visual_status == "verified":
                if not source_ids:
                    self.error(f"{relative}:{line}: source-based {visual_id} needs source_ids")
                self.validate_locator(record.get("source_locator"), f"{relative}:{line}: {visual_id}")
            elif record.get("source_locator") is not None:
                self.validate_locator(record.get("source_locator"), f"{relative}:{line}: {visual_id}")

            license_record = record.get("license")
            self.validate_license(
                license_record,
                relative,
                line,
                required=source_based and visual_status != "planned",
            )
            if (
                visual_status == "verified"
                and provenance in {"reproduced", "adapted"}
                and isinstance(license_record, dict)
                and license_record.get("status") != "verified"
            ):
                self.error(f"{relative}:{line}: {visual_id} needs verified reuse permission")

            if visual_status == "verified":
                for field in ("alt", "caption", "rendered_asset"):
                    self.require_text(record, field, relative, line)
                if not source_ids and not claim_ids:
                    self.error(f"{relative}:{line}: verified {visual_id} needs evidence links")
                if record.get("creation_method") in {"code", "chart", "image-model", "manual"}:
                    self.require_text(record, "editable_source", relative, line)
                if not self.valid_date(record.get("last_verified")):
                    self.error(f"{relative}:{line}: verified {visual_id} needs last_verified date")
                self.validate_asset(record.get("rendered_asset"), relative, line, visual_id)
                editable_source = record.get("editable_source")
                if isinstance(editable_source, str) and editable_source.strip():
                    self.validate_asset(editable_source, relative, line, visual_id)
        return visual_map

    def validate_report(
        self,
        progress: Any,
        visual_map: dict[str, dict[str, Any]],
    ) -> dict[str, Any]:
        relative = "report.md"
        path = self.root / relative
        try:
            text = path.read_text(encoding="utf-8")
        except OSError as exc:
            self.error(f"{relative}: cannot read file: {exc}")
            return {}

        frontmatter, body = self.parse_frontmatter(text, relative)
        required_fields = {
            "title",
            "topic_id",
            "status",
            "revision",
            "updated",
            "evidence_cutoff",
            "audience",
            "canonical_format",
        }
        for field in sorted(required_fields - frontmatter.keys()):
            self.error(f"{relative}: missing frontmatter field {field}")

        if frontmatter.get("status") not in REPORT_STATUSES:
            self.error(f"{relative}: invalid report status {frontmatter.get('status')!r}")
        revision = frontmatter.get("revision")
        if not isinstance(revision, int) or isinstance(revision, bool) or revision < 1:
            self.error(f"{relative}: revision must be a positive integer")
        if not self.valid_date(frontmatter.get("updated")):
            self.error(f"{relative}: updated must be YYYY-MM-DD")
        evidence_cutoff = frontmatter.get("evidence_cutoff")
        if evidence_cutoff is not None and not self.valid_date(evidence_cutoff):
            self.error(f"{relative}: evidence_cutoff must be null or YYYY-MM-DD")
        if frontmatter.get("status") == "reviewed" and not self.valid_date(evidence_cutoff):
            self.error(f"{relative}: reviewed report requires a dated evidence_cutoff")
        if self.valid_date(evidence_cutoff) and self.valid_date(frontmatter.get("updated")):
            if date.fromisoformat(evidence_cutoff) > date.fromisoformat(frontmatter["updated"]):
                self.error(f"{relative}: evidence_cutoff cannot be later than updated")
        if frontmatter.get("canonical_format") != "markdown":
            self.error(f"{relative}: canonical_format must be markdown")
        for field in ("title", "topic_id", "audience"):
            if not isinstance(frontmatter.get(field), str) or not frontmatter[field].strip():
                self.error(f"{relative}: {field} must be non-empty text")
        if isinstance(progress, dict) and frontmatter.get("topic_id") != progress.get("topic_id"):
            self.error(f"{relative}: topic_id does not match state/progress.json")

        headings = set(re.findall(r"^##\s+(.+?)\s*$", body, flags=re.MULTILINE))
        for heading in sorted(REPORT_HEADINGS - headings):
            self.error(f"{relative}: missing required heading '## {heading}'")
        if isinstance(revision, int) and revision > 1 and "What changed in this revision" not in headings:
            self.error(f"{relative}: revision {revision} needs '## What changed in this revision'")

        visual_ids = re.findall(r"<!--\s*visual-id:\s*(V\d{3,})\s*-->", body)
        for visual_id in visual_ids:
            if visual_id not in visual_map:
                self.error(f"{relative}: references missing visual {visual_id}")
            elif frontmatter.get("status") == "reviewed" and visual_map[visual_id].get("status") != "verified":
                self.error(f"{relative}: reviewed report uses unverified visual {visual_id}")

        rendered_assets = {
            record.get("rendered_asset"): visual_id
            for visual_id, record in visual_map.items()
            if isinstance(record.get("rendered_asset"), str)
        }
        for alt, target in re.findall(r"!\[([^\]]*)\]\(([^\s)]+)(?:\s+[^)]*)?\)", body):
            target = target.strip("<>")
            if not alt.strip():
                self.error(f"{relative}: Markdown image {target!r} has empty alt text")
            if target not in rendered_assets:
                self.error(f"{relative}: Markdown image {target!r} is absent from visuals.jsonl")
            elif rendered_assets[target] not in visual_ids:
                self.error(
                    f"{relative}: image {target!r} needs '<!-- visual-id: {rendered_assets[target]} -->'"
                )
        frontmatter["__visual_ids__"] = visual_ids
        frontmatter["__body__"] = body
        return frontmatter

    def validate_progress(
        self,
        progress: Any,
        report: dict[str, Any],
        task_spec: str,
        claim_map: dict[str, dict[str, Any]],
        superseded_claims: set[str],
        run_map: dict[str, dict[str, Any]],
        visual_map: dict[str, dict[str, Any]],
    ) -> None:
        relative = "state/progress.json"
        if not isinstance(progress, dict):
            self.error(f"{relative}: root value must be an object")
            return
        if progress.get("schema_version") != 2:
            self.error(f"{relative}: schema_version must be 2")
        topic_id = progress.get("topic_id")
        if not isinstance(topic_id, str) or not re.fullmatch(
            r"[a-z0-9]+(?:-[a-z0-9]+)*", topic_id
        ):
            self.error(f"{relative}: topic_id must be a lowercase hyphenated slug")
        if progress.get("status") not in PROGRESS_STATUSES:
            self.error(f"{relative}: invalid status {progress.get('status')!r}")
        if not isinstance(progress.get("coverage"), dict):
            self.error(f"{relative}: coverage must be an object")
        self.require_string_list(progress, "open_questions", relative, None)
        next_direction = progress.get("recommended_next_direction")
        if next_direction is not None and not isinstance(next_direction, str):
            self.error(f"{relative}: recommended_next_direction must be string or null")
        if not self.valid_timestamp(progress.get("last_seen")):
            self.error(f"{relative}: last_seen must be an ISO-8601 timestamp")

        quality_gate = progress.get("quality_gate")
        if not isinstance(quality_gate, dict):
            self.error(f"{relative}: quality_gate must be an object")
            quality_gate = {}
        for key in sorted(QUALITY_KEYS):
            if not isinstance(quality_gate.get(key), bool):
                self.error(f"{relative}: quality_gate.{key} must be boolean")

        if report.get("status") == "reviewed" and quality_gate.get("report_reviewed") is not True:
            self.error(f"{relative}: reviewed report requires quality_gate.report_reviewed=true")

        if progress.get("status") == "complete":
            for key in sorted(QUALITY_KEYS):
                if quality_gate.get(key) is not True:
                    self.error(f"{relative}: complete task requires quality_gate.{key}=true")
            if report.get("status") != "reviewed":
                self.error("report.md: complete task requires report status reviewed")
            if not self.valid_date(report.get("evidence_cutoff")):
                self.error("report.md: complete task requires a dated evidence_cutoff")
            active_verified = [
                claim_id
                for claim_id, record in claim_map.items()
                if claim_id not in superseded_claims and record.get("status") == "verified"
            ]
            if not active_verified:
                self.error(f"{relative}: complete task needs at least one active verified claim")
            if not run_map:
                self.error(f"{relative}: complete task needs at least one recorded research run")
            if "To be defined" in task_spec:
                self.error("state/task_spec.md: complete task still contains 'To be defined'")
            body = report.get("__body__", "")
            for placeholder in (
                "Research in progress.",
                "Overview visual to be selected after the research map is stable.",
            ):
                if placeholder in body:
                    self.error(f"report.md: complete task still contains placeholder text: {placeholder}")
            unfinished_visuals = [
                visual_id
                for visual_id, record in visual_map.items()
                if record.get("status") not in {"verified", "retired"}
            ]
            if unfinished_visuals:
                self.error(
                    f"{relative}: complete task has unfinished visuals: {', '.join(unfinished_visuals)}"
                )
            if not report.get("__visual_ids__"):
                self.warn(
                    "complete report has no visual manifest reference; confirm that omitting visuals was deliberate"
                )

    def validate_locator(self, locator: Any, label: str) -> None:
        if not isinstance(locator, dict):
            self.error(f"{label}.locator must be an object")
            return
        if locator.get("type") not in LOCATOR_TYPES:
            self.error(f"{label}.locator.type is invalid")
        if not isinstance(locator.get("value"), str) or not locator["value"].strip():
            self.error(f"{label}.locator.value must be non-empty text")

    def validate_license(
        self, license_record: Any, relative: str, line: int, *, required: bool
    ) -> None:
        if license_record is None and not required:
            return
        if not isinstance(license_record, dict):
            self.error(f"{relative}:{line}: license must be an object")
            return
        if license_record.get("status") not in LICENSE_STATUSES:
            self.error(f"{relative}:{line}: license.status is invalid")
        for field in ("value", "url"):
            if license_record.get(field) is not None and not isinstance(license_record[field], str):
                self.error(f"{relative}:{line}: license.{field} must be string or null")

    def validate_asset(self, value: Any, relative: str, line: int, visual_id: str) -> None:
        if not isinstance(value, str) or not value.strip():
            return
        parsed = urlparse(value)
        if parsed.scheme in {"http", "https", "data"}:
            return
        path = Path(value).expanduser()
        if not path.is_absolute():
            path = self.root / path
        if not path.exists():
            self.error(f"{relative}:{line}: {visual_id} asset does not exist: {value}")

    def validate_acyclic(self, edges: dict[str, list[str]], relative: str) -> None:
        visiting: set[str] = set()
        visited: set[str] = set()

        def visit(node: str) -> None:
            if node in visiting:
                self.error(f"{relative}: claim supersession cycle includes {node}")
                return
            if node in visited:
                return
            visiting.add(node)
            for child in edges.get(node, []):
                if child in edges:
                    visit(child)
            visiting.remove(node)
            visited.add(node)

        for node in edges:
            visit(node)

    def parse_frontmatter(self, text: str, relative: str) -> tuple[dict[str, Any], str]:
        lines = text.splitlines()
        if not lines or lines[0].strip() != "---":
            self.error(f"{relative}: missing opening YAML frontmatter delimiter")
            return {}, text
        try:
            end = next(index for index, line in enumerate(lines[1:], start=1) if line.strip() == "---")
        except StopIteration:
            self.error(f"{relative}: missing closing YAML frontmatter delimiter")
            return {}, text

        frontmatter: dict[str, Any] = {}
        for number, line in enumerate(lines[1:end], start=2):
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            if ":" not in line:
                self.error(f"{relative}:{number}: unsupported frontmatter line")
                continue
            key, raw_value = line.split(":", 1)
            key = key.strip()
            if not re.fullmatch(r"[a-z_][a-z0-9_]*", key):
                self.error(f"{relative}:{number}: invalid frontmatter key {key!r}")
                continue
            if key in frontmatter:
                self.error(f"{relative}:{number}: duplicate frontmatter key {key}")
                continue
            frontmatter[key] = self.parse_scalar(raw_value.strip(), relative, number)
        return frontmatter, "\n".join(lines[end + 1 :])

    def parse_scalar(self, value: str, relative: str, line: int) -> Any:
        if value in {"null", "~"}:
            return None
        if value == "true":
            return True
        if value == "false":
            return False
        if re.fullmatch(r"-?\d+", value):
            return int(value)
        if value.startswith('"'):
            try:
                parsed = json.loads(value)
            except json.JSONDecodeError:
                self.error(f"{relative}:{line}: invalid quoted frontmatter value")
                return value
            return parsed
        if value.startswith("'") and value.endswith("'"):
            return value[1:-1].replace("''", "'")
        return value

    def require_text(
        self, record: dict[str, Any], field: str, relative: str, line: int | None
    ) -> None:
        label = f"{relative}:{line}" if line is not None else relative
        if not isinstance(record.get(field), str) or not record[field].strip():
            self.error(f"{label}: {field} must be non-empty text")

    def require_string_list(
        self, record: dict[str, Any], field: str, relative: str, line: int | None
    ) -> None:
        label = f"{relative}:{line}" if line is not None else relative
        value = record.get(field)
        if not isinstance(value, list) or not all(isinstance(item, str) for item in value):
            self.error(f"{label}: {field} must be a string list")

    def require_enum(
        self,
        record: dict[str, Any],
        field: str,
        allowed: set[str],
        relative: str,
        line: int,
    ) -> None:
        if record.get(field) not in allowed:
            self.error(f"{relative}:{line}: invalid {field} {record.get(field)!r}")

    @staticmethod
    def parse_timestamp(value: Any) -> datetime | None:
        if not isinstance(value, str) or "T" not in value:
            return None
        try:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            return None
        if parsed.tzinfo is None or parsed.utcoffset() is None:
            return None
        if parsed.utcoffset().total_seconds() != 0:
            return None
        return parsed

    @classmethod
    def valid_timestamp(cls, value: Any) -> bool:
        return cls.parse_timestamp(value) is not None

    @staticmethod
    def valid_date(value: Any) -> bool:
        if not isinstance(value, str):
            return False
        try:
            date.fromisoformat(value)
        except ValueError:
            return False
        return True
