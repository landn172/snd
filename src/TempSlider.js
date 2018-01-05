import Islider from "islider.js/build/iSlider.js";
import "islider.js/build/iSlider.animate.js";

const defaultConfig = {
  isLooping: false,
  isVertical: 0,
  animateTime: 300,
  initIndex: 0,
  plugins: ["AddActive"],
  fixPage: false
};

const proxyApis = ["on", "off", "slideTo"];

export default class TempSlider {
  constructor({ data, opts }) {
    this.container = createSliderContainer();
    const mergeOpts = Object.assign({}, defaultConfig, opts);
    this.$slider = new Islider(this.container, data, mergeOpts);
    this.$container = $(this.container);
    proxyApi(this);
  }

  showSlider() {
    this.$container.addClass("active");
  }

  hideSlider(destroy) {
    this.$container.removeClass("active");
    destroy &&
      setTimeout(() => {
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
  proxyApis.forEach(key => {
    Object.defineProperty(ctx, key, {
      get() {
        return slider[key].bind(slider);
      }
    });
  });
}

function createSliderContainer() {
  const container = document.createElement("div");
  container.className = "slider-container";
  document.querySelector(".wrapper").appendChild(container);
  // document.body.appendChild(container);
  return container;
}

Islider.regPlugin("AddActive", function(opts) {
  const $current = $(this.currentEl);
  const $outer = $(this.outer);
  const activeClass = "page-active";
  const noAnimate = "no-animation-name";

  this.on("renderComplete", () => {
    addContentNoAnimateClass($outer);
    $current.addClass(activeClass);
    removeContentNoAnimateClass($current);
  });

  this.on("slideChanged", (index, currentEl) => {
    $outer.find(".islider-html").removeClass(activeClass);
    addContentNoAnimateClass($outer);
    const $li = $(currentEl);
    const $content = $li.find(".content");

    setTimeout(() => {
      $li.addClass(activeClass);
      removeContentNoAnimateClass($li);
    }, 0);
  });
  setTimeout(() => {
    this.fire("renderComplete");
  }, 0);

  function addContentNoAnimateClass($wouter) {
    $wouter.find(".content").addClass(noAnimate);
  }
  function removeContentNoAnimateClass($wouter) {
    $wouter.find(".content").removeClass(noAnimate);
  }
});
