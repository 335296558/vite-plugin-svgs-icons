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

// svg初始化源码
const transformSvgHTML = (svgStr, option={})=> {
    option = Object.assign({
        protect: true,
        multicolor: false,
    }, option)
    if (!svgStr) return
    // 限制危险标签，比如script、foreignObject等
    // 限制通过SVG图像的外部链接加载资源。
    // 限制SVG图像内的扩展逻辑。
    const urls = getStringUrls(svgStr);
    const isOtherUrl = urls.find(k=> k && k.indexOf('//www.w3.org')<0);
    (isOtherUrl && otherUrls.indexOf(isOtherUrl) <0) && otherUrls.push(isOtherUrl);
    console.log(otherUrls, 'isOtherUrl');
    if (
        option.protect && 
        (
            svgStr.indexOf('function')>=0 || 
            svgStr.indexOf('Function()')>=0 || 
            svgStr.indexOf('[native code]')>=0 ||
            svgStr.indexOf('<script')>=0 ||
            svgStr.indexOf('<foreignObject')>=0 ||
            svgStr.indexOf('<foreignObject')>=0 ||
            isOtherUrl
        )
    ) {
        // 安全保护机制
        // 你的SVG中可能存XSS 攻击的风险！插件进行了阻断，此时你的svg无法显示，强制开启 设置 可在调用插件处设置protect为true
        console.error(option.name+'.svg There is a risk of XSS attacks in your SVG! The plug-in is blocked, at this time your svg cannot be displayed, forcibly open');
        console.error(option.name+'.svg 你的SVG图标中可能存XSS 攻击的风险！');
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
    defaultOptions = Object.assign({
        moduleId: 'svg-icon',
        ssr: false,
        dir: join(`${process.cwd()}/src/assets/svg`),
        svgId: '__v__svg__icons',
        iconPrefix: 'ei',
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
        files.forEach(item => {
            let svgText = fs.readFileSync(item.path, 'utf8');
            const name = item.filename.replace(/.svg/g, '')
            const newSvgText = transformSvgHTML(svgText, { 
                multicolor: item.path.indexOf('multicolor')>=0,
                name
            })
            let svgHtml = `<symbol id="${defaultOptions.iconPrefix}-${name}">${newSvgText}</symbol>`;
            symbolMaps+=svgHtml
        });
        const svgHtmlMaps = `<svg id="${defaultOptions.svgId}" xmlns="http://www.w3.org/2000/svg"><def>${symbolMaps} </def></svg>`;
        const tgHtmlStr = `${html}${svgHtmlMaps}<style>#${defaultOptions.svgId} {position: fixed;left: -100%;bottom: -100%;display: none;}[data-singlecolor] path{fill: inherit;}</style>`;
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
                // let logString = '';
                // if (otherUrls.length) {
                //     logString = 'console.error("你的SVG图标中存在不安全的URL，可能存在全安风险问题！");';
                // }
                return `${svgIconString}`;
            }
            return
        },
    }
    return pluginOptions;
}