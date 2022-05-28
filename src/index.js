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

const transformSvgHTML = (svgStr, option={})=> {
    option = Object.assign({
        size: 200,
        protect: true,
        class: '',
        color: '#f00',
    }, option)
    if (!svgStr) return
    if (
        option.protect && 
        (
            svgStr.indexOf('function')>=0 || 
            svgStr.indexOf('Function()')>=0 || 
            svgStr.indexOf('[native code]')>=0 ||
            (svgStr.indexOf('https://')>=0 && svgStr.indexOf('http://www.w3.org')<0)
        )
    ) {
        // 安全保护机制
        // 你的SVG中可能存XSS 攻击的风险！插件进行了阻断，此时你的svg无法显示，强制开启 设置 
        return console.error('There is a risk of XSS attacks in your SVG! The plug-in is blocked, at this time your svg cannot be displayed, forcibly open');
    }
    
    if (option.color) svgStr = svgStr.replace(/fill="[\s\S]+?"/g, `fill="${option.color}" `)
    // 判断如果svg原本不带width、height 属性，主动给它设置上---------start
    let svgStartTag = svgStr.match(/<svg([^>]+)/g)[0]
    if (svgStartTag.match(/\width="[0-9]*"/g)) {
        svgStr = svgStr.replace(/<svg/g, `<svg width="${option.size}"`)
    }
    if (svgStartTag.match(/\height="[0-9]*"/g)) {
        svgStr = svgStr.replace(/<svg/g, `<svg height="${option.size}"`)
    }
    if (svgStartTag.indexOf('width="') < 0 && option.size) {
        svgStr = svgStr.replace(/<svg/g, `<svg width="${option.size}"`)
    }
    if (svgStartTag.indexOf('height="') < 0 && option.size) {
        svgStr = svgStr.replace(/<svg/g, `<svg height="${option.size}"`)
    }
    // ---------end
    if (option.color && svgStr.indexOf('fill="')<0) {
        svgStr = svgStr.replace(/<path/g, `<path fill="${option.color}"`)
    }
    
    return svgStr
}

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
        files.forEach(name=>{
            const stat = fs.lstatSync(`${url}/${name}`);
            if (stat.isDirectory()) { // 是文件夹
                loopReaddir(`${url}/${name}`, paths)
            } else {
                paths.push({
                    path: `${url}/${name}`,
                    filename: name
                })
            }
        })
        return paths
    }
    

    return {
        name: 'vite-plugin-svg-icons',
        async transformIndexHtml(html) {
            const files = await loopReaddir(`${defaultOptions.dir}`);
            let symbolMaps = '';
            files.forEach(item => {
                let svgText = fs.readFileSync(item.path, 'utf8');
                const name = item.filename.replace(/.svg/g, '')
                const newSvgText = transformSvgHTML(svgText)
                let svgHtml = `\n
                    \n        <symbol id="${name}">
                    \n            ${newSvgText}            
                    \n        </symbol>
                \n`;
                symbolMaps+=svgHtml
            });
            const svgHtmlMaps = `\n
                \n<svg class="v-svg-icons" xmlns="http://www.w3.org/2000/svg">
                \n    <def>
                            ${symbolMaps}
                \n    </def>
                \n</svg>
            \n`;
            return `\n
                \n${html}
                \n${svgHtmlMaps}
                \n<style>.v-svg-icons {position: fixed;left: -100%;bottom: -100%;display: none;}svg path {fill: inherit;}</style>
            \n`;
        },
        resolveId(id) {
            if (id === ModuleId) {
                return resolvedModuleId
            }
        },
        async load(id, code) {
            if (id === resolvedModuleId) {
                // const files = await loopReaddir(`${defaultOptions.dir}`);
                // let svgs = {}
                // files.forEach(item => {
                //     let svgText = fs.readFileSync(item.path, 'utf8');
                //     svgs[item.filename.replace(/.svg/g, '')] = svgText
                // });
                // const svgStr = JSON.stringify(svgs)
                // return `
                // import { h } from 'vue'
                // const svgs = ${svgStr};
                // \n${jsStr};`
                return `\n
                \nimport { h } from 'vue'
                \n${jsStr};`
            }
            return
        }
    }
}
