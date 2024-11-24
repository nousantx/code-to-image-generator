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
  all: 'all',
  inset: 'inset',
  bgc: 'backgroundColor',
  bgi: 'backgroundImage',
  'bw-top': 'borderTopWidth',
  'bw-left': 'borderLeftWidth',
  'bw-bottom': 'borderBottomWidth',
  'bw-right': 'borderRightWidth',
  'br-t': ['borderTopRightRadius', 'borderTopLeftRadius'],
  'br-b': ['borderBottomRightRadius', 'borderBottomLeftRadius'],
  'br-l': ['borderBottomLeftRadius', 'borderTopLeftRadius'],
  'br-r': ['borderBottomRightRadius', 'borderTopRightRadius'],
  'bg-opacity': '--bg-opacity',
  'text-opacity': '--text-opacity',
  'back-blur': {
    property: 'backdropFilter',
    value: 'blur({0})'
  },
  shadow: '--shadow-color'
}
