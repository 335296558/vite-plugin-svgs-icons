'use strict';

const clc = {
    // green: (text: string) => `\x1B[32m${text}\x1B[0m`,
    yellow: (text: string) => `\x1B[33m${text}\x1B[0m`,
    // red: (text: string) => `\x1B[31m${text}\x1B[0m`,
    // BgRed: (text: string)=> `\x1b[41m${text}`,
};

let otherUrls: string[] = [];

/**
 * @description string get push url = 字符串中提取url
 * @param htmlString 
 */
export function getStringUrls(htmlString: string) {
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

const keywordColors = [
    'aliceblue',
    'antiquewhite',
    'aqua',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'black',
    'blanchedalmond',
    'blue',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkgrey',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkslategrey',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dimgrey',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'fuchsia',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'greenyellow',
    'grey',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightslategrey',
    'lightsteelblue',
    'lightyellow',
    'lime',
    'limegreen',
    'linen',
    'magenta',
    'maroon',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'navy',
    'oldlace',
    'olive',
    'olivedrab',
    'orange',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'purple',
    'red',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'silver',
    'skyblue',
    'slateblue',
    'slategray',
    'slategrey',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'white',
    'whitesmoke',
    'yellow',
    'yellowgreen'
];

function getRegex() {
    // 匹配 color 
    // const colorRegex = new RegExp(`(#([0-9a-fA-F]{3,6})|${keywordColors.join('|')})`, 'g');
    const colorRegex = new RegExp(`(#(?:[0-9a-fA-F]{3}){1,2}|rgba?\\(\\d+,\\s*\\d+,\\s*\\d+(?:,\\s*[\\d.]+)?\\)|(?:hsla?|hsl)\\(\\d+(?:,\\s*\\d+%)\\{2\\}(?:,\\s*[\\d.]+)?\\)|\\b(?:${keywordColors.join('|')})\\b|hsla?\\([^)]*\\))`, 'g');
    return colorRegex;
}

/**
 * @description 它将返回一个布尔值，指示SVG是否具有多个颜色，并且这些颜色是否相同。
 * @param svgCode 
 * @return {boolean} true=多个颜色, false=单个颜色、或者虽然是多个色，但色值是相同
 */
export function isMultiColorSVG(svgCode: string) {
    // 使用正则表达式匹配所有颜色代码
    // const colorRegex = /#[0-9a-fA-F]{3,6}/g; // 配 十六进制类型 color
    const colorRegex = getRegex();
    const regex = /(?:color|fill|stroke)="([^"]+)"/g;

    let match;
    let colorAttrNames = [];
    while ((match = regex.exec(svgCode)) !== null) {
        colorAttrNames.push(match[0]);
    }
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
        return { bool: false, colors, colorAttrNames };
    }
    return { bool: true, colors, colorAttrNames };
}

/**
 * @description 判断svg是否是多色, 并且只返回boolean
 * @param {string} svg
 * @return {boolean}
 */
export function isMultiColor(svg: string) {
    const colorRegex = /#[0-9A-Fa-f]{6}/g;
    const colors = new Set(svg.match(colorRegex));
    return colors.size > 1;
}

/**
 * @description 判断svg内有多少个<path>
 * @param svgCode 
 * @return {number}
 */
export function countPathTags(svgCode: string) {
    const regex = /<path/g;
    const matches = svgCode.match(regex);
    return matches ? matches.length : 0;
}

/**
 * @description获取svg viewBox属性值
 * @function getViewBox
 * @param {string} svgHTMLText 
 * @rutern {string}
 */
export function getViewBox(svgHTMLText: string) {
    const viewBoxRegex = /viewBox="([^"]*)"/;
    const viewBoxMatch = viewBoxRegex.exec(svgHTMLText);
    if (viewBoxMatch) {
        return viewBoxMatch[1];
    }
    return null;
}

/**
 * @description 给svg源码设置隐藏样式
 * @param {string} container 
 */
export function setSvgMapHideStyle(container: string) {
    return '<style>#'+container+' {position: absolute; left: -100%;bottom: -100%; width: 0; height: 0;}</style>';
}

/**
 * @description 创建symbol标签字符串
 * @param {string} iconPrefix 
 * @param {string} name 
 * @param {string} newSvgText
 * @return {string} 
 */
export function createSymbol(iconPrefix: string, name: string, newSvgText: string){
    return `<symbol id="${iconPrefix}-${name}">${newSvgText}</symbol>`;
}

/**
 * @description 集成svg集合并返回
 * @param {string} container svg id
 * @param {string} symbolMaps svg html string
 * @return {string} svg maps html
 */
export function getSvgHtmlMaps(container: string, symbolMaps: string) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const xlink = 'http://www.w3.org/1999/xlink';
    return `<svg id="${container}" xmlns="${xmlns}" xmlns:link="${xlink}"><defs>${symbolMaps}</defs></svg>`;
}

/**
 * @description 替换前缀
 * @param code 
 * @param iconPrefix 
 */
export function svgIconStringReplace(code: string, iconPrefix: string) {
    const reg = /\[--iconPrefix--\]/g;
    return code.replace(reg, `${iconPrefix}`);
}

/**
 * @description 判断是否存在base64的图像数据
 * @param str 
 * @return {boolean}
 */
