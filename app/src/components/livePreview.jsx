import { useLayoutEffect, useState } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { MakeTenoxUI } from '@tenoxui/core/full'
import { config as tenoxuiConfig, init } from '../styles/init'
import {
  RiExpandDiagonalLine,
  RiImage2Line,
  RiZoomInLine,
  RiZoomOutLine,
  RiResetLeftLine
} from '@remixicon/react'

const Preview = forwardRef(({ htmlContent }, ref) => {
  init()
  const [zoom, setZoom] = useState(100)

  useLayoutEffect(() => {
    if (!ref.current) return
    const tuiInstances = new Map()

    function initializeTenoxUI(config) {
      tuiInstances.clear()
      ref.current.querySelectorAll('*').forEach((element) => {
        const instance = new MakeTenoxUI({
          element,
          ...config
        }).useDOM()
        tuiInstances.set(element, instance)
      })
    }

    ref.current.innerHTML = htmlContent
    try {
      initializeTenoxUI(tenoxuiConfig)
    } catch (error) {
      console.error('Error initializing TenoxUI:', error)
    }

    return () => {
      tuiInstances.clear()
    }
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
    <div className="bg-neutral-50 text-neutral-800 bw-2px bs-solid bdr-c-neutral-100 br-1rem">
      <div class="center space p-1.5rem text-neutral-800 bw-0 bw-bottom-2px bs-solid bdr-c-neutral-100">
        <div class="center gap-4px">
          <RiImage2Line size="16" />
          <span>Live Preview</span>
        </div>

        <div
          className="flex ai-center gap-8px"
          child="
        (.btn--live-prev): all-unset center box-28px bgc-transparent hover:bg-neutral-100 br-6px tr-time-300ms border bdr-c-neutral-100;
        "
        >
          <div class="center gap-8px h-28px w-46px border bdr-c-neutral-100 br-6px">
            <span className="fs-12px lh-1 ls--0.015em">{zoom}</span>
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
        <div className="relative over-auto bw-2px bs-solid bdr-c-neutral-100 br-1rem p-4rem grid [--grid-color]-blue-300 h-600px">
          <div
            id="preview"
            ref={ref}
            className={`[transform]-[scale(${
              zoom / 100
            })] [transform-origin]-[top_left] w-max-content`}
          />
        </div>
      </div>
    </div>
  )
})

export default Preview
