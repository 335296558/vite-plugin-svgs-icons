import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'
export default defineConfig({
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.js'),
                // 'components/svgIcon': resolve(__dirname, 'src/components/svgIcon.js')
            },
            name: 'vitePluginVueSvgIcons',
            // fileName: 'index', // 如果开启所以打包的文件都会变成index，但不会重复，它会index.js、index2.js
            formats:['es','cjs']
        },
        rollupOptions: {
            external: ['vue', 'fs', 'path','url','node:fs', 'node:url']
        }
    },
    plugins: [dts()]
})