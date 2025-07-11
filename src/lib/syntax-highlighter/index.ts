import { Ngurai } from '@nguraijs/core'
import { html } from './preset'

export const tokenizer = new Ngurai(html)

export function processTokens(tokens) {
  return tokens
    .map((line) =>
      line
        .map((token) => {
          const escapedValue = token.value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
          return `<span class="token ${token.type}">${escapedValue}</span>`
        })
        .join('')
    )
    .join('\n')
}
