import { h } from 'vue';
export default {
    render() {
        let domAttr = {
            innerHTML: `<use href="#[--iconPrefix--]-${this.name}" />`
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
}