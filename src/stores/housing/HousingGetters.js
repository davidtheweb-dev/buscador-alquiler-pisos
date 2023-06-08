import { useAuthStore } from '../auth/AuthStore';

export default {
  getHousing(state) {
    return state.housing;
  },

  getUserHasHousing() {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;

    const housing = this.getHousing;

    return housing.some((housing) => housing.id === userId);
  },

  getShouldUpdate(state) {
    const minSecondsToUpdate = 300; // The minimum that must pass to be able to re-fetch the list of flats
    const lastFetch = state.lastFetch;

    if (!lastFetch) {
      return true;
    }

    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > minSecondsToUpdate;
  },
};
