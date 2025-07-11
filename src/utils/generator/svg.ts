import { fontCache } from '../parseFont'
import { render, cleanHTMLAttributes } from '@tenoxui-lib'

export async function generateSVG(
  htmlContent: string,
  width: number,
  height: number,
  scale: number = 1
): Promise<string> {
  try {
    const fontFaceRules = await fontCache.getGoogleFontsStyles()

    // Parse HTML content
    const temp = document.createElement('div')
    temp.innerHTML = htmlContent

    // Apply scaling transformation
    const contentDiv = temp.firstElementChild as HTMLElement
    if (contentDiv) {
      contentDiv.classList.add(`[transform]-[scale(${scale})]`, '[transform-origin]-[top_left]')
    }

    // Process with tenoxui
    render(temp)
    cleanHTMLAttributes(temp)

    // Generate SVG
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

    // Minify whitespace
    return svgData.replace(/>\s+</g, '><')
  } catch (error) {
    throw new Error(
      `SVG generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
