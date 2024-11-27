import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueQueryPlugin);

app.mount('#app');
