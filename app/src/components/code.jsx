const Code = () => (
  <div class="mt-1rem w-full br-8px bg-slate-950 bg-opacity-1 bw-2px bs-solid bdr-c-neutral-500 [--bdr-c-opacity]-0.4 family-code d-none">
    <div class="w-full center jc-flex-start bw-0 bw-bottom-2px bs-solid bdr-c-neutral-500 [--bdr-c-opacity]-0.4 p-1rem">
      <div class="text-neutral-200 fw-500">index.html</div>
    </div>
    <div
      class="[--lh]-1.8em flex gap-2ch p-1rem lh-$lh"
      child="
            (.empty-line): tw-nowrap italic text-neutral-500 [--text-opacity]-0 h-$lh;
            (.tag): text-rose-400;
            (.string): text-yellow-400;
            (.attr-tag): text-neutral-100;
            (.attr): text-neutral-200 italic;
            "
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
      <div class="fs-16px text-neutral-200 over-scroll" child="(p): tw-nowrap;">
        <p>
          <span class="tag">{'<'}</span>
          <span class="attr-tag">
            div <span class="attr">class</span>
            <span class="tag">=</span>
            <span class="string iflex ai-center">'bg-red-500 box-250px'</span>
          </span>
          <span class="tag">{'>'}</span>
        </p>
        <p class="pl-2ch text-neutral-100">Hello World!</p>
        <p>
          <span class="tag">{'</'}</span>
          <span class="attr-tag">div</span>
          <span class="tag">{'>'}</span>
        </p>
      </div>
    </div>
  </div>
)
