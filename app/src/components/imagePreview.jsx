import { RiImage2Line } from '@remixicon/react'

export default function ImagePreview({ canvasRef, width, height }) {
  return (
    <div class="mt-1rem bw-2px bs-solid bdr-c-neutral-100 br-1rem over-hidden bg-neutral-50">
      <div class="p-1.5rem flex ai-center space fs-12px text-neutral-800 bw-0 bw-bottom-2px bs-solid bdr-c-neutral-100">
        <div class="center gap-4px">
          <RiImage2Line size="16" />
          <span>Image Preview</span>
        </div>
        <span>
          {width}px × {height}px
        </span>
      </div>

      <div class="relative">
        <div class="h-mx-600px w-mx-full">
          <div class="w-mx-full h-mn-max-content p-1rem">
            <div class="relative shadow-xl shadow-neutral-950 [--grid-color]-red-300 grid2 bw-2px bs-solid text-neutral-100 br-8px p-8px over-scroll">
              <canvas
                ref={canvasRef}
                width={width}
                height={height}
                class="w-mx-full h-auto d-block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
