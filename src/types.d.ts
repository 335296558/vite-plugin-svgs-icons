declare module "virtual:vite-plugin-vue-svg-icons";
declare module 'virtual:svg-icon' {
    const content: any;
    export default content;
}
  
export interface IOptions {
    moduleId: string;
    ssr: boolean;
    dir: any;
    svgId?: string;
    iconPrefix: string;
    // 可以设置初始化时不要清除原来svg的fill, =true也是仅针对单色处理
    clearOriginFill: boolean; 
    // 是否生成svg名称，Array
    isNameVars: boolean; 
    // 关闭所有警告
    isWarn: boolean;
    isMultiColor: boolean;
}

interface IPaths {
    path: any;
    filename: string;
}