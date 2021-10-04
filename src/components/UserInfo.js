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

  setUserInfo(username, description) {
    this._name.textContent = username;
    this._description.textContent = description;
  };

  setUserAvatar(avatar) {
    this._avatar.src = avatar
  };
};
