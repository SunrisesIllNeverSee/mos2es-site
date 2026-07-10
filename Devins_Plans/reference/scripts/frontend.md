---
type: Reference
title: Frontend JS/JSX — deck-stage, tweaks-panel, tweaks
description: Reference doc for the frontend JavaScript files (deck-stage.js, tweaks-panel.jsx, tweaks.jsx). What they do, dependencies, how they're loaded.
tags: [mos2es, reference, scripts, frontend, deck]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:01 UTC
---

# Frontend JS/JSX — deck-stage, tweaks-panel, tweaks

## deck-stage.js (root)

**What it does:** Custom web component (`<deck-stage>`) for HTML slide decks with keyboard
navigation, auto-scaling, thumbnail rail, speaker notes sync, and print support.

**Dependencies:** None (vanilla JavaScript, no external libraries).

**How it's loaded:** `<script src="deck-stage.js"></script>` in `deck.html` (line 1042).
Instantiated via the `<deck-stage>` HTML tag in the same file.

**Key functions/components:**

- `DeckStage` class (extends `HTMLElement`)
- `connectedCallback()` — initializes component, sets up event listeners
- `_render()` — builds shadow DOM structure (stage, canvas, overlay, rail, menu)
- `_advance(delta, reason)` — slide navigation
- `_onKey()` — keyboard nav (←/→, PgUp/PgDn, Space, Home/End, R for reset)
- `_onTap()` — touch nav (tap left/right half of stage)
- `_enableRail()` — thumbnail rail with drag-to-reorder, skip, delete
- `_fit()` — auto-scaling canvas to viewport with letterboxing
- `_loadNotes()` — reads speaker notes from `<script type="application/json" id="speaker-notes">`
- `_snapshotAuthorCss()` — captures document stylesheets for thumbnails
- `_onMessage()` — receives `postMessage` for presenter view sync
- Context menu (Skip/Move up/Move down/Delete) + delete confirmation dialog

**External dependencies:** None.

---

## tweaks-panel.jsx (root)

**What it does:** Reusable React component library for a floating tweaks panel with form
controls (sliders, toggles, radio buttons, color pickers, etc.) for live design adjustments.

**Dependencies:** React (global `React`), ReactDOM (global `ReactDOM`), Babel (for JSX
transpilation).

**How it's loaded:** Not directly loaded in any HTML file in this repo. Library file meant
to be included via Babel transpilation in pages that need tweak controls. Components are
exposed to the global `window` object at lines 526–530.

**Key functions/components:**

- `useTweaks(defaults)` — React hook for tweak state management with persistence via postMessage
- `TweaksPanel({ title, children })` — floating draggable panel shell
- `TweakSection({ label, children })` — section header
- `TweakRow({ label, value, children, inline })` — layout wrapper
- `TweakSlider({ label, value, min, max, step, unit, onChange })` — range slider
- `TweakToggle({ label, value, onChange })` — boolean toggle switch
- `TweakRadio({ label, value, options, onChange })` — segmented radio (falls back to select for long labels)
- `TweakSelect({ label, value, options, onChange })` — dropdown select
- `TweakText({ label, value, placeholder, onChange })` — text input
- `TweakNumber({ label, value, min, max, step, unit, onChange })` — number input with drag-scrub
- `TweakColor({ label, value, options, onChange })` — color/palette chip picker
- `TweakButton({ label, onClick, secondary })` — button
- `__twkIsLight(hex)` — luminance helper for checkmark contrast

**External dependencies:** React, ReactDOM, Babel. No specific version requirements documented.

---

## tweaks.jsx (root)

**What it does:** MO§ES-specific tweak controls implementation that applies palette,
accent, and density settings to the `<deck-stage>` element via data-attributes and CSS
variables.

**Dependencies:** React, ReactDOM, `tweaks-panel.jsx` (imports `useTweaks`, `TweaksPanel`,
`TweakSection`, `TweakRadio`, `TweakColor`).

**How it's loaded:** Not directly loaded in any HTML file. Babel-transpiled React app that
mounts to a dynamically created div. Would need
`<script type="text/babel" src="tweaks.jsx"></script>` with React/ReactDOM/Babel present.

**Key functions/components:**

- `TWEAK_DEFAULTS` — default tweak values (palette: "bone", density: "normal", accent: "#a87c1e", signalGlyph: true)
- `applyTweaks(t)` — applies tweaks to `<deck-stage>` (sets data-palette, data-density, --signal CSS var)
- `App()` — main React component using `useTweaks`, renders TweaksPanel with palette/accent/density controls
- Mount code (lines 55–57) — creates div, appends to body, renders App via `ReactDOM.createRoot`

**External dependencies:** React, ReactDOM, Babel.

---

## Notes

- `deck-stage.js` is the only frontend JS file actively loaded by an HTML page.
- `tweaks-panel.jsx` and `tweaks.jsx` are library/WIP files not yet wired into any page.
  They would require Babel + React/ReactDOM to be added to `deck.html` (or another page)
  before they can run.
