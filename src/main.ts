import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles.css';
import { PrimeVue } from '@primevue/core';
import { router } from './router';

const app = createApp(App);

app.use(createPinia());

app.use(PrimeVue, {
    unstyled: true
});

app.use(router);

app.mount('#app');
