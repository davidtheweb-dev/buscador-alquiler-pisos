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

  getIsAuthenticated(state) {
    return !!state.token;
  },
};
