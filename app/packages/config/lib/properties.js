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
  border: 'borderColor',
  'bw-y': ['borderTopWidth', 'borderBottomWidth'],
  'bw-x': ['borderLeftWidth', 'borderRightWidth'],
  'bw-left': 'borderLeftWidth',
  'bw-bottom': 'borderBottomWidth',
  'bw-right': 'borderRightWidth',
  'br-t': ['borderTopRightRadius', 'borderTopLeftRadius'],
  'br-b': ['borderBottomRightRadius', 'borderBottomLeftRadius'],
  'br-l': ['borderBottomLeftRadius', 'borderTopLeftRadius'],
  'br-r': ['borderBottomRightRadius', 'borderTopRightRadius'],
  'br-tl': 'borderTopLeftRadius',
  'br-tr': 'borderTopRightRadius',
  'br-bl': 'borderBottomLeftRadius',
  'br-br': 'borderBottomRightRadius',
  'bg-opacity': '--bg-opacity',
  'text-opacity': '--text-opacity',
  'back-blur': {
    property: 'backdropFilter',
    value: 'blur({0})'
  },
  "use-transform": {
    property: 'transform',
    value:
      'rotate(var(--tui_rotate, 0))\nrotateY(var(--tui_rotate-y, 0))\nrotateX(var(--tui_rotate-x, 0))\nrotateZ(var(--tui_rotate-z, 0))\nscale(var(--tui_scale, 1))\nscaleY(var(--tui_scale-y, 1))\nscaleX(var(--tui_scale-x, 1))\nscaleZ(var(--tui_scale-z, 1))\nskew(var(--tui_skew, 0))\nskewY(var(--tui_skew-y, 0))\nskewX(var(--tui_skew-x, 0))\ntranslate(var(--tui_translate, 0))\ntranslateY(var(--tui_translate-y, 0))\ntranslateX(var(--tui_translate-x, 0))\ntranslateZ(var(--tui_translate-z, 0))'
  },
  rotate: '--tui_rotate',
  'rotate-y': '--tui_rotate-y',
  'rotate-x': '--tui_rotate-x',
  'rotate-z': '--tui_rotate-z',
  scale: '--tui_scale',
  'scale-x': '--tui_scale-x',
  'scale-y': '--tui_scale-y',
  'scale-z': '--tui_scale-z',
  skew: '--tui_skew',
  'skew-x': '--tui_skew-x',
  'skew-y': '--tui_skew-y',
  translate: '--tui_translate',
  'translate-x': '--tui_translate-x',
  'translate-y': '--tui_translate-y',
  'translate-z': '--tui_translate-z',
  'use-filter': {
    property: 'filter',
    value:
      'blur(var(--tui_blur, 0))\nbrightness(var(--tui_brightness, 1))\ncontrast(var(--tui_contrast, 1))\ngrayscale(var(--tui_grayscale, 0))\nhue-rotate(var(--tui_hue-rotate, 0))\ninvert(var(--tui_invert, 0))\nopacity(var(--tui_opacity, 1))\nsaturate(var(--tui_saturate, 1))\nsepia(var(--tui_sepia, 0))\ndrop-shadow(var(--tui_drop-shadow, 0 0 0 rgb(0 0 0 / 0)))'
  },
  blur: '--tui_blur',
  brightness: '--tui_brightness',
  contrast: '--tui_contrast',
  grayscale: '--tui_grayscale',
  'hue-rotate': '--tui_hue-rotate',
  invert: '--tui_invert',
  opacity: '--tui_opacity',
  saturate: '--tui_saturate',
  sepia: '--tui_sepia',
  shadow: '--shadow-color',
  ring: '--ring-color',
  'ring-offset': '--ring-offset-color',
  'space-y': '--tui-space-y',
  'space-x': '--tui-space-x'
}
