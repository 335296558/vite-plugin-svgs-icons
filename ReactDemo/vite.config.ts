import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgsIcons from '../dist/index';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        vitePluginSvgsIcons({
            dir: path.resolve(__dirname, 'src', 'assets', 'svgs'),
            isNameVars: true,
            ssr: true // 服务端渲染
        }),
    ],
})
