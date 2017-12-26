export default class HistorySlider {
  constructor(initIndex) {
    this.history = typeof initIndex === 'number' ? [initIndex] : [];
    this.pushPool = [];
  }
  // 在下次执行 lazyPush 才会推入history
  lazyPush(currentIndex) {
    this.flushPool();
    this.pushPool.push(currentIndex);
  }

  // 将push池中数据推入 history
  flushPool() {
    this.history.push(...this.pushPool);
  }

  clearPool() {
    this.pushPool = [];
  }

  popLastHistory() {
    return this.history.pop();
  }

  destory() {
    this.history.length = 0;
    this.pushPool.length = 0;
  }
}
