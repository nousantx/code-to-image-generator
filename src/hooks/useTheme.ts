import { useState, useEffect } from 'preact/hooks'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }

    const docTheme = document.documentElement.getAttribute('data-theme')
    if (docTheme) {
      return docTheme === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)

    localStorage.setItem('theme', theme)
  }, [isDark])

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  const toggleTheme = () => setIsDark(!isDark)

  return { isDark, toggleTheme }
}
