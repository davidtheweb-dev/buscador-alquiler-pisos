import { createRouter, createWebHistory } from 'vue-router';

import HousingList from './pages/housing/HousingList.vue';
import HousingDetail from './pages/housing/HousingDetail.vue';
import HousingContact from './pages/housing/HousingContact.vue';
import HousingRegistration from './pages/housing/HousingRegistration.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/viviendas' },
    { path: '/viviendas', component: HousingList },
    {
      path: '/viviendas/:id',
      component: HousingDetail,
      props: true,
      children: [
        { path: 'contacto', component: HousingContact }, // /viviendas/id/contacto
      ],
    },
    { path: '/registro', component: HousingRegistration },
    { path: '/solicitudes', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
