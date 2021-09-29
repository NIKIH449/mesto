export default class Api {
  constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers
  }
  
  getUserInfo (name, description, avatar) {
    fetch(this._url + '/users/me', {
      headers: this._headers
    })
    .then(res => res.json())
    .then((res) => {
      description.textContent = res.about,
      name.textContent = res.name,
      avatar.src = res.avatar;
    });
  }

  sendUserInfo(name, description) {
    fetch(this._url + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: description
      }),
      headers: this._headers
    })
  }

  getCards() {
    fetch(this._url + '/cards', {
      headers: this._headers
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res)
    });
  }
}
