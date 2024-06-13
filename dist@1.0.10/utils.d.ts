/**
 * @description string get push url = 字符串中提取url
 * @param htmlString
 */
export declare function getStringUrls(htmlString: string): string[];
/**
 * @description 它将返回一个布尔值，指示SVG是否具有多个颜色，并且这些颜色是否相同。
 * @param svgCode
 * @return {boolean} true=多个颜色, false=单个颜色、或者虽然是多个色，但色值是相同
 */
export declare function isMultiColorSVG(svgCode: string): {
    bool: boolean;
    colors: RegExpMatchArray | null;
    colorAttrNames?: undefined;
} | {
    bool: boolean;
    colors: RegExpMatchArray;
    colorAttrNames: string[];
};
/**
 * @description 判断svg是否是多色, 并且只返回boolean
 * @param {string} svg
 * @return {boolean}
 */
export declare function isMultiColor(svg: string): boolean;
/**
 * @description 判断svg内有多少个<path>
 * @param svgCode
 * @return {number}
 */
export declare function countPathTags(svgCode: string): number;
/**
 * @description获取svg viewBox属性值
 * @function getViewBox
 * @param {string} svgHTMLText
 * @rutern {string}
 */
export declare function getViewBox(svgHTMLText: string): string | null;
/**
 * @description 给svg源码设置隐藏样式
 * @param {string} container
 */
export declare function setSvgMapHideStyle(container: string): string;
/**
 * @description 集成svg集合并返回
 * @param {string} container svg id
 * @param {string} symbolMaps svg html string
 * @return {string} svg maps html
 */
export declare function getSvgHtmlMaps(container: string, symbolMaps: string): string;
/**
 * @description 替换前缀
 * @param code
 * @param iconPrefix
 */
export declare function svgIconStringReplace(code: string, iconPrefix: string): string;
/**
 * @description 判断是否存在base64的图像数据
 * @param str
 * @return {boolean}
 */
export declare function hasBase64AndImage(svgHtmlString: string): boolean;
/**
 * @description 处理数组中的值不能重复
 * @param colors
 */
export declare function filterColors(colors: string[]): string[];
/**
 * @description 初始化svg源码、过滤等...
 * @param {*} svgStr
 * @param {*} option
 * @return {string} svg html string
 */
export interface IOption {
    protect?: boolean;
    clearOriginFill?: boolean;
    name: string;
    isWarn: boolean;
    isMultiColor: boolean;
    iconPrefix: string;
}
export declare function transformSvgHTML(svgStr: string, option: IOption): string | null | undefined;
/**
 * @description 就生成一份创建svg集合的js
 * @param svgId
 * @param svgHtmlMaps
 */
export declare function createLoadSvgIconsCode(_svgId: string, svgHtmlMaps: string): string;
/**
 * @description 压缩为一行
 * @param {string} html
 * @return html
 */
export declare function compressHtml(html: string): string;
/**
 * @description 处理转义
 * @param {string} html
 * @return html
 */
export declare function escapeHtml(html: string): string;
