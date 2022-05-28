# vite-plugin-vue-svg-icons
[English](README.en.md) | 简体中文｜[v3.0.0 README.3.0.md 简体中文](README.3.0.md)

[v3.0.0 README.3.0.md English](README.3.0.English.md)

#### 介绍
    一个svg图标的插件，无需每个svg都发起http请求, 组件可以改变color、size【仅支持单色】, 支持全部iconfont.cn上的svg
    

<img src="./example/src/assets/demo.gif" width="400px"></img>   
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
```js
    // 目录，注意
    // 多色的svg 请放在multicolor这个目录，多色无法修改color, 
    // 如果多色的svg不放在multicolor这个目录，就会被修改为单色
    // 没有multicolor目录你就自已建
    |assets
        |svg
            |multicolor
                xxx.svg
                xxx.svg
                xxx.svg

            xxx.svg
            xxx.svg
            xxx.svg
```
#### svg组件使用说明
```js
    // app.vue 局部注册使用
    <script setup>
        import svgIcon from 'svg-icon'
    </script>
    // name参数是svg文件名称，比如：svg/logo.svg
    // 那么你引用这个svg 只需要name="logo"
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
|name|String|必需设置name，与文件名称一样， 否则不显示哦。name参数是svg文件名称，比如：svg/logo.svg 那么你引用这个svg 只需要name="logo"|
|color|String| inherit，请设置上你理想的color, 仅支持单色svg|
|size|Number|默认20, 设置为false, 无默认值，svg也不会被设置上大小|
|class|String| - |

<!-- [示列图像]() -->