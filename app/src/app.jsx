import { useLayoutEffect, useState, useRef } from 'preact/hooks'
import { init, tenoxuiConfig } from './lib/init'
import { MakeTenoxUI } from '@tenoxui/core/full'

export function App() {
  init()
  const [htmlContent, setHtmlContent] = useState('<div class="bg-red-600 box-200px"></div>')
  const [error, setError] = useState('')
  const [scale, setScale] = useState(1)
  const [outputFormat, setOutputFormat] = useState('png')
  const [width, setWidth] = useState(1000)
  const [height, setHeight] = useState(600)

  const canvasRef = useRef(null)
  const previewRef = useRef(null)
  const fileInputRef = useRef(null)

  function saveDesign() {
    try {
      const designData = {
        html: htmlContent,
        width,
        height,
        scale,
        format: outputFormat
      }

      const blob = new Blob([JSON.stringify(designData, null, 2)], { type: 'application/json' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'tenoxui.design.json'
      link.click()
      URL.revokeObjectURL(link.href)
    } catch (error) {
      setError(`Failed to save design: ${error.message}`)
    }
  }

  function loadDesign(event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const designData = JSON.parse(e.target.result)
        setHtmlContent(designData.html)
        setWidth(designData.width || 1000)
        setHeight(designData.height || 1000)
        setScale(parseFloat(designData.scale) || 1)
        setOutputFormat(designData.format || 'png')

        // Reset file input so the same file can be loaded again
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        // Generate preview after a short delay to ensure state updates have propagated
        setTimeout(() => {
          generateImage()
        }, 100)
      } catch (error) {
        setError(`Failed to load design file: ${error.message}`)
      }
    }
    reader.readAsText(file)
  }

  async function getGoogleFontsStyles() {
    const googleFontsLink = document.getElementById('google-fonts')
    if (!googleFontsLink) return ''

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
      return ''
    }
  }

  async function generateSVG() {
    try {
      const fontFaceRules = await getGoogleFontsStyles()
      const scaledWidth = width * scale
      const scaledHeight = height * scale
      const temp = document.createElement('div')
      temp.innerHTML = htmlContent

      const contentDiv = temp.querySelector('div')
      if (contentDiv) {
        contentDiv.classList.add(`[transform]-[scale(${scale})]`, '[transform-origin]-[top_left]')
      }

      temp.querySelectorAll('*').forEach((element) => {
        new MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
      })

      // Remove unnecessary attributes
      const removeAttributesAndElements = (element) => {
        if (element.tagName.toLowerCase() !== 'style') {
          Array.from(element.attributes).forEach((attr) => {
            if (attr.name !== 'style') {
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
<svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}">
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

  async function generateImage() {
    try {
      setError('')
      const ctx = canvasRef.current.getContext('2d')
      canvasRef.current.width = width
      canvasRef.current.height = height

      // Calculate scaled dimensions
      const scaledWidth = width * scale
      const scaledHeight = height * scale

      canvasRef.current.width = scaledWidth
      canvasRef.current.height = scaledHeight

      ctx.clearRect(0, 0, scaledWidth, scaledHeight)

      const svgData = await generateSVG()
      const img = new Image()
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData)

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      ctx.drawImage(img, 0, 0)
    } catch (error) {
      setError(`Failed to generate image: ${error.message}`)
    }
  }

  async function downloadImage() {
    try {
      setError('')
      const link = document.createElement('a')
      link.download = `generated-image.${outputFormat}`

      if (outputFormat === 'svg') {
        const svgData = await generateSVG()
        const blob = new Blob([svgData], { type: 'image/svg+xml' })
        link.href = URL.createObjectURL(blob)
      } else {
        await generateImage()
        link.href = canvasRef.current.toDataURL(`image/${outputFormat}`)
      }

      link.click()

      if (outputFormat === 'svg') {
        URL.revokeObjectURL(link.href)
      }
    } catch (error) {
      setError(`Failed to download image: ${error.message}`)
    }
  }

  useLayoutEffect(() => {
    if (!previewRef.current) return
    const tuiInstances = new Map()

    function initializeTenoxUI(config) {
      tuiInstances.clear()
      previewRef.current.querySelectorAll('*').forEach((element) => {
        const instance = new MakeTenoxUI({
          element,
          ...config
        }).useDOM()
        tuiInstances.set(element, instance)
      })
    }

    previewRef.current.innerHTML = htmlContent

    try {
      initializeTenoxUI(tenoxuiConfig)
    } catch (error) {
      console.error('Error initializing TenoxUI:', error)
      setError(`TenoxUI initialization failed: ${error.message}`)
    }

    return () => {
      tuiInstances.clear()
    }
  }, [htmlContent])

  return (
    <main class="p-2rem">
      <div id="preview" ref={previewRef} class="bdr-[1px_solid_#333] w-full h-mn-400px" />

      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        class="mt-2rem"
        placeholder="Enter HTML here..."
      />

      <div class="my-1rem">
        <div class="flex flex-w-wrap gap-8px">
          <label>
            Scale:
            <input
              type="number"
              min="0.1"
              max="5"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              class="ml-8px w-24px"
            />
          </label>

          <label>
            Format:
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              class="ml-8px"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
              <option value="svg">SVG</option>
            </select>
          </label>
        </div>

        {error && <div class="text-red-500">{error}</div>}
      </div>

      <div class="d-flex flex-w-wrap mt-1rem gap-8px">
        <button onClick={generateImage} class="btn">
          Generate Preview Image
        </button>
        <button onClick={downloadImage} class="btn">
          Download Image
        </button>
        <button onClick={saveDesign} class="btn">
          Save Design
        </button>
        <label class="btn">
          Load Design
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={loadDesign}
            class="d-none"
          />
        </label>
      </div>
      {/* Image preview */}
      <div class="mt-1rem [border]-[1px_solid_#ccc] br-1rem over-hidden bg-neutral-100">
        <div class="p-1rem flex ai-center space fs-12px text-neutral-800 bw-0 [border-bottom-width]-1px bs-solid bc-#ccc">
          <span>Image Preview</span>
          <span>
            {width}px × {height}px
          </span>
        </div>

        {/* Canvas Container with responsive behavior */}
        <div class="relative">
          <div class="over-auto h-mx-600px w-mx-full">
            <div class="w-mx-full h-mn-max-content p-1rem">
              <div class="relative shadow-xl shadow-neutral-950 bg-neutral-50 [border]-[1px_solid_#ccc] br-8px p-8px">
                <canvas
                  ref={canvasRef}
                  width={width}
                  height={height}
                  class="w-mx-full h-auto d-block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
