let timer;

export default {
  async login(authCredentials) {
    return this.auth({
      ...authCredentials,
      mode: 'login',
    });
  },

  async signup(authCredentials) {
    return this.auth({
      ...authCredentials,
      mode: 'signup',
    });
  },

  async auth(authCredentials) {
    const mode = authCredentials.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArHzkVU4L-a9gxFt-cyMy2pNGSqxRqTks';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArHzkVU4L-a9gxFt-cyMy2pNGSqxRqTks';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authCredentials.email,
        password: authCredentials.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Error inesperado al intentar autenticarte.');
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000; // seconds to miliseconds
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    const that = this;
    timer = setTimeout(function () {
      that.autoLogout();
    }, expiresIn);

    this.token = responseData.idToken;
    this.userId = responseData.localId;
    this.didAutoLogout = false;
  },

  autoLogin() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    const that = this;
    timer = setTimeout(function () {
      that.autoLogout();
    }, expiresIn);

    if (token && userId) {
      this.token = token;
      this.userId = userId;
      this.didAutoLogout = false;
    }
  },

  autoLogout() {
    this.logout();
    this.didAutoLogout = true;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    this.token = null;
    this.userId = null;
    this.didAutoLogout = false;
  },
};
