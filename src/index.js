import 'babel-polyfill';
import { getClassPageNumber, isParentSlider, getRealPageNumber, InitSectionSlider } from './utils';
import HistoryRouter from './router';
import HistorySlider from './historySlider';
import TempSlider from './TempSlider';
import { pagesConfig, eventConfig } from './config';
import './islider.less';
import './index.less';

FastClick.attach(document.body);

const pageData = [];

const pageLen = 48;

function requirePageContent(pageName) {
  return require(`${__dirname}/pages/${pageName}.ejs`);
}

for (let i = 0; i < pageLen;) {
  i += 1;
  pageData.push({
    content: requirePageContent(i),
  });
}

const $body = $('body');
const $back = $('#back-icon').hide();
const initIndex = getRealPageNumber(1); // 初始化index
const mainHistory = new HistorySlider(initIndex);
const histroyRouter = new HistoryRouter();

// 主slider
const mainTempSlider = new TempSlider({
  data: [].concat(pageData).reverse(),
  opts: {
    isLooping: false,
    isVertical: 0,
    plugins: [],
    initIndex,
    oninitialized() {},
    onSlideChanged(index) {
      mainHistory.push(index);
      if (index === getRealPageNumber(1)) {
        $('#back-icon').hide();
      } else {
        $('#back-icon').show();
      }
    },
    fixPage: false,
    isTouchable: false,
  },
});

histroyRouter.registerHistory(mainHistory, mainTempSlider);

function clickEventHandle(selector, toPageNumber) {
  const pageNumber = getClassPageNumber(selector);
  $body.on('click', selector, () => {
    const targetSlider = isParentSlider(pageNumber, pagesConfig);

    // 如果是在配置中
    if (targetSlider) {
      const sliderData = targetSlider.getRenderData(pageData).reverse();
      const sliderIndex = targetSlider.getSlideToNumber(toPageNumber);
      const { sectionHistory, sectionSlider } = InitSectionSlider(
        sliderData,
        getRealPageNumber(sliderIndex, sliderData.length) - 1,
      );
      histroyRouter.registerHistory(sectionHistory, sectionSlider);
    } else {
      histroyRouter.slideTo(getRealPageNumber(toPageNumber));
    }
  });
}

$back.on('click', () => {
  histroyRouter.back();
});

Object.keys(eventConfig).forEach(key => clickEventHandle(key, eventConfig[key]));
