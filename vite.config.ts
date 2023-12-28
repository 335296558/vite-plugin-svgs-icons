import { defineConfig } from 'vite';
import path from 'path';
import copy from 'rollup-plugin-copy';
const __dirname = path.resolve();
export default defineConfig({
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
            external: ['vue', 'fs', 'path','url','node:fs', 'node:url'],
            plugins: [
                copy({
                    targets: [
                        { src: './src/types.d.ts', dest: 'dist/' }
                    ],
                    // 因为打包后dist目录会被先清空，所以要加hook: 'writeBundle'
                    hook: 'writeBundle' 
                })
            ]
        },
    }
})