import { useLayoutEffect } from 'preact/hooks'
import { MakeTenoxUI } from '@tenoxui/core/full'
import { globalStyles } from './lib/global'
import { tenoxuiConfig as config } from './lib/config'

export function init() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('child', globalStyles)
    document.querySelectorAll('*').forEach((element) => {
      new MakeTenoxUI({ element, ...config }).useDOM()
    })
  }, [])
}

export { tenoxuiConfig } from './lib/config'
