class Auth {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
  
    register(newUserData) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          email: newUserData.email,
          password: newUserData.password,
        }),
      }).then(this._getResponseData);
    }
  
    login(userData) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      }).then(this._getResponseData);
    }
  
    checkToken(jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }).then(this._getResponseData);
    }
  }
  
  const auth = new Auth({
    baseUrl: "https://api.mesto.andreykargin.nomoredomains.rocks"
  });
  
export default auth;