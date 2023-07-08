import { useAuthStore } from '../auth/AuthStore';

export default {
  getPartner(state) {
    return state.partner;
  },

  getUserHasPartner() {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;

    const partner = this.getPartner;

    return partner.some((partner) => partner.id === userId);
  },

  getUserPartner() {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;

    const partner = this.getPartner;

    return partner.filter((partner) => partner.id === userId);
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
