<script setup>
import { ref } from 'vue'
// import icon from './assets/svg/logo.svg?raw' 
import svgIcon from 'svg-icon'
console.log(svgIcon, 'svgIcon')
const size = ref(100)
const color = ref('#f00')
</script>

<template>
    <div>
        <h1>svg-icon</h1>
        <h4>
            针对<a href="https://www.iconfont.cn/" target="_blank">iconfont.cn</a> 
            上的svg 写了一个可以修改color、size vue组件
        </h4>
        <svgIcon name="logo" :color="color" :size="size"></svgIcon>
        <svgIcon name="shop" :color="color" :size="size"></svgIcon>
        <svgIcon name="voice" :color="color" :size="size"></svgIcon>
        <svgIcon name="testColor" :convert-color="false" :size="size"></svgIcon>
        <div class="box">
            <div class="title"><b>修改大小</b></div>
            <br />
            <label class="label">
                <span>大小40</span>
                <input type="radio" value="40" v-model="size" />
            </label>
            <label class="label">
                <span>大小60</span>
                <input type="radio" value="60" v-model="size" />
            </label>
            <label class="label">
                <span>大小120</span>
                <input type="radio" value="120" v-model="size" />
            </label>
            <label class="label">
                <span>大小200</span>
                <input type="radio" value="200" v-model="size" />
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
</style>
