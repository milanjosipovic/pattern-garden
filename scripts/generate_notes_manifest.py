from pathlib import Path
import json

repo_root = Path(__file__).resolve().parents[1]
notes_dir = repo_root / "docs" / "notes"


def humanize(name: str) -> str:
    clean = name.replace("_", " ").replace("-", " ")
    return " ".join(part.capitalize() for part in clean.split())


def folder_group(rel_path: Path) -> str:
    if rel_path == Path("README.md"):
        return "Project"

    if rel_path.parts[0] == ".github":
        return "Project / GitHub"

    if rel_path.parts[0] == "docs":
        if len(rel_path.parts) > 1 and rel_path.parts[1] == "01-observer":
            return "Docs / Observer"
        if len(rel_path.parts) > 1 and rel_path.parts[1] == "02-strategy":
            return "Docs / Strategy"
        return "Docs"

    if rel_path.parts[0] == "notebooks":
        if len(rel_path.parts) > 1 and rel_path.parts[1] == "pattern-journal":
            if len(rel_path.parts) > 2:
                if rel_path.parts[2] == "town-square":
                    return "Notebooks / Pattern Journal / Town Square"
                if rel_path.parts[2] == "park":
                    return "Notebooks / Pattern Journal / Park"
                return "Notebooks / Pattern Journal"
            return "Notebooks / Pattern Journal"
        return "Notebooks"

    return "Project"


def entry_label(rel_path: Path) -> str:
    if rel_path == Path("README.md"):
        return "Project README"
    return humanize(rel_path.stem)


def relative_path_from_notes(path: Path) -> str:
    rel_to_repo = path.relative_to(repo_root)
    parts = rel_to_repo.parts

    if parts[0] == "docs":
        return (Path("..") / Path(*parts[1:])).as_posix()
    return (Path("../..") / Path(*parts)).as_posix()


def collect_markdown_files() -> list[Path]:
    files = []
    seen = set()

    for path in sorted(repo_root.rglob("*.md")):
        rel = path.relative_to(repo_root)
        rel_posix = rel.as_posix()

        if not path.is_file():
            continue

        if ".git" in path.parts or "docs/notes" in rel_posix:
            continue

        if any(part.startswith(".") for part in rel.parts):
            continue

        candidate = path.name
        root_match = repo_root / "01-observer" / candidate
        if rel_posix.startswith("docs/01-observer/") and root_match.exists():
            continue

        key = rel_posix
        if key in seen:
            continue
        seen.add(key)
        files.append(path)

    return files


entries = []
for path in collect_markdown_files():
    rel_to_repo = path.relative_to(repo_root)
    entries.append({
        "group": folder_group(rel_to_repo),
        "label": entry_label(rel_to_repo),
        "path": relative_path_from_notes(path),
    })

manifest = {"entries": entries}
notes_dir.mkdir(parents=True, exist_ok=True)
manifest_path = notes_dir / "manifest.json"
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(f"Generated {manifest_path} with {len(entries)} markdown entries.")
