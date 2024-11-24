import { useLayoutEffect } from 'preact/hooks'
import { MakeTenoxUI } from '@tenoxui/core/full'
import { globalStyles } from '@app/packages/config/lib/global'
import { config } from '@app/packages/config'

export function init() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('child', globalStyles)
    document.querySelectorAll('*').forEach((element) => {
      new MakeTenoxUI({ element, ...config }).useDOM()
    })
  }, [])
}

export { config } from '@app/packages/config'
