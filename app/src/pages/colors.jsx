import { init } from '../styles/init'
import { color } from '../styles/lib/color'

const colors = Object.keys(color)
// const colors = ['red', 'pink']
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export function Colors() {
  init()

  return (
    <div className="p-2rem bg-neutral-50">
      <h1 className="family-poppins fs-2.5rem lh-1 fw-600 ls--0.035em text-gray-900">
        All available colors
      </h1>
      <div
        className="mt-2rem bg-red flex flex-w-wrap gap-4rem"
        child="
        (.color__title): fs-1.5rem fw-500 font-s-capitalize text-gray-900 dark:text-white;
        (.color__wrapper): mt-12px pl-1rem flex flex-w-wrap;
        (.color__wrapper-shades): flex flex-col;
        (.color__shade-count): mt-6px text fs-12px text-neutral-700;
        (.color__box): mt-8px ml--1rem box-56px br-1rem shadow-md;
      "
      >
        {colors.map((color) => (
          <div key={color} class="color">
            <h2 className="color__title">{color}</h2>
            <div className="color__wrapper">
              {shades.map((shade) => (
                <div key={shade} className="color__wrapper-shades">
                  <div
                    className={`color__box bg-${color}-${shade}`}
                    title={`bg-${color}-${shade}`}
                  ></div>
                  <span className="color__shade-count">{shade}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
