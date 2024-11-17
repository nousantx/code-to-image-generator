export const templates = {
  start: `<div class="box-500px center family-poppins">
  <div class="bg-blue-500 fw-600 ls--0.030em box-236px text-neutral-50 fs-5rem br-1rem p-2rem">
    Hello <span class="bg-yellow-500 text-neutral-950 px-2rem br-1rem">World!</span>
  </div>
</div>`,
  text: `<div class="bg-teal-500 w-1000px h-1000px center flex-col text-neutral-50 family-poppins">
  <div class="fw-700 fs-5rem ls--0.035em">
    Edit This!
  </div>
</div>`,
  card: `<div class="w-1000px h-1000px center family-inter">
  <div class="bg-neutral-50 shadow-lg p-2rem br-1rem">
    <div class="fw-800 fs-3rem mb-1rem">Card Title</div>
    <div class="fs-1rem">Card content goes here</div>
  </div>
</div>`,
  banner: `<div class="w-1000px h-1000px center bgi-[linear-gradient(45deg,_#ff6b6b,_#4ecdc4)] family-sans">
  <div class="text-neutral-100 ta-center">
    <div class="fw-600 fs-6rem mb-1rem ls--0.015em lh-1">Banner Title</div>
    <div class="fs-2rem">Subtitle text</div>
  </div>
</div>`,
  codesnap: `<div class="box-1000px center fw-500">
  <div
    class="[--or-200]-purple-500 [--or-500]-orange-500 p-3rem bgi-[linear-gradient(125deg,_rgb(var(--or-200)),_rgb(var(--or-500)))] br-1rem family-code text-neutral-50 flex w-mn-450px w-min-content"
  >
    <div
      class="w-full br-1rem bg-neutral-950 bg-opacity-0.6 bw-2px bs-solid bdr-c-neutral-500 [--bdr-c-opacity]-0.4"
    >
      <div
        class="w-full relative center bw-0 bw-bottom-2px bs-solid bdr-c-neutral-500 [--bdr-c-opacity]-0.4 p-2rem"
      >
        <div class="text-neutral-200 fw-500">tenoxui.ts</div>
        <div class="center gap-8px absolute l-2rem" child="(div): box-16px br-100% bg-opacity-1;">
          <div class="bg-green-500"></div>
          <div class="bg-yellow-500"></div>
          <div class="bg-red-500"></div>
        </div>
      </div>
      <div
        class="[--lh]-1.4em flex gap-2ch p-2rem lh-$lh"
        child="(.empty-line): tw-nowrap italic text-neutral-500 [--text-opacity]-0 h-$lh;"
      >
        <div class="fs-16px text-neutral-300 ta-right">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div class="fs-16px text-neutral-200">
          <p class="tw-nowrap">
            <span class="text-purple-400">import</span>
            <span class="text-yellow-500"
              >{
              <span class="text-neutral-200">tenoxui</span>
              } <span class="text-purple-400">from</span>
              <span class="text-green-500">'tenoxui'</span>
            </span>
          </p>
          <p class="tw-nowrap">
            <span class="text-purple-400">import</span>
            <span class="text-yellow-500">
              {
              <span class="text-neutral-200">property</span>
              } <span class="text-purple-400">from</span>
              <span class="text-green-500">'@tenoxui/property'</span>
            </span>
          </p>
          <p class="tw-nowrap">
            <span class="text-purple-400">import</span>
            <span class="text-yellow-500">
              {
              <span class="text-neutral-200">
                MakeTenoxUI <span class="text-purple-400">as</span> Engine
              </span>
              } <span class="text-purple-400">from</span>
              <span class="text-green-500">'@tenoxui/core/full'</span>
            </span>
          </p>
          <p class="empty-line"></p>
          <p class="tw-nowrap italic text-neutral-500">// TenoxUI Syntax</p>
          <p class="tw-nowrap">
            <span class="text-blue-400">tenoxui</span>
            <span class="text-rose-400"> <span class="text-yellow-500">(</span>{ </span>
          </p>
          <p class="tw-nowrap pl-2ch">
            <span class="text-neutral-200">
              property<span class="text-rose-400"
                >: {
                <span class="text-blue-400">...</span>
                <span class="text-neutral-200">property</span>,
                <span class="text-neutral-200">bg</span>:
                <span class="text-green-500">'background'</span>
                },
              </span>
            </span>
          </p>
          <p class="tw-nowrap pl-2ch">
            <span class="text-neutral-200">
              customEngine<span class="text-rose-400"
                >:<span class="text-neutral-200"> Engine</span>,
              </span>
            </span>
          </p>
          <p class="tw-nowrap pl-2ch">
            <span class="text-neutral-200">
              useClass<span class="text-rose-400"
                >: <span class="text-yellow-400">false</span>,
              </span>
            </span>
          </p>
          <p class="tw-nowrap pl-2ch">
            <span class="text-neutral-200">
              attributify<span class="text-rose-400"
                >: <span class="text-yellow-400">true</span>,
              </span>
            </span>
          </p>
          <p class="tw-nowrap pl-2ch">
            <span class="text-neutral-200">
              attributifyPrefix<span class="text-rose-400"
                >: <span class="text-green-500">'tx-'</span>
              </span>
            </span>
          </p>

          <p class="tw-nowrap">
            <span class="text-yellow-500"> <span class="text-rose-400">}</span>) </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`
}
