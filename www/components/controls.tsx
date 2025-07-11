import { useState, useEffect } from 'react'
import { templates } from '@/design/template'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

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
  setHtmlContent
}) {
  const [showTemplates, setShowTemplates] = useState(false)

  // Local state for immediate input values
  const [localWidth, setLocalWidth] = useState(width)
  const [localHeight, setLocalHeight] = useState(height)
  const [localScale, setLocalScale] = useState(scale)

  // Debounced values
  const debouncedWidth = useDebounce(localWidth, 300)
  const debouncedHeight = useDebounce(localHeight, 300)
  const debouncedScale = useDebounce(localScale, 300)

  // Effect hooks to update parent state when debounced values change
  useEffect(() => {
    if (debouncedWidth >= 100 && debouncedWidth <= 4000) {
      setWidth(debouncedWidth)
    }
  }, [debouncedWidth, setWidth])

  useEffect(() => {
    if (debouncedHeight >= 100 && debouncedHeight <= 4000) {
      setHeight(debouncedHeight)
    }
  }, [debouncedHeight, setHeight])

  useEffect(() => {
    if (debouncedScale >= 0.1 && debouncedScale <= 10) {
      setScale(debouncedScale)
    }
  }, [debouncedScale, setScale])

  // Helper functions to safely parse input values
  const handleWidthChange = (e) => {
    const value = e.target.value
    if (value === '') {
      setLocalWidth(100) // Set to minimum value when empty
    } else {
      const parsed = parseInt(value)
      if (!isNaN(parsed)) {
        setLocalWidth(parsed)
      }
    }
  }

  const handleHeightChange = (e) => {
    const value = e.target.value
    if (value === '') {
      setLocalHeight(100) // Set to minimum value when empty
    } else {
      const parsed = parseInt(value)
      if (!isNaN(parsed)) {
        setLocalHeight(parsed)
      }
    }
  }

  const handleScaleChange = (e) => {
    const value = e.target.value
    if (value === '') {
      setLocalScale(0.1) // Set to minimum value when empty
    } else {
      const parsed = parseFloat(value)
      if (!isNaN(parsed)) {
        setLocalScale(parsed)
      }
    }
  }

  const handleTemplateClick = (template) => {
    setHtmlContent(templates[template])
  }

  return (
    <div>
      <div className="mt-3rem rounded-8px">
        <h3 className="mb-1.5rem text-lg font-medium tracking-tight leading-[1]">Try Templates</h3>
        <div className="flex flex-wrap gap-8px">
          {Object.keys(templates).map((template) => (
            <button
              key={template}
              onClick={() => handleTemplateClick(template)}
              className="ctrl--btn"
            >
              {template.charAt(0).toUpperCase() + template.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3rem">
        <h3 className="mb-1.5rem text-lg font-medium tracking-tight leading-[1]">Image Tools</h3>
        <div className="flex flex-wrap gap-8px">
          <label>
            Width:
            <input
              type="number"
              min="100"
              max="4000"
              className="bg-neutral-50 py-4px px-8px rounded-4px leading-[1] h-35px w-min center inline-flex ml-8px border border-neutral-300"
              value={localWidth}
              onChange={handleWidthChange}
              onBlur={() => {
                if (localWidth < 100) setLocalWidth(100)
                if (localWidth > 4000) setLocalWidth(4000)
              }}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              min="100"
              max="4000"
              className="bg-neutral-50 py-4px px-8px rounded-4px leading-[1] h-35px w-min center inline-flex ml-8px border border-neutral-300"
              value={localHeight}
              onChange={handleHeightChange}
              onBlur={() => {
                if (localHeight < 100) setLocalHeight(100)
                if (localHeight > 4000) setLocalHeight(4000)
              }}
            />
          </label>
          <label>
            Scale:
            <input
              type="number"
              min="0.1"
              max="5"
              step="0.1"
              className="bg-neutral-50 py-4px px-8px rounded-4px leading-[1] h-35px w-min center inline-flex ml-8px border border-neutral-300"
              value={localScale}
              onChange={handleScaleChange}
              onBlur={() => {
                if (localScale < 0.1) setLocalScale(0.1)
                if (localScale > 10) setLocalScale(10)
              }}
            />
          </label>
          <label>
            Format:
            <select
              className="bg-neutral-50 py-4px px-8px rounded-4px leading-[1] h-35px w-min center inline-flex ml-8px border border-neutral-300"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
              <option value="svg">SVG</option>
              <option value="html">HTML</option>
            </select>
          </label>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className="flex flex-wrap mt-3rem gap-8px">
        <button onClick={generateImage} className="ctrl--btn">
          Generate Preview
        </button>
        <button onClick={downloadImage} className="ctrl--btn">
          Download
        </button>
        <button onClick={saveDesign} className="ctrl--btn">
          Save Design
        </button>
        <label className="ctrl--btn">
          Load Design
          <input
            className="!hidden"
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={loadDesign}
          />
        </label>
      </div>
    </div>
  )
}
