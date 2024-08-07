import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import 'uno.css';
import 'virtual:svg-icons-register';
import './assets/style/global.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
