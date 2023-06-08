export default {
  getUserId(state) {
    return state.userId;
  },
  getToken(state) {
    return state.token;
  },
  getDidAutoLogout(state) {
    return state.didAutoLogout;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
};
