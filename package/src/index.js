'use strict';
/**
 * @author 凡尘
 * @date 2022/02
 * @author 335296558@qq.com
 * @name vite-plugin-vue-svg-icons || vitePluginVueSvgIcons
 */
import path from 'path';
import fs from 'fs';
// import fs from 'node:fs';
// const fs = require('fs');
// const path = require('path');
// import { readFile } from 'fs/promises';
// import { join } from 'path';

const join = path.join;
const jsStr = fs.readFileSync(`${__dirname}/components/svgIcon.js`, 'utf8');
let defaultOptions;
// svg初始化源码
const transformSvgHTML = (svgStr, option={})=> {
    option = Object.assign({
        protect: true,
        multicolor: false,
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
    
    // 清空原码设置的宽高 
    let svgStartTag = svgStr.match(/<svg([^>]+)/g)[0]
    if (svgStartTag.match(/\width="[0-9]*"/g)) {
        svgStr = svgStr.replace(/\width="[0-9]*"/g, '')
    }
    if (svgStartTag.match(/\height="[0-9]*"/g)) {
        svgStr = svgStr.replace(/\height="[0-9]*"/g, '')
    }
    // 区分单色还是多色
    if (option.multicolor) {
        svgStr = svgStr.replace(/<svg/g, `<svg data-multicolor`)
    } else {
        svgStr = svgStr.replace(/<svg/g, `<svg data-singlecolor`)
    }
    return svgStr
}

export default async function vitePluginVueSvgIcons(options={}) {
    const ModuleId = 'svg-icon'
    const resolvedModuleId = '\0' + ModuleId
    const svgRegex = /.svg/
    defaultOptions = Object.assign({
        dir: join(`${process.cwd()}/src/assets/svg`),
        // isNuxt3: false,
    }, options);

    // 递归读取目录并返回一个path集合
    const loopReaddir = async (url, paths=[])=> {
        let files = fs.readdirSync(url);
        if (files.length === 0) {
            console.warn('vite-plugin-vue-svg-icons:File directory is empty --->'+FilePath);
            return [];
        }
        files.forEach(name=>{
            const stat = fs.lstatSync(`${url}/${name}`);
            if (stat.isDirectory()) { // 是文件夹
                loopReaddir(`${url}/${name}`, paths)
            } else {
                // 过滤非 svg 文件
                if (name.lastIndexOf('.svg') === -1) {
                  return
                }
                paths.push({
                    path: `${url}/${name}`,
                    filename: name
                })
            }
        })
        return paths
    }

    async function transformIndexHtml(html) {
        const FilePath = `${defaultOptions.dir}`;
        if (!fs.existsSync(FilePath)) {
            console.warn('vite-plugin-vue-svg-icons:The directory does not exist ----> '+FilePath);
            return html;
        }
        const files = await loopReaddir(FilePath);
        let symbolMaps = '';
        files.forEach(item => {
            let svgText = fs.readFileSync(item.path, 'utf8');
            const name = item.filename.replace(/.svg/g, '')
            const newSvgText = transformSvgHTML(svgText, { 
                multicolor: item.path.indexOf('multicolor')>=0,
                name
            })
            let svgHtml = `<symbol id="ei-${name}">${newSvgText}</symbol>`;
            symbolMaps+=svgHtml
        });
        const svgHtmlMaps = `<svg id="__v__svg__icons" xmlns="http://www.w3.org/2000/svg"><def>${symbolMaps} </def></svg>`;
        const tgHtmlStr = `\n
            \n${html}
            \n${svgHtmlMaps}
            \n<style>#__v__svg__icons {position: fixed;left: -100%;bottom: -100%;display: none;}[data-singlecolor] path{fill: inherit;}</style>
        \n`;
        const rsHtmlString = tgHtmlStr;
        return rsHtmlString;
    }
    
    const pluginOptions = {
        name: 'vite:vue-svg-icons',
        transformIndexHtml,
        resolveId(id) {
            if (id === ModuleId) {
                return resolvedModuleId
            }
        },
        async load(id, code) {
            if (id === resolvedModuleId) {
                return `\n
                \nimport { h } from 'vue';
                \n${jsStr};`
            }
            return
        },
    }
    return pluginOptions;
}

