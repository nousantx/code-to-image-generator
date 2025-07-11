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
    <div className="bg-neutral-50 text-neutral-800 border-2px border-neutral-100 rounded-1rem shadow-xl">
      <div class="flex items-center justify-between p-1.5rem text-neutral-800 border-b-2px border-neutral-100">
        <div class="flex items-center justify-center gap-4px">
          <RiImage2Line size="16" />
          <span>Live Preview</span>
        </div>

        <div className="flex items-center gap-8px">
          <div class="flex items-center justify-center gap-8px h-30px w-46px border border-neutral-100 rounded-sm">
            <span className="text-xs leading-normal h-2ch">{zoom}</span>
          </div>
          <button onClick={handleZoomOut} className="btn--live-prev" aria-label="Zoom out">
            <RiZoomOutLine size="16" />
          </button>

          <button onClick={handleZoomIn} className="btn--live-prev" aria-label="Zoom in">
            <RiZoomInLine size="16" />
          </button>

          <button onClick={resetZoom} className="btn--live-prev" aria-label="Reset zoom">
            <RiResetLeftLine size="16" />
          </button>
        </div>
      </div>

      <div class="p-1rem">
        <div className="relative overflow-auto border-2px rounded-1rem p-4rem h-600px border-neutral-100">
          <div
            id="preview"
            ref={ref}
            className={`[transform-origin]-[top_left] w-max`}
            style={{
              transform: `scale(${zoom / 100})`
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default Preview
