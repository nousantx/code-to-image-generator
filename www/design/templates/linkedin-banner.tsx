/**
 * a simple LinkedIn banner template, ready to edit and use.
 */

const width = 1584
const height = 396

export const config = {
  width,
  height,
  scale: 1,
  format: 'jpg',
  control: false
}

export const Content = () => {
  return (
    <div
      className={`w-${width}px h-${height}px bg-slate-50 text-slate-950 flex overflow-hidden relative isolate items-center justify-center`}
    >
      <div
        className={`[width,maxWidth]-[${
          width / 2
        }px] h-full text-4xl font-medium tracking-tight p-12`}
      >
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-6px">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.336 18.339h-2.665v-4.177c0-.996-.02-2.278-1.39-2.278c-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387c2.7 0 3.2 1.778 3.2 4.092v4.714M7.004 8.575a1.546 1.546 0 0 1-1.548-1.549a1.548 1.548 0 1 1 1.547 1.549m1.336 9.764H5.667V9.75H8.34zM19.67 3H4.33C3.594 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.339C20.4 21 21 20.42 21 19.703V4.297C21 3.581 20.4 3 19.666 3z"
              />
            </svg>

            <span>Let's Connect!</span>
          </div>

          <div className="flex items-center p-2 pr-4 rounded-full border w-max shadow-xl">
            <div className="flex items-center justify-center gap-10px">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"
                />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19.989 11.572a7.96 7.96 0 0 0-1.573-4.351a10 10 0 0 1-.92.87a13.2 13.2 0 0 1-3.313 2.01c.167.35.32.689.455 1.009v.003c.027.061.05.118.094.229l.017.04c1.513-.17 3.109-.107 4.656.103q.308.04.584.087m-9.385-7.45a46 46 0 0 1 2.692 4.27c1.223-.482 2.234-1.09 3.048-1.767c.33-.274.594-.532.796-.755A7.97 7.97 0 0 0 12 4q-.714.001-1.396.121M4.253 9.997a29 29 0 0 0 2.04-.123a31.5 31.5 0 0 0 4.862-.822a54 54 0 0 0-2.7-4.227a8.02 8.02 0 0 0-4.202 5.172m1.53 7.038a14 14 0 0 1 1.575-1.899c1.454-1.49 3.17-2.65 5.156-3.29l.062-.018c-.165-.364-.32-.689-.476-.995c-1.836.535-3.77.869-5.697 1.042c-.94.085-1.783.122-2.403.128a7.97 7.97 0 0 0 1.784 5.032m9.221 2.38a36 36 0 0 0-1.632-5.709c-2 .727-3.596 1.79-4.829 3.058a9.8 9.8 0 0 0-1.317 1.655A7.96 7.96 0 0 0 12 20a8 8 0 0 0 3.005-.583m1.874-1.075a8 8 0 0 0 2.987-4.87c-.34-.085-.771-.17-1.245-.236a12 12 0 0 0-3.18-.033a39 39 0 0 1 1.438 5.14M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"
                />
              </svg>
            </div>

            <div className="w-1px h-24px rounded-1 bg-current mx-4"></div>

            <span className="font-mono tracking-tight text-2xl font-medium">@nousantx</span>
          </div>
        </div>
      </div>
      <div
        className={`[width,maxWidth]-[${
          width / 2
        }px] h-full flex items-center justify-center bg-slate-50/20`}
      >
        <header className="text-pretty">
          <h1 className="font-medium tracking-tighter text-16 leading-[1]">
            I ship{' '}
            <span className="underline line-through decoration-rose-500 text-current/30">bugs</span>{' '}
            apps <br /> into production!
          </h1>
        </header>
      </div>

      <div className="absolute size-400px z--1 rounded-full bg-rose-500 blur-100px bottom--80%"></div>
    </div>
  )
}
