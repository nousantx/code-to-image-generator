import { TenoxUI } from 'tenoxui'
import config from './tenoxui.config.js'

const code = `<div class="[background]-red size-1000px bg-yellow [&_div]:bg-red [&_div]:size-50 flex items-center justify-center gap-4">
 <div></div>
<div></div><div></div>
</div>`

const ui = new TenoxUI(config.css)
console.log(ui.render('bg-linear-to-r'))
