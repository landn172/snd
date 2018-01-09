import SectionSlider from './SectionSlider';
import {
  fillSequenceNumber
} from './utils';

// 配置可slider页面
export const pagesConfig = [
  new SectionSlider(fillSequenceNumber(4, 6), 3),
  new SectionSlider(fillSequenceNumber(8, 11), 7),
  new SectionSlider(fillSequenceNumber(17, 19), 16),
  new SectionSlider([21, 22], 20),
  new SectionSlider(fillSequenceNumber(24, 26), 23),
  new SectionSlider([28, 29], 27),
  new SectionSlider([30, 31], 29),
  new SectionSlider(fillSequenceNumber(33, 39), 32),
  new SectionSlider(fillSequenceNumber(41, 45), 40),
];

// 事件点击配置
export const eventConfig = {
  '.page-1 .click': 2, // 首页click
  '.page-2 .circle1': 3, // 电子行业概述
  '.page-2 .circle2': 46, // 成功案例
  '.page-2 .btn1': 7, // 安全工厂
  '.page-2 .btn2': 32, // 透明工厂
  '.page-2 .btn3': 40, // 绿色工厂
  '.page-2 .layer-mask': -1, // 浮层
  '.page-3 .btn1': 4, // 行业趋势
  '.page-3 .btn2': 5, // 行业驱动力
  '.page-3 .btn3': 6, // 电子厂房特征
  '.page-3 .layer-mask': -1, // 浮层
  '.page-7 .btn1': 8, // 电子厂房配电特点
  '.page-7 .btn2': 9, // 电子厂房供电系统架构
  '.page-7 .btn3': 10, // 安全工程价值主张
  '.page-7 .btn4': 11, // 安全工厂解决方案
  '.page-7 .set3': 12,
  // '.page-7 .set4': 11,// todo
  // '.page-7 .set5': 16,
  '.page-7 .set6': 20,
  '.page-7 .set7': 23,
  '.page-7 .set8': 16,
  '.page-7 .set9': 27,
  '.page-12 .btn': 13, // 中电
  '.page-13 .mask': -1, // 关闭mask
  '.page-13 .btn-popup-14': 14, // 弹出 14
  '.page-13 .btn-popup-15': 15, //弹出 15
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
  '.page-29 .btn1': 30, // 
  '.page-29 .btn2': 31, // 
  '.page-32 .btn1': 33, // 电子厂房配电特点
  '.page-32 .btn2': 36, // 电子厂房供电系统架构
  '.page-32 .btn3': 35, // 安全工程价值主张
  '.page-32 .btn4': 34, // 安全工程价值主张
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
