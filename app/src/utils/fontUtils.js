export async function getGoogleFontsStyles() {
  const googleFontsLink = document.getElementById('google-fonts')
  if (!googleFontsLink) return

  try {
    const response = await fetch(googleFontsLink.href)
    const css = await response.text()
    const fontFaceRules = []
    const fontFaceRegex = /@font-face\s*{[^}]+}/g
    const matches = css.match(fontFaceRegex)

    if (matches) {
      for (const rule of matches) {
        const urlMatch = rule.match(/url\(([^)]+)\)/)
        if (urlMatch) {
          let fontUrl = urlMatch[1].replace(/['\"]/g, '')
          try {
            const fontResponse = await fetch(fontUrl)
            const fontBuffer = await fontResponse.arrayBuffer()
            const base64Font = btoa(String.fromCharCode(...new Uint8Array(fontBuffer)))
            const fontFormat = fontUrl.endsWith('woff2')
              ? 'woff2'
              : fontUrl.endsWith('woff')
                ? 'woff'
                : fontUrl.endsWith('ttf')
                  ? 'truetype'
                  : 'opentype'
            const processedRule = rule.replace(
              /url\([^)]+\)/,
              `url(data:application/font-${fontFormat};charset=utf-8;base64,${base64Font})`
            )
            fontFaceRules.push(processedRule)
          } catch (error) {
            console.warn('Failed to fetch font:', fontUrl, error)
            fontFaceRules.push(rule)
          }
        }
      }
    }

    return fontFaceRules.join('\n')
  } catch (error) {
    console.error('Failed to process Google Fonts:', error)
    return
  }
}
