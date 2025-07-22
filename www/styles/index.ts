import { defaultProperties, preflight } from '@tenoxui/preset-tailwind'

export const resetter = {
  ...defaultProperties,
  ...preflight,
  ':root': '[--tw-default-font-sans]-Inter [--tw-default-font-mono]-[JetBrains_Mono]'
}

export const styles = {
  ...resetter,
  '.ctrl--btn':
    'h-40px flex items-center px-12px rounded-8px bg-neutral-950 text-neutral-50 hover:bg-neutral-800 transition-colors',
  '.btn--img-prev':
    'hover:bg-neutral-500/20 transition-colors duration-300 size-40px flex items-center justify-center',
  '.btn--img-prev svg': 'size-18px',
  '.btn--live-prev':
    'size-30px flex items-center justify-center rounded-sm border border-neutral-100',
  // syntax highlighter styles
  '.token.keyword': 'font-medium text-rose-500 dark:text-emerald-500',
  '.token.string': 'text-sky-600 dark:text-sky-400 font-medium',
  '.token.punctuation': 'text-gray-500',
  '.token.identifier': 'text-gray-800 dark:text-gray-200',
  '.token.global': 'text-gray-700 dark:text-gray-400',
  '.token.number': 'text-amber-600',
  '.token.comment': 'text-gray-500 italic'
}