export function hasBase64AndImage(svgHtmlString: string) {
    // 判断字符串中是否存在base64格式的数据
    const regex = /data:(image|audio|video)\/[^;]+;base64,([^"]+)/g;
    const match = regex.exec(svgHtmlString);
    while (match !== null) {
        if (match[1]) {
            return true;
        }
    }
    return false;
}
  

/**
 * @description 处理数组中的值不能重复
 * @param colors 
 */
export function filterColors(colors: string[]) {
    const uniqueColors: string[] = [];
    const uniqueValues: number[] = [];
  
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      const value = i;
  
      if (!uniqueColors.includes(color) && !uniqueValues.includes(value)) {
        uniqueColors.push(color);
        uniqueValues.push(value);
      }
    }
  
    return uniqueColors;
}
  

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
}

export function transformSvgHTML(svgStr: string, option: IOption){
    option = Object.assign({
        protect: true,
        clearOriginFill: true,
    }, option);
    if (!svgStr) return;
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
        option.isWarn && console.warn(clc.yellow('➜ '+option.name+'.svg There is a risk of XSS attacks in your SVG! The plug-in is blocked, at this time your svg cannot be displayed, forcibly open'));
        option.isWarn && console.warn(clc.yellow('➜ '+'SVG图标中可能存XSS 攻击的风险！'));
    }

    // 不建议svg中包含base64的图标
    if (hasBase64AndImage(svgStr)) {
        option.isWarn && console.warn(clc.yellow('➜ '+option.name+'.svg 这是一个包含base64格式的数据图标！ 不建议把它当作svg使用!'));
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 20">
        <text x="40" y="15" font-size="12" fill="#f00000" text-anchor="middle">Not supported</text>
      </svg>`;
    }
    const svgReg = /<svg([^>]+)/g;
    if (!svgStr.match(svgReg)) return null;

    // 清空原码设置的宽高 
    let svgStartTag = svgStr.match(svgReg)[0];
    const w_reg = /\s+width=".+?"/s; // 为什么给s， 因为只需要去掉SVG 标签上的width 属性
    const h_reg = /\s+height=".+?"/s;
    const class_reg = /\s+class=".+?"/g;
    const fill_url_reg = /\s+fill="url\(#(\w+)\)"/g;
    const stroke_reg = /\s+stroke="([^"]+)"/g;
    if (svgStartTag.match(w_reg)) {
        svgStr = svgStr.replace(w_reg, ' ');
    }
    if (svgStartTag.match(h_reg)) {
        svgStr = svgStr.replace(h_reg, ' ');
    }
    if (svgStartTag.match(class_reg)) {
        svgStr = svgStr.replace(class_reg, ' ');
    }

    // 区分单色还是多色
    const objs = isMultiColorSVG(svgStr);
    const styleVarName = `--${option.name}-svg-color`;
    
    if (objs.bool) {
        svgStr = svgStr.replace(/<svg/g, `<svg multicolor="true" `);
        if (option.isMultiColor) { // 处理多色修改color 公支持css var 修改
            const colors = filterColors(objs.colors as string[]);
            svgStr = svgStr.replace(/<svg/g, `<svg color-length="${colors.length}" `);
            let styles = `<style>:root {`;
            for (let i=0; i<colors.length; i++) {
                const color = colors[i];
                const attrColor = objs.colorAttrNames?.find(c=>c.indexOf(color)>=0);
                const cssVar = styleVarName+'-'+i;
                if (attrColor && attrColor !== 'fill="none"') {
                    const attrName = attrColor.split('=')[0];
                    const regex = new RegExp(`${attrColor}`, 'g');
                    svgStr = svgStr.replace(regex, `${attrName}="var(${cssVar})" `);
                }
                styles+= `${cssVar}: ${color};`;
            }
            styles+= '}</style>';
            svgStr = svgStr.replace(/<svg/g, `${styles} <svg`);
        }

    } else if (!fill_url_reg.test(svgStr)){ // 单色
        svgStr = svgStr.replace(/<svg/g, `<svg multicolor="false"`);
        if ((countPathTags(svgStr)===objs.colors?.length || countPathTags(svgStr)===1) && option.clearOriginFill) { 
            // 为了处理一些单色的svg 无法在外部use时修改它的color的问题
            // 清除掉它原来的color
            // 并且不能给默认color, 不然外部无法修改color
            svgStr = svgStr.replace(/fill="([^"]+)"/g, ''); 
        } else if (stroke_reg.test(svgStr)) { // 处理的还是单色的情况，只是通过css var 去更改
            // 这里还没写好
            svgStr = svgStr.replace(stroke_reg, ` stroke="var(${styleVarName})"`); 
            if (objs.colors?.length) {
                // 处理无法在外部通过color 改色的
                svgStr = svgStr.replace(/<svg/g, `<style>:root{ ${styleVarName}: ${objs.colors[0]} }</style> <svg`);
            }
        }
    }
    return svgStr
} 


/**
 * @description 就生成一份创建svg集合的js
 * @param svgId 
 * @param svgHtmlMaps 
 */
export function createLoadSvgIconsCode(_svgId: string, svgHtmlMaps: string) {
    return `
        if (typeof window !== 'undefined') {
            function loadSvgIcons() {
                var body = document.body;
                var svgEl = document.createElement('svg');
                svgEl.style.position = 'absolute';
                svgEl.style.top = '-100%';
                svgEl.style.left = '-100%';
                svgEl.innerHTML = "${svgHtmlMaps}";
                body.insertBefore(svgEl, body.lastChild);
            }
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', loadSvgIcons);
            } else {
                loadSvgIcons()
            }
        }
    `;
}

/**
 * @description 压缩为一行
 * @param {string} html 
 * @return html
 */
export function compressHtml(html: string) {
    return html.replace(/\s+/g, ' ').replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><');
}

/**
 * @description 处理转义
 * @param {string} html 
 * @return html
 */
export function escapeHtml(html: string) {
    return html.replace(/"/g, '\\"');
}