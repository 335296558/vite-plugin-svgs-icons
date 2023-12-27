'use strict';

/**
 * @author 忘情上人
 * @date 2022/02
 * @flx ts @dete 2023/10/26 
 * @author 335296558@qq.com
 * @name vite-plugin-svgs-icons || vitePluginSvgsIcons
 */

import { join, resolve } from 'path';

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

export default function vitePluginSvgsIcons(options: IOptions) {
    let svgs: string[] = [];
    let symbolMaps: string = '';
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

    async function handleSvgMaps(RootPath: string) { // RootPath=使用插件的项目根目录的path
        const FilePath: string = RootPath;
        if (!fs.existsSync(FilePath)) {
            console.warn(`\x1B[31m${PluginName}:The directory does not exist ---->${FilePath}\x1B[0m`);
            return null;
        }
        const files = await loopReaddir(FilePath);
        svgs = [];
        symbolMaps = '';
        files.forEach(item => {
            let svgText = fs.readFileSync(item.path, 'utf8');
            const name = item.filename.replace(/.svg/g, '');
            svgs.push(name);
            const newSvgText = transformSvgHTML(svgText, { 
                name,
                clearOriginFill: defaultOptions.clearOriginFill,
                isWarn: Boolean(defaultOptions.isWarn),         
                isMultiColor: Boolean(defaultOptions.isMultiColor),
                iconPrefix: defaultOptions?.iconPrefix
            });
            svgIconMaps[name] = newSvgText as string;
            
            let svgHtml = newSvgText;
            symbolMaps+=svgHtml;
        });
        return symbolMaps;
    }

    function transformIndexHtml(html: string) {
        let otherStyle = '';
        if (defaultOptions.isViewTools && process.env.NODE_ENV === 'development') {
            otherStyle = `<style>${SvgViewsDevToolsStyle}</style>`;
        }
        if (!defaultOptions.ssr) return html + otherStyle;
        const style = setSvgMapHideStyle(defaultOptions.svgId);
        const svgHtmlMaps = symbolMaps;
        const rsHtmlString = `${html} ${getSvgHtmlMaps(defaultOptions.svgId, svgHtmlMaps)} ${style} ${otherStyle}`;
        return rsHtmlString;
    }
    let svgMapPath = `${defaultOptions.dir}`;
    handleSvgMaps(svgMapPath); // 如果不在这里执行，在configResolved 中执行，Nuxt Module 那边会有问题！所以为了兼容多点场景使用，需要在这执行
    // let configs = {};
    const pluginOptions = {
        name: defaultOptions.moduleId,
        // configResolved(config: any) {
        //     configs = config; 
        //     svgMapPath = resolve(config.root, `${defaultOptions.dir}`);
        //     handleSvgMaps(svgMapPath)
        // },
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
                const svgIconConponentString = svgIconStringReplace(svgIconString, defaultOptions.iconPrefix);
                if (defaultOptions.ssr) {
                    return `${svgIconConponentString};\n ${ varNamesCodes }\n${other}`;
                }
                const svgHtmlMaps = escapeHtml(compressHtml(getSvgHtmlMaps(defaultOptions.svgId, symbolMaps)));
                return `${svgIconConponentString};\n${createLoadSvgIconsCode(defaultOptions.svgId, svgHtmlMaps)}\n${varNamesCodes};\n${other}`;
            }
        },
        // transform(code, id) {
        //     if (id === resolvedModuleId) {
        //         console.log('===', id);
        //     }
        // },
        async handleHotUpdate(ctx: any) { // 热更新处理
            const svgMapPath = resolve(ctx.server.config.root, `${defaultOptions.dir}`);
            async function update(filePath: string) {
                if (ctx.file.indexOf(filePath) >= 0 || ctx.file.indexOf('.svg') >=0) {
                    await handleSvgMaps(svgMapPath);
                    try {
                        const { moduleGraph } = ctx.server;
                        const module = moduleGraph.getModuleById(resolvedModuleId);
                        ctx.server.ws.send({
                            type: 'full-reload',
                            path: '*',
                        });
                        return module?[...module]: true;
                    } catch (error) {}
                }
                return true;
            }
          
            // ctx.server.watcher.on('add', async (path: string) => {
            //     await update(path);
            // });

            ctx.server.watcher.on('unlink', async (path: string) => {
                await update(path);
            });

            return await update(svgMapPath);
        }
    }
    return pluginOptions;
}