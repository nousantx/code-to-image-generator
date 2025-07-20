import { render, h } from 'preact'
import 'virtual:tenoxui.css'
import Router from 'preact-router'
import { Link } from 'preact-router/match'
import { App } from './pages/home'
import { Design } from './pages/design'
import { useTheme } from './hooks/useTheme'
import { RiMoonClearLine, RiSunLine } from '@remixicon/react'
import TenoxUIDevMode from './styles/styler'

function Root() {
  const { toggleTheme, isDark } = useTheme()
  return (
    <TenoxUIDevMode>
      <button
        onClick={toggleTheme}
        className="fixed bottom-16 right-4 z-1000 size-35px rounded-6px flex items-center justify-center [&_svg]:size-16px bg-neutral-950 hover:bg-neutral-800 text-neutral-50 transition-colors dark:bg-neutral-50 dark:text-neutral-950"
      >
        {isDark ? <RiMoonClearLine /> : <RiSunLine />}
      </button>

      <div className="h-screen w-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50">
        <nav class="fixed [left,bottom]-0 px-2rem py-1.5rem flex gap-1rem shadow-md rounded-tr-1rem bg-blue-100 z-999">
          <Link href="/">Home</Link>
          <Link href="/design">Design</Link>
        </nav>
        <Router>
          <App path="/" />
          <Design path="/design" />
        </Router>
      </div>
    </TenoxUIDevMode>
  )
}

render(<Root />, document.getElementById('app')!)
