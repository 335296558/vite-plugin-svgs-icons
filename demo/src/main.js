import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import directive from '@/directive/index.js';
import './test.js';

const app = createApp(App);
app.use(directive);
app.mount('#app');
