import { forwardRef, useLayoutEffect, useState } from 'react'
import { MakeTenoxUI } from '@tenoxui/core/full'
import { tenoxuiConfig } from '../styles/init'
import { RiZoomInLine, RiZoomOutLine, RiResetLeftLine } from '@remixicon/react'

const Preview = forwardRef(({ htmlContent }, ref) => {
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
    <div className="flex flex-col gap-8px">
      <span className="">{zoom}%</span>
      <div className="flex ai-center gap-8px">
        <button onClick={handleZoomOut} className="btn btn-icon" aria-label="Zoom out">
          <RiZoomOutLine size="18" />
        </button>

        <button onClick={handleZoomIn} className="btn btn-icon" aria-label="Zoom in">
          <RiZoomInLine size="18" />
        </button>

        <button onClick={resetZoom} className="btn btn-icon" aria-label="Reset zoom">
          <RiResetLeftLine size="18" />
        </button>
      </div>

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
  )
})

export default Preview
