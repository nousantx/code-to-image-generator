import { useState, useRef, useEffect, useCallback } from 'preact/hooks'
import Preview from '../components/livePreview'
import Controls from '../components/controls'
import ImagePreview from '../components/imagePreview'
import { useImageGeneration } from '../hooks/useImageGeneration'
import { useDesignManagement } from '../hooks/useDesignManagement'
import { tokenizer, processTokens } from '@lib/syntax-highlighter'

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
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [highlightedCode, setHighlightedCode] = useState('')
  const [isDownloadSectionActive, setIsDownloadSectionActive] = useState(false)

  const canvasRef = useRef(null)
  const previewRef = useRef(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const highlightRef = useRef(null)
  const lineNumbersRef = useRef(null)

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

  const updateHighlighting = useCallback(() => {
    try {
      const tokens = tokenizer.process(htmlContent)
      const processed = processTokens(tokens)
      setHighlightedCode(processed)
    } catch (error) {
      console.error('Tokenization error:', error)
    }
  }, [htmlContent])

  const getLineNumbers = useCallback(() => {
    const lines = htmlContent.split('\n')
    return lines.map((_, index) => index + 1).join('\n')
  }, [htmlContent])

  const updateCursorPosition = useCallback(() => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const textBeforeCursor = htmlContent.substring(0, start)
    const lines = textBeforeCursor.split('\n')
    const line = lines.length
    const column = lines[lines.length - 1].length + 1

    setCursorPosition({ line, column })
  }, [htmlContent])

  const handleScroll = useCallback(() => {
    if (!textareaRef.current || !highlightRef.current || !lineNumbersRef.current) return

    const scrollTop = textareaRef.current.scrollTop
    const scrollLeft = textareaRef.current.scrollLeft

    highlightRef.current.scrollTop = scrollTop
    highlightRef.current.scrollLeft = scrollLeft
    lineNumbersRef.current.scrollTop = scrollTop
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const spaces = '  '

      const newCode = htmlContent.substring(0, start) + spaces + htmlContent.substring(end)
      setHtmlContent(newCode)

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + spaces.length
        updateCursorPosition()
      }, 0)
    }
  }

  useEffect(() => {
    updateHighlighting()
  }, [updateHighlighting])

  useEffect(() => {
    updateCursorPosition()
  }, [updateCursorPosition])

  useEffect(() => {
    generateImage()
  }, [])

  return (
    <main className="p-8 relative">
      <Preview ref={previewRef} htmlContent={htmlContent} />

      {/* Toggle Button */}
      <button
        onClick={toggleDownloadSection}
        className="fixed bottom-4 right-4 z-1000 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isDownloadSectionActive ? 'Close Panel' : 'Open Panel'}
      </button>

      <section class="mt-3rem bg-neutral-50 text-neutral-400 rounded-1rem family-code shadow-xl border border-neutral-200 relative overflow-hidden">
        <div className="relative min-h-300px h-[calc(100%_-_30px)]">
          <div
            ref={lineNumbersRef}
            className="absolute left-0 top-30px z-30 w-12 bg-neutral-100 text-neutral-400 font-mono text-base leading-6 p-2 border-r border-neutral-200 overflow-hidden text-right pr-4 h-full"
          >
            <pre className="m-0 p-0 whitespace-pre">{getLineNumbers()}</pre>
          </div>

          <pre
            ref={highlightRef}
            className="absolute inset-0 top-30px z-20 m-0 p-2 pl-14 font-mono text-base leading-6 bg-transparent overflow-hidden whitespace-pre pointer-events-none"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />

          <textarea
            ref={textareaRef}
            className="absolute inset-0 top-30px z-29 m-0 p-2 pl-14 font-mono text-base leading-6 bg-transparent border-0 outline-0 resize-none overflow-auto whitespace-pre caret-black text-transparent [tabSize]-2"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onSelect={updateCursorPosition}
            onClick={updateCursorPosition}
            onKeyUp={updateCursorPosition}
            placeholder="Enter HTML here..."
            spellcheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        <div className="px-2 h-32px flex items-center text-xs text-neutral-500 bg-neutral-100 border-t border-neutral-200 relative z-99">
          Line {cursorPosition.line}, Column {cursorPosition.column}
        </div>
        <div className="px-2 h-30px flex items-center text-xs font-mono text-neutral-500 bg-neutral-100 border-b border-neutral-200 absolute top-0 left-0 right-0 z-99">
          HTML Editor
        </div>
      </section>

      <div
        id="download-section"
        className={`fixed [top,bottom,right]-0 max-w-screen bg-neutral-100 p-8 z-999 transition-left duration-300ms ${
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
        />

        <ImagePreview canvasRef={canvasRef} width={width} height={height} />
      </div>
    </main>
  )
}
