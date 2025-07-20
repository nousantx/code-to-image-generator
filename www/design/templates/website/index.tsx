import { useTheme } from '@/hooks/useTheme'
import BrowserUi from './components/browser-ui'

const width = 1556
const height = 1140
export const config = {
  width,
  height,
  scale: 1,
  format: 'html',
  control: false,
  name: 'website-design-template'
}

function Design() {
  return (
    <main className="flex items-center justify-center h-full">
      <h1 className="text-6xl font-medium tracking-tighter">Your code goes here.</h1>
    </main>
  )
}

export function Content() {
  const { isDark } = useTheme()

  return (
    <div
      data-theme={isDark ? 'dark' : 'light'}
      className={`w-${width}px h-${height}px bg-linear-125deg from-rose-400 to-fuchsia-500 relative`}
    >
      <BrowserUi title="TenoxUI" link="localhost:5000/design/tenoxui" protocol="ssh">
        <Design />
      </BrowserUi>
    </div>
  )
}

export default { Content, config }
