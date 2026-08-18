# GoF Patterns

A curated collection of small JavaScript, HTML, and CSS examples that explain classic Gang of Four design patterns in a beginner-friendly, visual, and educational way.

This repository is designed as a growing pattern library. Each example is intentionally small, self-contained, and easy to inspect in isolation.

## Why this repo exists

The goal is to teach design patterns by doing, not by reading large theory-heavy codebases. Each folder focuses on one pattern and aims to be understandable in a single sitting.

The examples are meant to feel approachable for:

- beginner developers
- people revisiting front-end concepts
- developers who want to understand patterns through small, concrete demos

---

## Repository structure

```text
GoF-Patterns/
├── README.md
├── .github/
├── 01-observer/
├── 02-strategy/
├── 03-factory/
├── 04-decorator/
├── 05-module-singleton/
├── docs/
│   ├── index.html
│   ├── 01-observer/
│   ├── 02-strategy/
│   └── ...
└── ...
```

This structure supports both local development and GitHub Pages publishing.

---

## Included examples

| # | Pattern | Folder | Status |
|---|---------|--------|--------|
| 01 | Observer | [01-observer](./01-observer/) | Built |
| 02 | Strategy | [02-strategy](./02-strategy/) | Planned |
| 03 | Factory | [03-factory](./03-factory/) | Planned |
| 04 | Decorator | [04-decorator](./04-decorator/) | Planned |
| 05 | Module / Singleton | [05-module-singleton](./05-module-singleton/) | Planned |

---

## How each pattern folder is organized

```text
NN-pattern-name/
├── index.html
├── style.css
├── script.js
├── notes.md
├── README.md (optional)
├── assets/ (optional)
└── related files
```

Each folder is intentionally focused on one pattern and keeps the implementation small and easy to understand.

---

## Local development

These demos use ES modules, so opening the file directly in a browser may not work correctly.

Use one of these options:

- VS Code Live Server
- Python simple server
- npx serve

Example:

```bash
cd 01-observer
npx serve
```

Then open the local preview URL in the browser.

---

## GitHub Pages

This repo is set up to support a small static-site portfolio of pattern demos.

The published site lives under the docs folder and can later be exposed through GitHub Pages using the repository settings.

A typical Pages URL would look like this:

```text
https://your-username.github.io/GoF-Patterns/
```

Each pattern example can also have a subpage such as:

```text
https://your-username.github.io/GoF-Patterns/01-observer/
```

This makes the repo scalable as more patterns are added.

---

## Learning approach

Each example is meant to answer a few simple questions:

- What is the pattern?
- What problem does it solve?
- How is it implemented in plain JavaScript?
- What would a real UI or app look like with it?

The educational focus stays above framework complexity and production-level abstraction.

---

## GitHub Pages setup checklist

Use the following checklist when publishing the repository:

1. Create the GitHub repository and name it `GoF-Patterns`.
2. Push the full repository to GitHub.
3. Open the repository in GitHub and go to Settings → Pages.
4. In the Pages section, select the branch and folder to publish.
5. For a static site library, the usual choice is the `docs` folder.
6. Make sure the landing page exists at `docs/index.html`.
7. Check that each example is available under its numbered folder path, for example:
   - `/01-observer/`
   - `/02-strategy/`
8. Save the Pages settings and wait for GitHub to build the site.
9. Confirm the live URL works, for example:
   ```text
   https://your-username.github.io/GoF-Patterns/
   ```
10. Add more folders later in numbered order as new patterns are added.

This setup is perfect for a static educational repo that grows over time.

---

## Sources

- Gamma, Helm, Johnson, Vlissides — Design Patterns: Elements of Reusable Object-Oriented Software
- Christopher Alexander — The Timeless Way of Building

---

## Project direction

This repo is intended to grow over time. Future work may include:

- more patterns
- richer interactive examples
- better summaries and guided explanations
- a nicer landing page for the GitHub Pages site

The structure is intentionally simple so it stays easy to maintain while teaching pattern ideas clearly.

---

## Ready to publish

This repo is now structured so it can live comfortably as a public GitHub learning project and be published as a static site through GitHub Pages.

The overall idea is simple:

- keep the source examples in numbered pattern folders
- publish a clean landing page from `docs/`
- add future examples without rebasing the project structure
