import { createTextElement } from './vnode.js';

/**
 * Creates a VNode from a type, props, and children.
 * @param {string | Function} type - HTML tag or component function.
 * @param {Object | null | undefined} props - VNode properties.
 * @param {...(string | number | Object | Array | null | undefined | false)} children - Child elements.
 * @returns {{ type: string | Function, props: Object }}
 */
export function createElement(type, props, ...children) {
  const normalizedChildren = children
    .flat(Infinity)
    .filter(
      (child) => child !== null && child !== undefined && child !== false
    )
    .map((child) =>
      typeof child === 'object' && child !== null
        ? child
        : createTextElement(child)
    );

  return {
    type,
    props: {
      ...(props || {}),
      children: normalizedChildren,
    },
  };
}
