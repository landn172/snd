export default class HistorySlider {
  constructor(initIndex) {
    this.history = typeof initIndex === "number" ? [initIndex] : [];
  }

  push(currentIndex) {
    this.history.push(currentIndex);
  }

  getPrev() {
    return this.history.splice(-2).shift();
  }

  destory() {
    this.history.length = 0;
  }
}
