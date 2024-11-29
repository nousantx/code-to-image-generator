import { MakeTenoxUI } from '@tenoxui/core/full'
import { config } from '@app/packages/config'
import { removeAttributes } from './removeAttributes'

export const generateHTML = async (htmlContent) => {
  const temp = document.createElement('div')
  temp.innerHTML = htmlContent
  temp.querySelectorAll('*').forEach((element) => {
    new MakeTenoxUI({ element, ...config }).useDOM()
  })
  const googleFontsLink = document.getElementById('google-fonts')

  removeAttributes(temp)

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated HTML File | Code-to-Image Generator by NOuSantx</title>
    <link rel="stylesheet" href="${googleFontsLink.href}">
  </head>
  <body>
    ${temp.innerHTML}
  </body>
</html>`

  return htmlTemplate
}
