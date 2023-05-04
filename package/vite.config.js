import { resolve } from 'path';
import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'vitePluginVueSvgIcons',
            fileName: 'index',
            formats:['es','cjs']
        },
        rollupOptions: {
            external: ['vue', 'fs', 'path'],
            plugins: [
                copy({
                    targets: [
                        { src: './src/components/', dest: 'dist/' },
                        { src: './index.d.ts', dest: 'dist/' }
                    ],
                    // 因为打包后dist目录会被先清空，所以要加hook: 'writeBundle'
                    hook: 'writeBundle' 
                })
            ]
        }
    }
})