import pkg from './package.json';
import { babel } from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy'

const plugins = [
    nodeResolve(),
    commonjs(),
    babel({ 
        babelHelpers: 'bundled',
    }),
    vuePlugin(),
    copy({
        targets: [
            {
                src: 'src/svg-icon',
                dest: 'dist'
            }
        ]
    }),
    process.env.ENV === 'prod' && terser()
] 
const entry = './src/index.js'
const name = 'vitePluginVueSvgIcons';
export default [
    {
		input: entry,
		output: {
			name: name,
			file: pkg.main,
			format: 'cjs',
            exports: 'default',
		},
		plugins
	},
]
