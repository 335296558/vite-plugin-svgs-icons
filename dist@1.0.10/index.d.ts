/**
 * @author 忘情上人
 * @date 2022/02
 * @flx ts @dete 2023/10/26
 * @author 335296558@qq.com
 * @name vite-plugin-svgs-icons || vitePluginSvgsIcons
 */
import { Plugin } from 'vite';
interface IOptions {
    moduleId?: string;
    ssr?: boolean;
    dir?: any;
    svgId?: string;
    iconPrefix?: string;
    clearOriginFill?: boolean;
    isNameVars?: boolean;
    isWarn?: boolean;
    isMultiColor?: boolean;
    configResolvedAfter?: Function;
    isViewTools?: boolean;
}
export default function vitePluginSvgsIcons(options: IOptions): Plugin;
export {};
