import { init } from '../styles/init'
import CodeBlock from '../components/codeBlock.jsx'

export const Guide = () => {
  init()
  return (
    <article
      class="p-2rem w-mx-768px mx-auto"
      child="(.code-block): mt-1rem p-1rem br-8px bg-slate-900 family-code tw-nowrap over-x-scroll text-green-400 fs-14px;"
    >
      <header>
        <h1 class="heading1">Guides</h1>
      </header>
      <section class="mt-1rem" child="(p): fs-1rem fw-500 ls--0.015em lh-1.4 text-neutral-700;">
        <p>See some rules and styling guides to make it easier to create your images.</p>
        <h2 class="mt-2.5rem heading2">Styling Guide</h2>
        <p class="mt-1rem">
          This section is a slight guides to use TenoxUI, but you can always check out{' '}
          <a
            href="https://tenoxui.web.app"
            class="all-unset text-blue-700 hover:text-rose-600 tr-time-150ms [text-decoration-line]-underline [text-decoration-style]-dashed"
          >
            TenoxUI documentation
          </a>{' '}
          for more.
        </p>
        <h3 class="mt-1.5rem heading3">1. Shorthands</h3>
        <p class="mt-1rem">
          Initially, you can write any CSS properties or variables directly in element's class, like
          the example before:
        </p>
        <CodeBlock code={'<div class="[display]-flex [width,height]-200px"></div>'} />
        <p class="mt-1rem">And the output code will looks like this:</p>
        <CodeBlock code={'<div style="display: flex; width: 200px; height: 200px;"></div>'} />
        <p class="mt-1rem">
          Yes, it's indeed already powerful. But, you may want to use a{' '}
          <span class="light italic">shorthand</span> for that exact properties or variables. For
          example:
        </p>
        <CodeBlock code={'<div class="d-flex box-200px"></div>'} />

        <p class="mt-1rem">
          Well, now it just looks like a utility-first CSS, right? Because this is what tenoxui
          build for. By default, this website already has pre-defined shorthands from
          <span class="code">@tenoxui/property</span> and some other manually written as well.
        </p>

        <p class="mt-1rem">This is how the shorthand looks like:</p>

        <div class="code-block" child="(p): fs-inherit;">
          <p class="var">
            const <span class="tag">property</span> = {'{'}
          </p>
          <p class="comment pl-2ch">// regular properties</p>
          <p class="tag pl-2ch">
            d<span class="var">:</span> <span class="string">{"'display'"}</span>
            <span class="var">,</span>
          </p>
          <p class="tag pl-2ch">
            text<span class="var">:</span> <span class="string">{"'color'"}</span>
            <span class="var">,</span>
          </p>
          <p class="comment pl-2ch">// multiple properties</p>
          <p class="tag pl-2ch">
            box<span class="var">:</span> [<span class="string">{"'width'"}</span>
            <span class="var">, </span>
            <span class="string">{"'height'"}</span>]<span class="var">,</span>
          </p>
          <p class="comment pl-2ch">// css variable</p>
          <p class="tag pl-2ch">
            'my-var'<span class="var">:</span> <span class="string">{"'--my-color'"}</span>
            <span class="var">,</span>
          </p>
          <p class="var">{'}'}</p>
        </div>

        <p class="mt-1rem">Usage example:</p>

        <CodeBlock code={'<div class="d-flex box-50px"></div>'} />
        <p class="mt-1rem">Using css variable:</p>
        <CodeBlock code={'<div class="my-var-#ccf654 text-$my-color"></div>'} />
        <p class="mt-1rem">
          See more example{' '}
          <a
            href="https://github.com/nousantx/code-to-image-generator/blob/main/app/src/styles/lib/properties.js"
            class="all-unset text-blue-700 hover:text-rose-600 tr-time-150ms [text-decoration-line]-underline [text-decoration-style]-dashed"
          >
            here
          </a>
          .
        </p>

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
