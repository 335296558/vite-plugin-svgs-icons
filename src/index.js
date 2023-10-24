'use strict';
/**
 * @author 凡尘
 * @date 2022/02
 * @author 335296558@qq.com
 * @name vite-plugin-vue-svg-icons || vitePluginVueSvgIcons
 */
import { join } from 'path';
import fs from 'fs';
import svgIconString from './components/svgIcon.js?raw';
const PluginName = 'vite-plugin-vue-svg-icons';
let defaultOptions;
let otherUrls = [];
// string get push url = 字符串中提取url
function getStringUrls(htmlString) {
    let urls = [];
    let start = 0;
    let end = 0;
    while (true) {
        start = htmlString.indexOf("http", end);
        if (start === -1) {
            break;
        }

        end = htmlString.indexOf('"', start);
        if (end === -1) {
            break;
        }

        const url = htmlString.slice(start, end);
        urls.push(url);
    }

    return urls;
}


// 它将返回一个布尔值，指示SVG是否具有多个颜色，并且这些颜色是否相同。
function isMultiColorSVG(svgCode) {
    // 使用正则表达式匹配所有颜色代码
    const colorRegex = /#[0-9a-fA-F]{3,6}/g;
    const colors = svgCode.match(colorRegex);
    // 如果没有颜色代码，返回false
    // 如果只有一个颜色代码，返回false
    if (!colors || colors.length === 1) {
        return { bool: false, colors };
    }

    // 检查所有颜色是否相同
    const firstColor = colors[0];
    let sameIndex = 1;
    for (let i = 1; i < colors.length; i++) {
        if (colors[i] === firstColor) {
            sameIndex++;
        }
    }
    if (sameIndex===colors.length) { // 条件成立则是多个色，但是属于相同的色，就当作单色处理
        return { bool: false, colors };
    }
    return { bool: true, colors };
}

// 判断svg是否是多色的
function isMultiColor(svg) {
    const colorRegex = /#[0-9A-Fa-f]{6}/g;
    const colors = new Set(svg.match(colorRegex));
    return colors.size > 1;
}

// 判断svg
function countPathTags(svgCode) {
    const regex = /<path/g;
    const matches = svgCode.match(regex);
    return matches ? matches.length : 0;
}

/**
 * @description svg初始化源码、过滤等
 * @param {*} svgStr 
 * @param {*} option 
 */
const transformSvgHTML = (svgStr, option={})=> {
    option = Object.assign({
        protect: true,
    }, option)
    if (!svgStr) return
    // 限制危险标签，比如script、foreignObject等
    // 限制通过SVG图像的外部链接加载资源。
    // 限制SVG图像内的扩展逻辑。
    const urls = getStringUrls(svgStr);
    const isOtherUrl = urls.find(k=> k && k.indexOf('//www.w3.org')<=0);
    (isOtherUrl && otherUrls.indexOf(isOtherUrl) <0) && otherUrls.push(isOtherUrl);
    if (
        option.protect && 
        (
            svgStr.indexOf('function')>=0 || 
            svgStr.indexOf('Function()')>=0 || 
            svgStr.indexOf('[native code]')>=0 ||
            svgStr.indexOf('<script')>=0 ||
            svgStr.indexOf('<foreignObject')>=0 ||
            isOtherUrl
        )
    ) {
        // 安全保护机制
        // 你的SVG中可能存XSS 攻击的风险！插件进行了阻断，此时你的svg无法显示，强制开启 设置 可在调用插件处设置protect为true
        console.error(option.name+'.svg There is a risk of XSS attacks in your SVG! The plug-in is blocked, at this time your svg cannot be displayed, forcibly open');
        console.error('SVG图标中可能存XSS 攻击的风险！');
    }
    
    // 清空原码设置的宽高 
    let svgStartTag = svgStr.match(/<svg([^>]+)/g)[0]
    const w_reg = /\width=".+?"/g;
    const h_reg = /\height=".+?"/g;
    const class_reg = /\class=".+?"/g;
    const fill_url_reg = /fill="url\(#(\w+)\)"/g;
    if (svgStartTag.match(w_reg)) {
        svgStr = svgStr.replace(w_reg, '');
    }
    if (svgStartTag.match(h_reg)) {
        svgStr = svgStr.replace(h_reg, '');
    }
    if (svgStartTag.match(class_reg)) {
        svgStr = svgStr.replace(class_reg, '');
    }

    // 区分单色还是多色
    const objs = isMultiColorSVG(svgStr);
    const ss = fill_url_reg.test(svgStr);
    console.log(objs, '<==========>', option.name);
    if (objs.bool) {
        svgStr = svgStr.replace(/<svg/g, `<svg multicolor="true"`);
    } else if (!fill_url_reg.test(svgStr)){ // 单色
        svgStr = svgStr.replace(/<svg/g, `<svg multicolor="false"`);
        const pathLength = countPathTags(svgStr);
        console.log(pathLength, option.clearOriginFill, '====', objs.colors?.length);
        if ((pathLength===objs.colors?.length || pathLength===1) && option.clearOriginFill) { // 为了处理一些单色的svg 无法在外部use时修改它的color的问题
            // 清除掉它原来的color, 
            // 并且不能给默认color, 不然外部无法修改color
            svgStr = svgStr.replace(/fill="([^"]+)"/g, ''); 
        }
    }
    return svgStr
} 

