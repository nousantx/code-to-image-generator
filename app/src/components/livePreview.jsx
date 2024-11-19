
import {  useLayoutEffect, useState } from 'preact/hooks'
import {  forwardRef } from 'preact/compat'
import { MakeTenoxUI } from '@tenoxui/core/full'
import { tenoxuiConfig } from '../styles/init'
import { RiGlobalLine, RiZoomInLine, RiZoomOutLine, RiResetLeftLine } from '@remixicon/react'

const Preview = forwardRef(({ htmlContent }, ref) => {
  const [zoom, setZoom] = useState(100)

  useLayoutEffect(() => {
    if (!ref.current) return
    const tuiInstances = new Map()

    function initializeTenoxUI(config) {
      tuiInstances.clear()
      ref.current.querySelectorAll('*').forEach(element => {
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
    setZoom(prev => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50))
  }

  const resetZoom = () => {
    setZoom(100)
  }

  return (
    <div
      class="flex flex-col bg-neutral-50 bw-2px bs-solid bdr-c-neutral-100 br-1rem over-auto"
      child="
    
    (.live__btn): [all]-unset box-24px center text-neutral-800;
    
    "
    >
      <div class="center space gap-8px p-1.5rem bw-0 bw-bottom-2px bs-solid bdr-c-neutral-100">
        <div class="center gap-4px">
          <RiGlobalLine size="16" />
          <span class="fs-12px fw-500 ls--0.015em">Live Preview</span>
        </div>

        <div class="center gap-6px">
          <span class="fs-12px ls--0.015em">{zoom}%</span>
          <button onClick={handleZoomOut} class="live__btn" aria-label="Zoom out">
            <RiZoomOutLine size="16" />
          </button>

          <button onClick={handleZoomIn} class="live__btn" aria-label="Zoom in">
            <RiZoomInLine size="16" />
          </button>

          <button onClick={resetZoom} class="live__btn" aria-label="Reset zoom">
            <RiResetLeftLine size="16" />
          </button>
        </div>
      </div>

      <section class="p-1rem">
        <div class="relative over-auto p-4rem grid [--grid-color]-blue-300 h-600px shadow-xl shadow-neutral-950 br-1rem bw-2px bs-solid bdr-c-neutral-100">
          <div
            id="preview"
            ref={ref}
            class={`[transform]-[scale(${zoom / 100})] [transform-origin]-[top_left] w-max-content`}
          />
        </div>
      </section>
    </div>
  )
})

export default Preview
