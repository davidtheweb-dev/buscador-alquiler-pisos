import { createStore } from 'vuex';

import housingModule from './modules/housing/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    housing: housingModule,
    requests: requestsModule,
    auth: authModule,
  },
});

export default store;
