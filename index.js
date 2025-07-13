import { Ngurai } from '@nguraijs/core'
import { html } from './src/lib/syntax-highlighter/preset.ts'

const urx = new Ngurai(html)
const code = "<div class='bg-red'></div>\n"
console.time('X')
const tokens = urx.process(code.repeat(200000))
console.timeEnd('X')

console.log(urx.process(code))
