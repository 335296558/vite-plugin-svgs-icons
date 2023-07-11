import { h } from 'vue';
export default {
    render() {
        let domAttr = {
            width: this.size,
            height: this.size,
            innerHTML: `<use xlink:href="#ei-${this.name}" />`
        }
        if (this.class) {
            domAttr.class = [this.class]
        }
        if (this.color) {
            domAttr.fill = this.color
        }
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
            type: [String, Number, Boolean], 
            default: 20
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