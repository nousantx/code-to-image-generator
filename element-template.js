
const templates = {
  start: `<div class="box-1000px center family-poppins">
  <div class="bg-blue fw-600 ls--0.030em box-236px text-neutral-50 fs-5rem br-1rem p-2rem">
    Hello <span class="bg-yellow text-neutral-950 px-2rem br-1rem">World!</span>
  </div>
</div>`,
  simple: `<div class="w-1000px h-1000px center" style="font-family: Poppins;">
  <div class="fw-700 fs-5rem">
    Simple Text Design
  </div>
</div>`,
  card: `<div class="w-1000px h-1000px center family-inter">
  <div class="bg-white p-2rem br-1rem" style="box-shadow: 0 4px 6px rgba(0,0,0,0.1)">
    <div class="fw-800 fs-3rem mb-1rem">Card Title</div>
    <div class="fs-1rem">Card content goes here</div>
  </div>
</div>`,
  banner: `<div class="w-1000px h-1000px center bg-[linear-gradient(45deg,_#ff6b6b,_#4ecdc4)]">
  <div class="text-white ta-center">
    <div class="fw-800 fs-6rem mb-1rem">Banner Title</div>
    <div class="fs-2rem">Subtitle text</div>
  </div>
</div>`,
  codesnap: `<div
  class="[--or-200]-purple-500 [--or-500]-orange-500 p-3rem bg-[linear-gradient(125deg,_rgb(var(--or-200)),_rgb(var(--or-500)))] br-1rem family-code text-neutral-50 flex w-mn-450px w-min-content"
>
  <div class="w-full br-1rem p-2rem bg-[rgb(0_0_0_/_0.6)] bdr-[2px_solid_#cccccc50]">
    <div class="w-full relative center">
      <div class="text-neutral-200 fw-500">index.ts</div>
      <div class="center gap-8px absolute l-0" child="(div): box-16px br-100%;">
        <div class="bgc-green-500"></div>
        <div class="bgc-yellow-500"></div>
        <div class="bgc-red-500"></div>
      </div>
    </div>
    <div class="flex mt-2rem gap-2ch p-1ch lh-0.8">
      <div class="fs-16px text-neutral-300 ta-right">
        <p>1</p>
        <p>2</p>
        <p>11</p>
      </div>
      <div class="fs-16px text-neutral-200">
        <p class="tw-nowrap italic text-neutral-500">// This is a comment</p>
        <p class="tw-nowrap">
          <span class="text-orange-500">console</span>.<span class="text-blue-500">log</span>(<span
            class="text-green-500"
            >"Hello World!"</span
          >)
        </p>
        <p class="tw-nowrap">
          <span class="text-orange-400">console</span>.<span class="text-blue-400">log</span>(<span
            class="text-green-400"
            >"Hello World!"</span
          >)
        </p>
      </div>
    </div>
  </div>
</div>`
}


const elementTemplates = {
  text: {
    title: {
      name: 'Title',
      template: `
<div class="text-[#1a1a1a] fs-4rem fw-700 family-Poppins mb-1rem">
  Title Text
</div>`
    },
    subtitle: {
      name: 'Subtitle',
      template: `
<div class="text-[#4a4a4a] fs-2rem fw-500 family-Poppins mb-1rem">
  Subtitle Text
</div>`
    },
    accent: {
      name: 'Accent Text',
      template: `
<div class="text-[#2563eb] fs-2rem fw-500 family-Poppins">
  Accent Text
</div>`
    },
    caption: {
      name: 'Caption',
      template: `
<div class="text-[#6b7280] fs-1rem fw-400 family-Inter">
  Caption text goes here
</div>`
    }
  },
  shapes: {
    blueSquare: {
      name: 'Blue Square',
      template: `
<div class="w-100px h-100px" style="background-color: #3b82f6;"></div>`
    },
    redCircle: {
      name: 'Red Circle',
      template: `
<div class="w-100px h-100px br-50%" style="background-color: #ef4444;"></div>`
    },
    greenRect: {
      name: 'Green Rectangle',
      template: `
<div class="w-200px h-100px" style="background-color: #22c55e;"></div>`
    },
    purpleShape: {
      name: 'Purple Shape',
      template: `
<div class="w-150px h-150px" style="background-color: #8b5cf6; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);"></div>`
    }
  },
  backgrounds: {
    blueGradient: {
      name: 'Blue Gradient',
      template: `
<div class="w-full h-full" style="background: linear-gradient(45deg, #3b82f6, #2dd4bf);"></div>`
    },
    sunsetGradient: {
      name: 'Sunset',
      template: `
<div class="box-200px" style="background: linear-gradient(45deg, #f97316, #ec4899);"></div>`
    },
    coolGradient: {
      name: 'Cool Tones',
      template: `
<div class="w-full h-full" style="background: radial-gradient(circle, #818cf8, #2dd4bf);"></div>`
    }
  },
  containers: {
    whiteCard: {
      name: 'White Card',
      template: `
<div class="p-2rem br-1rem bg-white" style="box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <div class="text-[#1a1a1a] fw-600 fs-2rem mb-1rem">Card Title</div>
  <div class="text-[#4a4a4a] fs-1rem">Card content here</div>
</div>`
    },
    darkCard: {
      name: 'Dark Card',
      template: `
<div class="p-2rem br-1rem bg-[#1a1a1a]">
  <div class="text-white fw-600 fs-2rem mb-1rem">Dark Card</div>
  <div class="text-[#e5e5e5] fs-1rem">Dark card content here</div>
</div>`
    },
    accentPanel: {
      name: 'Accent Panel',
      template: `
<div class="p-1rem br-8px bg-[#2563eb]">
  <div class="text-white fs-1rem">Accent panel content</div>
</div>`
    }
  }
}

function createElementButtons() {
  const existingConfig = document.getElementById('element-insert')
  Object.entries(elementTemplates).forEach(([category, elements]) => {
    const categoryDiv = document.createElement('div')
    categoryDiv.className = 'my-2rem'

    const categoryTitle = document.createElement('div')
    categoryTitle.className = 'fw-600 mb-10px'
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1)
    categoryDiv.appendChild(categoryTitle)

    const buttonsDiv = document.createElement('div')
    buttonsDiv.className = 'd-flex flex-w-wrap gap-10px'

    Object.entries(elements).forEach(([key, element]) => {
      const button = document.createElement('button')
      button.className = 'btn'
      button.textContent = element.name
      button.onclick = () => insertElement(element.template)
      buttonsDiv.appendChild(button)
    })

    categoryDiv.appendChild(buttonsDiv)
    existingConfig.appendChild(categoryDiv)
  })
}

createElementButtons()
