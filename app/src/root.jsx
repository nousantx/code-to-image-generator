import { h } from 'preact'
import Router from 'preact-router'
import { Link } from 'preact-router/match'
import { App } from './app'
import { init } from './styles/init'
import { Colors } from './pages/colors'
import { About } from './pages/about'

const Root = () => {
  const navClass = 'td-none text-neutral-800 fs-1rem lh-1 ls--0.016em fw-500'
  const navClassActive = 'text-neutral-950 fw-600'
  init()
  return (
    <div class="header-nav">
      <nav class="px-2rem py-1.5rem flex gap-1rem shadow-md bg-neutral-50">
        <Link class={navClass} activeClassName={navClassActive} href="/">
          Design
        </Link>
        <Link class={navClass} activeClassName={navClassActive} href="/about">
          About
        </Link>
        <Link class={navClass} activeClassName={navClassActive} href="/colors">
          Colors
        </Link>
      </nav>

      {/* Router */}
      <Router>
        <App path="/" />
        <About path="/about" />
        <Colors path="/colors" />
      </Router>
    </div>
  )
}
export default Root
