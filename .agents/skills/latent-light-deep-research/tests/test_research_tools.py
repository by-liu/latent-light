"""Isolated structural tests. All evidence and review entries are fictional fixtures."""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SKILL = Path(__file__).resolve().parents[1]
INIT = SKILL / "scripts/init_research.py"
VALIDATE = SKILL / "scripts/validate_research.py"
DAY = "2026-10-10"
STAMP = DAY + "T18:00:00Z"


class ResearchToolsTest(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.repo = self.root / "repo"
        self.docs = self.repo / "src/content/docs"
        self.docs.mkdir(parents=True)
        self.output = "src/content/docs/products/example.mdx"
        self.task = self.repo / "docs/research/products/example"

    def run_script(self, script, *args):
        return subprocess.run(
            [sys.executable, str(script), *(str(arg) for arg in args)],
            capture_output=True, text=True, check=False,
            env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"}, timeout=15,
        )

    def initialize(self, kind="site-page", output=None):
        args = [self.task, "--title", "Example", "--inquiry", "Understand a subject",
                "--audience", "A curious reader", "--kind", kind, "--repo-root", self.repo]
        if kind == "site-page" or output is not None:
            args += ["--output", output or self.output]
        result = self.run_script(INIT, *args)
        self.assertEqual(result.returncode, 0, result.stderr)
        return result

    def validate(self, valid=True, message=None):
        result = self.run_script(VALIDATE, self.task, "--repo-root", self.repo)
        self.assertEqual(result.returncode, 0 if valid else 1, result.stdout + result.stderr)
        self.assertNotIn("Traceback", result.stderr)
        if message:
            self.assertIn(message, result.stderr)
        return result

    def progress(self, mutate):
        path = self.task / "state/progress.json"
        value = json.loads(path.read_text())
        mutate(value)
        path.write_text(json.dumps(value) + "\n")

    def ledger(self, name, records):
        (self.task / f"state/{name}.jsonl").write_text(
            "".join(json.dumps(record) + "\n" for record in records))

    def evidence(self):
        self.ledger("sources", [{
            "id": "S001", "title": "Fictional fixture source", "url": "https://example.org/source",
            "source_type": "official-doc", "claim_roles": ["mechanism"], "authors": ["Fixture"],
            "accessed": DAY, "primary": True, "inspected": True, "version": "fixture",
            "license": {"status": "unverified", "value": None, "url": None},
        }])
        self.claim = {
            "id": "C001", "claim": "A bounded fixture assertion.", "kind": "fact",
            "confidence": "high", "status": "verified", "caveats": [], "tags": [],
            "supersedes": [], "ts": STAMP, "evidence_refs": [{
                "source_id": "S001", "relation": "supports",
                "locator": {"type": "section", "value": "Overview"},
                "note": "Fixture support, not an actual source inspection.",
            }],
        }
        self.ledger("claims", [self.claim])
        self.ledger("runs", [{
            "id": "R001", "direction": "Fixture coverage", "strategy": "Isolated test",
            "deliverable": "Fixture narrative", "source_classes": ["official-doc"],
            "claim_ids": ["C001"], "questions_resolved": [], "claims_falsified": [],
            "coverage_changes": [], "result": "productive", "next_direction": None,
            "started": STAMP, "ended": STAMP,
        }])

    def page(self, body="## The useful idea\n\nA bounded fixture assertion.[^source]\n", kind="site-page"):
        path = self.repo / self.output if kind == "site-page" else self.task / "report.md"
        path.parent.mkdir(parents=True, exist_ok=True)
        metadata = f"title: Example\ndescription: Fictional test output\nlastUpdated: {DAY}\n"
        path.write_text("---\n" + metadata + "---\n\n" + body +
                        "\n[^source]: Fixture. [Source](https://example.org/source).\n")
        return path

    def complete(self, kind="site-page", body=None):
        self.initialize(kind)
        self.evidence()
        path = self.page(kind=kind, **({"body": body} if body is not None else {}))
        spec = self.task / "state/task_spec.md"
        spec.write_text(spec.read_text().replace("To be defined", "Fixture-defined"))
        def finished(value):
            value["status"] = "complete"
            value["last_seen"] = STAMP
            value["output"].update(status="reviewed", updated=DAY, evidence_cutoff=DAY)
            value["quality_gate"] = dict.fromkeys(value["quality_gate"], True)
            value["delivery_checks"] = {name: {
                "status": "passed", "method": "Fictional fixture review", "checked_at": STAMP,
            } for name in ("validation", "rendering", "exports")}
        self.progress(finished)
        return path

    def visual(self, *, source_based=False):
        asset = self.repo / "public/figures/example.svg"
        asset.parent.mkdir(parents=True, exist_ok=True)
        asset.write_text('<svg xmlns="http://www.w3.org/2000/svg"><title>Fixture</title></svg>')
        component = self.repo / "src/components/Example.astro"
        component.parent.mkdir(parents=True, exist_ok=True)
        component.write_text("<figure id=\"figure-1\"><slot /></figure>\n")
        record = {
            "id": "V001", "revision": 1, "section": "Idea", "purpose": "Clarify a relationship",
            "type": "source-figure" if source_based else "architecture",
            "provenance": "reproduced" if source_based else "synthesis",
            "creation_method": "source" if source_based else "code",
            "source_ids": ["S001"], "claim_ids": ["C001"], "output_anchor": "figure-1",
            "editable_source": "../../../../src/components/Example.astro",
            "rendered_asset": "../../../../public/figures/example.svg" if source_based else None,
            "alt": "Text equivalent", "caption": "Figure 1. Fixture relationship.",
            "license": {"status": "unverified" if source_based else "not-applicable", "value": None, "url": None},
            "status": "verified", "last_verified": DAY,
        }
        if source_based:
            record["source_locator"] = {"type": "page", "value": "Figure 1, page 2"}
        self.ledger("visuals", [record])
        self.page('<Example id="figure-1">\n\n**Figure 1.** Fixture relationship.[^source]\n\n</Example>\n')
        return record, asset

    def test_site_initializer_does_not_create_or_overwrite_page(self):
        existing = self.repo / self.output
        existing.parent.mkdir(parents=True)
        existing.write_text("user-authored page\n")
        self.initialize()
        self.assertEqual(existing.read_text(), "user-authored page\n")
        self.assertFalse((self.task / "report.md").exists())
        self.assertFalse((self.task / "visuals").exists())

    def test_planned_page_is_valid_with_warning(self):
        self.initialize()
        self.validate(message="planned page does not exist yet")
        self.assertFalse((self.repo / self.output).exists())

    def test_report_initializer_creates_one_canonical_report(self):
        self.initialize("report", "narrative/report.md")
        self.assertTrue((self.task / "narrative/report.md").is_file())
        self.validate()

    def test_question_alias_is_supported(self):
        result = self.run_script(INIT, self.task, "--title", "Alias", "--question", "Topic",
                                 "--kind", "report", "--repo-root", self.repo)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.validate()

    def test_collision_preserves_directory_file_and_symlink(self):
        for name in ("directory", "file", "symlink"):
            with self.subTest(name=name):
                target = self.root / name
                if name == "directory":
                    target.mkdir()
                    (target / "keep").write_text("user content")
                elif name == "file":
                    target.write_text("user content")
                else:
                    target.symlink_to(self.root / "missing")
                result = self.run_script(INIT, target, "--title", "Collision", "--inquiry", "Topic", "--kind", "report")
                self.assertEqual(result.returncode, 2, result.stderr)
                self.assertTrue(target.exists() or target.is_symlink())
                self.assertFalse(list(self.root.glob(f".{name}.init-*")))

    def test_invalid_output_paths_are_rejected_before_creation(self):
        for kind, output in (("site-page", "../page.mdx"), ("site-page", "/tmp/page.mdx"),
                             ("site-page", "src/components/page.mdx"), ("site-page", "src/content/docs/page.txt"),
                             ("report", "../report.md"), ("report", "state/task_spec.md")):
            with self.subTest(kind=kind, output=output):
                result = self.run_script(INIT, self.task, "--title", "Paths", "--inquiry", "Topic",
                                         "--kind", kind, "--output", output, "--repo-root", self.repo)
                self.assertEqual(result.returncode, 2, result.stderr)
                self.assertFalse(self.task.exists())

    def test_site_output_symlink_escape_is_rejected(self):
        (self.docs / "outside").symlink_to(self.root, target_is_directory=True)
        result = self.run_script(INIT, self.task, "--title", "Paths", "--inquiry", "Topic",
                                 "--output", "src/content/docs/outside/page.mdx", "--repo-root", self.repo)
        self.assertEqual(result.returncode, 2)

    def test_completed_technical_article_has_flexible_headings(self):
        self.complete(body="## How it works\n\nA bounded fixture assertion.[^source]\n\n## When it fails\n\nLimits remain explicit.\n")
        self.validate()

    def test_completed_human_capability_article_has_flexible_headings(self):
        self.complete(body="## A conversation\n\nA bounded fixture assertion.[^source]\n\n## What to try\n\nAn application, not a population-level result.\n")
        self.validate()

    def test_report_can_record_nonapplicable_rendering_with_reason(self):
        self.complete("report")
        self.progress(lambda value: value["delivery_checks"].update({name: {
            "status": "not-applicable", "method": "Plain Markdown report, no HTML or agent exports", "checked_at": STAMP,
        } for name in ("rendering", "exports")}))
        self.validate()

    def test_site_review_cannot_skip_or_leave_pending_checks(self):
        self.complete()
        for status in ("pending", "failed", "not-applicable"):
            with self.subTest(status=status):
                self.progress(lambda value: value["delivery_checks"]["rendering"].update(status=status))
                self.validate(False, "has not passed the output contract")

    def test_performed_check_needs_method_and_timestamp(self):
        self.complete()
        self.progress(lambda value: value["delivery_checks"]["validation"].update(method=None, checked_at=None))
        self.validate(False, "needs an actual method")

    def test_missing_canonical_output_cannot_complete(self):
        path = self.complete()
        path.unlink()
        self.validate(False, "canonical output does not exist")

    def test_date_and_duplicate_title_are_rejected(self):
        path = self.complete()
        path.write_text(path.read_text().replace(DAY, "2026-10-09") + "\n# Duplicate heading\n")
        result = self.validate(False, "lastUpdated must match")
        self.assertIn("duplicate body H1", result.stderr)

    def test_reviewed_output_requires_evidence_gates_even_before_complete(self):
        self.complete()
        self.progress(lambda value: value.update(status="verifying", quality_gate={
            "evidence_verified": False, "contradictions_reviewed": True,
            "output_reviewed": True, "visuals_reviewed": True,
        }))
        self.validate(False, "reviewed output requires quality_gate.evidence_verified")

    def test_missing_citation_and_source_are_rejected(self):
        path = self.complete()
        path.write_text(path.read_text().replace("[^source]:", "[^other]:"))
        self.claim["evidence_refs"][0]["source_id"] = "S999"
        self.ledger("claims", [self.claim])
        result = self.validate(False, "missing citation definition")
        self.assertIn("missing source", result.stderr)

    def test_native_diagram_needs_existing_component_and_anchor(self):
        self.complete()
        record, asset = self.visual()
        self.validate()
        record["output_anchor"] = "absent-anchor"
        self.ledger("visuals", [record])
        self.validate(False, "needs an existing output_anchor")

    def test_missing_native_source_is_rejected(self):
        self.complete()
        record, _ = self.visual()
        record["editable_source"] = "missing.astro"
        self.ledger("visuals", [record])
        self.validate(False, "asset does not exist")

    def test_reproduced_figure_requires_locator_and_reviewed_reuse_basis(self):
        self.complete()
        record, _ = self.visual(source_based=True)
        self.validate(False, "needs a documented reviewed reuse basis")
        basis = self.task / "reuse.md"
        basis.write_text("Fictional permission record for tests, not an actual permission grant.\n")
        record["reuse_basis"] = {"kind": "permission", "status": "reviewed", "record": "reuse.md"}
        self.ledger("visuals", [record])
        self.validate()
        record["source_locator"] = None
        self.ledger("visuals", [record])
        self.validate(False, "locator must be an object")

    def test_missing_asset_and_asset_escape_are_rejected(self):
        self.complete()
        record, asset = self.visual(source_based=True)
        record["license"] = {"status": "verified", "value": "Fixture", "url": "https://example.org/terms"}
        self.ledger("visuals", [record])
        asset.unlink()
        self.validate(False, "asset does not exist")
        record["rendered_asset"] = "../../../../../outside.svg"
        self.ledger("visuals", [record])
        self.validate(False, "asset escapes")

    def test_superseded_claim_cannot_ground_verified_visual(self):
        self.complete()
        self.visual()
        newer = {**self.claim, "id": "C002", "supersedes": ["C001"]}
        self.ledger("claims", [self.claim, newer])
        self.validate(False, "uses superseded claim C001")

    def test_supersession_cycle_is_rejected(self):
        self.complete()
        self.claim["supersedes"] = ["C002"]
        self.ledger("claims", [self.claim, {**self.claim, "id": "C002", "supersedes": ["C001"]}])
        self.validate(False, "supersession cycle")

    def test_numbering_ignores_fenced_examples_but_checks_authored_content(self):
        self.complete(body="A bounded fixture assertion.[^source]\n\n```mdx\n**Figure 9.** Example\n<MathExpression number=\"9\" />\n[^undefined]\n```\n")
        self.validate()
        self.page('A bounded fixture assertion.[^source]\n\n**Figure 2.** Bad order\n<MathExpression number="2" />\n')
        result = self.validate(False, "figure numbers must be sequential")
        self.assertIn("equation numbers must be sequential", result.stderr)

    def test_unregistered_image_is_rejected(self):
        self.complete(body="A bounded fixture assertion.[^source]\n\n![Description](/figures/unknown.svg)\n")
        self.validate(False, "has no matching visual asset record")

    def test_malformed_progress_and_jsonl_fail_without_traceback(self):
        self.initialize()
        progress = self.task / "state/progress.json"
        original = progress.read_text()
        for value in ("{broken", "[]", '{"schema_version":{}}', '{"schema_version":true}'):
            with self.subTest(value=value):
                progress.write_text(value)
                self.validate(False)
        progress.write_text(original)
        (self.task / "state/sources.jsonl").write_text("[]\n{broken\n")
        self.validate(False)

    def test_legacy_schema2_is_read_only_and_keeps_report_contract(self):
        self.initialize("report")
        self.progress(lambda value: value.update(schema_version=2, quality_gate={
            "evidence_verified": False, "contradictions_reviewed": False,
            "report_reviewed": False, "visuals_reviewed": False,
        }))
        # Schema 2 uses its historical, fixed headings and frontmatter.
        sys.path.insert(0, str(SKILL / "scripts"))
        import legacy_v2
        spec = "\n".join("## " + heading + "\n\nFixture\n" for heading in legacy_v2.TASK_SPEC_HEADINGS)
        (self.task / "state/task_spec.md").write_text(spec)
        report = f"---\ntitle: Example\ntopic_id: example\nstatus: working\nrevision: 1\nupdated: {DAY}\nevidence_cutoff: null\naudience: Reader\ncanonical_format: markdown\n---\n\n# Example\n\n"
        report += "\n".join("## " + heading + "\n\nFixture\n" for heading in legacy_v2.REPORT_HEADINGS)
        (self.task / "report.md").write_text(report)
        before = {path.relative_to(self.task): path.read_bytes() for path in self.task.rglob("*") if path.is_file()}
        self.validate()
        after = {path.relative_to(self.task): path.read_bytes() for path in self.task.rglob("*") if path.is_file()}
        self.assertEqual(before, after)

    def test_findings_layout_is_detected_without_mutation(self):
        self.initialize()
        (self.task / "state/claims.jsonl").unlink()
        (self.task / "state/findings.jsonl").write_text("legacy fixture\n")
        result = self.run_script(VALIDATE, self.task, "--repo-root", self.repo)
        self.assertEqual(result.returncode, 2)
        self.assertIn("LEGACY", result.stderr)
        self.assertEqual((self.task / "state/findings.jsonl").read_text(), "legacy fixture\n")


if __name__ == "__main__":
    unittest.main()
