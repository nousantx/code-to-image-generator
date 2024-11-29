import { useCallback } from 'preact/hooks'
import { generateSVG } from '../utils/svgUtils'
import { generateHTML } from '../utils/htmlUtils'

export function useImageGeneration(
  canvasRef,
  htmlContent,
  width,
  height,
  scale,
  outputFormat,
  setError
) {
  const generateImage = useCallback(async () => {
    try {
      setError('')
      const ctx = canvasRef.current.getContext('2d')
      const scaledWidth = width * scale
      const scaledHeight = height * scale

      canvasRef.current.width = scaledWidth
      canvasRef.current.height = scaledHeight

      ctx.clearRect(0, 0, scaledWidth, scaledHeight)

      const svgData = await generateSVG(htmlContent, scaledWidth, scaledHeight, scale)
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
  }, [canvasRef, htmlContent, width, height, scale, setError])

  const downloadImage = useCallback(async () => {
    try {
      setError('')
      const link = document.createElement('a')
      link.download = `generated-image.${outputFormat}`

      if (outputFormat === 'svg') {
        const svgData = await generateSVG(htmlContent, width * scale, height * scale, scale)
        const blob = new Blob([svgData], { type: 'image/svg+xml' })
        link.href = URL.createObjectURL(blob)
      } else if (outputFormat === 'html') {
        const htmlTemplate = await generateHTML(htmlContent)
        const blob = new Blob([htmlTemplate], { type: 'text/html' })
        link.href = URL.createObjectURL(blob)
        link.download = 'generated-content.html'
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
  }, [canvasRef, htmlContent, width, height, scale, outputFormat, generateImage, setError])

  return { generateImage, downloadImage }
}
