# vite-plugin-vue-svg-icons
[English](README.en.md) | [简体中文](README.en.md)｜[v3.0.0 README.3.0.md 简体中文](README.3.0.md)

v3.0.0 English

#### introduce
    An SVG icon plug-in without each SVG a HTTP request component can change the color, size only supports single color

<img src="./example/src/assets/demo.gif" width="400px"></img>   
#### install
    yarn add vite-plugin-vue-svg-icons -D

    npm i vite-plugin-vue-svg-icons -D

    pnpm add vite-plugin-vue-svg-icons -D

#### vite.config.js Directions for use
```js
    import vitePluginVueSvgIcons from 'vite-plugin-vue-svg-icons'
    export default defineConfig({
        plugins: [
            vitePluginVueSvgIcons(Object)
        ],
    })
```
#### vitePluginVueSvgIcons Methods the reference，Object， If you don't need to SVG icon is not recommended in the directory

| param name | type | description | default |
| -------- | -------- | -------- | -------- |
|dir|String|SVG icon directory|`${process.cwd()}/src/assets/svg`|
```js
    // Directory, pay attention to
    // Multicolor SVG please put multicolor this directory, multicolor can't change color
    // If polychromatic SVG is not on the multicolor this directory, will be modified to monochrome
    // No multicolor directory you from already built
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
#### The instructions on the SVG components
```js
    // app.vue Local registration using
    <script setup>
        import svgIcon from 'svg-icon'
    </script>
    // name Param is the SVG file name，such as：svg/logo.svg
    // So what do you refer to the SVG only need the name logo
    <template>
        <svgIcon name="logo" color="#f00" size="80" />
    </template>
```

```js
    // main.js All registered
    import svgIcon from 'svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

#### Component param that
| param | type | default |
| -------- | -------- | -------- |
|name|String|Necessary to set the name, the same as the file name, or does not display well.The name parameter is a SVG file name, such as: name="logo"|
|color|String| inherit，Please set your ideal color, Support only monochrome SVG|
|size|Number|default 20, The default value is set to false, SVG size will not be set|
|class|String| - |

<!-- [示列图像]() -->