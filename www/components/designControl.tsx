import { useState, useRef, useEffect, useCallback } from 'react'
import { useImageGeneration } from '../hooks/useImageGeneration'
import {
  RiRefreshLine,
  RiDownloadLine,
  RiSaveLine,
  RiSideBarLine,
  RiCloseLine
} from '@remixicon/react'

interface DesignConfig {
  width: number
  height: number
  scale: number
  format: string
}

interface DeclarativeDesignProps {
  children: React.ReactNode
  width?: number
  height?: number
  scale?: number
  format?: string
  autoGenerate?: boolean
  showControls?: boolean
  className?: string
}

export function DeclarativeDesign({
  children,
  width = 1000,
  height = 1000,
  scale = 1,
  format = 'png',
  autoGenerate = true,
  showControls = true,
  className = ''
}: DeclarativeDesignProps) {
  const [htmlContent, setHtmlContent] = useState('')
  const [error, setError] = useState('')
  const [config, setConfig] = useState<DesignConfig>({
    width,
    height,
    scale,
    format
  })
  const [isDownloadSectionActive, setIsDownloadSectionActive] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const designRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<MutationObserver | null>(null)

  const { generateImage, downloadImage } = useImageGeneration(
    canvasRef,
    htmlContent,
    config.width,
    config.height,
    config.scale,
    config.format,
    setError
  )

  const toggleDownloadSection = useCallback(() => {
    setIsDownloadSectionActive((prev) => !prev)
  }, [])

  const extractHtmlContent = useCallback(() => {
    if (designRef.current) {
      const designElement = designRef.current

      const outerHTML = designElement.outerHTML
      setHtmlContent(outerHTML)

      const newConfig = {
        width: parseInt(designElement.getAttribute('width') || width.toString()),
        height: parseInt(designElement.getAttribute('height') || height.toString()),
        scale: parseFloat(designElement.getAttribute('scale') || scale.toString()),
        format: designElement.getAttribute('format') || format
      }

      setConfig(newConfig)
    }
  }, [width, height, scale, format])

  useEffect(() => {
    if (designRef.current) {
      extractHtmlContent()

      if (autoGenerate) {
        observerRef.current = new MutationObserver(() => {
          extractHtmlContent()
        })

        observerRef.current.observe(designRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeOldValue: true,
          characterData: true
        })
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [extractHtmlContent, autoGenerate])

  useEffect(() => {
    if (htmlContent && autoGenerate) {
      generateImage()
    }
  }, [htmlContent, generateImage, autoGenerate])

  const handleGenerate = useCallback(() => {
    extractHtmlContent()
    setTimeout(() => generateImage(), 100)
  }, [extractHtmlContent, generateImage])

  const saveDesign = useCallback(() => {
    const designData = {
      htmlContent,
      ...config,
      timestamp: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(designData, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `design-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [htmlContent, config])

  return (
    <>
      <div
        ref={designRef}
        id="design"
        width={config.width}
        height={config.height}
        scale={config.scale}
        format={config.format}
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          transform: `scale(${config.scale})`,
          transformOrigin: 'top left'
        }}
      >
        {children}
      </div>

      <button
        onClick={toggleDownloadSection}
        className="fixed bottom-4 right-4 z-1002 size-35px rounded-6px flex items-center justify-center [&_svg]:size-16px bg-neutral-950 hover:bg-neutral-800 text-neutral-50 transition-colors"
      >
        {isDownloadSectionActive ? <RiCloseLine /> : <RiSideBarLine />}
      </button>

      <div
        className={`declarative-design-container max-w-500px bg-neutral-100 fixed z-1001 bottom-0 ${
          isDownloadSectionActive ? 'left-0' : 'left--100%'
        } ${className}`}
      >
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Generated Image Preview</h3>
          <div className="relative overflow-auto border rounded-lg p-4 border-gray-200 bg-emerald-50">
            <canvas
              ref={canvasRef}
              width={config.width}
              height={config.height}
              className="w-full block max-w-full max-h-96 object-contain"
            />
          </div>
        </div>

        {showControls && (
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RiRefreshLine size={16} />
              Generate
            </button>
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <RiDownloadLine size={16} />
              Download
            </button>
            <button
              onClick={saveDesign}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <RiSaveLine size={16} />
              Save Design
            </button>
          </div>
        )}

        {/* Configuration Display */}
        {showControls && (
          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div>Width: {config.width}px</div>
              <div>Height: {config.height}px</div>
              <div>Scale: {config.scale}x</div>
              <div>Format: {config.format.toUpperCase()}</div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>
    </>
  )
}

export default DeclarativeDesign
