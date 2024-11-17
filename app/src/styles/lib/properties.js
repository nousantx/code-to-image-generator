import { property as txProps } from '@tenoxui/property'
import { createProperty } from '@nousantx/someutils'

export const property = {
  ...txProps,
  ...createProperty(
    {
      bg: 'backgroundColor',
      text: 'color',
      'bdr-c': 'borderColor'
    },
    'rgb({0} / var(--{1}-opacity, 1))'
  ),
  bgc: 'backgroundColor',
  bgi: 'backgroundImage',
  'bw-bottom': 'borderBottomWidth',
  'bg-opacity': '--bg-opacity',
  'text-opacity': '--text-opacity',
  'back-blur': {
    property: 'backdropFilter',
    value: 'blur({0})'
  },
  shadow: '--shadow-color'
}
