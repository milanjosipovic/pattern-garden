# Terrarium JavaScript & CSS Refresher

> A friendly companion for getting back into front-end work with confidence.

This is the practical, hands-on companion to the Observer pattern notes. It is designed for a web developer who has not coded in a while and wants a clear way to refresh JavaScript and CSS concepts while working on this terrarium example.

---

## 1) Start with the mental model

A web page is built from:

- HTML: structure
- CSS: styling
- JavaScript: behavior and state

In this project, the UI is not just static markup. It is dynamic.

The terrarium has shared state:

- sunlight level
- water level
- health score
- status such as thriving, okay, stressed, or wilting

When state changes, different parts of the UI update.

That is the core of front-end interactivity.

---

## 2) JavaScript basics that matter here

### Variables

JavaScript variables store values.

```js
const sunlight = 50;
const water = 50;
```

- `const` means the variable should not be reassigned
- `let` is used when values may change

In this project, state is stored in a class rather than in loose global variables, which keeps things organized.

### Functions

Functions let you reuse logic.

```js
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
```

This is important because the terrarium clamps values to a valid range before updating state.

### Events

Events are how the browser tells you that the user interacted with the page.

```js
sunlightSlider.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  terrarium.setSunlight(value);
});
```

This means:

- the user changed a range input
- the browser triggers an `input` event
- the handler reads the new value
- code updates state

This is the most common pattern in front-end JavaScript.

---

## 3) Classes and objects

JavaScript classes are blueprints for objects.

```js
export class Terrarium {
  #sunlight = 50;
  #water = 50;

  setSunlight(value) {
    this.#sunlight = clamp(value, 0, 100);
    this.#notify();
  }
}
```

This is a useful mental model:

- class = design template
- object = actual instance in memory
- instance = the real thing your app works with

In this project, the Terrarium is the central object that owns the data.

---

## 4) Private fields: `#property`

This project uses `#sunlight` and `#water`.

```js
#sunlight = 50;
```

The `#` means the field is private to the class.

Why this matters:

- it protects internal state
- it reduces accidental mutation from outside
- it enforces a cleaner interface

If the rest of the app needs access, the class exposes dedicated methods or getters instead of letting anything edit the internal fields directly.

This is a good habit to revisit when you work on real apps.

---

## 5) Getters and computed state

The Terrarium calculates values rather than storing every possible derived result.

```js
get healthScore() {
  const distanceFromIdealSun = Math.abs(this.#sunlight - IDEAL_SUNLIGHT);
  const distanceFromIdealWater = Math.abs(this.#water - IDEAL_WATER);
  const raw = 100 - (distanceFromIdealSun + distanceFromIdealWater);
  return Math.max(0, Math.round(raw));
}
```

This is an excellent example of deriving state from existing values.

The code does not duplicate data everywhere. Instead, it computes the result when needed.

This is often a better pattern than storing redundant values and risking inconsistency.

---

## 6) `data-*` attributes and CSS selectors

The HTML uses custom attributes:

```html
<div class="plant" id="plant" data-status="thriving"></div>
```

This is a very common front-end practice. It lets JavaScript attach a meaningful state value to an element and lets CSS react to it.

```css
[data-status="thriving"] .leaf {
  fill: var(--leaf-thriving);
  opacity: 1;
}
```

This means:

- the element has a state value of `thriving`
- CSS looks for that attribute
- it applies the correct visual style

This is a clean way to map JavaScript state to DOM appearance.

---

## 7) CSS variables and design tokens

The stylesheet uses CSS custom properties:

```css
:root {
  --leaf-thriving: #4f9d6e;
  --leaf-okay: #6c9c66;
  --leaf-stressed: #a68a4a;
  --leaf-wilting: #7c6a4d;
}
```

These are like design tokens. Instead of hardcoding colors repeatedly, the code defines a consistent palette and reuses it.

```css
[data-status="thriving"] .leaf {
  fill: var(--leaf-thriving);
}
```

This is a great habit for maintainable CSS.

---

## 8) CSS selectors are your UI logic

CSS is not only decoration. It is also a way to express state-driven UI.

When a status changes, the DOM attribute changes, and CSS selectors update the visual representation automatically.

This is a strong pattern in front-end work:

- JavaScript updates state
- DOM reflects the state
- CSS decides how to look based on that state

This is simpler than writing a bunch of imperative style updates everywhere.

---

## 9) DOM manipulation in plain JavaScript

The observer classes work directly with DOM elements:

```js
this.containerEl.dataset.status = status;
this.fillEl.style.width = `${score}%`;
this.labelEl.textContent = STATUS_META[status].label;
```

This is very typical browser JavaScript.

A few important ideas to remember:

- `element.dataset` lets you read or write `data-*` attributes
- `.style` lets you change CSS styles directly
- `.textContent` lets you replace text content
- `.innerHTML` is powerful but must be used carefully

For beginner-friendly front-end work, this is the core skill set.

---

## 10) The Observer pattern in JavaScript terms

The pattern is not complicated in concept:

- one object owns the shared state
- others subscribe to it
- when state changes, the subject tells them

In this project:

```js
terrarium.subscribe(plant);
terrarium.subscribe(gauge);
terrarium.subscribe(journal);
```

This means the plant, gauge, and journal are all listening for updates.

The Terrarium then does:

```js
#notify() {
  for (const observer of this.#observers) {
    observer.update(this);
  }
}
```

This is a simple and educational implementation of the Observer pattern.

---

## 11) The practical front-end lesson

This terrarium example is very good for revisiting front-end fundamentals because it combines several real patterns in one small app:

- state management
- event handling
- DOM updates
- CSS styling based on state
- modular classes
- reactive UI patterns

This is the same kind of thinking used in modern front-end apps, just in a simpler form.

---

## 12) A friendly refresher checklist

When returning to web development, these are the questions worth asking:

- What is the current state of the app?
- Which part owns that state?
- Who updates it?
- Which UI elements depend on it?
- How does the DOM reflect state changes?
- How does CSS decide what it looks like?
- What event triggers the update?

If you can answer those, you are already thinking like a front-end developer again.

---

## 13) Recommended next exercises

A few small exercises that build confidence:

1. Change the status colors and see how the CSS responds.
2. Add a new observer like a temperature meter.
3. Add a new state value like `humidity`.
4. Try adding a button that resets the terrarium to default values.
5. Refactor one part of the logic into a smaller helper function.

These are small but meaningful ways to rebuild confidence.

---

## 14) One final thought

You do not need to memorize every pattern to be productive again. What matters most is building a clear mental model:

- state lives somewhere meaningful
- inputs trigger changes
- UI reacts to those changes
- CSS makes the state visible

That is the foundation of modern front-end development.

---

## 15) Quick recap

### JavaScript concepts used here

- classes
- private fields
- getters
- methods
- events
- DOM updates
- arrays and iteration

### CSS concepts used here

- custom properties
- selectors with attribute matching
- state-driven styling
- transitions and animations
- responsive layout

This project is a great way to refresh both skill sets in one place.
