# vite-plugin-vue-svg-icons

#### 介绍
    一个svg图标的插件，多个SVG图标，也只发起一次网络请求，组件可以改变color、size, 支持全部iconfont.cn上的svg

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
#### vitePluginVueSvgIcons 方法传参，Object

| 参数名 | 类型 | 默认值 |
| -------- | -------- | -------- |
|dir|String|`${process.cwd()}/src/assets/svg`|

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
|color|String|svg自带值|
|size|Number|svg自带值|

<!-- [示列图像]() -->