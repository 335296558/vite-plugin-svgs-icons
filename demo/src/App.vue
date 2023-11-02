<script setup>
import { ref } from 'vue';
import svgIcon, { svgIconNames } from 'virtual:svg-icon';
const color = ref('#ff9c00');
const size = ref(42);
</script>

<template>
    <div>
        <h1 :style="`color: ${color}`">DEMO</h1>
        <div class="install">
            <h4 style="color:rgb(253, 169, 169);display: flex;align-items: center;justify-content: center;">
                <span style="padding-right:15px;">vite-plugin-vue-svg-icons 文档 👉👉👉</span> 
                <a href="https://github.com/335296558/vite-plugin-vue-svg-icons/blob/main/README.md" target="_blank"><svgIcon name="github" size="30"></svgIcon></a>
            </h4>
        </div>
        <h4>
            针对<a href="https://www.iconfont.cn/" target="_blank">iconfont.cn</a> 
            上的svg 写了一个可以修改color、size vue组件
        </h4>
        <h4 style="color:rgb(253, 169, 169)">
            多色图标不支持修改color
        </h4>
        <!-- <svgIcon name="test1" :color="color" :size="size"></svgIcon>
        <svgIcon name="aa" :color="color" :size="size"></svgIcon> -->
        <svgIcon name="logo" :color="color" :size="size"></svgIcon>
        <svgIcon name="shop" :color="color" :size="size"></svgIcon>
        <svgIcon name="voice" :color="color" :size="size"></svgIcon>
        <svgIcon name="testColor" :size="size"></svgIcon>
        <svgIcon name="moer" :size="size"></svgIcon>
        <svgIcon name="customerService" :color="color" :size="size"></svgIcon>
        <svgIcon name="chat" :color="color" :size="size"></svgIcon>
        <div class="box">
            <div class="title"><b>修改大小</b></div>
            <br />
            <label class="label" v-for="(k, i) in 8" :key="k+i">
                <span>{{ (i+1) * 12 }}px</span>
                <input type="radio" :value="(i+1) * 12" v-model="size" />
            </label>
        </div>
        <div class="box">
            <div class="title"><b>修改color</b></div>
            <br />
            <label class="label">
                <span style="color: #000000">黑色</span>
                <input type="radio" value="#000000" v-model="color" />
            </label>
            <label class="label">
                <span style="color: #ff9c00">黄色</span>
                <input type="radio" value="#ff9c00" v-model="color" />
            </label>
            <label class="label">
                <span style="color: #0739ff">蓝色</span>
                <input type="radio" value="#0739ff" v-model="color" />
            </label>
            <label class="label">
                <span style="color: #9707ff">紫色</span>
                <input type="radio" value="#9707ff" v-model="color" />
            </label>
        </div>
        <h4 style="color:rgb(253, 169, 169);display: flex;align-items: center;justify-content: center;">
            <span style="padding-right:15px;">Nuxt3用法👉👉👉</span>
            <a href="https://github.com/335296558/nuxt-svg-icon" target="_blank">
                <svgIcon name="github" size="30"></svgIcon>
            </a>
        </h4>
    </div>
    
    <div :style="`padding: 8px;color: ${color}`">以下复制其它网站上的一些svg icon 测试, 但并不是所有svg icon都支持换色哦！</div>
    <div class="svg-testing-icon-box">
        <ul>
            <li v-for="(name, i) in svgIconNames" :key="i"  style="padding: 8px">
                <svgIcon :style="`width: ${size}px;height: ${size}px`" :color="color" :name="name"></svgIcon>
            </li>
        </ul>
    </div>
    <svgIcon :style="`--sex-svg-color: ${color}`" name="sex"></svgIcon>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box {
    padding: 15px;
}
.label {
    padding: 15px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 700;
}
.icon {
    font-size: 200px;
}
ul ,.li{
    padding: 0;
    margin: 0;
    list-style: none;
}
.svg-testing-icon-box{
    background: #ffffff;
    overflow: hidden;
    border-radius: 10px;
    padding: 10px;
}
.svg-testing-icon-box ul li{
    float: left;
}
</style>
