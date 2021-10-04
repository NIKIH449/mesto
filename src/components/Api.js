export default class Api {
  constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers
  }

  //  проверяем все ли впорядке с ответом
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo () {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setUserInfo(name, description) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: description,
      }),
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setUserAvatar(userAvatar) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: userAvatar,
      }),
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setNewCard(name, link) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
  return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  putLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
}

