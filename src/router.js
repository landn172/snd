export default class Router {
  constructor() {
    this.historys = [];
  }

  log(slider, index) {
    console.log(slider, index);
  }

  registerHistory(history, slider) {
    this.historys.push({
      history,
      slider,
    });
  }

  back(backHistorys = []) {
    const [lastData] = this.historys.slice(-1);
    const {
      history,
      slider,
    } = lastData;
    const lastIndex = history.popLastHistory();
    history.clearPool();
    if (!lastIndex) {
      if (this.historys.length === 1) return null;
      return this.back(backHistorys.concat(this.historys.pop()));
    }
    this.log(slider, lastIndex);
    return {
      lastIndex,
      lastSlider: slider,
      backHistorys,
    };
  }
}
