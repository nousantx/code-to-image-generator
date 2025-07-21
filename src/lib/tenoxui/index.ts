import { TenoxUI } from 'tenoxui'
import config from './config'

const ui = new TenoxUI(config)

function render(node: Document | Element): string {
  const elements = node.querySelectorAll('*')
  const classNames: string[] = []
  elements.forEach((element: Element) => {
    if (element.classList && element.classList.length > 0) {
      Array.from(element.classList).forEach((className: string) => {
        classNames.push(className)
      })
    }
  })
  return ui.render(Array.from(new Set(classNames)))
}

export { ui, render }
export { default as config } from './config'
