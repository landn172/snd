const HappyPack = require('happypack');//多线程loader 加快编译速度
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  HappyPack,
  happyThreadPool
}
