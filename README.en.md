# vite-plugin-svgs-icons
### The original vite-plugin-vue-svg-icons was renamed vite-plugin-svgs-icons
[English documentation](README.cn.md) 

<!-- [Nuxt3 nuxt-svg-icon](https://github.com/335296558/nuxt-svg-icon) -->

#### introduce
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
    import vitePluginSvgsIcons from 'vite-plugin-svgs-icons'
    export default defineConfig({
        plugins: [
            vitePluginSvgsIcons()
        ],
    })
```
#### The vitePluginSvgsIcons method passes parameters, Object. If you do not need the svg icon, it is recommended not to place it in the directory.

| param | type | description | default |
| -------- | -------- | -------- | -------- |
|dir|String|Directory to store svg icons|path.resolve(__dirname, 'src', 'assets', 'svg')|
<!-- |moduleId|String|定义导入名称|virtual:svg-icon| -->
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
    // app.vue Local registration use
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

```js
    // main.js global registration
    import svgIcon from 'virtual:svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

#### Component parameter description
| param | type | default |
| -------- | ------- | -------- |
|name|String|The name must be set, which is the same as the file name, otherwise it will not be displayed. The name parameter is the name of the svg file, for example: svg/logo.svg. Then you only need name="logo" to reference this svg.|
|color|String| Set color This method only supports single color modification! [Multi-color modification and move](MULTICOLOR.md)|
|size|String、Number、Array| - |

<!-- [示列图像]() -->

🤡👻👽👾🤖😈🤠👺👹😉😜🤪🤪🤪🤪