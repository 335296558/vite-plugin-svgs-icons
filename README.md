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
    import vitePluginSvgsIcons from 'vite-plugin-svgs-icons'
    export default defineConfig({
        plugins: [
            vitePluginSvgsIcons()
        ],
    })
```
#### vitePluginSvgsIcons 方法传参，Object， 如果不需要的svg图标建议不要放在目录下

| 参数名 | 类型 | 描述 | 默认值 |
| -------- | -------- | -------- | -------- |
|dir|String|存放svg图标的目录|path.resolve(__dirname, 'src', 'assets', 'svg')|
<!-- |moduleId|String|定义导入名称|virtual:svg-icon| -->
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

```js
    // main.js 全局注册，不推荐哈，推荐局部导入即可
    import svgIcon from 'virtual:svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

#### 组件参数说明
| 参数名 | 类型 | 默认值 |
| -------- | ------- | -------- |
|name|String|必需设置name，与文件名称一样， 否则不显示哦。name参数是svg文件名称，比如：svg/logo.svg 那么你引用这个svg 只需要name="logo"|
|color|String| 设置颜色 应该方式仅支持单色修改|
|size|String、Number、Array| - |

<!-- [示列图像]() -->


#### 版本描述：
    v >= v3.1.5 
        1、优化与修复有些svg无法显示问题【但依然是会有些特殊的svg可能、可能、可能无法显示】
        2、支持svg 多色修改🤪

[历史版本：version Update](VERSION.md) 

🤡👻👽👾🤖😈🤠👺👹😉😜🤪🤪🤪🤪