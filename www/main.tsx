import { render, h } from 'preact'
import 'virtual:tenoxui.css'
import 'virtual:tenoxui:dev'
import Router from 'preact-router'
import { Link } from 'preact-router/match'
import { App } from './pages/home'
import { Design } from './pages/design'

render(
  <div>
    <nav class="fixed [left,bottom]-0 px-2rem py-1.5rem flex gap-1rem shadow-md rounded-tr-1rem bg-blue-200 z-999">
      <Link href="/">Home</Link>
      <Link href="/design">Design</Link>
    </nav>
    <Router>
      <App path="/" />
      <Design path="/design" />
    </Router>
  </div>,
  document.getElementById('app')!
)
