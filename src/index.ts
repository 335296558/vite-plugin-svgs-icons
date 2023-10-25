'use strict';
/**
 * @author 忘情上人
 * @date 2022/02
 * @flx ts @dete 2023/10/26 
 * @author 335296558@qq.com
 * @name vite-plugin-vue-svg-icons || vitePluginVueSvgIcons
 */

import { join } from 'path';

import fs from 'fs';

import { transformSvgHTML, createSymbol, getSvgHtmlMaps, setSvgMapHideStyle  } from './utils';

import svgIconString from './components/svgIcon.js?raw';

const PluginName: string = 'vite-plugin-vue-svg-icons';

export interface IOptions {
    moduleId: string;
    ssr: boolean;
    dir: any;
    svgId: string;
    iconPrefix: string;
    // 可以设置初始化时不要清除原来svg的fill, =true也是仅针对单色处理
    clearOriginFill?: boolean; 
    // 是否生成svg名称，Array
    isNameVars?: boolean; 
}

interface IPaths {
    path: any;
    filename: string;
}

let defaultOptions: IOptions = {
    moduleId: 'svg-icon',
    ssr: false,
    dir: join(`${process.cwd()}/src/assets/svg`),
    svgId: '__v__svg__icons',
    iconPrefix: 'ei',
    clearOriginFill: true,
    isNameVars: false,
};

export default function vitePluginVueSvgIcons(options: IOptions) {
    let svgs: string[] = [];

    defaultOptions = Object.assign(defaultOptions, options);

    const ModuleId = defaultOptions.moduleId;

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

    async function transformIndexHtml(html: string) {
        const FilePath: string = `${defaultOptions.dir}`;
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

            let svgHtml = createSymbol(defaultOptions?.iconPrefix, name, newSvgText as string);
            symbolMaps+=svgHtml;
        });
        const style = setSvgMapHideStyle(defaultOptions.svgId);
        const svgHtmlMaps = getSvgHtmlMaps(defaultOptions.svgId, symbolMaps);
        const tgHtmlStr = `${html}${svgHtmlMaps} ${style}`;
        const rsHtmlString = tgHtmlStr;
        return rsHtmlString;
    }
    const pluginOptions = {
        name: 'vite:vue-svg-icons',
        transformIndexHtml,
        resolveId(id: string) {
            if (id === ModuleId) {
                return resolvedModuleId
            }
        },
        async load(id: string) {
            if (id === resolvedModuleId) {
                return `${svgIconString};\n // svg目录的svg名称集合的数组 \n export const svgIconNames = ${JSON.stringify(svgs)};`;
            }
            return
        }
    }
    return pluginOptions;
}