// 更改color, size
export const transformColorSize = (svgStr, option={})=> {
    if (!svgStr) return
    if (
        option.protect && 
        (
            svgStr.indexOf('function')>=0 || 
            svgStr.indexOf('Function()')>=0 || 
            svgStr.indexOf('[native code]')>=0 ||
            (svgStr.indexOf('https://')>=0 && svgStr.indexOf('http://www.w3.org')<0)
        )
    ) {
        // 安全保护机制
        // 你的SVG中可能存XSS 攻击的风险！插件进行了阻断，此时你的svg无法显示，强制开启 设置 
        return console.error('There is a risk of XSS attacks in your SVG! The plug-in is blocked, at this time your svg cannot be displayed, forcibly open');
    }
    if (option.color) svgStr = svgStr.replace(/fill="[\s\S]+?"/g, `fill="${option.color}" `)
    // 判断如果svg原本不带width、height 属性，主动给它设置上---------start
    let svgStartTag = svgStr.match(/<svg([^>]+)/g)[0]
    if (svgStartTag.match(/\width="[0-9]*"/g)) {
        svgStr = svgStr.replace(/<svg/g, `<svg width="${option.size}"`)
    }
    if (svgStartTag.match(/\height="[0-9]*"/g)) {
        svgStr = svgStr.replace(/<svg/g, `<svg height="${option.size}"`)
    }
    if (svgStartTag.indexOf('width="') < 0 && option.size) {
        svgStr = svgStr.replace(/<svg/g, `<svg width="${option.size}"`)
    }
    if (svgStartTag.indexOf('height="') < 0 && option.size) {
        svgStr = svgStr.replace(/<svg/g, `<svg height="${option.size}"`)
    }
    // ---------end
    if (option.color && svgStr.indexOf('fill="')<0) {
        svgStr = svgStr.replace(/<path/g, `<path fill="${option.color}"`)
    }
    return svgStr
}
export default {
    render() {
        return h(
            'i',
            {
                class: ['peas-svg-icon', this.class],
                'data-svg-file-name': this.name,
                innerHTML:  this.svgColorSize(this.name)
            },
        )
    },
    props: {
        svg: { 
            type: String, 
            default: '',
        },
        name:{ 
            type: String, 
            default: '',
        },
        size: {
            type: [String, Number, Boolean], 
            default: '20'
        },
        color: { 
            type: String, 
            default: '' 
        },
        class: { 
            type: String, 
            default: '' 
        },
        protect: {
            type: Boolean, 
            default: true
        }
    },
    methods: {
        svgColorSize(name) {
            if (!svgs[name]) {
                console.warn(name+'.svg文件不存在，请检查配置中的dir参数配置的目录是否存在应该svg文件')
                return name
            };
            return transformColorSize(svgs[name], {
                color: this.color,
                size: this.size,
                protect: this.protect,
                class: this.class,
            })
        }
    },
}