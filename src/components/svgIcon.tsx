
import { defineComponent } from 'vue';

export const SvgIcon = defineComponent({
    props: {
        name:{ 
            type: String, 
            default: '',
        },
        size: { // 将要放弃
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
        },
        width: { 
            type: [String, Number], 
            default: '' 
        },
        height: { 
            type: [String, Number], 
            default: '' 
        },
    },
    setup(props) {
        const { name, width, height, color } = props;
        return () => (<svg width={width} height={height} fill={color}><use xlink:href={name} /></svg>);
    }
})
