import { useLayoutEffect, useState, useRef } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { render } from '@tenoxui-lib'
import { RiZoomInLine, RiZoomOutLine, RiResetLeftLine } from '@remixicon/react'

const STYLE_ID = 'tenoxui-live-preview-style'
const MIN_ZOOM = 50
const MAX_ZOOM = 200
const ZOOM_STEP = 10
const DEFAULT_ZOOM = 100

const Preview = forwardRef(({ htmlContent }, ref) => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const styleTagRef = useRef(null)

  // Initialize style tag once
  useLayoutEffect(() => {
    if (!styleTagRef.current) {
      const styleTag = document.createElement('style')
      styleTag.id = STYLE_ID
      document.head.appendChild(styleTag)
      styleTagRef.current = styleTag
    }

    // Cleanup on unmount
    return () => {
      if (styleTagRef.current && styleTagRef.current.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current)
        styleTagRef.current = null
      }
    }
  }, [])

  // Update content and styles
  useLayoutEffect(() => {
    if (!ref.current || !htmlContent) return

    // Update HTML content
    ref.current.innerHTML = htmlContent

    // Generate and apply CSS
    const newCSS = render(ref.current)
    if (styleTagRef.current) {
      styleTagRef.current.textContent = newCSS
    }
  }, [htmlContent])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM))
  }

  const resetZoom = () => {
    setZoom(DEFAULT_ZOOM)
  }

  const Button = ({ onClick, icon: Icon, label }) => (
    <button
      onClick={onClick}
      className="hover:bg-neutral-200 transition-colors duration-300 size-30px flex items-center justify-center"
      aria-label={label}
    >
      <Icon size="16" />
    </button>
  )

  return (
    <section className="bg-neutral-50 text-neutral-800 border border-neutral-200 rounded-1rem shadow-xl overflow-hidden">
      <div className="px-2 h-30px flex items-center text-xs font-mono text-neutral-500 bg-neutral-100 border-b border-neutral-200">
        Live Preview
      </div>

      <div className="p-4 bg-neutral-50">
        <div className="relative overflow-scroll border rounded-1rem p-4rem h-400px lg:h-600px border-neutral-200 bg-emerald-50">
          <div
            id="preview"
            ref={ref}
            className="[transform-origin]-[center] w-max"
            style={{ transform: `scale(${zoom / 100})` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center text-neutral-500 bg-neutral-100 border-t border-neutral-200 gap-8px">
        <Button onClick={handleZoomOut} icon={RiZoomOutLine} label="Zoom out" />
        <Button onClick={handleZoomIn} icon={RiZoomInLine} label="Zoom in" />
        <Button onClick={resetZoom} icon={RiResetLeftLine} label="Reset zoom" />
      </div>
    </section>
  )
})

export default Preview
