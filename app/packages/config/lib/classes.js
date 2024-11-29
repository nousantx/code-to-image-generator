import { merge, transformClasses } from '@nousantx/someutils'

const classNameBased = transformClasses({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  border: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'currentColor'
  },
  text: {
    fontWeight: '500',
    letterSpacing: '-0.015em',
    lineHeight: '1.4'
  },
  grid: {
    '--g1': 'rgb(var(--grid-bg))',
    '--g2': 'rgb(var(--grid-color))',
    height: '16rem',
    'background-image':
      'linear-gradient(to right, var(--g2, blue) 1px, transparent 1px), linear-gradient(to bottom, var(--g2, red) 1px, transparent 1px)',
    'background-size': '2.5rem 2.5rem',
    'background-position': 'center center'
  },
  grid2: {
    '--g1': 'rgb(var(--grid-bg))',
    '--g2': 'rgb(var(--grid-color))',
    height: '16rem',
    'background-image':
      'linear-gradient(to right, var(--g2, blue) 1px, transparent 1px), linear-gradient(to bottom, var(--g2, red) 1px, transparent 1px)',
    'background-size': '2.5rem 2.5rem',
    'background-position': 'center center'
  },
  'grid-dot': {
    '--g1': 'rgb(var(--grid-color, 255 0 0))',
    '--g2': 'rgb(var(--dot-color, 255 0 0)',
    height: '16rem',
    'background-image': 'radial-gradient(circle, var(--g2, red) 2px, var(--g1, red) 2px)',
    'background-size': '2.5rem 2.5rem',
    'background-position': 'center center'
  }
})

const propertyBased = {
  display: {
    block: 'block',
    iblock: 'inline-block',
    flex: 'flex',
    iflex: 'inline-flex',
    none: 'none'
  },
  flexDirection: {
    'flex-col': 'column'
  },
  position: {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky'
  },
  alignItems: {
    fill: 'stretch'
  },
  justifyContent: {
    space: 'space-between'
  },
  fontSize: {
    'text-xs': '12px',
    'text-sm': '14px'
  },
  fontStyle: {
    italic: 'italic'
  },
  '--ring-offset-width': {
    'ring-offset-0': '0px',
    'ring-offset-1': '1px',
    'ring-offset-2': '2px',
    'ring-offset-4': '4px',
    'ring-offset-8': '8px'
  },
  '--ring-offset': {
    'ring-offset-0': '0 0 0 var(--ring-offset-width) rgb(var(--ring-offset-color, 0 0 0))',
    'ring-offset-1': '0 0 0 var(--ring-offset-width) rgb(var(--ring-offset-color, 0 0 0))',
    'ring-offset-2': '0 0 0 var(--ring-offset-width) rgb(var(--ring-offset-color, 0 0 0))',
    'ring-offset-4': '0 0 0 var(--ring-offset-width) rgb(var(--ring-offset-color, 0 0 0))',
    'ring-offset-8': '0 0 0 var(--ring-offset-width) rgb(var(--ring-offset-color, 0 0 0))'
  },
  boxShadow: {
    // shadow
    'shadow-sm': '0 1px 2px 0 rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.05))',
    shadow:
      '0 1px 3px 0 rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 1px 2px -1px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
    'shadow-md':
      '0 4px 6px -1px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 2px 4px -2px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
    'shadow-lg':
      '0 10px 15px -3px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 4px 6px -4px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
    'shadow-xl':
      '0 20px 25px -5px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1)), 0 8px 10px -6px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.1))',
    'shadow-2xl': '0 25px 50px -12px rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.25))',
    'shadow-inner': 'inset 0 2px 4px 0 rgb(var(--shadow-color, 0 0 0) / var(--shadow-opa, 0.05))',
    'shadow-none': '0 0 #0000',
    // ring
    'ring-0':
      'var(--ring-offset), 0 0 0 calc(0px + var(--ring-offset-width)) rgb(var(--ring-color, 0 0 0))',
    'ring-1':
      'var(--ring-offset), 0 0 0 calc(1px + var(--ring-offset-width)) rgb(var(--ring-color, 0 0 0))',
    'ring-2':
      'var(--ring-offset), 0 0 0 calc(2px + var(--ring-offset-width)) rgb(var(--ring-color, 0 0 0))',
    ring: 'var(--ring-offset), 0 0 0 calc(3px + var(--ring-offset-width)) rgb(var(--ring-color, 0 0 0))',
    'ring-4':
      'var(--ring-offset), 0 0 0 calc(4px + var(--ring-offset-width)) rgb(var(--ring-color, 0 0 0))',
    'ring-8':
      'var(--ring-offset), 0 0 0 calc(8px + var(--ring-offset-width)) rgb(var(--ring-color, 0 0 0))',
    'ring-inset': 'inset 0 0 0 0 rgb(var(--ring-color, 0 0 0))'
  }
}

export const classes = merge(classNameBased, propertyBased)
