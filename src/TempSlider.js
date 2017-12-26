import Islider from "islider.js/build/iSlider.js";

export default class TempSlider {
  constructor({ data, index }) {
    this.container = createSliderContainer();
    document.body.appendChild(this.container);
    this.$slider = new Islider(this.container, data, {
      isLooping: false,
      isVertical: 0,
      animateTime: 300,
      initIndex: index,
      plugins: [],
      fixPage: false
    });

    this._proxyApi();
  }

  _proxyApi() {
    const proxyApis = ["on", "off", "slideTo"];
    const slider = this.$slider;
    proxyApis.forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return slider[key].bind(slider);
        }
      });
    });
  }

  showSlider() {
    $(this.container).addClass("active");
  }

  hideSlider() {
    $(this.container).removeClass("active");
    setTimeout(() => {
      this.destory();
    }, 1000);
  }

  destory() {
    this.$slider.destroy();
    this.$slider = null;
    $(this.container).remove();
  }
}

function createSliderContainer() {
  const container = document.createElement("div");
  container.className = "slider-container";
  return container;
}
