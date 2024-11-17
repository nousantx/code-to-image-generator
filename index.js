const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const errorDiv = document.getElementById('error')
const outputFormatSelect = document.getElementById('outputFormat')
const colorPicker = document.getElementById('colorPicker')
const scaleInput = document.getElementById('scale')
const widthInput = document.getElementById('width')
const heightInput = document.getElementById('height')
const selector = '*' // '*:not(head *, style, script, #preview, #preview *)'

// Initialize tenoxui at first render
document.querySelectorAll(selector).forEach((element) => {
  new __tenoxui_core.MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
})

widthInput.addEventListener('change', updateCanvasSize)
heightInput.addEventListener('change', updateCanvasSize)

function updateCanvasSize() {
  canvas.width = parseInt(widthInput.value)
  canvas.height = parseInt(heightInput.value)
  updatePreview()
}

function loadTemplate(name) {
  document.getElementById('htmlInput').value = templates[name]
  updatePreview()
}

function insertElement(elementTemplate) {
  const textarea = document.getElementById('htmlInput')
  const position = textarea.selectionStart
  const content = textarea.value
  const before = content.substring(0, position)
  const after = content.substring(position)
  textarea.value = before + elementTemplate + after
  updatePreview()
}

function saveDesign() {
  const designData = {
    html: document.getElementById('htmlInput').value,
    width: canvas.width,
    height: canvas.height,
    scale: scaleInput.value,
    format: outputFormatSelect.value
  }

  const blob = new Blob([JSON.stringify(designData)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'tenoxui.design.json'
  link.click()
  URL.revokeObjectURL(link.href)
}

// Load design from json file
function loadDesign(event) {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const designData = JSON.parse(e.target.result)
      document.getElementById('htmlInput').value = designData.html
      widthInput.value = designData.width
      heightInput.value = designData.height
      scaleInput.value = designData.scale
      outputFormatSelect.value = designData.format

      updatePreview()
      generateImage()
    } catch (error) {
      errorDiv.textContent = 'Failed to load design file: ' + error.message
    }
  }

  reader.readAsText(file)
}

async function getGoogleFontsStyles() {
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

async function generateSVG() {
  const fontFaceRules = await getGoogleFontsStyles()
  const scale = parseFloat(scaleInput.value) || 1
  const scaledWidth = canvas.width * scale
  const scaledHeight = canvas.height * scale
  const temp = document.createElement('div')
  temp.innerHTML = document.getElementById('htmlInput').value

  const contentDiv = temp.querySelector('div')
  if (contentDiv) {
    const currentStyle = contentDiv.getAttribute('style') || ''
    contentDiv.classList.add(`[transform]-[scale(${scale})]`, '[transform-origin]-[top_left]')
  }

  temp.querySelectorAll('*').forEach((element) => {
    new __tenoxui_core.MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
  })

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

  const data = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by NOuSantx -->
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
  
  return data.replace(/>\s+</g, '><')
}

async function generateImage() {
  try {
    const scale = parseFloat(scaleInput.value) || 1
    const scaledWidth = canvas.width * scale
    const scaledHeight = canvas.height * scale

    errorDiv.textContent = ''
    canvas.width = scaledWidth
    canvas.height = scaledHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const svgData = await generateSVG()

    const img = new Image()
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData)

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })

    ctx.drawImage(img, 0, 0)
  } catch (error) {
    errorDiv.textContent = 'Failed to generate image: ' + error.message
  }
}

async function downloadImage() {
  try {
    const outputFormat = outputFormatSelect.value
    const link = document.createElement('a')
    link.download = `generated-image.${outputFormat}`

    if (outputFormat === 'svg') {
      const svgData = await generateSVG()
      const blob = new Blob([svgData], { type: 'image/svg+xml' })
      link.href = URL.createObjectURL(blob)
    } else {
      link.href = canvas.toDataURL(`image/${outputFormat}`)
    }

    link.click()

    if (outputFormat === 'svg') {
      URL.revokeObjectURL(link.href)
    }
  } catch (error) {
    errorDiv.textContent = 'Failed to download image: ' + error.message
  }
}

updatePreview()
generateImage()
