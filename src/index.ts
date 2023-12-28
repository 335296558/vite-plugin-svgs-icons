'use strict';

/**
 * @author 忘情上人
 * @date 2022/02
 * @flx ts @dete 2023/10/26 
 * @author 335296558@qq.com
 * @name vite-plugin-svgs-icons || vitePluginSvgsIcons
 */
import { Plugin } from 'vite';
import { join, posix } from 'path';

import fs from 'node:fs';

import { transformSvgHTML, getSvgHtmlMaps, setSvgMapHideStyle, svgIconStringReplace, createLoadSvgIconsCode, escapeHtml, compressHtml } from './utils';

// @ts-ignore
import svgIconString from './components/svgIcon.js?raw';
// @ts-ignore
import SvgViewsDevToolsString from './components/SvgViews.js?raw';

// @ts-ignore
import SvgViewsDevToolsStyle from './style/SvgViews.css?raw';

import type { IOptions, IPaths } from './types.d.ts';

const PluginName: string = 'vite-plugin-svgs-icons';

let defaultOptions: IOptions = {
    moduleId: 'virtual:svg-icon',
    ssr: false,
    dir: join(`${process.cwd()}/src/assets/svg`),
    svgId: '__v__svgs__icons',
    iconPrefix: 'icona',
    clearOriginFill: true,
    isNameVars: false,
    isWarn: true,
    isMultiColor: true,
    isViewTools: true
};

export default function vitePluginSvgsIcons(options: IOptions): Plugin {
    let svgs: string[] = [];
    let svgIconMaps: { [key: string]: string } = {};

    defaultOptions = Object.assign(defaultOptions, options);
    if (defaultOptions.isViewTools) {
        defaultOptions.isNameVars = true;
    }
    const ModuleId = defaultOptions.moduleId;
    // virtual
    const resolvedModuleId = '\0' + ModuleId;

    // 递归读取目录并返回一个path集合
    const loopReaddir = async (url: string, paths: IPaths[] = [])=> {
        let files = fs.readdirSync(url);
        if (files.length === 0) {
            console.warn(PluginName+':File directory is empty --->'+defaultOptions.dir);
            return [];
        }
        files.forEach((name: string)=>{
            const stat = fs.lstatSync(`${url}/${name}`);
            if (stat.isDirectory()) { // 是文件夹
                loopReaddir(`${url}/${name}`, paths)
            } else {
                // 过滤非 svg 文件
                if (name.lastIndexOf('.svg') === -1) {
                    return;
                }
                paths.push({
                    path: `${url}/${name}`,
                    filename: name
                })
            }
        })
        return paths;
    }

    function optionIconMaps(filePathLast: string, svgText: string) {
        const name = filePathLast.replace(/.svg/g, '');
        svgs.push(name);
        const newSvgText = transformSvgHTML(svgText, { 
            name,
            clearOriginFill: defaultOptions.clearOriginFill,
            isWarn: Boolean(defaultOptions.isWarn),         
            isMultiColor: Boolean(defaultOptions.isMultiColor),
            // @ts-ignore
            iconPrefix: defaultOptions?.iconPrefix
        });
        svgIconMaps[name] = newSvgText as string;
        return newSvgText;
    }

    async function handleSvgMaps(RootPath: string) { // RootPath=使用插件的项目根目录的path
        const FilePath: string = RootPath;
        if (!fs.existsSync(FilePath)) {
            console.warn(`\x1B[31m${PluginName}:The directory does not exist ---->${FilePath}\x1B[0m`);
            return null;
        }
        const files = await loopReaddir(FilePath);
        svgs = [];
        files.forEach(item => {
            let svgText = fs.readFileSync(item.path, 'utf8');
            optionIconMaps(item.filename, svgText);
        });
    }

    function getAllSvgHtmlString() {
        let symbolStrMaps = '';
        for (const k in svgIconMaps) {
            symbolStrMaps+=svgIconMaps[k];
        }
        return symbolStrMaps;
    }

    function transformIndexHtml(html: string) {
        let otherStyle = '';
        if (defaultOptions.isViewTools && process.env.NODE_ENV === 'development') {
            otherStyle = `<style>${SvgViewsDevToolsStyle}</style>`;
        }
        if (!defaultOptions.ssr) return html + otherStyle;
        // @ts-ignore
        const style = setSvgMapHideStyle(defaultOptions.svgId);
        const svgHtmlMaps = getAllSvgHtmlString();
        // @ts-ignore
        const rsHtmlString = `${html} ${getSvgHtmlMaps(defaultOptions.svgId, svgHtmlMaps)} ${style} ${otherStyle}`;
        return rsHtmlString;
    }
    let svgMapPath = `${defaultOptions.dir}`;
    handleSvgMaps(svgMapPath); // 如果不在这里执行，在configResolved 中执行，Nuxt Module 那边会有问题！所以为了兼容多点场景使用，需要在这执行
    const pluginOptions = {
        name: defaultOptions.moduleId,
        transformIndexHtml,
        resolveId(id: string) {
            if (id === ModuleId) {
                return resolvedModuleId;
            }
        },
        async load(id: string) {
            if (id === resolvedModuleId) {
                let other = '';
                if (defaultOptions.isViewTools && process.env.NODE_ENV === 'development') {
                    other = SvgViewsDevToolsString;
                }
                // const varNamesCodes = `${ defaultOptions.isNameVars?'export const svgIconNames ='+ JSON.stringify(svgs): '' }`;
                const varNamesCodes = `export const svgIconNames = ${ defaultOptions.isNameVars? JSON.stringify(svgs): '[]' }`;
                // @ts-ignore
                const svgIconConponentString = svgIconStringReplace(svgIconString, defaultOptions.iconPrefix);
                if (defaultOptions.ssr) {
                    return `${svgIconConponentString};\n ${ varNamesCodes }\n${other}`;
                }
                const svgId = defaultOptions.svgId || '';
                const symbolMaps = getAllSvgHtmlString();
                const svgHtmlMaps = escapeHtml(compressHtml(getSvgHtmlMaps(svgId, symbolMaps)));
                return `${svgIconConponentString};\n${createLoadSvgIconsCode(svgId, svgHtmlMaps)}\n${varNamesCodes};\n${other}`;
            }
        },
        async handleHotUpdate({ file, server, read }) {
            // 检查更改的文件是否是 SVG 图标
            // console.log('svg ======', file)
            if (file.endsWith('.svg')) {
                // const normalizedPath = posix.normalize(file);
                // 读取更新后的 SVG 文件内容
                const newSvgContent = await read();
                const filePaths = file.split('/');
                const filePathLast = filePaths[filePaths.length - 1];
                optionIconMaps(filePathLast, newSvgContent);
                // 发送一个 'update' 类型的消息给客户端
                server.ws.send({
                    type: 'update',
                    updates: [
                        {
                            type: 'js-update',
                            // path: normalizedPath, // 需要更新的模块路径 ModuleId
                            path: resolvedModuleId,
                            timestamp: Date.now(),
                            acceptedPath: resolvedModuleId, // 被 HMR 接受处理的模块路径
                        },
                    ],
                });
                // 返回空数组，表示不使用默认的 HMR 更新
                return [];
            }
            // 对于非 SVG 文件，使用默认处理
            return null;
        },
    }
    // @ts-ignore
    return pluginOptions;
}