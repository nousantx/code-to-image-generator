import { DeclarativeDesign } from '../components/designControl'
import { Content, config } from '@/design'

export function Design() {
  const { width = 1000, height = 1000, scale = 1, format = 'jpg' } = config

  return (
    <DeclarativeDesign
      width={width}
      height={height}
      scale={scale}
      format={format}
      autoGenerate={true}
      showControls={true}
    >
      <Content />
    </DeclarativeDesign>
  )
}
