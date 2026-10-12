#!/usr/bin/env python3
"""Create collision-safe research records without overwriting a site page."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import tempfile
from datetime import datetime, timezone
from pathlib import Path


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "research-task"


def output_path(kind: str, value: str | None, repo_root: Path, task: Path) -> str:
    if kind == "site-page" and not value:
        raise ValueError("site-page output requires --output with a repository-relative page path")
    path = Path(value or "report.md")
    if path.is_absolute() or ".." in path.parts:
        raise ValueError("output path must be relative and must not contain '..'")
    if kind == "site-page":
        docs = (repo_root / "src/content/docs").resolve()
        resolved = (repo_root / path).resolve()
        if not docs.is_relative_to(repo_root) or not resolved.is_relative_to(docs):
            raise ValueError("site output must stay inside src/content/docs")
        if path.suffix not in {".md", ".mdx"}:
            raise ValueError("site output must use .md or .mdx")
    else:
        if path.suffix != ".md" or not (task / path).resolve().is_relative_to(task):
            raise ValueError("report output must be a Markdown file inside the task directory")
        if path.parts[0] in {"state", "visuals", "logs"}:
            raise ValueError("report output must not replace a research record or asset")
    return path.as_posix()


def build_workspace(root: Path, *, title: str, inquiry: str, scope: str,
                    audience: str, topic_id: str, kind: str, output: str,
                    created_at: str) -> None:
    state = root / "state"
    state.mkdir()
    canonical = f"Repository page `{output}`" if kind == "site-page" else f"Workspace report `{output}`"
    task_spec = f"""# {title}

## Inquiry

{inquiry}

## Intended reader and use

{audience}

Learning or decision goal: To be defined.

## Scope and time boundary

{scope}

Evidence boundary: To be defined.

## Exclusions

To be defined.

## Deliverables

- {canonical} is the canonical narrative.
- Source, claim, run and visual records support the narrative.
- Counterevidence, uncertainty and actual review results remain explicit.

## Output contract

- Kind: {kind}
- Canonical path: {output}
- Reading depth: To be defined.
- Structure: Chosen for the inquiry, not a fixed report outline.
- Citation style: Claim-local footnotes for site pages.
- Evidence cutoff: Not established.
- Refresh expectation: To be defined.
- Distribution and privacy boundary: Public-safe repository and output.

## Visual contract

Use a visual where it materially clarifies understanding. No figure quota.
Keep important text equivalents, evidence, attribution and reuse records.

## Research map

- Evidence dimensions and resolving sources: To be defined.
- Skeptical direction: To be defined.

## Budget and checkpoints

Set a budget proportional to scope, uncertainty, consequence and freshness.

## Success criteria

To be defined before broad research. Site work includes rendered and export checks.

## User-supplied facts

None recorded yet.

## Assumptions and decisions

Schema 3 initialized at {created_at}. No site page was created or overwritten.
"""
    pending = {"status": "pending", "method": None, "checked_at": None}
    progress = {
        "schema_version": 3, "topic_id": topic_id, "status": "initialized",
        "coverage": {}, "open_questions": [], "recommended_next_direction": None,
        "last_seen": created_at,
        "output": {"kind": kind, "path": output, "status": "working", "revision": 1,
                   "updated": created_at[:10], "evidence_cutoff": None, "audience": audience},
        "quality_gate": {"evidence_verified": False, "contradictions_reviewed": False,
                         "output_reviewed": False, "visuals_reviewed": False},
        "delivery_checks": {name: dict(pending) for name in ("validation", "rendering", "exports")},
    }
    (state / "task_spec.md").write_text(task_spec, encoding="utf-8")
    (state / "progress.json").write_text(json.dumps(progress, indent=2) + "\n", encoding="utf-8")
    for filename in ("sources.jsonl", "claims.jsonl", "runs.jsonl", "visuals.jsonl"):
        (state / filename).write_text("", encoding="utf-8")
    if kind == "report":
        target = root / output
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(f"---\ntitle: {json.dumps(title)}\n---\n\n# {title}\n\nResearch in progress.\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("task_dir", type=Path)
    parser.add_argument("--title", required=True)
    parser.add_argument("--inquiry", "--question", dest="inquiry", required=True)
    parser.add_argument("--scope", default="To be defined before broad research.")
    parser.add_argument("--audience", default="To be defined in the task specification.")
    parser.add_argument("--topic-id")
    parser.add_argument("--kind", choices=("site-page", "report"), default="site-page")
    parser.add_argument("--output")
    parser.add_argument("--repo-root", type=Path, default=Path(__file__).resolve().parents[4])
    args = parser.parse_args()
    if not args.title.strip() or "\n" in args.title or "\r" in args.title:
        parser.error("title must be nonempty single-line text")
    if not args.inquiry.strip() or not args.audience.strip():
        parser.error("inquiry and audience must be nonempty text")
    topic_id = args.topic_id or slugify(args.title)
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", topic_id):
        parser.error("topic ID must use lowercase letters, digits and single hyphens")
    task = args.task_dir.expanduser().absolute()
    if task.exists() or task.is_symlink():
        parser.error(f"refusing to overwrite existing path: {task}")
    task = task.resolve()
    repo_root = args.repo_root.expanduser().resolve()
    try:
        output = output_path(args.kind, args.output, repo_root, task)
    except ValueError as exc:
        parser.error(str(exc))
    task.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix=f".{task.name}.init-", dir=task.parent))
    reserved = False
    try:
        build_workspace(staging, title=args.title, inquiry=args.inquiry, scope=args.scope,
                        audience=args.audience, topic_id=topic_id, kind=args.kind,
                        output=output, created_at=utc_now())
        task.mkdir()  # Atomic exclusive reservation, including an empty-directory collision.
        reserved = True
        for child in staging.iterdir():
            child.rename(task / child.name)
        staging.rmdir()
    except Exception:
        shutil.rmtree(staging, ignore_errors=True)
        if reserved:
            try:
                task.rmdir()  # Remove only our empty reservation; preserve partial records.
            except OSError:
                pass
        raise
    print(f"Initialized research schema 3: {task}")
    print(f"Canonical {args.kind}: {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
