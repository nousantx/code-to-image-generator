import { useState, useRef, useEffect } from 'preact/hooks'
import Preview from './components/livePreview.jsx'
import Controls from './components/controls.jsx'
import ImagePreview from './components/imagePreview.jsx'
import { useImageGeneration } from './hooks/useImageGeneration.js'
import { useDesignManagement } from './hooks/useDesignManagement.js'
import { init } from './styles/init'
import { RiHtml5Line } from '@remixicon/react'

export function App() {
  init()
  const [htmlContent, setHtmlContent] = useState(
    `<div class="box-1000px center bg-teal-500">
  <div class="relative bg-blue-600 text-neutral-100 center br-1rem family-sans box-250px fs-2rem fw-500  ls--0.015em shadow-lg">
    Hello World!
    <div class="absolute px-1rem py-6px bg-neutral-50 br-8px fs-1.5rem text-neutral-950 b-1rem r--6rem shadow-md">Might be a great day!</div>
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

      <section
        class="mt-2rem bg-neutral-50 text-neutral-400 br-1rem family-code shadow-xl shadow-neutral-950 bw-2px bs-solid bdr-c-neutral-100"
        child="(textarea.main-input): w-100% h-mn-400px p-2rem over-x-scroll tw-nowrap bdr-none text-orange-400 bgc-transparent focus:[bdr,outline]-none;"
      >
        <div class="w-full p-1.5rem center relative bw-0 bw-bottom-2px bs-solid bdr-c-neutral-100">
          <div class="center gap-8px d-none">
            <RiHtml5Line size="18" />
          </div>
          <span class="family-code fs-14px">index.html</span>
          <div class="center gap-8px absolute l-2rem" child="(div): box-16px br-100%;">
            <div class="bg-green-500"></div>
            <div class="bg-yellow-500"></div>
            <div class="bg-red-500"></div>
          </div>
        </div>
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="main-input"
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
