interface CacheData {
  cache: [string, string][]
  timestamp: number
}

export class FontFace {
  private fontId: string
  private storageKey: string
  private pendingRequests = new Map<string, Promise<string>>()
  private cache = new Map<string, string>()

  constructor(fontId: string) {
    this.fontId = fontId
    this.storageKey = `${fontId}-cache`
    this.loadFromStorage()
  }

  async load(): Promise<string> {
    const fontSrc = document.getElementById(this.fontId) as HTMLLinkElement
    if (!fontSrc) return ''

    const cacheKey = fontSrc.href

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!
    }

    const fontPromise = this.fetchAndProcessFonts(cacheKey)
    this.pendingRequests.set(cacheKey, fontPromise)

    try {
      const result = await fontPromise
      this.cache.set(cacheKey, result)
      this.saveToStorage()
      return result
    } catch (error) {
      console.error('Failed to process Fonts:', error)
      return ''
    } finally {
      this.pendingRequests.delete(cacheKey)
    }
  }

  private async fetchAndProcessFonts(url: string): Promise<string> {
    const response = await fetch(url)
    const css = await response.text()

    const fontFaceRules = css.match(/@font-face\s*{[^}]+}/g)
    if (!fontFaceRules) return ''

    const fontPromises = fontFaceRules.map(async (rule) => {
      const urlMatch = rule.match(/url\(([^)]+)\)/)
      if (!urlMatch) return rule

      const fontUrl = urlMatch[1].replace(/['\"]/g, '')

      try {
        const fontResponse = await fetch(fontUrl)
        if (!fontResponse.ok) throw new Error(`HTTP ${fontResponse.status}`)

        const fontBuffer = await fontResponse.arrayBuffer()
        const base64Font = this.arrayBufferToBase64(fontBuffer)
        const fontFormat = this.detectFontFormat(fontUrl)

        return rule.replace(
          /url\([^)]+\)/,
          `url(data:application/font-${fontFormat};charset=utf-8;base64,${base64Font})`
        )
      } catch (error) {
        console.warn('Failed to fetch font:', fontUrl, error)
        return rule
      }
    })

    const processedRules = await Promise.all(fontPromises)
    return processedRules.join('\n')
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    const chunkSize = 0x8000 // 32KB chunks
    let result = ''

    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize)
      result += String.fromCharCode(...chunk)
    }

    return btoa(result)
  }

  private detectFontFormat(url: string): string {
    if (url.endsWith('.woff2')) return 'woff2'
    if (url.endsWith('.woff')) return 'woff'
    if (url.endsWith('.ttf')) return 'truetype'
    if (url.endsWith('.otf')) return 'opentype'
    return 'opentype'
  }

  private loadFromStorage(): void {
    try {
      const stored = sessionStorage.getItem(this.storageKey)
      if (stored) {
        const data: CacheData = JSON.parse(stored)
        this.cache = new Map(data.cache)
      }
    } catch (error) {
      console.warn('Failed to load font cache from storage:', error)
    }
  }

  private saveToStorage(): void {
    try {
      const data: CacheData = {
        cache: Array.from(this.cache.entries()),
        timestamp: Date.now()
      }
      sessionStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.warn('Failed to save font cache to storage:', error)
    }
  }

  clearCache(): void {
    this.cache.clear()
    this.pendingRequests.clear()
    sessionStorage.removeItem(this.storageKey)
  }

  getCacheStats(): { cachedFonts: number; pendingRequests: number } {
    return {
      cachedFonts: this.cache.size,
      pendingRequests: this.pendingRequests.size
    }
  }
}
