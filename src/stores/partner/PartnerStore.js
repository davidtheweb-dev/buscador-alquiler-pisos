import { defineStore } from 'pinia';

import actions from './PartnerActions';
import getters from './PartnerGetters';

export const usePartnerStore = defineStore('partner', {
  state: () => ({
    lastFetch: null,
    partner: [],
  }),
  actions,
  getters,
});
