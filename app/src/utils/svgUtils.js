import { MakeTenoxUI } from '@tenoxui/core/full'
import { config as tenoxuiConfig } from '@app/packages/config'
import { getGoogleFontsStyles } from './fontUtils'
import { removeAttributes } from './removeAttributes'

export async function generateSVG(htmlContent, width, height, scale) {
  try {
    const fontFaceRules = await getGoogleFontsStyles()
    const temp = document.createElement('div')
    temp.innerHTML = htmlContent

    const firstChild = temp.firstElementChild
    if (firstChild) {
      firstChild.classList.add(`[transform]-[scale(${scale})]`, '[transform-origin]-[top_left]')
    }


    temp.querySelectorAll('*').forEach((element) => {
      new MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
    })

    removeAttributes(temp)

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
