# vite-plugin-vue-svg-icons
[English](README.en.md) | 简体中文
#### 介绍
    一个svg图标的插件，无需每个svg都发起http请求, 组件可以改变color、size, 支持全部iconfont.cn上的svg

<img src="./example/src/assets/demo.gif" width="200px"></img>   
#### 安装
    yarn add vite-plugin-vue-svg-icons -D
    npm i vite-plugin-vue-svg-icons -D
    pnpm add vite-plugin-vue-svg-icons -D

#### vite.config.js 使用说明
```js
    import vitePluginVueSvgIcons from 'vite-plugin-vue-svg-icons'
    export default defineConfig({
        plugins: [
            vitePluginVueSvgIcons(Object)
        ],
    })
```
#### vitePluginVueSvgIcons 方法传参，Object， 如果不需要的svg图标建议不要放在目录下

| 参数名 | 类型 | 描述 | 默认值 |
| -------- | -------- | -------- | -------- |
|dir|String|存放svg图标的目录|`${process.cwd()}/src/assets/svg`|

#### svg组件使用说明
```js
    // app.vue 局部注册使用
    <script setup>
        import svgIcon from 'svg-icon'
    </script>
    // name参数是写定义的文件名称，比如：svg/logo.svg，那么你引用这个svg 只需要name="logo"
    <template>
        <svgIcon name="logo" color="#f00" size="80" />
    </template>
```

```js
    // main.js 全部注册
    import svgIcon from 'svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

#### 组件参数说明
| 参数名 | 类型 | 默认值 |
| -------- | -------- | -------- |
|name|String|空|
|color|String|svg自带值, 不设置就不会更改svg原本的color|
|size|Number|svg自带值|

<!-- [示列图像]() -->