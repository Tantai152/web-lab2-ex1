# AI Failure Mode Audit — Exercise 1

Audit of common AI-generated errors when prompting for VNode engine code, with DevTools detection methods and engineering refactors.

---

### Entry 1 — Raw innerHTML in renderToDOM
- **Sample AI Prompt:** "Generate renderToDOM that converts VNode tree to real DOM"
- **AI Generated Code (WRONG):**
  ```js
  function renderToDOM(vNode) {
    const dom = document.createElement(vNode.type);
    dom.innerHTML = vNode.props.children.map(c => c.props.nodeValue).join('');
    return dom;
  }
  ```
- **Risk:** XSS injection — if child contains `'<img src=x onerror=alert(1)>'` it will execute.
- **Detection Method:** DevTools Console → mount VNode with child `'<img onerror=alert(1)>'` → alert popup appears = bug. Check Network tab: unexpected img request.
- **Engineering Refactor:**
  ```js
  function renderToDOM(vNode) {
    if (vNode.type === 'TEXT_ELEMENT') {
      return document.createTextNode(vNode.props.nodeValue);
    }
    const dom = document.createElement(vNode.type);
    vNode.props.children.forEach(child => dom.appendChild(renderToDOM(child)));
    return dom;
  }
  ```
- **Verified Fix:** test suite `root.querySelector('img') === null` → PASS.

---

### Entry 2 — Event Handler String Interpolation
- **Sample AI Prompt:** "Create VNode with onClick handler that logs 'Ping'"
- **AI Generated Code (WRONG):**
  ```js
  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(c => typeof c === 'string' ? { type: 'TEXT_ELEMENT', props: { nodeValue: c } } : c)
      }
    };
  }

  // Usage with string handler
  createElement('button', { onClick: "console.log('Ping')" }, 'Click');
  ```
- **Risk:** Event handler stored as string → never executes or eval vulnerability if parsed. Button click logs nothing.
- **Detection Method:** DevTools Elements tab → inspect button → `onClick` attribute shows string literal `"console.log('Ping')"` instead of function. Console: click button → no output, no error.
- **Engineering Refactor:**
  ```js
  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(c => typeof c === 'string' ? { type: 'TEXT_ELEMENT', props: { nodeValue: c } } : c)
      }
    };
  }

  // Usage with function handler
  createElement('button', { onClick: () => console.log('Ping') }, 'Click');
  ```
- **Verified Fix:** DevTools Console → click button → logs `Ping` ✓. Test assertion `button.onClick` is function → PASS.

---

### Entry 3 — Missing Recursive Children Mounting
- **Sample AI Prompt:** "Render nested VNode tree to DOM"
- **AI Generated Code (WRONG):**
  ```js
  function renderToDOM(vNode) {
    if (typeof vNode === 'string') return document.createTextNode(vNode);
    const dom = document.createElement(vNode.type);
    // Only mounts level 1, ignores nested children
    if (vNode.props?.children?.[0]) {
      dom.appendChild(renderToDOM(vNode.props.children[0]));
    }
    return dom;
  }
  ```
- **Risk:** Only renders first child → nested structure gets flattened. Header with h1, p, button → only h1 appears, p and button missing.
- **Detection Method:** DevTools Elements tab → mount VApp → `<main id="root-view">` only contains `<header>` with 1 child `<h2>` missing `<p>` and `<button>`. Console assertions: `root.querySelector('button')` → null → FAIL.
- **Engineering Refactor:**
  ```js
  function renderToDOM(vNode) {
    if (vNode.type === 'TEXT_ELEMENT') {
      return document.createTextNode(vNode.props.nodeValue);
    }
    const dom = document.createElement(vNode.type);
    vNode.props.children?.forEach(child => dom.appendChild(renderToDOM(child)));
    return dom;
  }
  ```
- **Verified Fix:** DevTools Elements → full tree renders: main → header → h2, p, button ✓. All 3 assertions PASS.