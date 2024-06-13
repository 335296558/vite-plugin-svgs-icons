import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginSvgsIcons from '../dist/index';
import vitePluginSvgsIcons from 'vite-plugin-svgs-icons';
console.log(vitePluginSvgsIcons, 'vitePluginSvgsIcons')
// import vitePluginSvgsIcons from '/Users/shuang/web/Plugin/vite-plugin-svgs-icons/src/index';
import path from 'path';
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(), 
        vitePluginSvgsIcons({
            dir: path.resolve(__dirname, 'src', 'assets', 'svg'),
            isNameVars: false,
            isViewTools: true,
            // ssr: true // 服务端渲染
        }),
    ],
    resolve: {
        alias: [{
            find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))
        }]
    },
    server: {
        host: true
    }
})
