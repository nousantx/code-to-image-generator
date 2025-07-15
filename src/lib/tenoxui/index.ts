import { TenoxUI } from 'tenoxui'
import { preflight, defaultProperties } from '@tenoxui/preset-tailwind'
import { toKebabCase } from './utils/toKebab'
import { cleanHTMLAttributes } from './utils/cleanAttr'
import config from './config'

interface StyleRules {
  [selector: string]: string
}

const ui = new TenoxUI(config)

function render(node: Document | Element): string {
  const elements = node.querySelectorAll('*')
  const classNames = []
  elements.forEach((element: Element) => {
    if (element.classList && element.classList.length > 0) {
      Array.from(element.classList).forEach((className: string) => {
        classNames.push(className)
      })
    }
  })
  return ui.render(Array.from(new Set(classNames)))
}

export { ui, render, cleanHTMLAttributes }
export { default as config } from './config'
