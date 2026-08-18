// terrarium.js
//
// This file defines the "Subject" side of the Observer pattern.
//
// The Terrarium doesn't know anything about plants, gauges, or journals.
// It only knows two things:
//   1. how to hold its own state (sunlight, water)
//   2. how to keep a list of observers and tell them "something changed"
//
// What counts as "healthy" or "thriving" genuinely belongs here, because
// that's part of the Terrarium's own state — its own truth about itself.
// What does NOT belong here is anything about SVGs, DOM elements, colors,
// or how any of this gets drawn. That's the observers' job, not the
// subject's. The Terrarium should be able to survive being reused in a
// context with zero UI at all (a test file, a CLI tool) without changing
// a single line.

export const IDEAL_SUNLIGHT = 65;
export const IDEAL_WATER = 55;

// The abstract "Observer" role from the GoF pattern.
// In C++ or Java this would be an interface, or a class with a pure
// virtual method. JavaScript doesn't have real interfaces, so this base
// class exists purely to document the contract: anything that wants to
// watch a Terrarium must implement update(subject). It's here mostly for
// clarity — extending it is optional, duck typing would work too — but
// writing it out makes the contract visible instead of implicit.
export class Observer {
  update(_subject) {
    throw new Error("update() must be implemented by concrete observers");
  }
}

export class Terrarium {
  #sunlight = 50;
  #water = 50;
  #observers = [];

  subscribe(observer) {
    this.#observers.push(observer);
  }

  unsubscribe(observer) {
    this.#observers = this.#observers.filter((o) => o !== observer);
  }

  setSunlight(value) {
    this.#sunlight = clamp(value, 0, 100);
    this.#notify();
  }

  setWater(value) {
    this.#water = clamp(value, 0, 100);
    this.#notify();
  }

  // --- Read-only state that observers "pull" from, rather than being
  //     handed a data payload directly.
  //
  //     This is the pull model GoF describes as an alternative to push:
  //     the subject just announces "something changed," and each
  //     observer calls back in to ask for exactly what it needs, when
  //     it needs it. It keeps the Terrarium from having to guess what
  //     every future observer might want.

  get sunlight() {
    return this.#sunlight;
  }

  get water() {
    return this.#water;
  }

  get healthScore() {
    const distanceFromIdealSun = Math.abs(this.#sunlight - IDEAL_SUNLIGHT);
    const distanceFromIdealWater = Math.abs(this.#water - IDEAL_WATER);
    const raw = 100 - (distanceFromIdealSun + distanceFromIdealWater);
    return Math.max(0, Math.round(raw));
  }

  get status() {
    const score = this.healthScore;
    if (score >= 80) return "thriving";
    if (score >= 55) return "okay";
    if (score >= 30) return "stressed";
    return "wilting";
  }

  #notify() {
    for (const observer of this.#observers) {
      observer.update(this);
    }
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
