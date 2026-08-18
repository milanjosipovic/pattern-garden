// script.js
//
// This is the only file in the project that knows about BOTH the subject
// and the observers. It creates the Terrarium, creates each widget, and
// subscribes them to it. After this point, they never speak to each
// other directly — every future update flows through the Terrarium.
//
// If you wanted to add a fourth widget (say, a "weather forecast" that
// predicts tomorrow's status), you would write a new class in
// observers.js and add exactly one line here: terrarium.subscribe(...).
// Nothing above that line would need to change.

import { Terrarium } from "./terrarium.js";
import { PlantIllustration, HealthGauge, GrowthJournal } from "./observers.js";

const terrarium = new Terrarium();

const plant = new PlantIllustration(
  document.getElementById("plant"),
  document.getElementById("plant-status-label")
);

const gauge = new HealthGauge(
  document.getElementById("gauge"),
  document.getElementById("gauge-fill"),
  document.getElementById("gauge-score"),
  document.getElementById("gauge-label")
);

const journal = new GrowthJournal(document.getElementById("journal-list"));

terrarium.subscribe(plant);
terrarium.subscribe(gauge);
terrarium.subscribe(journal);

// Wire the sliders. These handlers know nothing about plants, gauges,
// or journals — they only know how to talk to the Terrarium. That's the
// boundary the whole pattern is built around.
const sunlightSlider = document.getElementById("sunlight-slider");
const sunlightValue = document.getElementById("sunlight-value");
sunlightSlider.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  sunlightValue.textContent = value;
  terrarium.setSunlight(value);
});

const waterSlider = document.getElementById("water-slider");
const waterValue = document.getElementById("water-value");
waterSlider.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  waterValue.textContent = value;
  terrarium.setWater(value);
});

// Paint the initial state once at startup. The sliders default to
// 50/50, but nothing has "notified" yet at this point — without this,
// the page would load looking blank until the user first touches
// a slider.
plant.update(terrarium);
gauge.update(terrarium);
journal.update(terrarium);
