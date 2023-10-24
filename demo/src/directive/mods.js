import defaultImage from '@/assets/demo.gif';

// 图像加载失败,起用默认图
export function useFallbackSrc() {
    function addEventListenerError(el, binding) {
        if (el.tagName!=='IMG') return;
        el.addEventListener('error', () => {
            el.src = binding.value || defaultImage;
        });
    }
    return {
        mounted: addEventListenerError,
        updated: addEventListenerError
    };
}