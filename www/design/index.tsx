export const config = { width: 1366, height: 768, scale: 1, format: 'jpg' }

export function Content() {
  return (
    <div className="w-1366px h-768px bg-linear-45deg from-red to-blue">
      <div className="flex items-center justify-center h-full">
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Design Component</h1>
          <p className="text-white text-lg opacity-90">
            This is your TenoxUI design component with a gradient background
          </p>
        </div>
      </div>
    </div>
  )
}

export default { Content, config }
