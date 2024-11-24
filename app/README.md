# Code-to-Image app

Generate image from html DOM.

## Style Guide

### Add your first object

Adding simple red square box by adding class names like this:

```html
<div class="box-200px bg-red-500"></div>
```

The `box-` is the shorthand for css properties `width` and `height`, and `200px` is the value for both of them.

### Shorthands

Under [properties.js](./packages/config/lib/properties.js), you can add class name prefix or shorthand for css properties or variables to make it easier to writing your style.

Example:

```javascript
const property = {
  bg: 'backgroundColor', // => background-color: {value};
  text: 'color', // => color: {value};
  box: ['width', 'height'], // => width: {value}; height: {value};
  'my-var': '--my-var-color', // => --my-var-color: {value};
  gradient: {
    property: 'backgroundImage',
    value: 'linear-gradient(to right, {0}, blue)'
    // => background-image: linear-gradient(to right, {value}, blue)
  }
}
```

Usage:

```html
<div class="bg-black"></div>
<div class="text-white"></div>
<div class="box-200px bg-red"></div>
<div class="my-var-blue text-$my-var-color"></div>
<div class="box-200px gradient-red"></div>
```

Without shorthands, your class names will looks like this:

```html
<div class="[background-color]-black"></div>
<div class="[color]-white"></div>
<div class="[width,height]-200px [background-color]-red"></div>
<div class="[--my-var-color]-blue [color]-$my-var-color"></div>
<div class="[width,height]-200px [background-image]-[linear-gradient(to_right,_red,_blue)]"></div>
```

### Aliases

In [values.js](./packages/config/lib/values.js) file, you can add value aliases.

Example:

```javascript
const values = {
  full: '100%',
  'my-size': 'calc(20px + 2rem)',
  'its-not-red': 'blue',
  'my-bg': 'linear-gradient(to right, red, blue)'
}
```

Usage:

```html
<div class="[width]-full"></div>
<div class="bg-its-not-red"></div>
<div class="box-my-size bg-red"></div>
<div class="box-200px bg-my-bg"></div>
```

### Creating Utility-first & Utility-class

In [classes.js](./packages/config/lib/classes.js) file, you can define your utility classes easily.

Example:

```javascript
import { merge, transformClasses } from '@nousantx/someutils'

// will transformed into utility-first based
const utilityClasses = transformClasses({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    /*
     * .center {
     *   display: flex;
     *   justify-content: center;
     *   align-items: center;
     * }
     */
  },
  border: {
    '--border-color': 'currentColor',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-color)'
    /*
     * .border {
     *   --border-color: currentColor;
     *   border-width: 1px;
     *   border-style: 1px;
     *   border-color: var(--border-color);
     * }
     */
  }
})

const utilityFirst = {
  display: {
    flex: 'flex', // .flex { display: flex }
    iflex: 'inline-flex' // .iflex { display: inline-flex }
    // ...
  },
  fontSize: {
    'text-xs': '12px',
    'text-2xl': '4rem'
    // ...
  },
  fontWeight: {
    'font-medium': '500',
    'font-normal': '400'
    // ...
  },
  // You can also stacking the class name to make it similar to regular css.
  // Example: We already define `text-2xl` to set the font-size, and now lets add the lineHeight as well.
  lineHeight: {
    'text-2xl': '1.2' // .text-2xl { font-size: 4rem; line-height: 1.2; }
  }
}

// merge the classes with custom merge function
const classes = merge(utilityFirst, utilityClasses)
```

Usage:

```html
<div class="box-200px center border text-2xl">Hello</div>
<div class="iflex text-sm font-medium"></div>
```

And you can actually apply the prefixes as well. Example:

```html
<div class="box-200px text-2xl hover:center focus:border">Hello</div>
<div class="flex hover:iflex text-sm hover:text-2xl font-medium hover:font-normal"></div>
```

### Adding Colors

Under [color.js](./packages/config/lib/color.js) file, you can modify or add the colors you want, but make sure the color is **neutral** (not too light or dark).

The color you included will generated as 11 shades color (50, 100, ..., 950). So, you dont have to worry aboud finding good color shades yourself.

Usage:

```javascript
const color = {
  red: '#fbe0e0', // too light
  red: '#3a0404', // too dark
  red: '#e44949', // nice

  primary: '#3e8aea', // not too light or dark
  // other color name
  'my-awesome-color': '#af49e4'
}
```

You can access the color value by using it in the class name like this:

```
{properties}-{colorName}-{shade}
```

Example:

```html
<div class="text-primary-950 bg-primary-50"></div>
<div class="bg-red-500"></div>
<div class="bg-my-awesome-color-300"></div>
```

### Adding Global Styles

Under [global.js](./packages/config/lib/global.js) file, you can add styles for custom selector from string.

You can define the styles like this:

```
({selector}): {styles};
```

Example:

```javascript
const globals = `
  (body): bg-neutral-100 m-0;
  (.wrapper): w-mx-1200px mx-auto p-1rem;
  (.wrapper .title): fs-2.5rem fw-600;
`
```

NOTE: The defined styles will later included into `<html>` tag's `child` attribute, this is tenoxui attributify feature to give styles for child elements. And if you put the string inside `<html>` tag, the styles is accessible to all elements.

Example:

```html
<html child="(body): bg-red;">
  ...
</html>
```
