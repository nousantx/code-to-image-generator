import { init } from '../styles/init'
import CodeBlock from '../components/codeBlock.jsx'

export const About = () => {
  init()
  return (
    <article
      class="p-2rem w-mx-768px mx-auto"
      child="(.code-block): mt-1rem p-1rem br-8px bg-slate-900 family-code tw-nowrap over-x-scroll text-green-400 fs-14px;"
    >
      <header>
        <h1 class="heading1">What is this?</h1>
      </header>
      <section class="mt-1rem" child="(p): fs-1rem fw-500 ls--0.015em lh-1.4 text-neutral-700;">
        <p>
          This is a fun project that implements code-to-image conversion with a realtime editor &
          preview, simple code editor, and final image output.
        </p>
        <h2 class="mt-2.5rem heading2">Realtime Editor</h2>
        <p class="mt-1.5rem">
          This website uses <span class="light">TenoxUI</span> as its styling engine. The styles are
          applied directly to each element's style attribute (inline-style).
        </p>
        <p class="mt-1rem">
          TenoxUI is particularly powerful for this use case because it doesn't need any server to
          compute the styles. (Client-side only)
        </p>
        <p class="mt-1rem">
          The benefits of using tenoxui is you can use every CSS properties directly in your class
          names. Example:
        </p>
        <CodeBlock code={'<div class="[width,height]-200px [display]-flex">Hello World!</div>'} />
        <p class="mt-1rem">And the output code will looks like this:</p>
        <CodeBlock
          code={'<div style="width: 200px; height: 200px; display: flex;">Hello World!</div>'}
        />
        <p class="mt-1rem">This styling approach can significantly faster to write CSS.</p>

        <h2 class="mt-2.5rem heading2">Image Generation</h2>
        <p class="mt-1.5rem">
          The simplest way to generate an image from code is by drawing to a canvas. Our primary
          goal was to find the most effective way to accomplish this.
        </p>
        <p class="mt-1rem">
          We use SVG's <span class="code">foreignObject</span> to store the element as SVG, then
          render the generated SVG onto the canvas.
        </p>
        <p class="mt-1rem">
          And this is where the tenoxui used, instead of generating a bunch of class names and its
          styles, it's more efficient to use <span class="code">inline-style</span> rather than
          regular CSS.
        </p>
        <p class="mt-1.5rem">
          There are several limitations when generating images on the canvas, such as the inability
          to use backdrop-filter: blur, the need to reduce line-height by 1, and others. Although
          backdrop-filter blur may be generated in the SVG, it won't be rendered on the canvas.
        </p>
      </section>
    </article>
  )
}
