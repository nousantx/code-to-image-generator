import { useCallback } from 'preact/hooks'
import { RefObject } from 'preact'
import { generateHTML, generateSVG } from '@app/src/utils/generator'

export function useImageGeneration(
  canvasRef: RefObject<HTMLCanvasElement>,
  htmlContent: string,
  width: number,
  height: number,
  scale: number,
  outputFormat: string,
  setError: (error: string) => void,
  fileName?: string,
  styles?: Record<string, string>
) {
  const generateImage = useCallback(async () => {
    try {
      setError('')
      if (!canvasRef.current) {
        throw new Error('Canvas reference is not available')
      }

      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return null
      const scaledWidth = width * scale
      const scaledHeight = height * scale

      canvasRef.current.width = scaledWidth
      canvasRef.current.height = scaledHeight

      ctx.clearRect(0, 0, scaledWidth, scaledHeight)

      const svgData = await generateSVG(htmlContent, scaledWidth, scaledHeight, scale, styles)
      const img = new Image()
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData)

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      ctx.drawImage(img, 0, 0)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(`Failed to generate image: ${errorMessage}`)
    }
  }, [canvasRef, htmlContent, width, height, scale, setError])

  const downloadImage = useCallback(async () => {
    try {
      setError('')
      const link = document.createElement('a')
      link.download =
        (fileName ||
          `generated-${new Date()
            .toISOString()
            .slice(2, 19)
            .replace(/[-:]/g, '')
            .replace('T', '-')}`) + `.${outputFormat}`

      if (outputFormat === 'svg') {
        const svgData = await generateSVG(htmlContent, width * scale, height * scale, scale, styles)
        const blob = new Blob([svgData], { type: 'image/svg+xml' })
        link.href = URL.createObjectURL(blob)
      } else if (outputFormat === 'html') {
        const htmlTemplate = await generateHTML(htmlContent)
        const blob = new Blob([htmlTemplate], { type: 'text/html' })
        link.href = URL.createObjectURL(blob)
      } else {
        if (!canvasRef.current) {
          throw new Error('Canvas reference is not available')
        }
        await generateImage()
        link.href = canvasRef.current.toDataURL(`image/${outputFormat}`)
      }

      link.click()

      if (outputFormat === 'svg') {
        URL.revokeObjectURL(link.href)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(`Failed to download image: ${errorMessage}`)
    }
  }, [
    canvasRef,
    htmlContent,
    width,
    height,
    scale,
    outputFormat,
    generateImage,
    setError,
    fileName
  ])

  return { generateImage, downloadImage }
}
