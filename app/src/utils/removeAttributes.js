const DEFAULT_PRESERVED_ATTRIBUTES = [
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
  'href'
]

export const removeAttributes = (element) => {
  if (element.tagName.toLowerCase() !== 'style') {
    Array.from(element.attributes).forEach((attr) => {
      if (!DEFAULT_PRESERVED_ATTRIBUTES.includes(attr.name)) {
        element.removeAttribute(attr.name)
      }
    })

    Array.from(element.children).forEach((child) => {
      if (child.tagName.toLowerCase() !== 'style') {
        removeAttributes(child)
      }
    })
  }
}
