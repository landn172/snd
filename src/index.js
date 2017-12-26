import Islider from 'islider.js/build/iSlider.js';
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
  pageData.push({ content: requirePageContent(i) });
}

const $mainContainer = $('#main-container');
const $body = $('body');
const $back = $('#back-icon');
const initIndex = getRealPageNumber(1);
const historySliderIndex = [initIndex];

const mainSlider = new Islider($mainContainer[0], pageData.reverse(), {
  isLooping: false,
  isVertical: 0,
  animateTime: 300,
  plugins: [],
  initIndex,
  oninitialized() {},
  onSlideChanged(index) {
    historySliderIndex.push(index);
  },
  fixPage: false,
});

function getRealPageNumber(pageNumber) {
  return pageData.length - pageNumber; // 48 - N
}

function clickEventHandle(selector, toPageNumber) {
  $body.on('click', selector, () => {
    mainSlider.slideTo(getRealPageNumber(toPageNumber));
  });
}
$back.on('click', () => {
  let last = historySliderIndex.pop();
  console.log(historySliderIndex);
  if (historySliderIndex.length === 0) return;
  last = historySliderIndex.pop();
  mainSlider.slideTo(last);
});

const eventConfig = {
  '.page-1 .click': 2, // 首页click
  '.page-2 .circle1': 3, // 电子行业概述
  '.page-2 .circle2': 46, // 成功案例
  '.page-2 .btn1': 7, // 安全工厂
  '.page-2 .btn2': 32, // 透明工厂
  '.page-2 .btn3': 40, // 绿色工厂
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
