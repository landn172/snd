export default class SectionSlider {
  constructor(pagesArr, parentPageNumber) {
    this.pagesArr = pagesArr; // [21,22]
    this.parentPageNumber = parentPageNumber; // 20
  }

  // 21 => 0
  getSlideToNumber(pageNumber) {
    return (this.pagesArr.findIndex(pageNumber) || 0) * 1;
  }

  // [21,22] => pageData[20,21]
  getRenderData(pageData = []) {
    const arr = this.pagesArr;
    const begin = arr[0] - 1;
    const end = arr[arr.length - 1] - 1;
    return pageData.slice(begin, end);
  }
}
