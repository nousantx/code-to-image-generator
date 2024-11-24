import fs from 'node:fs'
import path from 'node:path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'))

const name = '__nsx_img_tools'
const banner = `/*!
 * ${packageJson.name} v${packageJson.version} | ${packageJson.license} License
 *
 * Copyright (c) 2024-present NOuSantx <nousantx@gmail.com>
 *
 * Built Date: ${new Date().toString()}
 */`

const terserConfig = {
  format: {
    comments: false,
    preamble: banner
  },
  mangle: true,
  compress: {
    passes: 2
  }
}

const config = {
  input: './packages/config/index.js',
  output: [
    {
      file: 'plugin/index.cjs',
      format: 'cjs',
      exports: 'named',
      banner
    },
    {
      file: 'plugin/index.umd.js',
      format: 'umd',
      name,
      banner,
      exports: 'named'
    },
    {
      file: 'plugin/index.esm.js',
      format: 'es',
      banner
    }
  ],
  plugins: [resolve(), commonjs(), terser(terserConfig)]
}

export default config
