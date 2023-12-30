# vite-plugin-svgs-icons
### 原 vite-plugin-vue-svg-icons 更名为 vite-plugin-svgs-icons
[English documentation](README.en.md) 

<!-- [Nuxt3 nuxt-svg-icon](https://github.com/335296558/nuxt-svg-icon) -->

#### 介绍
    它是一个svg雪碧图插件🤔，可轻松修改Color、MultiColor、Size
    内置vue组件可直接调用, 虽然支持部份svg icon 多色修改，但可能并不是所有都支持哦！
    
[多色SVG如何修改?](MULTICOLOR.md)

<img src="./demo/src/assets/testing_git_svgs.gif" width="400px">

#### installation
    yarn add vite-plugin-svgs-icons -D

    npm i vite-plugin-svgs-icons -D

    pnpm add vite-plugin-svgs-icons -D

#### vite.config.js 使用说明
```js
    import path from 'path';
    import vitePluginSvgsIcons from 'vite-plugin-svgs-icons'
    export default defineConfig({
        plugins: [
            vitePluginSvgsIcons({
                dir: path.resolve(__dirname, 'src', 'assets', 'svg'),
            })
        ],
    })
```
##### Nuxt3
```js
    import path from 'path';
    import vitePluginSvgsIcons from 'vite-plugin-svgs-icons';
    export default defineNuxtConfig({
        vite: {
            plugins: [
                vitePluginSvgsIcons({
                    dir: path.resolve(__dirname, 'assets', 'svg'),
                })
            ]
        }
    })
```
##### 也可以用Nuxt module [nuxt-svgs-icon](https://github.com/335296558/nuxt-svgs-icon)

#### vitePluginSvgsIcons 参数配置

| 参数名 | 类型 | 描述 | 默认值 |
| -------- | -------- | -------- | -------- |
|dir|String|存放svg图标的目录|path.resolve(__dirname, 'src', 'assets', 'svg')|
|moduleId|String|定义导入名称|virtual:svg-icon|
|isNameVars|Boolean|set true 可用导出svgIconNames，svg集合的数组名称， import svgIcon, { svgIconNames } from 'virtual:svg-icon'|false|
|isViewTools|Boolean|是否开启svg views 工具, 就是一个svg面板，方便查看，减少重复增加到项目中, 开启则会在项目中显示一个全局的按钮, 仅在开发环境development有效, isNameVars 参数会被改变为true |true|


<!-- |ssr|boolean|直接服务端渲染|false| -->

```js
    // 部份svg icon多色也支持修改color
    // 可多级目录，但不会把目录名称加在svg名称中，所以svg 名称要是唯一的喔
    |assets
        |svg
            |xxx
                xxx.svg
                xxx.svg
                xxx.svg
            xxx.svg
            xxx.svg
            xxx.svg
```
#### svg组件使用说明
```js
    // main.js 全局注册
    import svgIcon from 'virtual:svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

```js
    // app.vue 局部注册使用
    <script setup>
        import svgIcon from 'virtual:svg-icon';
    </script>
    // name参数是svg文件名称，比如：svg/logo.svg
    // 那么你引用这个svg 只需要name="logo"
    <template>
        // 可以这样
        <svgIcon name="logo" color="#f00" size="80" />
        // 也可以这样，如果你是H5，推荐这种喔
        <svgIcon name="logo" style="color:#f00;width: 80px;height:80px" />
    </template>
```

#### virtual:svg-icon 组件参数说明
| 参数名 | 类型 | 默认值 |
| -------- | ------- | -------- |
|name|String|必需设置name，与文件名称一样， 否则不显示哦。name参数是svg文件名称，比如：svg/logo.svg 那么你引用这个svg 只需要name="logo"|
|color|String| 设置颜色此方法仅支持单色修改！ [关于多颜色修改请移步](MULTICOLOR.md)|
|size|String、Number、Array| - |

<!-- [示列图像]() -->


🤡👻👽👾🤖😈🤠👺👹😉😜🤪🤪🤪🤪