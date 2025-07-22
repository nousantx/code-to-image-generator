import { render, ui } from '@tenoxui-lib'
import { resetter } from '@/styles'
import { FontFace } from '../parseFont'

export async function generateSVG(
  htmlContent: string,
  width: number,
  height: number,
  scale: number = 1,
  styles: Record<string, string> = {}
): Promise<string> {
  try {
    const temp = document.createElement('div')
    temp.innerHTML = htmlContent
    const contentDiv = temp.firstElementChild as HTMLElement
    if (contentDiv) {
      contentDiv.classList.add(`[transform]-[scale(${scale})]`, '[transform-origin]-[top_left]')
    }
    const svgData = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <style>
      <![CDATA[
        ${(await new FontFace('google-fonts').load()).replaceAll('\\n', '\n')}
        ${
          /* custom font here */
          (await new FontFace('custom-fonts').load()).replaceAll('\\n', '\n')
        }
        ${ui.render(resetter, styles)}
        ${render(temp)}
      ]]>
    </style>
  </defs>
  <foreignObject width="100%" height="100%">
    <html xmlns="http://www.w3.org/1999/xhtml">${temp.innerHTML}</html>
  </foreignObject>
</svg>`
    return (
      svgData
        // .replace(/>\s+</g, '><')
        .replace(
          /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(\s[^>]*)?(?<!\/)\>/gi,
          '<$1$2/>'
        )
    )
  } catch (error) {
    throw new Error(
      `SVG generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
