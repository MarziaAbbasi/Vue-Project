import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.sass';

const app = createApp(App);

app.use(router);
app.use(Quasar, {});

app.mount('#app');