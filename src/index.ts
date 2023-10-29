'use strict';
import type { IOptions, IPaths } from './types.d.ts';
/**
 * @author 忘情上人
 * @date 2022/02
 * @flx ts @dete 2023/10/26 
 * @author 335296558@qq.com
 * @name vite-plugin-vue-svg-icons || vitePluginVueSvgIcons
 */

import { join, resolve } from 'path';

import fs from 'node:fs';

import { transformSvgHTML, createSymbol, getSvgHtmlMaps, setSvgMapHideStyle, svgIconStringReplace } from './utils';

import svgIconString from './components/svgIcon.js?raw';

const PluginName: string = 'vite-plugin-vue-svg-icons';

let defaultOptions: IOptions = {
    moduleId: 'virtual:svg-icon',
    ssr: false,
    dir: join(`${process.cwd()}/src/assets/svg`),
    svgId: '__v__svg__icons',
    iconPrefix: 'icona',
    clearOriginFill: true,
    isNameVars: false,
    isWarn: true
};

export default function vitePluginVueSvgIcons(options: IOptions) {
    let svgs: string[] = [];
    let symbolMaps: string = '';
    let svgIconMaps: { [key: string]: string } = {};

    defaultOptions = Object.assign(defaultOptions, options);

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
                isWarn: defaultOptions.isWarn            
            });
            svgIconMaps[name] = newSvgText as string;
            // const viewBox = getViewBox(newSvgText); // 取viewBox的值
            // viewBox="${viewBox}" // 不设置也可以
            
            let svgHtml = createSymbol(defaultOptions?.iconPrefix, name, newSvgText as string);
            symbolMaps+=svgHtml;
        });
        return symbolMaps;
    }

    function transformIndexHtml(html: string) {
        const style = setSvgMapHideStyle(defaultOptions.svgId);
        const svgHtmlMaps = getSvgHtmlMaps(defaultOptions.svgId, symbolMaps);
        const tgHtmlStr = `${html}${svgHtmlMaps} ${style}`;
        const rsHtmlString = tgHtmlStr;
        return rsHtmlString;
    }
    let svgMapPath = '';
    let configs = {};
    const pluginOptions = {
        name: 'vite:svg-map-icons',
        apply: 'serve',
        configResolved(config: any) {
            configs = config;
            svgMapPath = resolve(config.root, `${defaultOptions.dir}`);
            handleSvgMaps(svgMapPath);
        },
        transformIndexHtml,
        resolveId(id: string) {
            if (id === ModuleId) {
                return resolvedModuleId
            }
        },
        async load(id: string) {
            if (id === resolvedModuleId) {
                return `${svgIconStringReplace(svgIconString, defaultOptions.iconPrefix)};
                \n// svg目录的svg名称集合的数组, 新加、删除svg文件时该变量还不支持热更
                \n ${ defaultOptions.isNameVars?'export const svgIconNames ='+ JSON.stringify(svgs): '' }
                `;
            }
            return
        },
        // transform(code, id) {
        //     if (id === resolvedModuleId) {
        //         console.log(code, '===', id);
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
        },
    }
    return pluginOptions;
}