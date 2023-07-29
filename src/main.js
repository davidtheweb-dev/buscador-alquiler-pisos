import { createApp } from 'vue';

import './style.css';

import App from './App.vue';
import router from './router.js';
import pinia from './stores/index';

import BaseCard from './components/ui/base/BaseCard.vue';
import BaseButton from './components/ui/base/BaseButton.vue';
import BaseBadge from './components/ui/base/BaseBadge.vue';
import BaseSpinner from './components/ui/base/BaseSpinner.vue';
import BaseDialog from './components/ui/base/BaseDialog.vue';
import BaseLike from './components/ui/base/BaseLike.vue';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseBadge', BaseBadge);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseDialog', BaseDialog);
app.component('BaseLike', BaseLike);

app.mount('#app');
