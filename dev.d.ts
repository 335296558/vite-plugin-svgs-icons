declare module "vite-plugin-vue-svg-icons";
declare module "path";
declare module "process";
declare var __dirname;
declare module 'svg-icon' {
    const content: any;
    export default content;
}

declare global {
    namespace NodeJS {
      
    }
}

export interface ProcessEnv {
    [key: string]: string | undefined
}