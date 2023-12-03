<h3 style="color: #ff9a9e;">
    <span style="color: #bd34fe;">vite</span>-<span style="color: #55b9ff;">plugin</span>-<span style="color: #2af598;">svgs-icons</span> 
    <span style="color: #009efd;">插件的多色修改</span>
</h3>

<h5 style="color: #a1c4fd;">首先要看浏览器生成的svg集合内的指定的单个symbol标签内的style适配了多少个color ?</h5>


<p style="color: #999999">示例一【有的单色修改无法通过组件的color属性修改，则需要通过应该方式去修改】</p>

```
    <svg id="__v__svgs__icons">
        <symbol id="logo">
            <style>
                :root{
                    --logo-svg-color: #000;
                }
            </style>
            <svg xxx...>
                ...
            </svg>
        </symbol>
    </svg>

    // 以内置组件为示例
    import svgIcon from 'virtual:svg-icon';
    <svgIcon name="logo" size="28" style="--logo-svg-color: #f00"></svgIcon>
```

<p style="color: rgb(255, 156, 0)">示例二：多色修改, 部分svg是可以的，但也存在无法修改的，这个取决于svg内部的源码结构，例如：svg源码结构中采用了linearGradient、radialGradient标签去创建线性渐变，这种结构在外部修改color可能就无法修改, 起码在该插件中就渐时存在该问题！！！！
以下进行多色修改示例。
</p>


#### 示例为2个color, css var name 变量规则 --${name}-svg-color-${index}
```
    <svg id="__v__svgs__icons">
        <symbol id="logo">
            <style>
                :root{
                    --logo-svg-color-0: #96fbc4;
                    --logo-svg-color-1: #f9f586;
                }
            </style>
            <svg xxx...>
                ...
            </svg>
        </symbol>
    </svg>

    // 以内置组件为示例
    import svgIcon from 'virtual:svg-icon';
    <svgIcon 
        name="logo" 
        size="28" 
        style="--logo-svg-color-0: #cd9cf2;--logo-svg-color-1: #f6f3ff"
    ></svgIcon>
```

<p style="color: #cd9cf2">
    如果SVG内有10种色，那么它会生成 --logo-svg-color-0 ～ --logo-svg-color-10 的css var, 就可以利用它去修改color了，
    css var name 有多少个取决于SVG内有多少种色, 以此类推...
</p>


### 注意
<p style="color: #00f2fe">
    该方案还需要大量的SVG进行测试，我只是找了少量SVG进行测试，就是GIF图中展示的！
</p>
<p style="color: #fa709a">
    如果你遇到单色SVG的color属性修改无效! 用css var 修改也无效，欢迎你在issuse中向我反馈，并粘贴上SVG源代码。
</p>

````
注意、注意、注意、该插件提供的多色修改的方案若修改不成功，就是svg不支持哦，对就是svg不支持！不关我的事！！！
````