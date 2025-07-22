import { Ngurai } from '@nguraijs/core'
import { html, processTokens } from '@lib/syntax-highlighter'
import { DesignOptions } from '@/components/designControl'

const nx = new Ngurai(html)

const width = 700
const height = 400

export const config: DesignOptions = {
  name: 'Codesnap Example',
  control: true,
  scale: 4,
  height,
  width,
  styles: {
    '.token.keyword': 'font-medium text-emerald-500',
    '.token.string': 'text-sky-400 font-medium',
    '.token.punctuation': 'text-gray-500',
    '.token.identifier': 'text-gray-200',
    '.token.global': 'text-gray-400',
    '.token.number': 'text-amber-600',
    '.token.comment': 'text-gray-500 italic'
  }
}

export const Content = () => {
  const tokens = nx.process(`<div class="bg-red size-500">
  <span class="font-mono">Hello World!</span>
</div>`)

  return (
    <div
      class={`w-${width}px h-${height}px flex items-center justify-center text-white gap-4 bg-linear--46deg from-fuchsia-500 to-amber-400`}
    >
      <div class="bg-gray-900 rounded-lg overflow-hidden border border-neutral-500/70 shadow-2xl shadow-neutral-950/70">
        <div class="p-4 border-b border-neutral-500/70">
          <div class="flex items-center gap-2 [&_div]:size-16px [&_div]:rounded-full">
            <div class="bg-red-500"></div>
            <div class="bg-yellow-500"></div>
            <div class="bg-green-500"></div>
          </div>
        </div>

        <div class="p-4 leading-[1.6] flex gap-3">
          <pre class="text-gray-400 w-2ch">
            {tokens.map((_, index) => {
              return <p class="text-right">{index + 1}</p>
            })}
          </pre>

          <pre
            class="font-mono whitespace-pre text-nowrap"
            dangerouslySetInnerHTML={{
              __html: processTokens(tokens)
            }}
          />
        </div>
      </div>
    </div>
  )
}
