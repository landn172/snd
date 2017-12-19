import Islider from 'islider.js/build/iSlider.js';
import './islider.less';
import './index.less';

function $(id) {
  return document.getElementById(id);
}

const pageData = [];

const pageLen = 1;


for (let i = 1; i <= pageLen; i++) {
  pageData.push({ content: require(`${__dirname}/pages/${i}.ejs`) });
}

const mainSlider = new Islider($('main-container'), pageData.reverse(), {
  isLooping: false,
  isVertical: 0,
  animateTime: 300,
  plugins: [],
  initIndex: pageData.length - 1,
  oninitialized() {
    console.log('inited');
  },
});

console.log(mainSlider);
