/**
 * @description Simple JavaScript code to create realtime tenoxui styling playground
 * @repository https://github.com/nousantx/tenoxui-playground-example
 */

const tuiInstances = new Map()

function initializeTenoxUI(config) {
  tuiInstances.clear()
  document.querySelectorAll('#preview *').forEach(element => {
    const instance = new __tenoxui_core.MakeTenoxUI({ element, ...config }).useDOM()
    tuiInstances.set(element, instance)
  })
}

function updatePreview() {
  const htmlContent = document.getElementById('htmlInput').value
  document.getElementById('preview').innerHTML = htmlContent
  try {
    const config = tenoxuiConfig
    initializeTenoxUI(config)
  } catch (error) {
    console.error('Error parsing configuration:', error)
  }
}

document.getElementById('htmlInput').addEventListener('input', updatePreview)
