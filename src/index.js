import Islider from 'islider.js/build/iSlider.js';
import './islider.less';
import './index.less';

function $(id) {
  return document.getElementById(id);
}

const pageData = [];

const pageLen = 1;

function requirePageContent(pageName) {
  return require(`${__dirname}/pages/${pageName}.ejs`);
}

for (let i = 0; i <= pageLen;) {
  i += 1;
  pageData.push({ content: requirePageContent(i) });
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
