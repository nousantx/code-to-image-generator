import { preset } from '@tenoxui/preset-tailwind'

const { variants, ...config } = preset()

export default {
  ...config,
  variants: { ...variants, dark: "value:[data-theme='dark'] &" }
}
