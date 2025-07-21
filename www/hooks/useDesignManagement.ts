import { useCallback } from 'preact/hooks'

export function useDesignManagement(
  htmlContent: string,
  width: number,
  height: number,
  scale: number,
  outputFormat: string,
  setHtmlContent: (html: string) => void,
  setWidth: (width: number) => void,
  setHeight: (height: number) => void,
  setScale: (scale: number) => void,
  setOutputFormat: (output: string) => void,
  setError: (error: string) => void,
  generateImage: any
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
      if (error instanceof Error) {
        setError(`Failed to save design: ${error.message}`)
      } else {
        setError('Failed to save design: Unknown error')
      }
    }
  }, [htmlContent, width, height, scale, outputFormat, setError])

  const loadDesign = useCallback(
    (event: any) => {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e: any) => {
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
          if (error instanceof Error) {
            setError(`Failed to load design: ${error.message}`)
          } else {
            setError('Failed to load design: Unknown error')
          }
        }
      }
      reader.readAsText(file)
    },
    [setHtmlContent, setWidth, setHeight, setScale, setOutputFormat, setError, generateImage]
  )

  return { saveDesign, loadDesign }
}
