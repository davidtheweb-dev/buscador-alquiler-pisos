import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from './stores/auth/AuthStore';

const HousingList = () => import('./pages/housing/HousingList.vue');
const HousingDetail = () => import('./pages/housing/HousingDetail.vue');
const HousingContact = () => import('./pages/housing/HousingContact.vue');
const HousingRegistration = () => import('./pages/housing/HousingRegistration.vue');
const HousingEdit = () => import('./pages/housing/HousingEdit.vue');

const PartnerList = () => import('./pages/partner/PartnerList.vue');
const PartnerDetail = () => import('./pages/partner/PartnerDetail.vue');
const PartnerContact = () => import('./pages/partner/PartnerContact.vue');
const PartnerRegistration = () => import('./pages/partner/PartnerRegistration.vue');
const PartnerEdit = () => import('./pages/partner/PartnerEdit.vue');

const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const MyAds = () => import('./pages/MyAds.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const SettingOptions = () => import('./pages/SettingOptions.vue');
const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/pisos' },
    { path: '/pisos', component: HousingList },
    {
      path: '/pisos/:id',
      component: HousingDetail,
      props: true,
      children: [
        { path: 'contacto', component: HousingContact }, // /viviendas/id/contacto
      ],
    },
    {
      path: '/pisos/error',
      component: NotFound,
      children: [
        { path: 'contacto', component: NotFound }, // /viviendas/error/contacto
      ],
    },
    {
      path: '/registro-piso',
      component: HousingRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/editar-piso',
      component: HousingEdit,
      meta: { requiresAuth: true },
    },

    { path: '/companeros', component: PartnerList },
    {
      path: '/companeros/:id',
      component: PartnerDetail,
      props: true,
      children: [
        { path: 'contacto', component: PartnerContact }, // /companeros/id/contacto
      ],
    },
    {
      path: '/companeros/error',
      component: NotFound,
      children: [
        { path: 'contacto', component: NotFound }, // /companeros/error/contacto
      ],
    },
    {
      path: '/registro-companero',
      component: PartnerRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/editar-companero',
      component: PartnerEdit,
      meta: { requiresAuth: true },
    },

    { path: '/mis-anuncios', component: MyAds },
    { path: '/preferencias', component: SettingOptions },
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
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.getIsAuthenticated) {
    next('/autenticacion');
  } else if (to.meta.requiresUnauth && authStore.getIsAuthenticated) {
    next('/pisos');
  } else {
    next();
  }
});

export default router;
