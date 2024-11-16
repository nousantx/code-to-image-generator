import { useLayoutEffect } from 'react'
import { MakeTenoxUI } from '@tenoxui/core/full'
import { property } from '@tenoxui/property'
import { merge, createProperty } from '@nousantx/someutils'
import { standardAttributes, reactAttributes } from '@nousantx/list-attribute'
import { colors } from './color'

export const tenoxuiConfig = {
  property: {
    ...property,
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
    'bg-opacity': '--bg-opacity',
    'text-opacity': '--text-opacity',
    shadow: '--shadow-color'
  },
  values: {
    ...colors,
    full: '100%',
    family: {
      code: 'JetBrains Mono, monospace',
      sans: 'Inter, sans-serif'
    }
  },
  classes: {
    display: {
      block: 'block',
      iblock: 'inline-block',
      flex: 'flex',
      iflex: 'inline-flex',
      center: 'flex',
      hidden: 'none'
    },
    position: {
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky'
    },
    alignItems: {
      center: 'center'
    },
    justifyContent: {
      center: 'center',
      space: 'space-between'
    },
    fontStyle: {
      italic: 'italic'
    },
    boxShadow: {
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
      'shadow-none': '0 0 #0000'
    }
  },
  attributify: true,
  attributify: [...standardAttributes, ...reactAttributes]
}

export function init() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      'child',
      `
(body): fw-500 bg-neutral-50 text-neutral-950;
(textarea): w-100% h-mn-400px p-1rem over-x-scroll tw-nowrap;
(.btn): [all]-unset h-40px d-inline-flex ai-center px-12px [cursor]-pointer bg-neutral-900 hover:bg-neutral-800 tr-time-300ms text-neutral-50 br-8px fs-14px fw-500;
(.text): fw-500 ls--0.035em fs-14px;`
    )
    document.querySelectorAll('*').forEach((element) => {
      new MakeTenoxUI({ element, ...tenoxuiConfig }).useDOM()
    })
  }, [])
}
