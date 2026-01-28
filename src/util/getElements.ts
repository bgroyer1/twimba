export function getElement<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`)
  return el
}

export function getMultipleElements<T extends Element>(selector: string): T[] {
  const nodeList = document.querySelectorAll<T>(selector)
  const elements = Array.from(nodeList)
  if (elements.length === 0) throw new Error(`No elements found: ${selector}`)
  return elements
}