export default {
  getHousing(state) {
    return state.housing;
  },
  hasHousing(state) {
    return state.housing && state.housing.length > 0;
  },
};
