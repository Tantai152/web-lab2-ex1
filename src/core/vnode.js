/**
 * @typedef {Object} TextVNode
 * @property {'TEXT_ELEMENT'} type
 * @property {Object} props
 * @property {string} props.nodeValue
 * @property {[]} props.children
 */

/** Identifies a text VNode. */
export const TEXT_ELEMENT = 'TEXT_ELEMENT';

/**
 * Creates a frozen text VNode from a string or number.
 * @param {string | number} text
 * @returns {Readonly<TextVNode>}
 */
export function createTextElement(text) {
  const props = Object.freeze({
    nodeValue: String(text),
    children: [],
  });

  return Object.freeze({
    type: TEXT_ELEMENT,
    props,
  });
}
