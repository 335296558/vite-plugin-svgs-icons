import { defineConfig } from 'vite';
import path from 'path';
const __dirname = path.resolve();
// import vueJsx from '@vitejs/plugin-vue-jsx';
 // buildEnd: ()=> {
        //     try {
        //         fs.copyFileSync(join(`${process.cwd()}/src/types.d.ts`), join(`${process.cwd()}/dist/types.d.ts`));
        //         console.log('types.d.ts copy success!');
        //     } catch (err) {
        //         console.error(err)
        //     }
        // },
export default defineConfig({
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, 'src/index.ts'),
                // types: path.resolve(__dirname, 'src/types.d.ts'),
            },
            name: 'vitePluginSvgsIcons',
            // fileName: 'index', // 如果开启所以打包的文件都会变成index，但不会重复，它会index.js、index2.js
            formats:['es', 'cjs']
        },
        rollupOptions: {
            external: ['vue', 'fs', 'path','url','node:fs', 'node:url'],
        },
    },
})