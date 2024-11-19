import { generateColors } from '@nousantx/color-generator'

export const color = {
  red: '#f03838',
  crimson: '#dc143c',
  ruby: '#e0115f',
  vermilion: '#e34234',
  tomato: '#ff6347',
  orange: '#f37f2e',
  amber: '#f49c09',
  gold: '#ffd700',
  yellow: '#f1c230',
  olive: '#c5c50b',
  lime: '#91e411',
  green: '#15e05f',
  emerald: '#13cb8e',
  teal: '#12c39f',
  turquoise: '#40e0d0',
  aquamarine: '#7fffd4',
  cyan: '#21d2f1',
  sky: '#0ea5e9',
  azure: '#007fff',
  blue: '#3d82f2',
  navy: '#000080',
  indigo: '#6f72f7',
  violet: '#7844f0',
  purple: '#a855f7',
  lavender: '#b57edc',
  magenta: '#ff00ff',
  fuchsia: '#d642ec',
  pink: '#f32d8f',
  rose: '#eb3756',
  slate: '#636c7c',
  zinc: '#71757a',
  gray: '#696a6a',
  neutral: '#6c6c6c',
  beige: '#eeeea5',
  khaki: '#c3b091',
  bronze: '#cd7f32',
  chocolate: '#d2691e',
  sienna: '#882d17'
}

export const colors = generateColors({
  option: {
    format: 'object2',
    output: 'rgb-only'
  },
  color
})
