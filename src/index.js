import 'babel-polyfill'
import {
  getClassPageNumber,
  isParentSlider,
  getRealPageNumber,
  InitSectionSlider
} from './utils'
import HistoryRouter from './router'
import HistorySlider from './historySlider'
import TempSlider from './TempSlider'
import {
  pagesConfig,
  eventConfig
} from './config'
import './islider.less'
import './index.less'
import './video/video.mp4'

FastClick.attach(document.body)

function zoomBody() {
  const [originalWith, originalHeight] = [375, 603]
  const {
    innerWidth,
    innerHeight
  } = window
  const scaleWith = innerWidth / originalWith
  const scaleHeight = innerHeight / originalHeight

  // alert(`${innerWidth},${innerHeight}`);
  const scaleValue = scaleWith > scaleHeight ? scaleHeight : scaleWith
  console.log(scaleHeight, scaleWith)
  // document.body.style["zoom"] = scaleWith > scaleHeight ? scaleHeight : scaleWith;
  const style = $('.wrapper')[0].style
  const targeHeight = scaleValue * originalHeight
  let translateValue = ''
  if (targeHeight < innerHeight) {
    translateValue = `translateY(${~~(innerHeight - targeHeight) / 2}px)`
  }
  console.log(translateValue)
  style['transform'] = style[
    'webkitTransform'
  ] = `${translateValue} scale(${scaleValue})`
}

window.addEventListener('resize', zoomBody)

zoomBody()

const pageData = []

const pageLen = 48

function requirePageContent(pageName) {
  return require(`${__dirname}/pages/${pageName}.ejs`)
}

for (let i = 0; i < pageLen;) {
  i += 1
  pageData.push({
    content: requirePageContent(i)
  })
}

const $body = $('body')
const $back = $('#back-icon').hide()
const initIndex = getRealPageNumber(1) // 初始化index
const mainHistory = new HistorySlider(initIndex)
const histroyRouter = new HistoryRouter()
let mainTempSlider

// window._preload.on((loaded, total) => {
//   if (loaded === total) {
//     Init()
//   }
// })

Init()

function Init() {
  // 主slider
  mainTempSlider = new TempSlider({
    data: [].concat(pageData).reverse(),
    opts: {
      isLooping: false,
      isVertical: 0,
      plugins: ['AddActive'],
      initIndex,
      oninitialized() {},
      onSlideChanged(index) {
        mainHistory.push(index)
        if (index === getRealPageNumber(1)) {
          $('#back-icon').hide()
        } else {
          $('#back-icon').show()
        }
      },
      fixPage: false,
      isTouchable: false
    }
  })

  histroyRouter.registerHistory(mainHistory, mainTempSlider)
}

document.addEventListener(
  'touchmove',
  function (event) {
    event.preventDefault()
  }, {
    passive: false
  }
)

function clickEventHandle(selector, toPageNumber) {
  const pageNumber = getClassPageNumber(selector)
  $body.on('click', selector, e => {
    const targetSlider = isParentSlider(pageNumber, toPageNumber, pagesConfig)
    // 如果是在配置中
    if (targetSlider) {
      const sliderData = targetSlider.getRenderData(pageData).reverse()
      const sliderIndex = targetSlider.getSlideToNumber(toPageNumber)
      const {
        sectionHistory,
        sectionSlider
      } = InitSectionSlider(
        sliderData,
        getRealPageNumber(sliderIndex, sliderData.length) - 1
      )
      console.log(pageNumber, toPageNumber)
      histroyRouter.registerHistory(sectionHistory, sectionSlider)
    } else if (isSpecial(pageNumber, toPageNumber)) {
      SpecialClick({
        pageNumber,
        toPageNumber
      })
    } else {
      histroyRouter.slideTo(getRealPageNumber(toPageNumber))
    }
    e.preventDefault()
  })
}

const specialConfig = {
  7: [23],
  13: [-1, 14, 15],
  2: [-1],
  3: [-1],
  46: [-1]
}

// 特别按钮
function SpecialClick({
  pageNumber,
  toPageNumber
}) {
  if (pageNumber === 7) {
    // page7 放大3d效果
    if (toPageNumber === 23) {
      $('.page-7').addClass('active')
      setTimeout(() => {
        histroyRouter.slideTo(getRealPageNumber(toPageNumber))
        $('.page-7').removeClass('active')
      }, 1000)
    }
  }

  if (pageNumber === 13) {
    // mask 弹窗
    if (toPageNumber === -1) {
      $('.page-13 .popup,.page-13 .mask').removeClass('active')
      $back.show()
    }
    if (toPageNumber === 14) {
      $('.page-13 .popup-14,.page-13 .mask').addClass('active')
      $back.hide()
    }
    if (toPageNumber === 15) {
      $('.page-13 .popup-15,.page-13 .mask').addClass('active')
      $back.hide()
    }
  }
  // video play
  if (pageNumber === 46 && toPageNumber === -1) {
    console.log('play video')
    const video = document.getElementById('video')
    video.play()
    $(video).addClass('fullscreen')
    bindVideoEvent(video)
    try {
      video.webkitRequestFullScreen()
    } catch (e) {
      video.webkitEnterFullscreen()
    }

    setTimeout(() => {
      video.play()
    }, 300);
  }

  layerMaskEventHandle(pageNumber, toPageNumber, 2)
  layerMaskEventHandle(pageNumber, toPageNumber, 3)
}

function onFullScreenChange(event) {
  if (checkFull()) {
    console.log('进入全屏')
    video.play()
  } else {
    console.log('退出全屏')
    const video = document.getElementById('video')
    video.pause()
    document.removeEventListener('fullscreenchange', onFullScreenChange)
  }
}

function bindVideoEvent(video) {
  document.addEventListener('fullscreenchange', onFullScreenChange)
  document.addEventListener('webkitfullscreenchange', onFullScreenChange)
  window.addEventListener('resize', onFullScreenChange)
  $(video)
    .on('webkitbeginfullscreen', onFullScreenChange)
    .on('webkitendfullscreen', onFullScreenChange)
  video.addEventListener('x5videoexitfullscreen', onFullScreenChange)
}

function checkFull() {
  var isFull =
    document.fullscreenEnabled ||
    window.fullScreen ||
    document.webkitIsFullScreen ||
    document.msFullscreenEnabled

  //to fix : false || undefined == undefined
  if (isFull === undefined) isFull = false
  return isFull
}

function layerMaskEventHandle(pageNumber, toPageNumber, number) {
  if (pageNumber === number) {
    // .layer-mask
    if (toPageNumber === -1) {
      $(`.page-${pageNumber} .layer-mask`).removeClass('active')
      $(`.page-${pageNumber}`).removeClass('disable-animate')
    }
  }
}

// 判断是否需要动画
function isSpecial(pageNumber, toPageNumber) {
  if (specialConfig[pageNumber]) {
    const toPageNumbers = specialConfig[pageNumber]
    return toPageNumbers.indexOf(toPageNumber) >= 0
  }
  return false
}

$back.on('click', () => {
  histroyRouter.back()
})

Object.keys(eventConfig).forEach(key => clickEventHandle(key, eventConfig[key]))
