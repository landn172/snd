import Islider from 'islider.js/build/iSlider.js';

const defaultConfig = {
  isLooping: false,
  isVertical: 0,
  animateTime: 300,
  initIndex: 0,
  plugins: [],
  fixPage: false,
};

const proxyApis = ['on', 'off', 'slideTo'];

export default class TempSlider {
  constructor({
    data,
    opts,
  }) {
    this.container = createSliderContainer();
    const mergeOpts = Object.assign({}, defaultConfig, opts);
    this.$slider = new Islider(this.container, data, mergeOpts);
    this.$container = $(this.container);
    proxyApi(this);
  }

  showSlider() {
    this.$container.addClass('active');
  }

  hideSlider(destroy) {
    this.$container.removeClass('active');
    destroy && setTimeout(() => {
      this.destroy();
    }, 1000);
  }

  destroy() {
    this.$slider.destroy();
    this.$slider = null;
    this.$container.remove();
    this.$container = null;
  }
}

function proxyApi(ctx) {
  const slider = ctx.$slider;
  proxyApis.forEach((key) => {
    Object.defineProperty(ctx, key, {
      get() {
        return slider[key].bind(slider);
      },
    });
  });
}

function createSliderContainer() {
  const container = document.createElement('div');
  container.className = 'slider-container';
  document.body.appendChild(container);
  return container;
}
