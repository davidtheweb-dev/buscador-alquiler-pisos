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
  shouldUpdate(state) {
    const minSecondsToUpdate = 300; // The minimum that must pass to be able to re-fetch the list of flats
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > minSecondsToUpdate;
  },
};
