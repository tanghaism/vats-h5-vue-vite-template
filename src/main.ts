import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { initI18n } from '@/utils/i18n';

import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/scss/index.scss';
import 'tailwindcss/tailwind.css';

const mountedApp = async () => {
  const i18n = await initI18n();

  const app = createApp(App).use(router).use(createPinia()).use(Vant).use(i18n);

  app.mount('#app');
};

mountedApp();
