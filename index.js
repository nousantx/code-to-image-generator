import { TenoxUI } from 'tenoxui'
import config from './tenoxui.config.js'

const ui = new TenoxUI(config.css)

console.log(ui.render('border border-solid border-red'))
console.log(config.css.apply)
