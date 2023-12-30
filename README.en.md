# vite-plugin-svgs-icons
### The original vite-plugin-vue-svg-icons was renamed vite-plugin-svgs-icons
[中文 documentation](README.md) 

<!-- [Nuxt3 nuxt-svg-icon](https://github.com/335296558/nuxt-svg-icon) -->

#### introduction
    It is an svg sprite plug-in🤔, which can easily modify Color, MultiColor, and Size
     The built-in Vue component can be called directly. Although it supports multi-color modification of some svg icons, not all of them may be supported!
    
[How to modify multi-color SVG?](MULTICOLOR.md)

<img src="./demo/src/assets/testing_git_svgs.gif" width="400px">

#### installation
    yarn add vite-plugin-svgs-icons -D

    npm i vite-plugin-svgs-icons -D

    pnpm add vite-plugin-svgs-icons -D

#### vite.config.js
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
##### You can also use the Nuxt module [nuxt-svgs-icon](https://github.com/335296558/nuxt-svgs-icon)

#### vitePluginSvgsIcons Parameter configuration

| parameter name | type | description | default value |
| -------- | -------- | -------- | -------- |
|dir|String|Directory to store svg icons|path.resolve(__dirname, 'src', 'assets', 'svg')|
|moduleId|String|Define import name|virtual:svg-icon|
|isNameVars|Boolean|set true can export svgIconNames, the array name of the svg collection， import svgIcon, { svgIconNames } from 'virtual:svg-icon'|false|
|isViewTools|Boolean|Whether to enable the svg views tool, which is an svg panel for easy viewing and reducing duplication when added to the project. If enabled, a global button will be displayed in the project. It is only valid in the development environment. The isNameVars parameter will be changed to true. |true|


<!-- |ssr|boolean|直接服务端渲染|false| -->

```js
    // Some svg icons with multiple colors also support color modification.
    // Multi-level directories are possible, but the directory name will not be added to the svg name, so the svg name must be unique.
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
#### svg component usage instructions
```js
    // main.js Global registration
    import svgIcon from 'virtual:svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

```js
    // app.vue Local registration useLocal registration use
    <script setup>
        import svgIcon from 'virtual:svg-icon';
    </script>
    // The name parameter is the svg file name, for example: svg/logo.svg
    // Then you only need name="logo" to reference this svg
    <template>
        // This can be done
        <svgIcon name="logo" color="#f00" size="80" />
        // You can also do this. If you are H5, this is recommended.
        <svgIcon name="logo" style="color:#f00;width: 80px;height:80px" />
    </template>
```

#### virtual:svg-icon Component parameter description
| parameter name | type | default value |
| -------- | ------- | -------- |
|name|String|The name must be set, which is the same as the file name, otherwise it will not be displayed. The name parameter is the name of the svg file, for example: svg/logo.svg. Then you only need name="logo" to reference this svg.|
|color|String| This method of setting color only supports single color modification! [For more information about multi-color modification, please move here](MULTICOLOR.md)|
|size|String、Number、Array| - |

<!-- [示列图像]() -->


🤡👻👽👾🤖😈🤠👺👹😉😜🤪🤪🤪🤪# vite-plugin-svgs-icons