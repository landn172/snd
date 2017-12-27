import HistorySlider from './historySlider';
import TempSlider from './TempSlider';

/**
 * 填充连续数
 * @param {number} start
 * @param {number} end
 */
export function fillSequenceNumber(start, end) {
  const arr = [];
  const len = end - start;
  for (let i = 0; i <= len; i++) {
    arr.push(start + i);
  }
  return arr;
}

const classPageReg = /\.page-(\d+)/i;
/**
 * 从 classname 获取到页面nubmer
 * .page-1 => 1
 * @param {string} className
 */
export function getClassPageNumber(className = '') {
  const match = className.match(classPageReg);
  if (!match) return null;
  return match[1] * 1;
}

/**
 * 判断当前页是否是父级页面 并返回
 * @param {*} pageNumber
 * @param {*} pagesConfig
 */
export function isParentSlider(pageNumber, pagesConfig) {
  return pagesConfig.find(config => config.parentPageNumber === pageNumber);
}

/**
 * 获取真实页面index
 * @param {*} pageNumber
 * @param {*} len
 */
export function getRealPageNumber(pageNumber, len = 48) {
  return len - pageNumber; // 48 - N
}

// 初始化新 sectionSlider
export function InitSectionSlider(data, index = 0) {
  const sectionSlider = new TempSlider({
    data,
    opts: {
      initIndex: index,
    },
  });

  const sectionHistory = new HistorySlider(index);

  return {
    sectionHistory,
    sectionSlider,
  };
}
