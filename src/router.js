import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from './stores/auth/AuthStore';

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
    {
      path: '/viviendas/error',
      component: NotFound,
      children: [
        { path: 'contacto', component: NotFound }, // /viviendas/error/contacto
      ],
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    next('/autenticacion');
  } else if (to.meta.requiresUnauth && useAuthStore().isAuthenticated) {
    next('/viviendas');
  } else {
    next();
  }
});

export default router;
