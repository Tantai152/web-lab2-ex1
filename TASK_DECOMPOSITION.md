# Work Breakdown Structure (WBS) — Lab 2 Exercises

| Task ID | Sub-task | Output file | Contract | Acceptance Criteria | Commit message |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0.1 | WBS definition | TASK_DECOMPOSITION.md | 6-col table; Ex 1–3 only | Committed before any code | docs(spec): add lab 2 exercise WBS |
| 0.2 | Project rules | project-rules.md | Banned: var, innerHTML, inline handlers, keypress/keyCode; CSP; semantic HTML; vanilla only | Matches Lab 2 constraints | docs(spec): add project rules |
| 1.1 | VNode contract + text normalization | src/core/vnode.js | VNode = {type, props:{children, nodeValue?}}; TEXT_ELEMENT = 'TEXT_ELEMENT'; createTextElement(text) returns frozen POJO | createTextElement('hi').props.nodeValue === 'hi' | feat(core): define VNode contract |
| 1.2 | createElement factory | src/core/create-element.js | createElement(type, props, ...children); flat(Infinity); filter null/undefined/false; wrap primitive → TEXT_ELEMENT | createElement('h1',null,'Hi') returns VNode with TEXT_ELEMENT child | feat(core): implement createElement factory |
| 1.3 | renderToDOM recursive | src/core/render-to-dom.js | renderToDOM(vNode) → DOM node; TEXT_ELEMENT → createTextNode; HTML tag → createElement; onX → addEventListener; NO innerHTML | XSS string <img onerror=alert(1)> renders as text, does not execute | feat(core): implement renderToDOM |
| 1.4 | Engine test harness | index.html | Meta CSP; <main id="app">; semantic tags only; ES modules | Zero div-soup; DOM matches VNode tree; querySelector('button') !== null | feat(html): add engine test harness |
| 2.1 | stateStore + cursor engine | src/state/state-store.js | stateStore = []; cursor = 0; setRenderer(fn); resetCursor() | Cursor resets on each render pass | feat(state): implement stateStore and resetCursor engine |
| 2.2 | useState dispatcher | src/state/use-state.js | useState(init) → [value, setState]; function updater; Object.is guard | setCount(c => c+1) works | feat(state): implement reactive useState dispatcher |
| 2.3 | Event delegation hub | src/events/delegation-hub.js | setupEventDelegation(root); ['click','input','keydown']; traverse event.target._vnode.props.onX | 1 listener/event type; zero listeners on button children | feat(events): attach root event delegation listener |
| 2.4 | Reactive Task Manager UI | src/app/task-manager.js | data-task-id, data-filter; aria-pressed, aria-live; filter ALL/ACTIVE/DONE; unique uuid key | Add task; filter works; zero orphan listeners | feat(ui): assemble reactive todo application |
| 2.5 | Mount task manager | index.html (update) | Import task-manager.js; mount into #app | Task manager visible; no console errors | feat(ui): mount task manager |
| 3.1 | DataFeed state machine | src/app/data-feed.js | ViewState = {status:'IDLE'|'LOADING'|'SUCCESS',data|'ERROR',error} | 4 states strictly enforced; no race conditions | feat(ui): implement multi-state data component |
| 3.2 | Skeleton loader CSS | styles/skeleton.css | .skeleton, .skeleton--pulse; @keyframes pulse; prefers-reduced-motion | Pulsing animation; contrast ≥ 4.5:1 | feat(css): add skeleton loader styles |
| 3.3 | Error + retry path | src/app/data-feed.js (update) | data-action="retry"; aria-live="polite" | Retry resets to LOADING | fix(ui): add error retry path |
| 3.4 | Mount data feed | index.html (update) | Import data-feed.js; mount | 4 states testable | feat(ui): mount data feed |
| 4.1 | Grep + Live Server audit | N/A | grep banned: var, innerHTML, onclick=, oninput=, keyCode, keypress | Zero hits; Live Server 5500 clean | chore(verify): final exercise audit |
