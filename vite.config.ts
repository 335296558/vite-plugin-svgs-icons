import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath, URL } from "url";
import copy from 'rollup-plugin-copy';
const __dirname = path.resolve();
export default defineConfig({
    // resolve: {
    //     alias: {
    //         '@': fileURLToPath(new URL("./src", import.meta.url)),
    //     }
    //     // [{
    //     //     find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))
    //     // }]
    // },
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, 'src/index.ts'),
            },
            name: 'vitePluginSvgsIcons',
            // fileName: 'index', // 如果开启所以打包的文件都会变成index，但不会重复，它会index.js、index2.js
            formats:['es']
        },
        rollupOptions: {
            external: ['vue', 'fs', 'path','url','node:fs', 'node:url']
        },
    },
})