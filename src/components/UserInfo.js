export default class UserInfo {
  constructor(name, description) {
    this._name = name;
    this._description = description;
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
};
