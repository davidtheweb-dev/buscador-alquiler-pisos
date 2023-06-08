import { defineStore } from 'pinia';

import actions from './RequestsActions';
import getters from './RequestsGetters';

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    requests: [],
  }),
  actions,
  getters,
});
