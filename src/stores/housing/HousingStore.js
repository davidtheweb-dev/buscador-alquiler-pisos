import { defineStore } from 'pinia';

import actions from './HousingActions';
import getters from './HousingGetters';

export const useHousingStore = defineStore('housing', {
  state: () => ({
    lastFetch: null,
    housing: [],
  }),
  actions,
  getters,
});
