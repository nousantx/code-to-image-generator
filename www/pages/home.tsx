import { useState, useRef, useEffect, useCallback } from 'preact/hooks'
import Preview from '../components/livePreview'
import Controls from '../components/controls'
import Editor from '../components/editor'
import { useImageGeneration } from '../hooks/useImageGeneration'
import { useDesignManagement } from '../hooks/useDesignManagement'
import { RiSideBarLine, RiCloseLine } from '@remixicon/react'

export function App() {
  const [htmlContent, setHtmlContent] = useState(
    `<div class="font-inter size-1000px flex items-center justify-center bg-emerald-500">
  <div class="relative bg-blue-600 text-neutral-100 flex items-center justify-center rounded-1rem font-sans size-250px text-2rem font-medium tracking--0.015em shadow-lg">
    Hello World!
    <div class="absolute px-1rem py-6px bg-neutral-50 rounded-8px text-1.5rem text-neutral-950 bottom-1rem right--6rem shadow-md">Might be a great day!</div>
  </div>
</div>`
  )
  const [error, setError] = useState('')
  const [scale, setScale] = useState(1)
  const [outputFormat, setOutputFormat] = useState('png')
  const [width, setWidth] = useState(1000)
  const [height, setHeight] = useState(1000)
  const [isDownloadSectionActive, setIsDownloadSectionActive] = useState(false)

  const canvasRef = useRef(null)
  const previewRef = useRef(null)
  const fileInputRef = useRef(null)

  const { generateImage, downloadImage } = useImageGeneration(
    canvasRef,
    htmlContent,
    width,
    height,
    scale,
    outputFormat,
    setError
  )

  const { saveDesign, loadDesign } = useDesignManagement(
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
  )

  const toggleDownloadSection = useCallback(() => {
    setIsDownloadSectionActive((prev) => !prev)
  }, [])

  useEffect(() => {
    generateImage()
  }, [])

  return (
    <main className="p-8 relative max-w-1280px mx-auto">
      <Preview ref={previewRef} htmlContent={htmlContent} />

      {/* Toggle Button */}
      <button
        onClick={toggleDownloadSection}
        className="fixed bottom-4 right-4 z-1000 size-35px rounded-6px flex items-center justify-center [&_svg]:size-16px bg-neutral-950 hover:bg-neutral-800 text-neutral-50 transition-colors"
      >
        {isDownloadSectionActive ? <RiCloseLine /> : <RiSideBarLine />}
      </button>

      <Editor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />

      <div
        id="download-section"
        className={`fixed [top,bottom,right]-0 max-w-screen bg-neutral-100 p-8 z-999 transition-left duration-300ms overflow-y-scroll ${
          isDownloadSectionActive ? 'left-0' : 'left--100%'
        }`}
      >
        <Controls
          scale={scale}
          setScale={setScale}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          error={error}
          setError={setError}
          generateImage={generateImage}
          downloadImage={downloadImage}
          saveDesign={saveDesign}
          loadDesign={loadDesign}
          fileInputRef={fileInputRef}
          setHtmlContent={setHtmlContent}
          canvasRef={canvasRef}
        />
      </div>
    </main>
  )
}
