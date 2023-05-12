import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginVueSvgIcons from '../package/dist/index';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginVueSvgIcons()],
})
