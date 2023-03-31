export default {
  registerHousing(state, payload) {
    state.housing.push(payload);
  },
  setHousing(state, payload) {
    state.housing = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
