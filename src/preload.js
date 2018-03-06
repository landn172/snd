// import ProgressBar from 'progressbar.js'

const assertReg = /.*\.(jpg|png|mp4)/
const imgReg = /.*\.(jpg|png)/
const videoReg = /.*\.(mp4)/

// const circle = new ProgressBar.Circle('#preloadContainer', {
//   color: '#FCB03C',
//   strokeWidth: 2,
//   trailWidth: 1,
//   easing: 'easeInOut',
//   text: {
//     value: '0%'
//   }
// })

class Preload {
  constructor() {
    this.handles = []
  }

  _resolve(data) {
    const asserts = []
    Object.keys(data).forEach(key => {
      if (key.match(imgReg)) asserts.push(key)
    })

    const totalLength = asserts.length
    let loaded = 0

    asserts.map(url =>
      loadAssert(url).then(() => {
        this.fire(++loaded, totalLength)
      })
    )
  }

  fire(loaded, total) {
    this.handles.forEach(handle => handle(loaded, total))
    if (loaded === total) this.handles.length = 0
  }

  loadMainfest(url) {
    $.getJSON(url, data => {
      this._resolve(data)
    })
  }

  on(handle) {
    this.handles.push(handle)
  }
}

function loadAssert(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = url
  }).then(src => src)
}

const preload = new Preload()

preload.loadMainfest('manifest.json')

// preload.on((loaded, total) => {
//   const percent = ~~loaded / total
//   circle.set(percent)
//   circle.setText(`${~~(percent * 100)}%`)
//   // end
//   if (percent === 1) {
//     circle.destroy()
//     $('.preload-layer').remove()
//   }
// })

window._preload = preload
