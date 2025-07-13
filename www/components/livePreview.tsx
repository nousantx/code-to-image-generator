import { useLayoutEffect, useState } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { render } from '@tenoxui-lib'

import {
  RiExpandDiagonalLine,
  RiImage2Line,
  RiZoomInLine,
  RiZoomOutLine,
  RiResetLeftLine
} from '@remixicon/react'

const Preview = forwardRef(({ htmlContent }, ref) => {
  const [zoom, setZoom] = useState(100)

  useLayoutEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = htmlContent
    render(ref.current)
  }, [htmlContent])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50))
  }

  const resetZoom = () => {
    setZoom(100)
  }

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
            className={`[transform-origin]-[center] w-max`}
            style={{
              transform: `scale(${zoom / 100})`
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center text-neutral-500 bg-neutral-100 border-t border-neutral-200 gap-8px">
        <button
          onClick={handleZoomOut}
          className="hover:bg-neutral-200 transition-colors duration-300 size-30px flex items-center justify-center"
          aria-label="Zoom out"
        >
          <RiZoomOutLine size="16" />
        </button>

        <button
          onClick={handleZoomIn}
          className="hover:bg-neutral-200 transition-colors duration-300 size-30px flex items-center justify-center"
          aria-label="Zoom in"
        >
          <RiZoomInLine size="16" />
        </button>

        <button
          onClick={resetZoom}
          className="hover:bg-neutral-200 transition-colors duration-300 size-30px flex items-center justify-center"
          aria-label="Reset zoom"
        >
          <RiResetLeftLine size="16" />
        </button>
      </div>
    </section>
  )
})

export default Preview
