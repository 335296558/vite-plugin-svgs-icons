import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginVueSvgIcons from '../dist/index';
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
console.log(path.resolve(__dirname, 'src/assets/svg'), '===');
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(), 
        vitePluginVueSvgIcons({
            dir: path.resolve(__dirname, 'src', 'assets', 'svg')
        }),
        // createSvgIconsPlugin({
        //     iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
        //     symbolId: 'icon-[dir]-[name]',
        // }),
    ],
})
