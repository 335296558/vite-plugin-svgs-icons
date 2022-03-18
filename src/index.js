'use strict';
/**
 * @author 凡尘
 * @date 2022/02
 * @author 335296558@qq.com
 * @name vite-plugin-vue-svg-icons || vitePluginVueSvgIcons
 */
import fs from 'fs';
import { join } from 'path';
const jsStr = fs.readFileSync(`${__dirname}/svg-icon/index.js`, 'utf8');
let defaultOptions;
export default function vitePluginVueSvgIcons(options={}) {
    const ModuleId = 'svg-icon'
    const resolvedModuleId = '\0' + ModuleId
    const svgRegex = /.svg/
    defaultOptions = Object.assign({
        dir: join(`${process.cwd()}/src/assets/svg`)
    })

    // 递归读取目录并返回一个path集合
    const loopReaddir = async (url, paths=[])=> {
        let files = fs.readdirSync(url);
        files.forEach(fi=>{
            const stat = fs.lstatSync(`${url}/${fi}`);
            if (stat.isDirectory()) { // 是文件夹
                loopReaddir(`${url}/${fi}`, paths)
            } else {
                paths.push({
                    path: `${url}/${fi}`,
                    filename: fi
                })
            }
        })
        return paths
    }

    return {
        name: 'vite-plugin-svg-icons',
        transformIndexHtml(html) {
            return `${html}\n<style>.peas-svg-icon{display: inline-block;}</style>`
        },
        resolveId(id) {
            if (id === ModuleId) {
                return resolvedModuleId
            }
        },
        async load(id, code) {
            if (id === resolvedModuleId) {
                const files = await loopReaddir(`${defaultOptions.dir}`);
                let svgs = {}
                files.forEach(item => {
                    let svgText = fs.readFileSync(item.path, 'utf8');
                    svgs[item.filename.replace(/.svg/g, '')] = svgText
                });
                const svgStr = JSON.stringify(svgs)
                return `
                import { h } from 'vue'
                const svgs = ${svgStr};
                \n${jsStr};`
            }
            return
        }
    }
}
