<template>
    <span
        :style="{ 
            width: size+'px', 
            height: size+'px',
            display: 'inline-block',
        }" 
        v-html="transformColorSize(svg)"
    >
    </span>
</template>

<script setup>
const props = defineProps({
    svg: { 
        type: String, 
        default: '',
    },
    size: {
        type: [String, Number], 
        default: '40'
    },
    color: { 
        type: String, 
        default: '#4e4f4f' 
    },
    protect: {
        type: Boolean, 
        default: true
    }
});
function transformColorSize (svgStr) {
    return svgStr;
    if (!svgStr) return
    if (
        props.protect && 
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
    svgStr = svgStr.replace(/\width="[0-9]*"/g, `width="${props.size}" `)
    svgStr = svgStr.replace(/\height="[0-9]*"/g, `height="${props.size}" `)
    svgStr = svgStr.replace(/fill="[\s\S]*" /g, `fill="${props.color}" `)
    if (svgStr.indexOf('width="')<0) {
        svgStr = svgStr.replace(/<svg/g, `<svg width="${props.size}"`)
    }
    if (svgStr.indexOf('height="')<0) {
        svgStr = svgStr.replace(/<svg/g, `<svg height="${props.size}"`)
    }
    if (svgStr.indexOf('fill="')<0) {
        svgStr = svgStr.replace(/<path/g, `<path fill="${props.color}"`)
    }
    return svgStr
}
</script>
