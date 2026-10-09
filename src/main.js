/**
 * Entry point and test suite for the Mini-React VNode & Mounting Engine.
 */
import { createElement } from './core/create-element.js';
import { renderToDOM } from './core/render-to-dom.js';

const VApp = createElement('main',
  { id: 'root-view', role: 'main' },
  createElement('header', { className: 'hero' },
    createElement('h1', null, 'Mini React Engine'),
    createElement('p', null, '<img onerror=alert(1)> Safe Text'),
    createElement('button', { onClick: () => console.log('Ping') }, 'Click')
  )
);

const root = document.getElementById('app');
root.replaceChildren(renderToDOM(VApp));

console.assert(root.querySelector('button') !== null, 'Mount Failed');
console.assert(root.querySelector('img') === null, 'XSS FAIL: img element created!');
console.assert(root.querySelector('p').textContent === '<img onerror=alert(1)> Safe Text', 'XSS FAIL: text mutated');

const status = document.getElementById('status');
if (status) {
  const pass = root.querySelector('button') !== null
    && root.querySelector('img') === null
    && root.querySelector('p').textContent === '<img onerror=alert(1)> Safe Text';
  status.textContent = pass ? '✓ All assertions passed' : '✗ Check console';
}
