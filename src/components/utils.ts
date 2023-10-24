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

/**
 * @description 它将返回一个布尔值，指示SVG是否具有多个颜色，并且这些颜色是否相同。
 * @param svgCode 
 * @return {boolean} true=多个颜色, false=单个颜色、或者虽然是多个色，但色值是相同
 */
export function isMultiColorSVG(svgCode: string) {
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
 * @description 初始化svg源码、过滤等...
 * @param {*} svgStr 
 * @param {*} option 
 * @return {string} svg html string
 */
interface IOption {
    protect: boolean;
    clearOriginFill: boolean;
    name: string;
    beforeHook: ()=> void;
}

let otherUrls = [];
export function transformSvgHTML(svgStr, option: IOption){
    option = Object.assign({
        protect: true,
        beforeHook: ()=>{}
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
    if (objs.bool) {
        svgStr = svgStr.replace(/<svg/g, `<svg multicolor="true"`);
    } else if (!fill_url_reg.test(svgStr)){ // 单色
        console.log(objs, 'objs', option.name);
        svgStr = svgStr.replace(/<svg/g, `<svg multicolor="false"`);
        console.log(countPathTags(svgStr), option.clearOriginFill, '====', objs.colors?.length);
        if ((countPathTags(svgStr)===objs.colors?.length || countPathTags(svgStr)===1) && option.clearOriginFill) { 
            // 为了处理一些单色的svg 无法在外部use时修改它的color的问题
            // 清除掉它原来的color, 
            // 并且不能给默认color, 不然外部无法修改color
            svgStr = svgStr.replace(/fill="([^"]+)"/g, ''); 
        }
    }
    return svgStr
} 


/**
 * @description获取svg viewBox属性值
 * @function getViewBox
 * @param {string} svgHTMLText 
 * @rutern {string}
 */
export function getViewBox(svgHTMLText) {
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
function createSymbol(iconPrefix: string, name: string, newSvgText: string){
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
export function hasBase64AndImage(str) {
    // 判断字符串中是否存在base64格式的数据
    const base64Regex = /^data:image\/(png|jpeg|gif);base64,/;
    const hasBase64 = base64Regex.test(str);
  
    // 判断是否存在image标签
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = str;
    const images = tempDiv.getElementsByTagName('img');
    const hasImage = images.length > 0;
  
    return hasBase64 && hasImage;
  }
  