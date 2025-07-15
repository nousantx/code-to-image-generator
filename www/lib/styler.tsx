import { useLayoutEffect, useRef } from 'preact/hooks'
import { styles as defaultStyles } from '@/styles'
import { ui, render } from '@tenoxui-lib'
const isDev = import.meta.env.DEV
export function styler({ children }) {
  if (!isDev) return <>{children}</>
  const STYLE_ID = 'tenoxui-main-style'
  const styleTagRef = useRef<HTMLStyleElement | null>(null)
  const appRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)
  const updateStyles = () => {
    if (!appRef.current || !styleTagRef.current || !render) return
    try {
      const newCSS = ui.render(defaultStyles) + render(appRef.current)
      styleTagRef.current.textContent = newCSS
    } catch (error) {
      console.error('Error generating CSS:', error)
    }
  }
  useLayoutEffect(() => {
    const styleTag = document.createElement('style')
    styleTag.id = STYLE_ID
    document.head.appendChild(styleTag)
    styleTagRef.current = styleTag
    return () => {
      if (styleTagRef.current && styleTagRef.current.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current)
        styleTagRef.current = null
      }
    }
  }, [])
  useLayoutEffect(() => {
    if (!appRef.current) return
    updateStyles()
    observerRef.current = new MutationObserver((mutations) => {
      let shouldUpdate = false
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          shouldUpdate = true
        } else if (
          mutation.type === 'childList' &&
          (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
        ) {
          shouldUpdate = true
        }
      })
      if (shouldUpdate) {
        updateStyles()
      }
    })
    observerRef.current.observe(appRef.current, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true
    })
    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [])
  return <div ref={appRef}>{children}</div>
}
export default styler
