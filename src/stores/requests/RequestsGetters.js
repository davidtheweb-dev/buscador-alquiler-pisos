import { useAuthStore } from '../auth/AuthStore';

export default {
  getRequests(state) {
    const authStore = useAuthStore();
    const userId = authStore.getUserId;
    return state.requests.filter((req) => req.housingId === userId);
  },
  hasRequests() {
    return this.getRequests && this.getRequests.length > 0;
  },
};
