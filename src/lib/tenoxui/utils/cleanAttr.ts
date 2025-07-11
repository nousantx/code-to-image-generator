const PRESERVED_ATTRIBUTES: readonly string[] = [
  'style',
  'xmlns',
  'width',
  'height',
  'viewBox',
  'd',
  'fill',
  'path',
  'id',
  'x1',
  'x2',
  'y1',
  'y2',
  'gradientUnits',
  'gradientTransform',
  'offset',
  'stop-color',
  'opacity',
  'href',
  'stroke',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-width'
] as const

export function cleanHTMLAttributes(element: Element): string {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return ''

  const cleanedElement = element.cloneNode(true) as Element

  const cleanAttributes = (node: Node): void => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elementNode = node as Element
      Array.from(elementNode.attributes).forEach((attr: Attr) => {
        if (!PRESERVED_ATTRIBUTES.includes(attr.name)) {
          elementNode.removeAttribute(attr.name)
        }
      })
    }
    node.childNodes.forEach(cleanAttributes)
  }

  cleanAttributes(cleanedElement)
  return cleanedElement.innerHTML
}
