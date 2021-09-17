export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items,
    this._renderer = renderer,
    this._container = document.querySelector(containerSelector)
  };

//  добавляем элемент в контейнер
  addItem(element) {
    this._container.prepend(element);
  };

//  очищаем контейнер
  clear() {
    this._container.innerHTML = '';
  };

// рендерим
  renderItems() {
    this.clear()
    this._items.forEach(item => {
      this._renderer(item);
    });
  };
};