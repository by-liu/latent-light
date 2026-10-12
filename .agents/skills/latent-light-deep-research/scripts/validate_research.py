#!/usr/bin/env python3
"""Validate research records and their canonical output without modifying files."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

sys.dont_write_bytecode = True
from legacy_v2 import (  # noqa: E402
    WorkspaceValidator as LegacyValidator,
    VISUAL_TYPES, CREATION_METHODS, VISUAL_STATUSES,
)

STATE_FILES = ("task_spec.md", "progress.json", "sources.jsonl", "claims.jsonl", "runs.jsonl", "visuals.jsonl")
QUALITY_KEYS = ("evidence_verified", "contradictions_reviewed", "output_reviewed", "visuals_reviewed")
TASK_HEADINGS = {
    "Inquiry", "Intended reader and use", "Scope and time boundary", "Exclusions",
    "Deliverables", "Output contract", "Visual contract", "Research map",
    "Budget and checkpoints", "Success criteria", "User-supplied facts", "Assumptions and decisions",
}


def without_fences(body: str) -> str:
    return re.sub(r"(?ms)^(`{3,}|~{3,})[^\n]*\n.*?^\1[ \t]*$", "", body)


class SiteWorkspaceValidator(LegacyValidator):
    def __init__(self, root: Path, repo_root: Path, output_kind: str | None) -> None:
        super().__init__(root)
        self.repo_root = repo_root
        self.output_kind = output_kind

    def check_required_files(self) -> bool:
        missing = ["state/" + name for name in STATE_FILES if not (self.root / "state" / name).is_file()]
        for relative in missing:
            self.error(f"missing required file: {relative}")
        return not missing

    def validate_task_spec(self) -> str:
        text = (self.root / "state/task_spec.md").read_text(encoding="utf-8")
        headings = set(re.findall(r"^##\s+(.+?)\s*$", text, re.MULTILINE))
        for heading in sorted(TASK_HEADINGS - headings):
            self.error(f"state/task_spec.md: missing required heading '## {heading}'")
        return text

    def resolve_output(self, output: dict[str, Any]) -> Path | None:
        kind, raw = output.get("kind"), output.get("path")
        if kind not in {"site-page", "report"}:
            self.error("state/progress.json: output.kind must be site-page or report")
            return None
        if not isinstance(raw, str) or not raw.strip():
            self.error("state/progress.json: output.path must be nonempty text")
            return None
        relative = Path(raw)
        if relative.is_absolute() or ".." in relative.parts:
            self.error("state/progress.json: output.path must be relative without '..'")
            return None
        if kind == "site-page":
            docs = (self.repo_root / "src/content/docs").resolve()
            target = (self.repo_root / relative).resolve()
            if not docs.is_relative_to(self.repo_root) or not target.is_relative_to(docs) or relative.suffix not in {".md", ".mdx"}:
                self.error("state/progress.json: site output must be a .md or .mdx file inside src/content/docs")
                return None
        else:
            target = (self.root / relative).resolve()
            if not target.is_relative_to(self.root) or relative.suffix != ".md" or relative.parts[0] in {"state", "visuals", "logs"}:
                self.error("state/progress.json: report output must be a Markdown narrative inside the task directory")
                return None
        return target

    def resolve_asset(self, raw: str) -> Path | None:
        path = Path(raw)
        if path.is_absolute():
            self.error(f"asset path must be workspace-relative, not machine-specific: {raw}")
            return None
        resolved = (self.root / path).resolve()
        if not resolved.is_relative_to(self.root) and not resolved.is_relative_to(self.repo_root):
            self.error(f"asset escapes the workspace and repository: {raw}")
            return None
        return resolved

    def validate_asset(self, value: Any, relative: str, line: int, visual_id: str) -> None:
        if not isinstance(value, str) or not value.strip():
            return
        parsed = urlparse(value)
        if parsed.scheme in {"http", "https"}:
            return
        if parsed.scheme:
            self.error(f"{relative}:{line}: {visual_id} unsupported asset URL scheme")
            return
        path = self.resolve_asset(value)
        if path is not None and not path.is_file():
            self.error(f"{relative}:{line}: {visual_id} asset does not exist: {value}")

    def validate_visuals(self, records, source_map, claim_map, superseded_claims):
        relative = "state/visuals.jsonl"
        result = self.validate_ids(records, "visual", relative)
        for visual_id, record in result.items():
            line = record["__line__"]
            revision = record.get("revision")
            if not isinstance(revision, int) or isinstance(revision, bool) or revision < 1:
                self.error(f"{relative}:{line}: {visual_id}.revision must be a positive integer")
            for field in ("section", "purpose"):
                self.require_text(record, field, relative, line)
            for field, allowed in (("type", VISUAL_TYPES), ("creation_method", CREATION_METHODS), ("status", VISUAL_STATUSES),
                                   ("provenance", {"reproduced", "adapted", "source-excerpt", "derivation", "synthesis"})):
                self.require_enum(record, field, allowed, relative, line)
            for field, lookup in (("source_ids", source_map), ("claim_ids", claim_map)):
                self.require_string_list(record, field, relative, line)
                values = record.get(field)
                if not isinstance(values, list):
                    continue
                for value in values:
                    if not isinstance(value, str) or value not in lookup:
                        self.error(f"{relative}:{line}: {visual_id} references missing {field}: {value!r}")
                    elif field == "claim_ids" and record.get("status") == "verified" and value in superseded_claims:
                        self.error(f"{relative}:{line}: verified {visual_id} uses superseded claim {value}")
            source_based = record.get("provenance") in {"reproduced", "adapted", "source-excerpt"}
            verified = record.get("status") == "verified"
            self.validate_license(record.get("license"), relative, line, required=source_based and record.get("status") != "planned")
            if verified:
                for field in ("alt", "caption"):
                    self.require_text(record, field, relative, line)
                if not record.get("source_ids") and not record.get("claim_ids"):
                    self.error(f"{relative}:{line}: verified {visual_id} needs evidence links")
                if source_based:
                    if not record.get("source_ids"):
                        self.error(f"{relative}:{line}: source-based {visual_id} needs source_ids")
                    self.validate_locator(record.get("source_locator"), f"{relative}:{line}: {visual_id}")
                    license_record = record.get("license") or {}
                    basis = record.get("reuse_basis")
                    if isinstance(basis, dict):
                        if basis.get("kind") not in {"license", "permission", "exception"} or basis.get("status") != "reviewed":
                            self.error(f"{relative}:{line}: {visual_id} invalid reviewed reuse basis")
                        self.require_text(basis, "record", relative, line)
                        self.validate_asset(basis.get("record"), relative, line, visual_id)
                        if basis.get("kind") == "license" and license_record.get("status") != "verified":
                            self.error(f"{relative}:{line}: {visual_id} license basis requires a verified license")
                    elif license_record.get("status") != "verified":
                        self.error(f"{relative}:{line}: {visual_id} needs a documented reviewed reuse basis")
                if not self.valid_date(record.get("last_verified")):
                    self.error(f"{relative}:{line}: {visual_id} needs last_verified date")
                if record.get("creation_method") in {"code", "chart", "image-model", "manual"}:
                    self.require_text(record, "editable_source", relative, line)
                    self.validate_asset(record.get("editable_source"), relative, line, visual_id)
                anchor = record.get("output_anchor")
                native = self.output_kind == "site-page" and record.get("creation_method") == "code" and isinstance(anchor, str) and bool(anchor.strip())
                if not native or record.get("rendered_asset") is not None:
                    self.require_text(record, "rendered_asset", relative, line)
                    self.validate_asset(record.get("rendered_asset"), relative, line, visual_id)
        return result

    def parse_output_frontmatter(self, text: str, label: str) -> tuple[dict[str, Any], str]:
        # Validate the fields needed here; Astro validates full YAML and the site schema.
        match = re.match(r"\A---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)", text)
        if not match:
            self.error(f"{label}: missing frontmatter")
            return {}, text
        fields = {}
        for index, line in enumerate(match[1].splitlines(), start=2):
            item = re.match(r"^(title|description|lastUpdated):\s*(.*?)\s*$", line)
            if item:
                key, value = item.groups()
                if key in fields:
                    self.error(f"{label}: duplicate frontmatter key {key}")
                fields[key] = self.parse_scalar(value, label, index)
        return fields, text[match.end():]

    def validate_report(self, progress, visual_map):
        output = progress.get("output") if isinstance(progress, dict) else None
        if not isinstance(output, dict):
            self.error("state/progress.json: output must be an object")
            return {}
        result = dict(output)
        target = self.resolve_output(output)
        label = output.get("path", "output")
        for field in ("audience",):
            self.require_text(output, field, "state/progress.json: output", None)
        if output.get("status") not in {"working", "reviewed", "refresh-needed"}:
            self.error("state/progress.json: invalid output.status")
        revision = output.get("revision")
        if not isinstance(revision, int) or isinstance(revision, bool) or revision < 1:
            self.error("state/progress.json: output.revision must be a positive integer")
        if not self.valid_date(output.get("updated")):
            self.error("state/progress.json: output.updated must be YYYY-MM-DD")
        cutoff = output.get("evidence_cutoff")
        if cutoff is not None and not self.valid_date(cutoff):
            self.error("state/progress.json: output.evidence_cutoff must be null or YYYY-MM-DD")
        if output.get("status") == "reviewed" and not self.valid_date(cutoff):
            self.error("state/progress.json: reviewed output requires a dated evidence_cutoff")
        if self.valid_date(cutoff) and self.valid_date(output.get("updated")) and cutoff > output["updated"]:
            self.error("state/progress.json: evidence_cutoff cannot be later than output.updated")
        if target is None:
            return result
        if not target.is_file():
            if progress.get("status") in {"initialized", "researching"} and output.get("status") == "working":
                self.warn(f"{label}: planned page does not exist yet; initializer does not create site pages")
            else:
                self.error(f"{label}: canonical output does not exist")
            return result
        text = target.read_text(encoding="utf-8")
        frontmatter, body = self.parse_output_frontmatter(text, label)
        if not isinstance(frontmatter.get("title"), str) or not frontmatter["title"].strip():
            self.error(f"{label}: title must be nonempty text")
        if output.get("kind") == "site-page":
            if not isinstance(frontmatter.get("description"), str) or not frontmatter["description"].strip():
                self.error(f"{label}: description must be nonempty text")
            if not self.valid_date(frontmatter.get("lastUpdated")) or frontmatter.get("lastUpdated") != output.get("updated"):
                self.error(f"{label}: lastUpdated must match output.updated")
            if re.search(r"^#\s+", without_fences(body), re.MULTILINE):
                self.error(f"{label}: site page title belongs in frontmatter, not a duplicate body H1")
        visible = without_fences(body)
        if not visible.strip():
            self.error(f"{label}: canonical narrative is empty")
        definitions = set(re.findall(r"^\[\^([^\]]+)\]:", visible, re.MULTILINE))
        used = set(re.findall(r"\[\^([^\]]+)\](?!:)", visible))
        for key in sorted(used - definitions):
            self.error(f"{label}: missing citation definition {key}")
        figures = [int(value) for value in re.findall(r"\*\*Figure (\d+)\.", visible)]
        if figures != list(range(1, len(figures) + 1)):
            self.error(f"{label}: figure numbers must be sequential from 1")
        equations = [int(value) for value in re.findall(r'<MathExpression\b[^>]*\bnumber="(\d+)"', visible)]
        if equations != list(range(1, len(equations) + 1)):
            self.error(f"{label}: equation numbers must be sequential from 1")
        visual_ids = re.findall(r"<!--\s*visual-id:\s*(V\d{3,})\s*-->", visible)
        for key, record in visual_map.items():
            if record.get("status") == "retired":
                continue
            anchor = record.get("output_anchor")
            if isinstance(anchor, str) and anchor.strip() and re.search(r'\bid=["\']' + re.escape(anchor) + r'["\']', visible):
                visual_ids.append(key)
            elif record.get("status") == "verified" and key not in visual_ids:
                self.error(f"{label}: verified visual {key} needs an existing output_anchor or visual-id comment")
        for key in visual_ids:
            if key not in visual_map:
                self.error(f"{label}: references missing visual {key}")
            elif output.get("status") == "reviewed" and visual_map[key].get("status") != "verified":
                self.error(f"{label}: reviewed output uses unverified visual {key}")
        if output.get("kind") == "site-page":
            anchors = set(re.findall(r'\bid=["\'](figure-\d+)["\']', visible))
            registered = {record.get("output_anchor") for record in visual_map.values() if record.get("status") != "retired"}
            for anchor in anchors - registered:
                self.error(f"{label}: figure anchor {anchor} has no visual manifest record")
        assets = set()
        for record in visual_map.values():
            raw = record.get("rendered_asset")
            if isinstance(raw, str):
                assets.add(raw if urlparse(raw).scheme else str(self.resolve_asset(raw)))
        for alt, raw in re.findall(r"!\[([^\]]*)\]\(([^\s)]+)(?:\s+[^)]*)?\)", visible):
            raw = raw.strip("<>")
            if not alt.strip():
                self.error(f"{label}: image has empty alt text")
            parsed = urlparse(raw)
            resolved = raw if parsed.scheme else str((self.repo_root / "public" / raw.lstrip("/")).resolve() if raw.startswith("/") else (target.parent / raw).resolve())
            if resolved not in assets:
                self.error(f"{label}: image {raw} has no matching visual asset record")
        if progress.get("status") == "complete" and output.get("kind") == "site-page" and not used:
            self.error(f"{label}: completed research page needs claim-local citations")
        result["__visual_ids__"] = list(dict.fromkeys(visual_ids))
        result["__body__"] = body
        return result

    def validate_progress(self, progress, report, task_spec, claim_map, superseded_claims, run_map, visual_map):
        if not isinstance(progress, dict):
            self.error("state/progress.json: root value must be an object")
            return
        if progress.get("schema_version") != 3:
            self.error("state/progress.json: schema_version must be 3")
        gate = progress.get("quality_gate")
        if not isinstance(gate, dict):
            gate = {}
        for key in QUALITY_KEYS:
            if not isinstance(gate.get(key), bool):
                self.error(f"state/progress.json: quality_gate.{key} must be boolean")
        # Reuse the proven evidence/completion checks without changing legacy records.
        normalized = dict(progress)
        normalized["schema_version"] = 2
        normalized["quality_gate"] = {**gate, "report_reviewed": gate.get("output_reviewed")}
        before = len(self.errors)
        super().validate_progress(normalized, report, task_spec, claim_map, superseded_claims, run_map, visual_map)
        label = report.get("path", "output")
        self.errors[before:] = [error.replace("report_reviewed", "output_reviewed").replace("report.md:", str(label) + ":") for error in self.errors[before:]]
        checks = progress.get("delivery_checks")
        if not isinstance(checks, dict):
            self.error("state/progress.json: delivery_checks must be an object")
            checks = {}
        reviewed = progress.get("status") == "complete" or report.get("status") == "reviewed"
        if reviewed:
            for key in QUALITY_KEYS:
                if gate.get(key) is not True:
                    self.error(f"state/progress.json: reviewed output requires quality_gate.{key}=true")
        for name in ("validation", "rendering", "exports"):
            check = checks.get(name)
            prefix = f"state/progress.json: delivery_checks.{name}"
            if not isinstance(check, dict):
                self.error(prefix + " must be an object")
                continue
            status = check.get("status")
            if status not in {"pending", "passed", "failed", "not-applicable"}:
                self.error(prefix + " has invalid status")
            if status in {"passed", "failed", "not-applicable"}:
                if not isinstance(check.get("method"), str) or not check["method"].strip():
                    self.error(prefix + " needs an actual method or not-applicable reason")
                if not self.valid_timestamp(check.get("checked_at")):
                    self.error(prefix + " needs a UTC checked_at timestamp")
            if reviewed:
                allowed = {"passed"} if report.get("kind") == "site-page" else {"passed", "not-applicable"}
                if status not in allowed:
                    self.error(prefix + " has not passed the output contract")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("task_dir", type=Path)
    parser.add_argument("--repo-root", type=Path, default=Path(__file__).resolve().parents[4])
    args = parser.parse_args()
    root = args.task_dir.expanduser().resolve()
    if not root.is_dir():
        parser.error(f"not a directory: {root}")
    if (root / "state/findings.jsonl").exists() and not (root / "state/claims.jsonl").exists():
        print("LEGACY: preserve the findings/directions workspace; deliberate migration is required.", file=sys.stderr)
        return 2
    try:
        progress = json.loads((root / "state/progress.json").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: cannot read research progress: {exc}", file=sys.stderr)
        return 1
    version = progress.get("schema_version") if isinstance(progress, dict) else None
    if not isinstance(version, int) or isinstance(version, bool) or version not in (2, 3):
        print("ERROR: unsupported research schema; preserve records and migrate deliberately.", file=sys.stderr)
        return 1
    output = progress.get("output")
    kind = output.get("kind") if isinstance(output, dict) else None
    validator = LegacyValidator(root) if version == 2 else SiteWorkspaceValidator(root, args.repo_root.expanduser().resolve(), kind)
    try:
        validator.validate()
    except (OSError, TypeError, ValueError, KeyError) as exc:
        validator.error(f"invalid research record: {exc}")
    for warning in validator.warnings:
        print(f"WARNING: {warning}", file=sys.stderr)
    for error in validator.errors:
        print(f"ERROR: {error}", file=sys.stderr)
    if validator.errors:
        print(f"Validation failed with {len(validator.errors)} error(s).", file=sys.stderr)
        return 1
    print(f"Structural validation passed (schema {version}): {root}")
    print("Manual review is still required for evidence, explanation, visuals, accessibility, privacy and reuse rights.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
