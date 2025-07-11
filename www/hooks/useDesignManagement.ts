import { useCallback } from 'preact/hooks'

export function useDesignManagement(
  htmlContent,
  width,
  height,
  scale,
  outputFormat,
  setHtmlContent,
  setWidth,
  setHeight,
  setScale,
  setOutputFormat,
  setError,
  generateImage
) {
  const saveDesign = useCallback(() => {
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
  }, [htmlContent, width, height, scale, outputFormat, setError])

  const loadDesign = useCallback(
    (event) => {
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

          // Generate preview after a short delay to ensure state updates have propagated
          setTimeout(() => {
            generateImage()
          }, 100)
        } catch (error) {
          setError(`Failed to load design file: ${error.message}`)
        }
      }
      reader.readAsText(file)
    },
    [setHtmlContent, setWidth, setHeight, setScale, setOutputFormat, setError, generateImage]
  )

  return { saveDesign, loadDesign }
}
