import { render, ui } from '@tenoxui-lib'
import { styles } from '@/styles'

export const generateHTML = async (htmlContent: string): Promise<string> => {
  const temp = document.createElement('div')
  temp.innerHTML = htmlContent
  const googleFontsLink = document.getElementById('google-fonts') as HTMLLinkElement | null
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated HTML File | Code-to-Image Generator by NOuSantx</title>
    ${googleFontsLink?.href ? `<link rel="stylesheet" href="${googleFontsLink.href}">` : ''}
    <style>
      ${ui.render(styles)}
      ${render(temp)}
    </style>
  </head>
  <body>
    ${temp.innerHTML}
  </body>
</html>`
  return htmlTemplate
}
