export default class HistorySlider {
  constructor(initIndex) {
    this.history = typeof initIndex === 'number' ? [initIndex] : [];
  }

  push(currentIndex) {
    if (this.isBack) {
      this.isBack = false;
      return;
    }
    console.log('[HistorySlider]:push', currentIndex);
    this.history.push(currentIndex);
  }

  back() {
    // 只剩当前页
    if (this.history.length === 1) return null;
    this.history.pop();
    const [last] = this.history.slice(-1);
    this.isBack = true;
    console.log('[HistorySlider]:back', last);
    return last;
  }

  // 获取第一个
  getFirst() {
    return this.history[0];
  }

  destory() {
    this.history.length = 0;
  }
}
