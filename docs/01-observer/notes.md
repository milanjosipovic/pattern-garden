# Observer

## Context

A recurring situation: one thing changes over time, and several other
things in the same setting need to stay in sync with it — but the set of
things that care isn't fixed in advance, and they have no business
knowing about each other.

In our case: a terrarium's sunlight and water levels change. A plant
illustration, a health gauge, and a growth journal all need to reflect
that change, each in its own way, each at its own pace.

## Problem

If the terrarium directly called `updateBadge()`, `updateGauge()`,
`updateJournal()` every time its state changed, it would have to know
about every single thing that might ever care about it. Add a fourth
widget later — say, a weather forecast — and you'd have to go back and
edit the terrarium itself to wire it in. The thing that changes
shouldn't need to know who's watching.

## Forces

- The subject (the terrarium) shouldn't need to know what its watchers
  do with a change, or how many of them exist.
- Each watcher needs to react in its *own* way, on its *own* schedule —
  the plant redraws every tick, the journal only logs on a real status
  change.
- Watchers must not depend on knowing about each other. Delete one, and
  none of the others should even notice.

These forces pull against the naive, most-obvious solution: the subject
calling each watcher's specific update function by name. That satisfies
the second force but violates the first and third — it wires the
subject tightly to a fixed, known list of dependents.

## Solution

Introduce a **Subject** that holds nothing but a list of **Observers**
and a way to notify them. Each Observer implements a single method
(`update`) and decides for itself what to do when called. The Subject
never inspects what an Observer does with that call.

### GoF structure, mapped to this project

- **Subject** → `Terrarium` (`terrarium.js`) — holds `sunlight` and
  `water`, keeps the list of observers, knows how to `subscribe`,
  `unsubscribe`, and notify. Never knows what an observer does with a
  notification.
- **Observer** → the abstract `Observer` base class (`terrarium.js`) —
  documents the contract every watcher must honor: `update(subject)`.
- **ConcreteSubject** → the actual `Terrarium` instance created in
  `script.js`, holding real state.
- **ConcreteObserver** → `PlantIllustration`, `HealthGauge`,
  `GrowthJournal` (`observers.js`) — three independent interpretations
  of the same notification.

One design fork worth naming explicitly: **push vs. pull**. The subject
could push the changed data directly into each observer's `update()`
call, or it can just say "something changed" and let each observer pull
whatever it needs. This project uses **pull** — `Terrarium` exposes
`sunlight`, `water`, `healthScore`, and `status` as getters, and each
observer reads only what it cares about. This keeps the subject from
having to guess in advance what future observers might want.

## In this project

- `terrarium.js` — the Subject and the Observer base class
- `observers.js` — the three ConcreteObservers
- `script.js` — the only file that knows about *both* sides; it's where
  subscription actually happens

The most interesting line in the project is in `GrowthJournal.update()`:
it compares the incoming status against what it remembered last time,
and does nothing if nothing meaningfully changed. The Terrarium
notifies on every slider tick — dozens of times a second while
dragging — but the journal decides for itself that most of those
notifications aren't worth acting on. The subject has no idea this
filtering is happening. That's the pattern working as intended: the
observer owns its own reaction, completely.

## Alexander connection

Alexander gives a formal definition of a pattern that maps almost
exactly onto what GoF later did with software:

> "Every pattern we define must be formulated in the form of a rule
> which establishes a relationship between a context, a system of
> forces which arises in that context, and a configuration which allows
> these forces to resolve themselves in that context."
>
> **Context → System of forces → Configuration**
>
> — *The Timeless Way of Building*, p. 253

That's the exact shape of this note. But the deeper connection to
*this* pattern specifically — many independent things, none aware of
each other, all staying true to one shared reality — is in a passage
about ecosystems:

> "The quality without a name occurs, not when an isolated pattern
> occurs, but when an entire system of patterns, interdependent, at
> many levels, is all stable and alive.
>
> We may see the sand ripples anywhere where we choose to put loose
> sand under the wind. But when the wind blows across the sea, over the
> inland marshes, and the sand ripples support the dunes between the
> two, and the sandpiper walks out, the sand fleas hop, the shifting of
> the dunes is held in check by grasses which maintain themselves and
> the sandpiper — then we have a portion of the world, alive at many
> levels at once."
>
> — *The Timeless Way of Building*, p. 131

The wind doesn't call the sandpiper. The dunes don't call the grasses.
Each one is independently answering to the same shared reality — wind,
sand, tide — in its own way, on its own terms. That's not a metaphor
stretched to fit; it's structurally the same shape as this project:
the plant, the gauge, and the journal don't call each other either. They
each answer to the terrarium, independently, and the *system* is what
reads as alive — not any single piece of it.

## Open question

Alexander's ecosystem is alive because the sandpiper, the grasses, and
the dunes also feed back into each other — the dunes shape where the
grass grows, the grass holds the dunes in place. Our observers don't
feed back into the subject at all; they're purely downstream. Is a
one-directional Observer graph actually "alive" in Alexander's sense,
or is it a paler, more mechanical cousin of what he's describing — and
if so, what would it take to close that loop?