// 获取svg viewBox属性值
function getViewBox(svgHTMLText) {
    const viewBoxRegex = /viewBox="([^"]*)"/;
    const viewBoxMatch = viewBoxRegex.exec(svgHTMLText);
    if (viewBoxMatch) {
        return viewBoxMatch[1];
    }
    return null;
}
  

export default function vitePluginVueSvgIcons(options={}) {
    let svgs = [];
    defaultOptions = Object.assign({
        moduleId: 'svg-icon',
        ssr: false,
        dir: join(`${process.cwd()}/src/assets/svg`),
        svgId: '__v__svg__icons',
        iconPrefix: 'ei',
        clearOriginFill: true
    }, options);
    const ModuleId = defaultOptions.moduleId;
    const resolvedModuleId = '\0' + ModuleId;
    const svgRegex = /.svg/;
    // 递归读取目录并返回一个path集合
    const loopReaddir = async (url, paths=[])=> {
        let files = fs.readdirSync(url);
        if (files.length === 0) {
            console.warn(PluginName+':File directory is empty --->'+defaultOptions.dir);
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
            console.warn(PluginName+':The directory does not exist ----> '+FilePath);
            return html;
        }
        const files = await loopReaddir(FilePath);
        let symbolMaps = '';
        svgs = [];
        files.forEach(item => {
            let svgText = fs.readFileSync(item.path, 'utf8');
            const name = item.filename.replace(/.svg/g, '');
            svgs.push(name);
            const newSvgText = transformSvgHTML(svgText, { 
                name,
                clearOriginFill: defaultOptions.clearOriginFill
            });
            // const viewBox = getViewBox(newSvgText); // 取viewBox的值
            // viewBox="${viewBox}" // 不设置也可以
            let svgHtml = `<symbol id="${defaultOptions.iconPrefix}-${name}">${newSvgText}</symbol>`;
            symbolMaps+=svgHtml;
        });
        const xmlns = 'http://www.w3.org/2000/svg';
        const xlink = 'http://www.w3.org/1999/xlink';
        const style = '<style>#'+defaultOptions.svgId+' {position: absolute; left: -100%;bottom: -100%; width: 0; height: 0;}</style>';
        const svgHtmlMaps = `<svg id="${defaultOptions.svgId}" xmlns="${xmlns}" xmlns:link="${xlink}"><defs>${symbolMaps}</defs></svg>`;
        const tgHtmlStr = `${html}${svgHtmlMaps} ${style}`;
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
                return `${svgIconString};\n // svg目录的svg名称集合的数组 \n export const svgIconNames = ${JSON.stringify(svgs)};`;
            }
            return
        }
    }
    return pluginOptions;
}