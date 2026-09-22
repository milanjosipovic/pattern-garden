# 🌿 Pattern Garden

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Vanilla JS](https://img.shields.io/badge/Code-Vanilla_JS_ES6-yellow.svg)
![Web Components](https://img.shields.io/badge/Standards-Web_Components-ff69b4.svg)
![IndieWeb](https://img.shields.io/badge/IndieWeb-POSSE-informational.svg)

> A living library of design patterns, written as small, readable examples and thoughtful notes rather than a heavy production codebase.

This repository is a digital garden: a place to explore pattern ideas, revisit them slowly, and connect software design with architectural thinking, observation, and everyday experience.

---

## Why this project exists

The goal is simple: teach classic GoF patterns in a way that is approachable, visual, and easy to return to.

Instead of a theory-heavy archive, each example stays intentionally small and focused. The aim is to make the pattern understandable in one sitting, while still leaving room for reflection and deeper learning.

This project is meant for:

- beginners learning object-oriented design
- developers revisiting core concepts
- curious learners who like pattern thinking in a more human, grounded way

---

## Repository map

gof-patterns/
├── README.md
├── .github/
├── docs/
│   ├── index.html
│   ├── notes/
│   └── patterns/
│       ├── 01-observer/
│       └── 02-strategy/
├── notebooks/
└── scripts/

The structure supports both local learning and GitHub Pages publishing without forcing the repository into a rigid app layout.

---

## Included pattern work & Live Demos

| # | Pattern | Source Folder | Live Demo | Status |
|---|---------|---------------|-----------|--------|
| 01 | Observer | [docs/patterns/01-observer](./docs/patterns/01-observer/) | [View Demo](https://milanjosipovic.github.io/gof-patterns/patterns/01-observer/index.html) | Built |
| 02 | Strategy | [docs/patterns/02-strategy](./docs/patterns/02-strategy/) | [View Demo](https://milanjosipovic.github.io/gof-patterns/patterns/02-strategy/index.html) | Planned |
| 03 | Factory | Planned | — | Future |
| 04 | Decorator | Planned | — | Future |
| 05 | Singleton / Module | Planned | — | Future |

---

## Learning shape

Each example is organized around a few simple questions:

- What is the pattern?
- What problem does it solve?
- How does it look in plain JavaScript?
- What makes it useful in real interfaces or systems?

The educational focus stays on clarity over abstraction. There is no need to turn the examples into a large framework or production app.

---

## Notes and journal

This project also includes a reflective layer:

- [docs/notes/](./docs/notes/)
- [notebooks/index.md](./notebooks/index.md)

These notes help connect code patterns to lived experience, architecture, and observation.

---

## Local development

The demos are plain static HTML/CSS/JS examples, so the easiest local workflow is a small local server.

Example:

cd /path/to/gof-patterns
python3 -m http.server 8000

Then open:

http://localhost:8000/docs/index.html

---

## GitHub Pages

The project is published as a static site under GitHub Pages.

Central Hub:
- [milanjosipovic.github.io/gof-patterns](https://milanjosipovic.github.io/gof-patterns/index.html)

Individual Examples:
- [Observer Pattern Demo](https://milanjosipovic.github.io/gof-patterns/patterns/01-observer/index.html)

---

## Project direction

This repo is meant to grow as a public learning space and a small pattern archive.

Future work may include:

- more design pattern examples
- richer interactive demonstrations
- cleaner navigation between notes and demos
- deeper architectural and philosophical reflections

The aim is not complexity for its own sake. The aim is clarity, curiosity, and a useful collection of patterns that remain easy to revisit.

---

## Sources

- Gamma, Helm, Johnson, Vlissides — *Design Patterns: Elements of Reusable Object-Oriented Software*
- Christopher Alexander — *The Timeless Way of Building*
- Christopher Alexander — *A Pattern Language*

---

## A note on the shape of the project

This repository is not a framework app and it does not try to be one.

It is intentionally more like a digital garden than a product site: a small, well-tended collection of ideas, experiments, and examples that keep growing in their own time.

---

## 💚 Mindset & Community Note

> *Building in public is part of a journey toward sustainable learning and mental health awareness. Supported by advocacy for OCD communities ([IOCDF](https://iocdf.org/)).*

---

## 📄 License

This repository is open-source software licensed under the [MIT License](LICENSE).