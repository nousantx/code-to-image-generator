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
  rad: 'borderRadius',
  'bw-bottom': 'borderBottomWidth',
  'bg-opacity': '--bg-opacity',
  'text-opacity': '--text-opacity',
  'back-blur': {
    property: 'backdropFilter',
    value: 'blur({0})'
  },
  shadow: '--shadow-color',
  scale: {
    property: 'transform',
    value: 'scale({0})'
  },
  rotate: {
    property: 'transform',
    value: 'rotate({0})'
  },
  blur: {
    property: 'filter',
    value: 'blur({0})'
  },
  brightness: {
    property: 'filter',
    value: 'brightness({0})'
  },
  contrast: {
    property: 'filter',
    value: 'contrast({0})'
  },
  grayscale: {
    property: 'filter',
    value: 'grayscale({0})'
  },
  hue: {
    property: 'filter',
    value: 'hue-rotate({0})'
  },
  invert: {
    property: 'filter',
    value: 'invert({0})'
  },
  saturate: {
    property: 'filter',
    value: 'saturate({0})'
  },
  sepia: {
    property: 'filter',
    value: 'sepia({0})'
  }
}
/*
 Create a css properties and css variables shorthand (type) for my css framework.
 
 the usage will like utility-first css framework but with actual value, not predefined like p-2, m-4, flex, else like tailwindcss does. Instead, it use class styles like this :
 
 `{type}-{value}`
 
 it will turned into :
 
 `{property | variable}: {value};`
 
So the classname will looks like m-4px, p-1rem, d-flex, and so on. This is the actual css value, not pre-defined like tailwindcss. This is a few rules you can follow :

1. Regular shorthand, properties or variables:

bg: "background", // e.g. bg-red | bg-white | bg-#f57e6d
bgc: "backgroundColor",
clr1: "--color-1"

2. Multi properties or variables:

px: ['paddingLeft', 'paddingRight'], // e.g. px-12px | px-1rem | px-[calc(1rem_-_10px)]
'radius-top': ['borderTopLeftRadius', 'borderTopRightRadius'], // e.g. radius-top-6px
'my-clr1': ["--color-1"]

3. Custom value properties or variables

// all `{0}` will replaced by the inputted value
bgi: {
  property: "backgroundImage",
  value: "linear-gradient(to right, red, {0})"
}, // e.g. bgi-blue => background-image: linear-gradient(to right, red, blue)
// it can also set multiple properties or variables
clr:{
  property: ['color', '--my-color-1'],
  value: 'rgb({0} / var(--opacity))'
}
*/
