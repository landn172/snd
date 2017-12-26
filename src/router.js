export default class Router {
  constructor() {
    this.historys = [];
  }

  registerHistory(history, slider) {
    this.historys.push({
      history,
      slider,
    });
  }

  back(backHistorys = []) {
    // 最新
    const [lastData] = this.historys.slice(-1);
    const {
      history,
      slider,
    } = lastData;
    const lastIndex = history.getPrev();
    if (!lastIndex) {
      if (this.historys.length === 1) return null;
      return this.back(backHistorys.concat(this.historys.pop()));
    }
    
    return {
      lastIndex,
      lastSlider: slider,
      backHistorys,
    };
  }
}
