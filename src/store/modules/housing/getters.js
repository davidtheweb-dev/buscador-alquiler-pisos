export default {
  housing(state) {
    return state.housing;
  },
  hasHousing(state) {
    return state.housing && state.housing.length > 0;
  },
  isHousing(_, getters, _2, rootGetters) {
    const housing = getters.housing;
    const userId = rootGetters.userId;
    return housing.some((housing) => housing.id === userId);
  },
};
