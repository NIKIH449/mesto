export default class UserInfo {
  constructor(name, description, avatar) {
    this._name = name;
    this._description = description;
    this._avatar = avatar;
  };

  getUserInfo() {
    const userInfo = {
      userName: this._name.textContent,
      userDescription: this._description.textContent,
    };
    return userInfo;
  };

  setUserInfo(username, description, avatar) {
    this._name.textContent = username;
    this._description.textContent = description;
    this._avatar.src = avatar
  };
};
