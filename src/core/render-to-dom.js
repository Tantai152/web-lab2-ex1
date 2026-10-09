/**
 * Recursively converts a VNode into a DOM node.
 * @param {{ type: string, props: { children: Array, nodeValue?: string, [key: string]: any } }} vNode
 * @returns {Text | Element}
 */
export function renderToDOM(vNode) {
  if (vNode.type === 'TEXT_ELEMENT') {
    return document.createTextNode(vNode.props.nodeValue);
  }

  const dom = document.createElement(vNode.type);

  Object.entries(vNode.props).forEach(([key, value]) => {
    if (key === 'children' || key === 'nodeValue') {
      return;
    }

    if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase();
      dom.addEventListener(eventName, value);
    } else if (key === 'className') {
      dom.className = value;
    } else if (
      key === 'style' &&
      value !== null &&
      typeof value === 'object'
    ) {
      Object.entries(value).forEach(([cssProperty, cssValue]) => {
        dom.style[cssProperty] = cssValue;
      });
    } else {
      dom.setAttribute(key, value);
    }
  });

  vNode.props.children.forEach((child) => {
    dom.appendChild(renderToDOM(child));
  });

  return dom;
}
