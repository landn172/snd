import Islider from 'islider.js/build/iSlider.js';
import {
  fillSequenceNumber,
  getClassPageNumber,
  isParentSlider,
} from './utils';
import HistoryRouter from './router';
import SectionSlider from './SectionSlider';
import HistorySlider from './historySlider';
import './islider.less';
import './index.less';

FastClick.attach(document.body);

const pageData = [];
const histroyRouter = new HistoryRouter();
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

// 配置可slider页面
const pagesConfig = [
  new SectionSlider(fillSequenceNumber(4, 6), 3),
  new SectionSlider(fillSequenceNumber(8, 11), 7),
  new SectionSlider(fillSequenceNumber(17, 19), 16),
  new SectionSlider([21, 22], 20),
  new SectionSlider(fillSequenceNumber(24, 26), 23),
  new SectionSlider([28, 29], 27),
  new SectionSlider(fillSequenceNumber(33, 39), 32),
  new SectionSlider(fillSequenceNumber(41, 45), 40),
];

const $mainContainer = $('#main-container');
const $sectionContainer = $('#slider-container');
const $body = $('body');
const $back = $('#back-icon').hide();
const initIndex = getRealPageNumber(1);
const mainHistory = new HistorySlider(initIndex);


// 主要slider
const mainSlider = new Islider($mainContainer[0], [].concat(pageData).reverse(), {
  isLooping: false,
  isVertical: 0,
  plugins: [],
  initIndex,
  oninitialized() {},
  onSlideChanged(index) {
    mainHistory.lazyPush(index);
    if (index === getRealPageNumber(1)) {
      $('#back-icon').hide();
    } else {
      $('#back-icon').show();
    }
  },
  fixPage: false,
  isTouchable: false,
});
// 副slider
let sectionSlider;

histroyRouter.registerHistory(mainHistory, mainSlider);

function getRealPageNumber(pageNumber, len = pageData.length) {
  return len - pageNumber; // 48 - N
}

function clickEventHandle(selector, toPageNumber) {
  const pageNumber = getClassPageNumber(selector);
  $body.on('click', selector, () => {
    const targetSlider = isParentSlider(pageNumber, pagesConfig);
    // 如果是在配置中
    if (targetSlider) {
      const sliderData = targetSlider.getRenderData(pageData);
      const sliderIndex = targetSlider.getSlideToNumber(toPageNumber);
      const sectionHistory = reInitSectionSlider(
        sliderData.reverse(),
        getRealPageNumber(sliderIndex, sliderData.length),
      );
      histroyRouter.registerHistory(sectionHistory, sectionSlider);
    } else {
      mainSlider.slideTo(getRealPageNumber(toPageNumber));
    }
  });
}
$back.on('click', () => {
  const lastHistory = histroyRouter.back();
  if (!lastHistory) return;
  const {
    lastIndex,
    lastSlider,
    backHistorys,
  } = lastHistory;
  if (backHistorys.length > 0) {
    hideSectionSlider();
  } else {
    lastSlider.slideTo(lastIndex);
  }
});

const eventConfig = {
  '.page-1 .click': 2, // 首页click
  '.page-2 .circle1': 3, // 电子行业概述
  '.page-2 .circle2': 46, // 成功案例
  '.page-3 .btn1': 4, // 行业趋势
  '.page-3 .btn2': 5, // 行业驱动力
  '.page-3 .btn3': 6, // 电子厂房特征
  '.page-7 .btn1': 8, // 电子厂房配电特点
  '.page-7 .btn2': 9, // 电子厂房供电系统架构
  '.page-7 .btn3': 10, // 安全工程价值主张
  '.page-7 .btn4': 11, // 安全工厂解决方案
  '.page-12 .btn': 13, // 中电
  '.page-16 .btn1': 17, // 电子厂房配电特点
  '.page-16 .btn2': 18, // 电子厂房供电系统架构
  '.page-16 .btn3': 19, // 安全工程价值主张
  '.page-20 .btn1': 21, // 电子厂房配电特点
  '.page-20 .btn2': 22, // 电子厂房供电系统架构
  '.page-23 .btn1': 24, // 电子厂房配电特点
  '.page-23 .btn2': 25, // 电子厂房供电系统架构
  '.page-23 .btn3': 26, // 安全工程价值主张
  '.page-27 .btn1': 28, // 电子厂房配电特点
  '.page-27 .btn2': 29, // 电子厂房供电系统架构
  '.page-32 .btn1': 33, // 电子厂房配电特点
  '.page-32 .btn2': 34, // 电子厂房供电系统架构
  '.page-32 .btn3': 35, // 安全工程价值主张
  '.page-32 .btn4': 36, // 安全工程价值主张
  '.page-32 .circle1': 37, // 电子厂房配电特点
  '.page-32 .circle2': 38, // 电子厂房供电系统架构
  '.page-32 .circle3': 39, // 安全工程价值主张
  '.page-40 .btn1': 41, // 电子厂房配电特点
  '.page-40 .btn2': 42, // 电子厂房供电系统架构
  '.page-40 .btn3': 43, // 安全工程价值主张
  '.page-40 .btn4': 44, // 安全工厂解决方案
  '.page-40 .circle': 45, // 安全工厂解决方案
  '.page-46 .btn1': 47, // 电子厂房配电特点
  '.page-46 .btn2': 48, // 电子厂房供电系统架构
};

Object.keys(eventConfig).forEach(key => clickEventHandle(key, eventConfig[key]));

// 重新初始化 sectionSlider
function reInitSectionSlider(data, index = 1) {
  if (!sectionSlider) {
    sectionSlider = new Islider($sectionContainer[0], data, {
      isLooping: false,
      isVertical: 0,
      animateTime: 300,
      initIndex: index,
      plugins: [],
      fixPage: false,
    });
  } else {
    sectionSlider.loadData(data, index);
  }

  if (sectionSlider.lastHistory) {
    sectionSlider.lastHistory.destory();
    sectionSlider.lastHistory = null;
  }
  const sectionHistory = new HistorySlider(index);

  sectionSlider.on('slideChanged', (i) => {
    sectionHistory.lazyPush(i);
  });
  sectionSlider.lastHistory = sectionHistory;
  showSectionSlider();
  return sectionHistory;
}

function showSectionSlider() {
  $sectionContainer.addClass('active');
  $mainContainer.addClass('disable');
}

function hideSectionSlider() {
  $sectionContainer.removeClass('active');
  $mainContainer.removeClass('disable');
}
