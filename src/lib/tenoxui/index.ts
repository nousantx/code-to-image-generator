import { TenoxUI } from 'tenoxui'
import { toKebabCase } from './utils/toKebab'
import { cleanHTMLAttributes } from './utils/cleanAttr'
import config from './config'

interface StyleRules {
  [selector: string]: string
}

const ui = new TenoxUI(config)

function formatRules(cssRules: string | string[], value: string | null): string {
  if (Array.isArray(cssRules) && value !== null) {
    return cssRules
      .map((prop: string) =>
        value ? `${toKebabCase(String(prop))}: ${value}` : toKebabCase(String(prop))
      )
      .join('; ')
  }
  return cssRules as string
}

function generate(item: any): string {
  const { cssRules, value, prefix } = item
  if (prefix) return ''
  const rules = formatRules(cssRules, value)
  const finalValue = Array.isArray(cssRules) || value === null ? '' : `: ${value}`
  return rules + finalValue
}

function getStyles(classNames: string): string {
  const data = ui.process(classNames)

  return data && data.length > 0 ? data.map((item) => generate(item)).join('\n') : ''
}

function parseAttributeContent(content: string): StyleRules {
  const result: StyleRules = {}
  const rules = content.split(';').filter((rule: string) => rule.trim() !== '')

  rules.forEach((rule: string) => {
    const match = rule.match(/\(\s*([^)]+)\s*\)\s*:\s*(.+)/)
    if (match) {
      const selector = match[1].trim()
      const classes = match[2].trim()
      result[selector] = classes
    }
  })

  return result
}

function render(node: Document | Element): void {
  const elements = node.querySelectorAll('*')

  elements.forEach((element: Element) => {
    if (element.classList && element.classList.length > 0) {
      Array.from(element.classList).forEach((className: string) => {
        const styles = getStyles(className)
        if (styles) {
          ;(element as HTMLElement).style.cssText += styles
        }
      })
    }
  })

  const elementsWithUnderscore = node.querySelectorAll('[_]')
  elementsWithUnderscore.forEach((element: Element) => {
    const attrContent = element.getAttribute('_')
    if (!attrContent) return

    const styleRules = parseAttributeContent(attrContent)
    Object.entries(styleRules).forEach(([childSelector, classes]: [string, string]) => {
      const childElements = element.querySelectorAll(childSelector)
      childElements.forEach((childElement: Element) => {
        ;(childElement as HTMLElement).style.cssText += getStyles(classes)
      })
    })
  })
}

export { render, cleanHTMLAttributes }
export { default as config } from './config'
