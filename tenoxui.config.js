const color = __nsx_color_tools.generateColors({
  option: {
    format: 'object2',
    output: 'rgb-only'
  },
  color: {
    neutral: '#737373', // Tailwind Neutral-500
    red: '#ef4444', // Tailwind Red-500
    green: '#22c55e', // Tailwind Green-500
    yellow: '#eab308', // Tailwind Yellow-500
    orange: '#f97316', // Tailwind Orange-500
    blue: '#3b82f6', // Tailwind Blue-500
    purple: '#a855f7', // Tailwind Purple-500
    teal: '#14b8a6', // Tailwind Teal-500
    pink: '#ec4899', // Tailwind Pink-500
    cyan: '#06b6d4', // Tailwind Cyan-500
    lime: '#84cc16', // Tailwind Lime-500
    amber: '#f59e0b', // Tailwind Amber-500
    indigo: '#6366f1', // Tailwind Indigo-500
    rose: '#f43f5e', // Tailwind Rose-500
    emerald: '#10b981', // Tailwind Emerald-500
    sky: '#0ea5e9' // Tailwind Sky-500
  }
})

const tenoxuiConfig = {
  property: {
    ...TENOXUI_PROPERTY.property,
    ...someutils.createProperty(
      {
        bgc: 'backgroundColor',
        text: 'color',
        'bdr-c': 'borderColor'
      },
      'rgb({0} / var(--{1}-opacity, 1))'
    ),
    // bgc: 'backgroundColor',
    bgi: 'backgroundImage'
  },
  values: {
    ...color,
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
    }
  },
  attributify: true,
  attributify: __attr_list.standardAttributes
}
