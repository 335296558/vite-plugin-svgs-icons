<script setup>
import { ref } from 'vue';
import svgIcon, { svgIconNames } from 'svg-icon';
const color = ref('#ff9c00');
const size = ref(42);
let svgTest = '<svg data-singlecolor="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ys="12"><path d="M19.4348 5.85L13.5504 2.42C12.5894 1.86 11.4007 1.86 10.4298 2.42L4.55531 5.85C4.08156 6.12727 3.68844 6.52552 3.41543 7.00472C3.14242 7.48392 2.99915 8.02721 3 8.58V15.42C3 16.54 3.59439 17.58 4.55531 18.15L10.4397 21.58C11.4007 22.14 12.5894 22.14 13.5603 21.58L19.4447 18.15C19.9184 17.8727 20.3116 17.4745 20.5846 16.9953C20.8576 16.5161 21.0009 15.9728 21 15.42V8.58C20.9957 8.02708 20.8492 7.48477 20.5748 7.0062C20.3004 6.52764 19.9076 6.12922 19.4348 5.85ZM11.2521 7.75C11.2521 7.34 11.5889 7 11.995 7C12.4012 7 12.738 7.34 12.738 7.75V13C12.738 13.41 12.4012 13.75 11.995 13.75C11.5889 13.75 11.2521 13.41 11.2521 13V7.75ZM12.9064 16.63C12.8569 16.75 12.7876 16.86 12.6984 16.96C12.5598 17.0999 12.3829 17.1947 12.1904 17.2321C11.9979 17.2696 11.7988 17.2479 11.6186 17.17C11.4898 17.12 11.3908 17.05 11.2917 16.96C11.2025 16.86 11.1332 16.75 11.0737 16.63C11.026 16.5092 11.0025 16.38 11.0044 16.25C11.0044 15.99 11.1035 15.73 11.2917 15.54C11.3908 15.45 11.4898 15.38 11.6186 15.33C11.9851 15.17 12.421 15.26 12.6984 15.54C12.7876 15.64 12.8569 15.74 12.9064 15.87C12.956 15.99 12.9857 16.12 12.9857 16.25C12.9857 16.38 12.956 16.51 12.9064 16.63Z" fill="none"></path></svg>'
function removeFillAttribute(svgCode) {
    return svgCode.replace(/fill="([^"]+)"/g, '');
}
console.log(removeFillAttribute(svgTest))
</script>

<template>
    <div>
        <h1>DEMO</h1>
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
        <svgIcon name="testColor" :size="40"></svgIcon>
        <svgIcon name="moer" :size="size"></svgIcon>
        <svgIcon name="customerService" :color="color" :size="size"></svgIcon>
        <svgIcon name="chat" :color="color" :size="size"></svgIcon>
        <div class="box">
            <div class="title"><b>修改大小</b></div>
            <br />
            <label class="label">
                <span>大小18</span>
                <input type="radio" value="18" v-model="size" />
            </label>
            <label class="label">
                <span>大小26</span>
                <input type="radio" value="26" v-model="size" />
            </label>
            <label class="label">
                <span>大小34</span>
                <input type="radio" value="34" v-model="size" />
            </label>
            <label class="label">
                <span>大小42</span>
                <input type="radio" value="42" v-model="size" />
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
    <div>以下复制其它网站上的一些svg icon 测试</div>
    <div class="svg-icon-box">
        <ul v-fallback-src>
            <li v-for="(name, i) in svgIconNames" :key="i">
                <svgIcon :style="`width: ${size}px;height: ${size}px`" :color="color" :name="name"></svgIcon>
            </li>
        </ul>
    </div>
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
    padding: 30px;
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
.svg-icon-box{
    background: #dcdcdc;
    overflow: hidden;
    border-radius: 10px;
    padding: 10px;
}
.svg-icon-box ul li{
    /* display: flex;
    align-items: center; */
    float: left;
}
</style>
