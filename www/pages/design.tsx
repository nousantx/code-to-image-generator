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
    name = `untitled-${new Date()
      .toISOString()
      .slice(2, 19)
      .replace(/[-:]/g, '')
      .replace('T', '-')}`,
    control = true,
    full = false
  } = config

  if (!control) return <Content />

  const clamp = (scale: number, max: number, min: number): number => (scale > max ? min : scale)

  return (
    <DeclarativeDesign
      width={clamp(width, 5000, 1000)}
      height={clamp(height, 5000, 1000)}
      scale={clamp(scale, 5, 1)}
      format={format}
      autoGenerate={true}
      showControls={true}
      fileName={name}
      full={full}
    >
      <Content />
    </DeclarativeDesign>
  )
}
