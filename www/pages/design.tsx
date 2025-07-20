import { DeclarativeDesign } from '../components/designControl'
import { Content, config } from '@/design'

const isDev = import.meta.env.DEV

export function Design() {
  if (!isDev) {
    return (
      <main className="h-screen flex items-center justify-center p-8">
        <header className="text-center text-balance">
          <h1 className="text-6xl font-semibold">Oops!</h1>
          <p className="text-xl mt-6">This page is only available on dev mode!</p>
        </header>
      </main>
    )
  }

  const {
    width = 1000,
    height = 1000,
    scale = 1,
    format = 'jpg',
    fileName = `untitled-${new Date()
      .toISOString()
      .slice(2, 19)
      .replace(/[-:]/g, '')
      .replace('T', '-')}`,
    control = true
  } = config

  if (!control) return <Content />

  return (
    <DeclarativeDesign
      width={width}
      height={height}
      scale={scale}
      format={format}
      autoGenerate={true}
      showControls={true}
      fileName={fileName}
    >
      <Content />
    </DeclarativeDesign>
  )
}
