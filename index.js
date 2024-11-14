const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const errorDiv = document.getElementById('error')
const outputFormatSelect = document.getElementById('outputFormat')
const scaleInput = document.getElementById('scale')

const tenoxuiConfig = {
  property: TENOXUI_PROPERTY.property,
  values: { full: '100%' },
  attributify: true
}

const selector = '*'
document.querySelectorAll(selector).forEach(element => {
  new __tenoxui_core.MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
})

function generateImage() {
  const temp = document.createElement('div')
  temp.innerHTML = document.getElementById('htmlInput').value
  temp.querySelectorAll('*').forEach(element => {
    new __tenoxui_core.MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
  })

  const scale = parseFloat(scaleInput.value)
  const scaledWidth = canvas.width * scale
  const scaledHeight = canvas.height * scale

  const data = `
<svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      ${temp.innerHTML}
    </div>
    <!-- NOuSantx was here! -->
  </foreignObject>
</svg>`

  errorDiv.textContent = ''
  canvas.width = scaledWidth
  canvas.height = scaledHeight
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const img = new Image()
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data)
  img.onload = () => {
    ctx.scale(scale, scale)
    ctx.drawImage(img, 0, 0)
  }
  img.onerror = () => {
    errorDiv.textContent = 'Failed to generate image. Please check your HTML.'
  }
}

function downloadImage() {
  try {
    const outputFormat = outputFormatSelect.value
    const link = document.createElement('a')
    link.download = `generated-image.${outputFormat}`
    link.href = canvas.toDataURL(`image/${outputFormat}`)
    link.click()
  } catch (error) {
    errorDiv.textContent = 'Failed to download image: ' + error.message
  }
}

generateImage()
