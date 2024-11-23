# Image Generator

A very lightweight and simple code-to-image generator. You can use every CSS properties inside your element's class name or as html attributes or even use the predefined CSS property shorthands and it will converted into inline-styles.

The element will saved inside SVG's `foreignObject` before it got displayed on a canvas. It's easier to use inline-styles instead of using class names for the element. And that's where tenoxui do its magic, tenoxui will convert those class names, and the  apply them to the element.

## Features

- **Inline-Style Based** - Use any CSS properties
- **Scaling** - Scale your image for better resolution
- **Output Image** - Save the image to PNG, JPEG, WebP, SVG or PDF (image)
- **Save & Load** - Save your current code to a json file and load them later
- **Templates** - Use various starter templates


## Example

To add a simple box, you can just write something like this :

```html
<div class='[width,height]-200px [background]-red'></div>
```

Or use predefined shorthands :

```html
<div class='box-200px bg-red'></div>
```
