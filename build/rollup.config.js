import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import toCamelCase from 'lodash.camelcase'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const pkg = require('../package.json')

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: toCamelCase(pkg.name),
      file: 'dist/bundle.umd.js',
      exports: 'named',
      globals: {
        '@vimeo/player': 'VimeoPlayer',
        'object-assign': 'assign',
        'youtube-player': 'YoutubePlayer'
      }
    },
    plugins: [
      nodeResolve({
        customResolveOptions: {
          moduleDirectories: ['node_modules']
        }
      }),
      commonjs(),
      replace({
        '__VERSION__': pkg.version,
        preventAssignment: true
      }),
      buble({ objectAssign: 'Object.assign' }),
      terser(),
      nodePolyfills()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      name: toCamelCase(pkg.name),
      file: 'dist/bundle.es.js',
      globals: {
        '@vimeo/player': 'VimeoPlayer',
        'object-assign': 'assign',
        'youtube-player': 'YoutubePlayer'
      }
    },
    external: ['@vimeo/player', 'core-js', 'object-assign', 'youtube-player'],
    plugins: [
      nodeResolve({
        customResolveOptions: {
          moduleDirectories: ['node_modules']
        }
      }),
      commonjs(),
      replace({
        '__VERSION__': pkg.version,
        preventAssignment: true
      }),
      buble({ objectAssign: 'Object.assign' }),
      terser(),
      nodePolyfills()
    ]
  }
]