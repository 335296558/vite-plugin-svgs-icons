import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginVueSvgIcons from 'vite-plugin-vue-svg-icons'
import vitePluginVueSvgIcons from '../dist/index.js'
// import Inspect from 'vite-plugin-inspect'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // Inspect(),
        vitePluginVueSvgIcons()
    ],
    alias: {
        'vue': 'vue/dist/vue.esm-bundler.js'
    }
});