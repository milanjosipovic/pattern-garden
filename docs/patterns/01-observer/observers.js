// observers.js
//
// Three "ConcreteObserver" classes. Each one subscribes to a Terrarium
// and decides, entirely on its own, what to do when notified. The
// Terrarium never sees this file — it just calls update(this) on
// whatever's sitting in its observer list.
//
// Notice none of these classes know about each other. You could delete
// GrowthJournal entirely and PlantIllustration and HealthGauge wouldn't
// need a single line changed. That's the whole point of the pattern:
// removing or adding a watcher never touches the thing being watched,
// or any of the other watchers.

import { Observer } from "./terrarium.js";

const STATUS_META = {
  thriving: {
    label: "Thriving",
    journal: "Blooming — sunlight and water are well balanced.",
  },
  okay: {
    label: "Okay",
    journal: "Settling in — close, but not quite balanced yet.",
  },
  stressed: {
    label: "Stressed",
    journal: "Showing stress — sunlight or water has drifted too far.",
  },
  wilting: {
    label: "Wilting",
    journal: "Wilting — conditions need real correction.",
  },
};

export class PlantIllustration extends Observer {
  constructor(containerEl, labelEl) {
    super();
    this.containerEl = containerEl;
    this.labelEl = labelEl;
  }

  update(terrarium) {
    const status = terrarium.status;

    // A single data attribute drives all the visual branching. CSS reads
    // [data-status="..."] and decides what a wilting plant looks like —
    // this class doesn't know or care what color a wilted leaf is.
    this.containerEl.dataset.status = status;

    // These two are continuous values (not just the four discrete
    // statuses), used for a subtle glow/mist effect. Same pull model,
    // different granularity — this observer is pulling more out of the
    // subject than GrowthJournal does, because it needs more.
    this.containerEl.style.setProperty("--sun-level", terrarium.sunlight / 100);
    this.containerEl.style.setProperty("--water-level", terrarium.water / 100);

    this.labelEl.textContent = STATUS_META[status].label;
  }
}

export class HealthGauge extends Observer {
  constructor(containerEl, fillEl, scoreEl, labelEl) {
    super();
    this.containerEl = containerEl;
    this.fillEl = fillEl;
    this.scoreEl = scoreEl;
    this.labelEl = labelEl;
  }

  update(terrarium) {
    const score = terrarium.healthScore;
    const status = terrarium.status;

    this.containerEl.dataset.status = status;
    this.fillEl.style.width = `${score}%`;
    this.scoreEl.textContent = score;
    this.labelEl.textContent = STATUS_META[status].label;
  }
}

export class GrowthJournal extends Observer {
  #lastStatus = null;

  constructor(listEl) {
    super();
    this.listEl = listEl;
  }

  update(terrarium) {
    const status = terrarium.status;

    // The Terrarium notifies on every single slider tick, but the
    // journal doesn't want an entry every time — only when the status
    // actually crosses into something new. So it pulls the state,
    // compares it against what it remembers from last time, and decides
    // for itself whether this particular notification is worth acting
    // on. The subject has no idea this filtering is happening.
    if (status === this.#lastStatus) return;
    this.#lastStatus = status;

    const entry = document.createElement("li");
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    entry.innerHTML = `<span class="journal-text">${STATUS_META[status].journal}</span><time>${time}</time>`;
    this.listEl.prepend(entry);
  }
}
