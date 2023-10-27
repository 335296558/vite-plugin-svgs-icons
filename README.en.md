# vite-plugin-vue-svg-icons
[English documentation](README.en.md) 

[Nuxt3 nuxt-svg-icon](https://github.com/335296558/nuxt-svg-icon)

#### 介绍
    A plug-in for svg icons. There is no need to initiate http requests for each svg. The built-in components can change the svg color and size [only supports monochrome]
    

<img src="./demo/src/assets/demo_git_svgo.gif" width="400px">

#### installation
    yarn add vite-plugin-vue-svg-icons -D

    npm i vite-plugin-vue-svg-icons -D

    pnpm add vite-plugin-vue-svg-icons -D

#### vite.config.js Instructions for use
```js
    import vitePluginVueSvgIcons from 'vite-plugin-vue-svg-icons'
    export default defineConfig({
        plugins: [
            vitePluginVueSvgIcons()
        ],
    })
```
#### The vitePluginVueSvgIcons method passes parameters, Object. If you do not need the svg icon, it is recommended not to place it in the directory.

| 参数名 | 类型 | 描述 | 默认值 |
| -------- | -------- | -------- | -------- |
|dir|String|Directory to store svg icons|path.resolve(__dirname, 'src', 'assets', 'svg')|
|moduleId|String|Define import name|svg-icon|
```js
    // Directory, please note that the multicolor related ones will be abandoned starting from v3.1.4.
    // Multi-color cannot modify color
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
        import svgIcon from 'svg-icon'
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
    // main.js Global registration is not recommended. Local import is recommended.
    import svgIcon from 'svg-icon'
    VueApp.component('svg-icon', svgIcon);
```

#### Component parameter description
| name | type | default |
| -------- | ------- | -------- |
|name|String|The name must be set, which is the same as the file name, otherwise it will not be displayed. The name parameter is the name of the svg file, for example: svg/logo.svg. Then you only need name="logo" to reference this svg.|
|color|String| Set color only supports single color svg|
|size|String、Number、Array| - |

<!-- [示列图像]() -->


#### 版本描述：推荐v3.1.5
    v >= v3.1.5 Optimize and fix the problem that some svg cannot be displayed [but there are still some special svg that cannot be used], and moved some svg from the website for testing ☑
    v3.1.2 > Optimized the build configuration and optimized the import method!
    v3.1.0 > Upgrade to the new version and replace the build tool vite
    v3.0.21 < Versions smaller than this are abandoned and deleted! Upgrade to new version
    v3.0.21 Normal version
    v3.0.22 Optimize internally defined ids: add prefixes to ids
    

🤡👻👽👾🤖😈🤠👺👹😉😜🤪🤪🤪🤪