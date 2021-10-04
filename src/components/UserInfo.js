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

  setUserInfo(profileInfo) {
    this._name.textContent = profileInfo.name;
    this._description.textContent = profileInfo.about;
    this._avatar.src = profileInfo.avatar
  };
};
