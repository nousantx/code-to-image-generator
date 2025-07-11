import { useState, useRef, useEffect } from 'preact/hooks'
import Preview from '../components/livePreview'
import Controls from '../components/controls'
import ImagePreview from '../components/imagePreview'
import { useImageGeneration } from '../hooks/useImageGeneration'
import { useDesignManagement } from '../hooks/useDesignManagement'
import { RiHtml5Line } from '@remixicon/react'

export function App() {
  const [htmlContent, setHtmlContent] = useState(
    `<div class="font-inter size-1000px flex items-center justify-center bg-emerald-500">
  <div class="relative bg-blue-600 text-neutral-100 flex items-center justify-center rounded-1rem family-sans size-250px text-2rem font-medium  tracking--0.015em shadow-lg">
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

  useEffect(() => {
    generateImage()
  }, [])

  return (
    <main className="p-2rem">
      <Preview ref={previewRef} htmlContent={htmlContent} />

      <section class="mt-2rem bg-neutral-50 text-neutral-400 rounded-1rem family-code shadow-xl shadow-neutral-950/10 border-2px border-neutral-100">
        <div class="w-full p-1.5rem flex items-center justify-center relative border-b-2px border-neutral-100">
          <div class="flex items-center justify-center gap-8px">
            <RiHtml5Line size="18" />
          </div>
          <span class="font-mono fs-14px">index.html</span>
          <div class="flex items-center justify-center gap-8px absolute left-2rem [&_div]:size-16px [&_div]:rounded-full">
            <div class="bg-green-500"></div>
            <div class="bg-yellow-500"></div>
            <div class="bg-red-500"></div>
          </div>
        </div>
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="w-100% min-h-400px p-2rem overflow-x-scroll text-nowrap border-0 text-orange-400 bg-transparent focus:[border,outline]-none font-mono"
          placeholder="Enter HTML here..."
        />
      </section>

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
        generateImage={generateImage}
        downloadImage={downloadImage}
        saveDesign={saveDesign}
        loadDesign={loadDesign}
        fileInputRef={fileInputRef}
        setHtmlContent={setHtmlContent}
      />

      <ImagePreview canvasRef={canvasRef} width={width} height={height} />
    </main>
  )
}
