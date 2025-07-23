import { useState, useEffect } from 'preact/hooks'
import { RefObject } from 'preact'
import {
  RiExpandHeightLine,
  RiExpandWidthLine,
  RiAspectRatioLine,
  RiRefreshLine,
  RiDownloadLine,
  RiFolderUploadLine,
  RiSaveLine,
  RiFile3Line
} from '@remixicon/react'

interface ControlsProps {
  scale: number
  setScale: (scale: number) => void
  width: number
  setWidth: (width: number) => void
  height: number
  setHeight: (height: number) => void
  outputFormat: string
  setOutputFormat: (format: string) => void
  error: string
  generateImage: () => void
  downloadImage: () => void
  saveDesign: () => void
  loadDesign: (event: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: RefObject<HTMLInputElement>
  canvasRef: any
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default function Controls({
  scale,
  setScale,
  width,
  setWidth,
  height,
  setHeight,
  outputFormat,
  setOutputFormat,
  error,
  generateImage,
  downloadImage,
  saveDesign,
  loadDesign,
  fileInputRef,
  canvasRef
}: ControlsProps) {
  const [localWidth, setLocalWidth] = useState<number>(width)
  const [localHeight, setLocalHeight] = useState<number>(height)
  const [localScale, setLocalScale] = useState<number>(scale)

  const debouncedWidth = useDebounce<number>(localWidth, 300)
  const debouncedHeight = useDebounce<number>(localHeight, 300)
  const debouncedScale = useDebounce<number>(localScale, 300)

  useEffect(() => {
    if (debouncedWidth >= 100 && debouncedWidth <= 5000) {
      setWidth(debouncedWidth)
    }
  }, [debouncedWidth, setWidth])

  useEffect(() => {
    if (debouncedHeight >= 100 && debouncedHeight <= 5000) {
      setHeight(debouncedHeight)
    }
  }, [debouncedHeight, setHeight])

  useEffect(() => {
    if (debouncedScale >= 0.1 && debouncedScale <= 10) {
      setScale(debouncedScale)
    }
  }, [debouncedScale, setScale])

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement
    const value = target.value

    if (value === '') {
      setLocalWidth(100)
    } else {
      const parsed = parseInt(value, 10)
      if (!isNaN(parsed)) {
        setLocalWidth(parsed)
      }
    }
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement
    const value = target.value

    if (value === '') {
      setLocalHeight(100)
    } else {
      const parsed = parseInt(value, 10)
      if (!isNaN(parsed)) {
        setLocalHeight(parsed)
      }
    }
  }

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement
    const value = target.value

    if (value === '') {
      setLocalScale(0.1)
    } else {
      const parsed = parseFloat(value)
      if (!isNaN(parsed)) {
        setLocalScale(parsed)
      }
    }
  }

  return (
    <article className="max-w-1280px mx-auto">
      <section className="bg-neutral-50 text-neutral-800 border border-neutral-200 rounded-1rem shadow-xl overflow-hidden dark:bg-neutral-950 dark:text-neutral-200 dark:border-neutral-800">
        <div className="px-6 py-2 min-h-30px flex flex-wrap items-center justify-center font-mono gap-4 [&_svg]:size-18px text-xs font-mono text-neutral-500 bg-neutral-100 border-b border-neutral-200 gap-4 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300">
          <label className="flex gap-4px items-center h-40px">
            <RiExpandWidthLine />
            <input
              type="number"
              min="100"
              max="5000"
              className="bg-neutral-50 rounded-4px leading-[1] h-26px [minWidth,maxWidth]-6ch items-center justify-center inline-flex ml-8px border border-neutral-300 text-center dark:bg-neutral-950 dark:border-neutral-700"
              value={localWidth}
              onChange={handleWidthChange}
              onBlur={() => {
                if (localWidth < 100) setLocalWidth(100)
                if (localWidth > 5000) setLocalWidth(5000)
              }}
            />
          </label>
          <label className="flex gap-4px items-center h-40px">
            <RiExpandHeightLine />
            <input
              type="number"
              min="100"
              max="5000"
              className="bg-neutral-50 py-4px rounded-4px leading-[1] h-26px [minWidth,maxWidth]-6ch items-center justify-center inline-flex ml-8px border border-neutral-300 text-center dark:bg-neutral-950 dark:border-neutral-700"
              value={localHeight}
              onChange={handleHeightChange}
              onBlur={() => {
                if (localHeight < 100) setLocalHeight(100)
                if (localHeight > 5000) setLocalHeight(5000)
              }}
            />
          </label>
          <label className="flex gap-4px items-center h-40px">
            <RiAspectRatioLine />
            <input
              type="number"
              min="0.1"
              max="5"
              step="0.1"
              className="bg-neutral-50 py-4px rounded-4px leading-[1] h-26px w-min [minWidth,maxWidth]-3ch items-center justify-center inline-flex ml-8px border border-neutral-300 text-center dark:bg-neutral-950 dark:border-neutral-700"
              value={localScale}
              onChange={handleScaleChange}
              onBlur={() => {
                if (localScale < 0.1) setLocalScale(0.1)
                if (localScale > 10) setLocalScale(10)
              }}
            />
          </label>
          <label className="flex gap-4px items-center h-40px">
            <RiFile3Line />
            <select
              className="bg-neutral-50 px-8px rounded-4px leading-[1] h-26px w-minitems-center justify-center inline-flex ml-8px border border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700"
              value={outputFormat}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setOutputFormat((e.target as HTMLSelectElement).value)
              }
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
              <option value="svg">SVG</option>
              <option value="html">HTML</option>
            </select>
          </label>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950">
          <div className="relative overflow-scroll border rounded-1rem p-4 border-neutral-200 bg-emerald-50 dark:bg-emerald-950 dark:border-neutral-700">
            <canvas ref={canvasRef} width={width} height={height} className="w-full block" />
          </div>
        </div>
        <div className="text-neutral-500 dark:text-neutral-300 bg-neutral-100 border-t border-neutral-200 gap-2 flex justify-center items-center px-4 dark:bg-neutral-900 dark:border-neutral-800">
          <button onClick={generateImage} className="btn--img-prev" aria-label="Regenerate Image">
            <RiRefreshLine />
          </button>
          <button onClick={downloadImage} className="btn--img-prev" aria-label="Download Image">
            <RiDownloadLine />
          </button>
          <button onClick={saveDesign} className="btn--img-prev" aria-label="Save Design">
            <RiSaveLine />
          </button>
          <label className="btn--img-prev">
            <RiFolderUploadLine />
            <input
              className="!hidden"
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={loadDesign}
            />
          </label>
        </div>
      </section>

      {error && <div className="text-red-500">{error}</div>}
    </article>
  )
}
