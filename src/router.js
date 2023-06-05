import { createRouter, createWebHistory } from 'vue-router';

// import HousingList from './pages/housing/HousingList.vue';
// import HousingDetail from './pages/housing/HousingDetail.vue';
// import HousingContact from './pages/housing/HousingContact.vue';
// import HousingRegistration from './pages/housing/HousingRegistration.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
// import NotFound from './pages/NotFound.vue';

import store from './store/index.js';

const HousingList = () => import('./pages/housing/HousingList.vue');
const HousingDetail = () => import('./pages/housing/HousingDetail.vue');
const HousingContact = () => import('./pages/housing/HousingContact.vue');
const HousingRegistration = () => import('./pages/housing/HousingRegistration.vue');
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const NotFound = () => import('./pages/NotFound.vue');

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
    {
      path: '/registro',
      component: HousingRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/solicitudes',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    {
      path: '/autenticacion',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/autenticacion');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/viviendas');
  } else {
    next();
  }
});

export default router;
