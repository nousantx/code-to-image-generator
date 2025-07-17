import css from './src/lib/tenoxui/config.ts'
import { styles as apply } from './www/styles/index.ts'
import { defaultProperties, preflight } from '@tenoxui/preset-tailwind'

export default {
  include: ['index.html', 'www/**/*.{js,jsx,ts,tsx}', 'src/lib/syntax-highlighter/preset.ts'],
  exclude: ['www/design/*'],
  css: {
    ...css,
    apply
  }
}
