import { render } from 'preact'
import 'virtual:tenoxui.css'
import { useLocation, LocationProvider, Router, Route } from 'preact-iso'
import { App } from './pages/home'
import { Design } from './pages/design'
import { useTheme } from './hooks/useTheme'
import { RiMoonClearLine, RiSunLine } from '@remixicon/react'
import TenoxUIDevMode from './styles/styler'

interface LinkProps {
  href: string
  children: string
  className?: string
  activeClassName?: string
}

export function Link({ href, children, className = '', activeClassName = '' }: LinkProps) {
  const { url } = useLocation()
  const isActive = url === href
  const finalClassName = `${className} ${isActive ? activeClassName : ''}`.trim()

  const handleClick = (e: Event) => {
    e.preventDefault()
    if (url !== href) {
      window.history.pushState({}, '', href)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

  return (
    <a href={href} className={finalClassName} onClick={handleClick}>
      {children}
    </a>
  )
}

const isDev = import.meta.env.DEV

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
        {isDev ? (
          <>
            <nav className="fixed [left,bottom]-0 px-2rem py-1.5rem flex gap-1rem shadow-md rounded-tr-1rem bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50 border-neutral-500/70 border z-999">
              <Link href="/">Home</Link>
              <Link href="/design">Design</Link>
            </nav>
            <LocationProvider>
              <Router>
                <Route path="/" component={App} />
                <Route path="/design" component={Design} />
              </Router>
            </LocationProvider>
          </>
        ) : (
          <App />
        )}
      </div>
    </TenoxUIDevMode>
  )
}

render(<Root />, document.getElementById('app')!)
