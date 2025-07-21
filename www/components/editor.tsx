import { useState, useRef, useEffect, useCallback } from 'preact/hooks'
import { tokenizer, processTokens } from '@lib/syntax-highlighter'

interface HtmlEditorProps {
  htmlContent: string
  setHtmlContent: (content: string) => void
}

export default function HtmlEditor({ htmlContent, setHtmlContent }: HtmlEditorProps) {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [highlightedCode, setHighlightedCode] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const highlightRef = useRef<HTMLPreElement | null>(null)
  const lineNumbersRef = useRef<HTMLDivElement | null>(null)

  const updateHighlighting = useCallback(() => {
    try {
      const tokens = tokenizer.process(htmlContent)
      const processed = processTokens(tokens)
      setHighlightedCode(processed)
    } catch (error) {
      console.error('Tokenization error:', error)
    }
  }, [htmlContent])

  const getLineNumbers = useCallback(() => {
    const lines = htmlContent.split('\n')
    return lines.map((_, index) => index + 1).join('\n')
  }, [htmlContent])

  const updateCursorPosition = useCallback(() => {
    if (!textareaRef.current) return
    const start = textareaRef.current.selectionStart
    const textBeforeCursor = htmlContent.substring(0, start)
    const lines = textBeforeCursor.split('\n')
    const line = lines.length
    const column = lines[lines.length - 1].length + 1
    setCursorPosition({ line, column })
  }, [htmlContent])

  const handleScroll = useCallback(() => {
    if (!textareaRef.current || !highlightRef.current || !lineNumbersRef.current) return
    const scrollTop = textareaRef.current.scrollTop
    const scrollLeft = textareaRef.current.scrollLeft
    highlightRef.current.scrollTop = scrollTop
    highlightRef.current.scrollLeft = scrollLeft
    lineNumbersRef.current.scrollTop = scrollTop
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      if (!target) return

      const start = target.selectionStart
      const end = target.selectionEnd
      const spaces = '  '

      const newCode = htmlContent.substring(0, start) + spaces + htmlContent.substring(end)
      setHtmlContent(newCode)

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + spaces.length
        updateCursorPosition()
      }, 0)
    }
  }

  useEffect(() => {
    updateHighlighting()
  }, [updateHighlighting])

  useEffect(() => {
    updateCursorPosition()
  }, [updateCursorPosition])

  return (
    <section class="mt-3rem bg-neutral-50 text-neutral-500 rounded-1rem family-code shadow-xl border border-neutral-200 relative overflow-hidden dark:bg-neutral-950 dark:border-neutral-800">
      <div className="relative min-h-300px h-[calc(100%_-_30px)]">
        <div
          ref={lineNumbersRef}
          className="absolute left-0 top-30px z-30 w-12 bg-neutral-100 text-neutral-500 font-mono text-base leading-6 p-2 border-r border-neutral-200 overflow-hidden text-right pr-4 h-full dark:bg-neutral-900 dark:border-neutral-800"
        >
          <pre className="m-0 p-0 whitespace-pre">{getLineNumbers()}</pre>
        </div>

        <pre
          ref={highlightRef}
          className="absolute inset-0 top-30px z-20 m-0 p-2 pl-14 font-mono text-base leading-6 bg-transparent overflow-hidden whitespace-pre pointer-events-none"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />

        <textarea
          ref={textareaRef}
          className="absolute inset-0 top-30px z-29 m-0 p-2 pl-14 font-mono text-base leading-6 bg-transparent border-0 outline-0 resize-none overflow-auto whitespace-pre caret-black text-transparent [tabSize]-2"
          value={htmlContent}
          onChange={(e) => setHtmlContent((e.target as HTMLTextAreaElement).value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          onSelect={updateCursorPosition}
          onClick={updateCursorPosition}
          onKeyUp={updateCursorPosition}
          placeholder="Enter HTML here..."
          spellcheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      <div className="px-2 h-32px flex items-center text-xs text-neutral-500 bg-neutral-100 border-t border-neutral-200 relative z-99 dark:bg-neutral-900 dark:border-neutral-800">
        Line {cursorPosition.line}, Column {cursorPosition.column}
      </div>
      <div className="px-2 h-30px flex items-center text-xs font-mono text-neutral-500 bg-neutral-100 border-b border-neutral-200 absolute top-0 left-0 right-0 z-99 dark:bg-neutral-900 dark:border-neutral-800">
        HTML Editor
      </div>
    </section>
  )
}
