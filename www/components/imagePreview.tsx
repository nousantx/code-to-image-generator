import { RiImage2Line } from '@remixicon/react'

export default function ImagePreview({ canvasRef, width, height }) {
  return (
    <div class="mt-1rem border-2px border-neutral-100 rounded-1rem overflow-hidden bg-neutral-50">
      <div class="p-1.5rem flex items-center justify-between text-xs text-neutral-800 border-0 border-b-2px border-neutral-100">
        <div class="flex items-center justify-center gap-4px">
          <RiImage2Line size="16" />
          <span>Image Preview</span>
        </div>
        <span>
          {width}px × {height}px
        </span>
      </div>
      <div class="p-1rem">
        <div class="h-600px overflow-y-auto border-2px border-neutral-100 rounded-1rem bg-neutral-50">
          <div class="p-1rem flex items-center justify-center min-h-full">
            <div class="relative shadow-xl shadow-neutral-950/10 border-2px text-neutral-100 rounded-8px p-8px bg-neutral-100">
              <canvas ref={canvasRef} width={width} height={height} class="max-w-full block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
