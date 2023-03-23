import { createStore } from 'vuex';

import housingModule from './modules/housing/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
  modules: {
    housing: housingModule,
    requests: requestsModule,
  },
  state() {
    return {
      userId: '3',
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
