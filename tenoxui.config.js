import css from './src/lib/tenoxui/config.ts'
import { styles as apply } from './src/styles/index.ts'
import { defaultProperties, preflight } from '@tenoxui/preset-tailwind'

export default {
  include: ['index.html', 'src/**/*.{js,jsx,ts,tsx}', 'src/lib/syntax-highlighter/preset.ts'],
  exclude: [
    'src/design/*',
    'src/components/designControl.tsx',
    'src/pages/design.tsx',
    'src/lib/*',
    'src/utils/*'
  ],
  css: {
    ...css,
    apply
  }
}
