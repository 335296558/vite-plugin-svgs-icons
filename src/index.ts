'use strict';

/**
 * @author 忘情上人
 * @date 2022/02
 * @flx ts @dete 2023/10/26 
 * @author 335296558@qq.com
 * @name vite-plugin-svgs-icons || vitePluginSvgsIcons
 */
import { Plugin } from 'vite';
import { join, resolve } from 'path';
import type { ViteDevServer, ModuleNode } from 'vite';
import fs from 'node:fs';

import { transformSvgHTML, getSvgHtmlMaps, setSvgMapHideStyle, svgIconStringReplace, createLoadSvgIconsCode, escapeHtml, compressHtml } from './utils';

// @ts-ignore
import svgIconString from './components/svgIcon.js?raw';
// @ts-ignore
import SvgViewsDevToolsString from './components/SvgViews.js?raw';

// @ts-ignore
import SvgViewsDevToolsStyle from './style/SvgViews.css?raw';

interface IOptions {
    moduleId?: string;
    ssr?: boolean;
    dir?: any;
    svgId?: string;
    iconPrefix?: string;
    // 可以设置初始化时不要清除原来svg的fill, =true也是仅针对单色处理
    clearOriginFill?: boolean; 
    // 是否生成svg名称，Array
    isNameVars?: boolean; 
    // 关闭所有警告
    isWarn?: boolean;
    isMultiColor?: boolean;
    configResolvedAfter?: Function;
    isViewTools?: boolean;
}

interface IPaths {
    path: any;
    filename: string;
}

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
        async handleHotUpdate({ file, server }:{ file: string ; server: ViteDevServer }) { // 热更新处理
            if (file.endsWith('.svg')) {
                const svgMapPath = resolve(server.config.root, `${defaultOptions.dir}`);
                await handleSvgMaps(svgMapPath);
                const { moduleGraph } = server;
                const module = moduleGraph.getModuleById(resolvedModuleId) as ModuleNode;
                if (module) {
                    server.reloadModule(module);
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    });
                }
                return module;
            }
            return null;
        },
    }
    // @ts-ignore
    return pluginOptions;
}