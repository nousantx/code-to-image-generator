import { preset, defaultProperties, preflight } from '@tenoxui/preset-tailwind'

export default {
  ...preset(),
  apply: {
    ...defaultProperties,
    ...preflight,
    ':root': '[--tw-default-font-sans]-Inter [--tw-default-font-mono]-[JetBrains_Mono]',
    '.ctrl--btn':
      'h-40px flex items-center px-12px rounded-8px bg-neutral-950 text-neutral-50 hover:bg-neutral-800 transition-colors'
  }
}
