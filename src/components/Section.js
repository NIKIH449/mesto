export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer,
    this._container = document.querySelector(containerSelector)
  };

//  добавляем элемент в контейнер
  addItemPrepend(element) {
    this._container.prepend(element);
  };

  addItemAppend(element) {
    this._container.append(element);
  };

//  очищаем контейнер
  clear() {
    this._container.innerHTML = '';
  };

// рендерим
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  };
};