import { join as P, resolve as E } from "path";
import M from "node:fs";
const T = {
  // green: (text: string) => `\x1B[32m${text}\x1B[0m`,
  yellow: (n) => `\x1B[33m${n}\x1B[0m`
  // red: (text: string) => `\x1B[31m${text}\x1B[0m`,
  // BgRed: (text: string)=> `\x1b[41m${text}`,
}, j = "http://www.w3.org/2000/svg", q = "http://www.w3.org/1999/xlink";
function R(n) {
  let e = [], i = 0, a = 0;
  for (; i = n.indexOf("http", a), !(i === -1 || (a = n.indexOf('"', i), a === -1)); ) {
    const d = n.slice(i, a);
    e.push(d);
  }
  return e;
}
const F = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
];
function W() {
  return new RegExp(`(#(?:[0-9a-fA-F]{3}){1,2}|rgba?\\(\\d+,\\s*\\d+,\\s*\\d+(?:,\\s*[\\d.]+)?\\)|(?:hsla?|hsl)\\(\\d+(?:,\\s*\\d+%)\\{2\\}(?:,\\s*[\\d.]+)?\\)|\\b(?:${F.join("|")})\\b|hsla?\\([^)]*\\))`, "g");
}
function G(n) {
  const e = W(), i = /(?:color|fill|stroke)="([^"]+)"/g;
  let a, d = [];
  for (; (a = i.exec(n)) !== null; )
    d.push(a[0]);
  const r = n.match(e);
  if (!r || r.length === 1)
    return { bool: !1, colors: r };
  const x = r[0];
  let p = 1;
  for (let u = 1; u < r.length; u++)
    r[u] === x && p++;
  return p === r.length ? { bool: !1, colors: r, colorAttrNames: d } : { bool: !0, colors: r, colorAttrNames: d };
}
function A(n) {
  const e = /<path/g, i = n.match(e);
  return i ? i.length : 0;
}
function S(n) {
  return "<style>#" + n + " {position: absolute; left: -100%;bottom: -100%; width: 0; height: 0;}</style>";
}
function H(n, e) {
  return `<svg id="${n}" xmlns="${j}" xmlns:link="${q}"><defs>${e}</defs></svg>`;
}
function U(n, e) {
  const i = /\[--iconPrefix--\]/g;
  return n.replace(i, `${e}`);
}
function X(n) {
  const i = /data:(image|audio|video)\/[^;]+;base64,([^"]+)/g.exec(n);
  for (; i !== null; )
    if (i[1])
      return !0;
  return !1;
}
function J(n) {
  const e = [], i = [];
  for (let a = 0; a < n.length; a++) {
    const d = n[a], r = a;
    !e.includes(d) && !i.includes(r) && (e.push(d), i.push(r));
  }
  return e;
}
function K(n, e) {
  var D, z, C, V;
  if (e = Object.assign({
    protect: !0,
    clearOriginFill: !0
  }, e), !n)
    return;
  const a = R(n).find((f) => f && f.indexOf("//www.w3.org") <= 0);
  if (e.protect && (n.indexOf("function") >= 0 || n.indexOf("Function()") >= 0 || n.indexOf("[native code]") >= 0 || n.indexOf("<script") >= 0 || n.indexOf("<foreignObject") >= 0 || a) && (e.isWarn && console.warn(T.yellow("➜ " + e.name + ".svg There is a risk of XSS attacks in your SVG! The plug-in is blocked, at this time your svg cannot be displayed, forcibly open")), e.isWarn && console.warn(T.yellow("➜ SVG图标中可能存XSS 攻击的风险！"))), X(n))
    return e.isWarn && console.warn(T.yellow("➜ " + e.name + ".svg 这是一个包含base64格式的数据图标！ 不建议把它当作svg使用!")), `<symbol id="icona-${e.name}" xmlns="${j}" viewBox="0 0 80 20">
        <text x="40" y="15" font-size="12" fill="#f00000" style="color: #f00000" text-anchor="middle">Not supported</text>
      </symbol>`;
  const d = /<svg([^>]+)/g;
  if (!n.match(d))
    return null;
  const r = /<svg/s, x = /<\/svg>/g, p = "<symbol", u = "</symbol>";
  let h = n.match(d)[0];
  h.match(r) && (n = n.replace(r, `${p} id="${e.iconPrefix}-${e.name}" class="${e.iconPrefix}-${e.name}" `)), n = n.replace(x, u);
  const k = /\s+width=".+?"/s, N = /\s+height=".+?"/s, s = /\s+class=".+?"/g, t = /\s+fill="url\(#(\w+)\)"/g, c = /\s+fill="([^"]+)"/g, l = /\s+stroke="([^"]+)"/g, g = /\s+xmlns=".+?"/s;
  h.match(g) && (n = n.replace(g, " ")), h.match(k) && (n = n.replace(k, " ")), h.match(N) && (n = n.replace(N, " ")), h.match(s) && (n = n.replace(s, " "));
  const m = G(n), v = `--${e.name}-svg-color`, $ = new RegExp(`${p}`, "s");
  if (m.bool) {
    if (n = n.replace($, `${p} multicolor="true" `), e.isMultiColor) {
      const f = J(m.colors);
      n = n.replace($, `${p} color-length="${f.length}" `);
      let I = "<style>:root {";
      for (let y = 0; y < f.length; y++) {
        const b = f[y], w = (D = m.colorAttrNames) == null ? void 0 : D.find((O) => O.indexOf(b) >= 0), _ = v + "-" + y;
        if (w && w !== 'fill="none"') {
          const O = w.split("=")[0], L = new RegExp(`${w}`, "g");
          n = n.replace(L, `${O}="var(${_})" `);
        }
        I += `${_}: ${b};`;
      }
      I += "}</style>", n = n.replace(u, `${I} ${u}`);
    }
  } else if (!t.test(n)) {
    if (n = n.replace($, `${p} multicolor="false"`), (A(n) === ((z = m.colors) == null ? void 0 : z.length) || A(n) === 1) && e.clearOriginFill)
      n = n.replace(/fill="([^"]+)"/g, "");
    else if (l.test(n) || c.test(n)) {
      if (m.colors && ((C = m.colors) == null ? void 0 : C.length) >= 2) {
        const f = /<symbol[^>]*>(.*?)<\/symbol>/gs;
        n = n.replace(f, (y, b) => {
          const w = b.replace(/\s+(fill|stroke)="([^"]+)"/g, ` $1="var(${v})"`);
          return y.replace(b, w);
        });
      }
      n = n.replace(l, ` stroke="var(${v})"`), (V = m.colors) != null && V.length && (n = n.replace($, `<style>:root{ ${v}: ${m.colors[0]} }</style> ${p}`));
    }
  }
  return n;
}
function Q(n, e) {
  return `
        if (typeof window !== 'undefined') {
            function loadSvgIcons() {
                const body = document.body;
                const svgBox = document.createElement('div');
                svgBox.style.position = 'absolute';
                svgBox.style.top = '-100%';
                svgBox.style.left = '-100%';
                svgBox.innerHTML = "${e}";
                body.insertBefore(svgBox, body.lastChild);
            }
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', loadSvgIcons);
            } else {
                loadSvgIcons()
            }
        }
    `;
}
function Y(n) {
  return n.replace(/\s+/g, " ").replace(/<!--[\s\S]*?-->/g, "").replace(/>\s+</g, "><");
}
function Z(n) {
  return n.replace(/"/g, '\\"');
}
const nn = `import { h } from 'vue';
export default {
    render() {
        let domAttr = {
            innerHTML: \`<use href="#[--iconPrefix--]-\${this.name}" />\`
        }
        let width = this.size;
        let height = this.size;
        if (typeof this.size == 'object') {
            width = this.size[0];
            height = this.size[1] || this.size[0];
        }
        if (this.size) {
            domAttr.width = this.size;
            domAttr.height = this.size;
        }
        if (width) {
            domAttr.width = width;
        }
        if (height) {
            domAttr.height = height;
        }
        if (this.class) {
            domAttr.class = [this.class];
        }
        if (this.color) {
            domAttr.fill = this.color;
        }
        domAttr['aria-hidden'] = true;
        return h(
            'svg',
            {
                ...domAttr
            },
        )
    },
    props: {
        name:{ 
            type: String, 
            default: '',
        },
        size: {
            type: [Array, String, Number], 
            default: 0
        },
        color: { 
            type: String, 
            default: '' 
        },
        class: { 
            type: String, 
            default: '' 
        }
    }
}`, en = `// import '../style/SvgViews.css';

function dom(type) {
    return document.createElement(type);
}

function SvgsViewDevTools() {
    const wrapDom = dom('div');
    const toast = dom('div');
    toast.className = 'copy-msg-toast v-fixed';
    wrapDom.className = 'vite-plugin-svgs-icons-views';

    const svgsIconToolsDom = dom('div');
    svgsIconToolsDom.className = 'svgs-icons-tools v-fixed';

    const ul = dom('ul');
    const mask = dom('div');
    const copyInput = dom('input');
    copyInput.setAttribute('readonly', 'readonly');
    copyInput.setAttribute('unselectable', 'on');
    copyInput.className = 'copy-input';
    mask.className = 'mask';
    ul.className = 'ul-box';

    const openIcon = dom('div');
    openIcon.className = 'open-icon';
    openIcon.innerHTML = '<svg t="1701447444694" class="open-icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14436" width="200" height="200"><path d="M850.688 830.72a28.416 28.416 0 0 1-22.016-8.704l-352-315.84a31.552 31.552 0 0 1 0-47.936l352-315.776a32 32 0 0 1 46.208 2.176 31.36 31.36 0 0 1-2.176 45.76l-325.824 291.84 325.824 291.84a31.36 31.36 0 0 1 2.176 45.76 35.52 35.52 0 0 1-24.192 10.88z m-341.248 0a28.416 28.416 0 0 1-22.016-8.704l-352-315.84a31.552 31.552 0 0 1 0-47.936l352-315.776a32 32 0 0 1 46.208 2.176 31.36 31.36 0 0 1-2.176 45.76l-325.824 291.84 325.824 291.84a31.424 31.424 0 0 1 2.176 45.76 35.52 35.52 0 0 1-24.128 10.88z" fill="#333" p-id="14437"></path></svg>';
    if (typeof svgIconNames!=='object') {
        return console.error('isNameVars var set true')
    }
    svgIconNames.map((svgName)=>{
        const li = dom('li');
        li.className = 'svg-icon-item';
        const nameDOM = dom('div');
        nameDOM.className = 'name';
        const spanDOM = dom('span');
        spanDOM.className = 'span-text';
        spanDOM.innerHTML = svgName;

        const svghtml = \`
            <svg aria-hidden="true" xmlns:link="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                <use href="#icona-\${svgName}"></use>
            </svg>
        \`;
        li.innerHTML = svghtml;
        li.onclick = function(){
            copyInput.value = svgName;
            copyInput.blur();
            copyInput.select();
            copyInput.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(svgName);
            toast.innerHTML = svgName+' copy Suucessify';
            toast.style.top = '15px';
            toast.style.opacity = '1';
            let times = setTimeout(()=>{
                toast.style.top = '-100%';
                toast.style.opacity = '0';
                clearTimeout(times);
            }, 1500);
        }
        nameDOM.appendChild(spanDOM);
        li.appendChild(nameDOM);
        ul.appendChild(li);
    });
    
    Array.from({ length: 4 }).map((it)=>{
        const lie = dom('li');
        lie.className = 'svg-icon-item';
        ul.appendChild(lie);
    });
    let isOpen = false;
    openIcon.onclick = function(){
        isOpen = !isOpen;
        if (isOpen) {
            wrapDom.classList.add('open-status');
            document.body.classList.add('body-100vh');
            return;
        }
        wrapDom.classList.remove('open-status');
        document.body.classList.remove('body-100vh');
    }
    wrapDom.appendChild(mask);
    wrapDom.appendChild(toast);
    wrapDom.appendChild(ul);
    wrapDom.appendChild(openIcon);
    wrapDom.appendChild(copyInput);
    document.body.appendChild(wrapDom);
}

if (typeof window === 'object') {
    SvgsViewDevTools();
}`, tn = `.vite-plugin-svgs-icons-views {
  width: 100%;
  height: 100%;
  position: fixed;
  right: 0;
  bottom: 0px;
  z-index: 999;
  transition: 600ms;
  user-select: none;
  cursor: pointer;
  transform: translate(100%, 0);
}
.vite-plugin-svgs-icons-views * {
  user-select: none;
}
.vite-plugin-svgs-icons-views .w-28 {
  width: 28px;
}
.vite-plugin-svgs-icons-views .h-28 {
  width: 28px;
}
.vite-plugin-svgs-icons-views .v-fixed,
.vite-plugin-svgs-icons-views.v-fixed {
  position: fixed;
}
.vite-plugin-svgs-icons-views .svgs-icons-tools {
  padding: 8px;
  border-radius: 100%;
  right: 30px;
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  box-sizing: content-box;
  border: solid 3px rgba(255, 0, 0, 0.1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: move;
  touch-action: none;
}
.vite-plugin-svgs-icons-views .tools-logo {
  width: 28px;
  height: 28px;
  flex: 1;
}
.vite-plugin-svgs-icons-views .open-icon {
  width: 24px;
  padding: 8px 2px;
  position: fixed;
  left: -14px;
  bottom: 50%;
  z-index: 1000;
  transform: translate(-50%, 0);
  background-color: rgba(255, 255, 255, 0.1);
  color: #333;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px) contrast(60%);
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  text-align: center;
  font-size: 18px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms;
  opacity: 0.5;
}
.vite-plugin-svgs-icons-views .open-icon:hover {
  opacity: 1;
}
.vite-plugin-svgs-icons-views .open-icon-svg {
  width: 20px;
  height: 20px;
}
.vite-plugin-svgs-icons-views .mask {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px) contrast(60%);
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: 1;
}
.vite-plugin-svgs-icons-views .ul-box {
  width: fit-content;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  margin: auto;
  justify-content: center;
  overflow-y: auto;
}
.vite-plugin-svgs-icons-views .ul-box li {
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.vite-plugin-svgs-icons-views .ul-box li svg {
  width: 68px;
  height: 68px;
  display: block;
  margin: auto;
  position: relative;
  z-index: 1;
}
.vite-plugin-svgs-icons-views .ul-box li .name {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  color: #ffffff;
  padding: 8px;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms;
  transform: translate(0, 100%);
}
.vite-plugin-svgs-icons-views .ul-box li:hover .name {
  transform: translate(0, 0%);
}
.vite-plugin-svgs-icons-views.open-status {
  transform: translate(0, 0);
}
.vite-plugin-svgs-icons-views.open-status .open-icon {
  left: 0px;
  background-color: #ffeb3b;
  transition: 300ms;
  transform: rotate(-180deg);
}
.vite-plugin-svgs-icons-views .copy-msg-toast {
  position: fixed;
  left: 50%;
  top: -100%;
  transform: translate(-50%, 0);
  padding: 6px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 3;
  border-radius: 10px;
  opacity: 0;
  transition: 300ms;
}
.body-100vh {
  height: 100vh;
  overflow: hidden;
}
.copy-input {
  position: fixed;
  left: -100%;
  bottom: -100%;
  opacity: 0;
}
`, B = "vite-plugin-svgs-icons";
let o = {
  moduleId: "virtual:svg-icon",
  ssr: !1,
  dir: P(`${process.cwd()}/src/assets/svg`),
  svgId: "__v__svgs__icons",
  iconPrefix: "icona",
  clearOriginFill: !0,
  isNameVars: !1,
  isWarn: !0,
  isMultiColor: !0,
  isViewTools: !0
};
function ln(n) {
  let e = [], i = {};
  o = Object.assign(o, n), o.isViewTools && (o.isNameVars = !0);
  const a = o.moduleId, d = "\0" + a, r = async (s, t = []) => {
    let c = M.readdirSync(s);
    return c.length === 0 ? (console.warn(B + ":File directory is empty --->" + o.dir), []) : (c.forEach((l) => {
      if (M.lstatSync(`${s}/${l}`).isDirectory())
        r(`${s}/${l}`, t);
      else {
        if (l.lastIndexOf(".svg") === -1)
          return;
        t.push({
          path: `${s}/${l}`,
          filename: l
        });
      }
    }), t);
  };
  function x(s, t) {
    const c = s.replace(/.svg/g, "");
    e.push(c);
    const l = K(t, {
      name: c,
      clearOriginFill: o.clearOriginFill,
      isWarn: !!o.isWarn,
      isMultiColor: !!o.isMultiColor,
      // @ts-ignore
      iconPrefix: o == null ? void 0 : o.iconPrefix
    });
    return i[c] = l, l;
  }
  async function p(s) {
    const t = s;
    if (!M.existsSync(t))
      return console.warn(`\x1B[31m${B}:The directory does not exist ---->${t}\x1B[0m`), null;
    const c = await r(t);
    e = [], c.forEach((l) => {
      let g = M.readFileSync(l.path, "utf8");
      x(l.filename, g);
    });
  }
  function u() {
    let s = "";
    for (const t in i)
      s += i[t];
    return s;
  }
  function h(s) {
    let t = "";
    if (o.isViewTools && process.env.NODE_ENV === "development" && (t = `<style>${tn}</style>`), !o.ssr)
      return s + t;
    const c = S(o.svgId), l = u();
    return `${s} ${H(o.svgId, l)} ${c} ${t}`;
  }
  let k = `${o.dir}`;
  return p(k), {
    name: o.moduleId,
    transformIndexHtml: h,
    resolveId(s) {
      if (s === a)
        return d;
    },
    async load(s) {
      if (s === d) {
        let t = "";
        o.isViewTools && process.env.NODE_ENV === "development" && (t = en);
        const c = `export const svgIconNames = ${o.isNameVars ? JSON.stringify(e) : "[]"}`, l = U(nn, o.iconPrefix);
        if (o.ssr)
          return `${l};
 ${c}
${t}`;
        const g = o.svgId || "", m = u(), v = Z(Y(H(g, m)));
        return `${l};
${Q(g, v)}
${c};
${t}`;
      }
    },
    async handleHotUpdate({ file: s, server: t }) {
      if (s.endsWith(".svg")) {
        const c = E(t.config.root, `${o.dir}`);
        await p(c);
        const { moduleGraph: l } = t, g = l.getModuleById(d);
        return g && (t.reloadModule(g), t.ws.send({
          type: "full-reload",
          path: "*"
        })), g;
      }
      return null;
    }
  };
}
export {
  ln as default
};
