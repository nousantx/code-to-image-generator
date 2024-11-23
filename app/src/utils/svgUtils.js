import { MakeTenoxUI } from '@tenoxui/core/full'
import { tenoxuiConfig } from '../styles/init'
import { getGoogleFontsStyles } from './fontUtils'

// Define attributes to preserve
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

export async function generateSVG(htmlContent, width, height, scale) {
  try {
    const fontFaceRules = await getGoogleFontsStyles()
    const temp = document.createElement('div')
    temp.innerHTML = htmlContent

    const contentDiv = temp.querySelector('div')
    if (contentDiv) {
      contentDiv.classList.add(`[transform]-[scale(${scale})]`, '[transform-origin]-[top_left]')
    }

    temp.querySelectorAll('*').forEach((element) => {
      new MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
    })

    // Enhanced attribute removal function
    const removeAttributesAndElements = (element) => {
      if (element.tagName.toLowerCase() !== 'style') {
        Array.from(element.attributes).forEach((attr) => {
          if (!DEFAULT_PRESERVED_ATTRIBUTES.includes(attr.name)) {
            element.removeAttribute(attr.name)
          }
        })

        Array.from(element.children).forEach((child) => {
          if (child.tagName.toLowerCase() !== 'style') {
            removeAttributesAndElements(child)
          }
        })
      }
    }

    removeAttributesAndElements(temp)

    const svgData = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <style type="text/css">
      ${fontFaceRules}
    </style>
  </defs>
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">${temp.innerHTML}</div>
  </foreignObject>
</svg>`

    return svgData.replace(/>\s+</g, '><')
  } catch (error) {
    throw new Error(`SVG generation failed: ${error.message}`)
  }
}
