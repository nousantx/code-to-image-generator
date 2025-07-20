export default function BrowserUI({
  children,
  title = 'My Cool Website',
  link = 'localhost:3000',
  protocol = 'http',
  className = ''
}) {
  return (
    <article
      className={
        'inset-100px bg-slate-50 rounded-xl absolute text-slate-950 shadow-2xl shadow-slate-950/50 border border-slate-300 flex flex-col overflow-hidden ' +
        className
      }
    >
      <nav className="w-full bg-slate-200 px-4 flex items-stretch border-b border-slate-300 h-12 overflow-hidden">
        <div className="flex h-full gap-2.5 [&_div]:size-3.5 [&_div]:rounded-full items-center">
          <div className="bg-red-500"></div>
          <div className="bg-yellow-500"></div>
          <div className="bg-green-500"></div>
        </div>

        <div className="flex h-full items-end ml-4">
          <div className="flex items-center gap-4">
            <div className="w-60 text-center flex items-center text-xs text-slate-700 tracking-tight border border-b-0 border-slate-300 rounded-md rounded-b-0 bg-slate-100 px-4 h-10 justify-between">
              <div className="flex items-center gap-3.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-slate-700"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  >
                    <path d="M21 3.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6" />
                    <path d="m3 16l7-3l11 5m-5-8a2 2 0 1 1 0-4a2 2 0 0 1 0 4" />
                  </g>
                </svg>
                <span>{title}</span>
              </div>
              <svg
                className="text-slate-400 rotate-45"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                />
              </svg>
            </div>

            <svg
              className="text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 12h6m6 0h-6m0 0V6m0 6v6"
              />
            </svg>
          </div>
        </div>
      </nav>

      <nav className="bg-slate-100 relative z-2 shadow-lg">
        <div className="px-4  py-2 border-slate-300 border-b flex items-center gap-4 [&_svg]:text-slate-700 ![&_svg]:size-18px">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5"
            />
          </svg>

          <svg
            className="!text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 12h18m0 0l-8.5-8.5M21 12l-8.5 8.5"
            />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path d="M21.888 13.5C21.164 18.311 17.013 22 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c4.1 0 7.625 2.468 9.168 6" />
              <path d="M17 8h4.4a.6.6 0 0 0 .6-.6V3" />
            </g>
          </svg>

          <div className="w-full h-full bg-slate-50 border-slate-200 border rounded-md p-2 text-xs text-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="!text-slate-400"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M16 12h1.4a.6.6 0 0 1 .6.6v6.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6v-6.8a.6.6 0 0 1 .6-.6H8m8 0V8c0-1.333-.8-4-4-4S8 6.667 8 8v4m8 0H8"
                />
              </svg>

              <span className="leading-[1]">
                <span className="text-slate-400">{protocol}://</span>
                <span className="font-medium">{link}</span>
              </span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="!text-slate-400"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m8.587 8.236l2.598-5.232a.911.911 0 0 1 1.63 0l2.598 5.232l5.808.844a.902.902 0 0 1 .503 1.542l-4.202 4.07l.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75l-4.202-4.07a.902.902 0 0 1 .503-1.54z"
              />
            </svg>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-5.918-3.805a2 2 0 0 0-2.164 0z"
            />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
              <path d="M9 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
              <path
                stroke-linejoin="round"
                d="M12 21v-4.639c0-.51.1-.999.284-1.453M22 21v-3.185m-7.778-5.08A5.5 5.5 0 0 1 17 12c2.28 0 4.203 1.33 4.805 3.15M15 22v-2.177M19 22v-5.147C19 15.83 18.105 15 17 15s-2 .83-2 1.853v.794M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011"
              />
            </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" />
              <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
            </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20 12.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m-8 0a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m-8 0a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1"
            />
          </svg>
        </div>
      </nav>
      {children}
    </article>
  )
}
