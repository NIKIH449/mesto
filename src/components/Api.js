export default class Api {
  constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers
  }

  _checkingAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo () {
    return fetch(this._url + '/users/me', {
      headers: this._headers
    })
    .then(this._checkingAnswer)
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
    .then(this._checkingAnswer)
  }

  setUserAvatar(userAvatar) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: userAvatar,
      }),
      headers: this._headers
    })
    .then(this._checkingAnswer)
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
    .then(this._checkingAnswer)
  }

  getInitialCards() {
  return fetch(this._url + '/cards', {
      headers: this._headers
    })
    .then(this._checkingAnswer)
  }

  putLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkingAnswer)
  }

  deleteLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkingAnswer)
  }

  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkingAnswer)
  }
}

