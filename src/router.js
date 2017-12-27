export default class Router {
  constructor() {
    this.historys = [];
  }

  slideTo(toPageNumber) {
    const slider = this.getLastSlider();
    slider.slideTo(toPageNumber);
  }

  registerHistory(history, slider) {
    if (this.historys.length > 0) this.getLastSlider().hideSlider();

    this.historys.push({
      history,
      slider,
    });
    slider.showSlider();
  }

  getMainSlider() {
    const { slider } = this.historys[0];
    return slider;
  }

  getLastSlider() {
    const [{ slider }] = this.historys.slice(-1);
    return slider;
  }

  getPrevSlider() {
    const [data] = this.historys.slice(-2, -1);
    if (!data) return null;
    const { slider } = data;
    return slider;
  }

  getBackInfo() {
    // 最新
    const [lastData] = this.historys.slice(-1);
    const { history, slider } = lastData;

    // 要返回的 pageIndex
    const lastIndex = history.back();

    return {
      lastIndex,
      lastSlider: slider,
    };
  }

  back() {
    const lastHistory = this.getBackInfo();
    const { lastIndex, lastSlider } = lastHistory;
    // 没有返回历史
    if (typeof lastIndex !== 'number') {
      // 移除
      this.historys.pop();
      lastSlider.hideSlider(true);
      // 显示上一个
      this.getLastSlider().showSlider();
    } else {
      // back slide
      lastSlider.slideTo(lastIndex);
    }
  }
}
