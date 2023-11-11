import defaultImage from '@/assets/demo.gif';
import { useFallbackSrc } from './mods';

const directives = { // 指令对象
    FallbackSrc: useFallbackSrc()
}

export default {
    install(app) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        });
    }
}