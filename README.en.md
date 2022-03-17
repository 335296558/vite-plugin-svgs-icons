# vite-plugin-vue-svg-icons

English | [简体中文](README.md)

#### Introduce
    An SVG icon plug-in without each SVG a HTTP request component can change the color and size, Support all svg on iconfont.cn

#### install
    yarn add vite-plugin-vue-svg-icons -D
    npm i vite-plugin-vue-svg-icons -D
    pnpm add vite-plugin-vue-svg-icons -D

#### vite.config.js Instructions
```js
    import vitePluginVueSvgIcons from 'vite-plugin-vue-svg-icons'
    export default defineConfig({
        plugins: [
            vitePluginVueSvgIcons(Object)
        ],
    })
```
#### vitePluginVueSvgIcons Methods the reference，Object， If you don't need to SVG icon is not recommended in the directory

| parameter name | type | description | default |
| -------- | -------- | -------- | -------- |
|dir|String|SVG icon directory|`${process.cwd()}/src/assets/svg`|

#### The instructions on the SVG components
```js
    // app.vue Local registration using
    <script setup>
        import svgIcon from 'svg-icon'
    </script>
    //Write the name parameter is definition file name，such as：svg/logo.svg，then you only need name="logo" to reference this svg
    <template>
        <svgIcon name="logo" color="#f00" size="80" />
    </template>
```

```js
    // main.js All registered
    import svgIcon from 'svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

#### Component parameters that
| parameter name | type | default |
| -------- | -------- | -------- |
|name|String|null|
|color|String|SVG bring value, If you don't set it, it will not change the original color of the svg|
|size|Number|SVG bring value|

<!-- [示列图像]() -->