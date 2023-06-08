class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    }
  
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getInitialCards() {
    const jwt = localStorage.getItem("jwt"); 
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      }
    })
    .then(res => this._checkResponse(res));
  }

  changeLikeCardStatus(isLiked, cardId) {
    const jwt = localStorage.getItem("jwt"); 
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
    .then(res => this._checkResponse(res));
  }

  getUserInfo() {
    const jwt = localStorage.getItem("jwt"); 
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        }
      })
      .then(res => this._checkResponse(res));
    }
  
  setUserInfo(data) {
    const jwt = localStorage.getItem("jwt"); 
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._checkResponse(res));
  }

  addNewCard(data) {
    const jwt = localStorage.getItem("jwt"); 
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkResponse(res));
  }
   
  deleteCard(cardId) {
    const jwt = localStorage.getItem("jwt"); 
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
    .then(res => this._checkResponse(res));
  }

  updateAvatar(data) {
    const jwt = localStorage.getItem("jwt"); 
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.andreykargin.nomoredomains.rocks',
});

export default api;