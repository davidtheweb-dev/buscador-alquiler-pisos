import { defineStore } from 'pinia';

import actions from './AuthActions';
import getters from './AuthGetters';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    token: null,
    didAutoLogout: false,
  }),
  actions,
  getters,
});
