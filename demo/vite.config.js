import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginVueSvgIcons from '../dist/index';
import path from 'path';
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(), 
        vitePluginVueSvgIcons({
            dir: path.resolve(__dirname, 'src', 'assets', 'svg'),
            isNameVars: true,
            ssr: false
        }),
    ],
    resolve: {
        alias: [{
            find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))
        }]
    },
})
