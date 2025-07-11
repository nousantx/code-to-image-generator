import css from './src/lib/tenoxui/config/index.ts'
import { defaultProperties, preflight } from '@tenoxui/preset-tailwind'

export default {
  include: ['index.html', 'www/**/*.{js,jsx,ts,tsx}', 'src/lib/syntax-highlighter/preset.ts'],
  exclude: ['www/design/template.ts'],
  css: {
    ...css,
    apply: {
      ...defaultProperties,
      ...preflight,
      ':root': '[--tw-default-font-sans]-Inter [--tw-default-font-mono]-[JetBrains_Mono]',
      '.ctrl--btn':
        'h-40px flex items-center px-12px rounded-8px bg-neutral-950 text-neutral-50 hover:bg-neutral-800 transition-colors',
      '.btn--live-prev':
        'size-30px flex items-center justify-center rounded-sm border border-neutral-100',
      '.token.keyword': 'font-medium text-emerald-600',
      '.token.string': 'text-sky-600 font-medium',
      '.token.punctuation': 'text-gray-500',
      '.token.identifier': 'text-gray-800',
      '.token.global': 'text-gray-700',
      '.token.number': 'text-amber-600',
      '.token.comment': 'text-gray-500 italic'
    }
  }
}
