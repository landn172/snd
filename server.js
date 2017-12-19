const express = require('express');
// const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.dev.js');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const lessCompiler = require('express-less-middleware')({
  publicDir: './src',
});

const app = express();
const resolve = file => path.resolve(__dirname, file);

const compiler = webpack(config);

app.use(
  devMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',
  }),
);

app.use(
  hotMiddleware(compiler, {
    heartbeat: 10 * 1000,
  }),
);

app.use(expressLayouts);
app.set('layout', 'layout.ejs');
app.set('view engine', 'ejs');
app.engine('.html', ejs.renderFile);
app.set('views', `${__dirname}/src/pages`);

// const serve = (_path, cache) =>
//   express.static(resolve(_path), {
//     maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0,
//   });

app.use(lessCompiler);

app.get('/:pagename', (req, res, next) => {
  const { pagename } = req.params;
  const pageHTML = pagename ? `${pagename}.ejs` : 'index.html';

  const filepath = path.join(__dirname, '/src/pages/', pageHTML);
  const targetHTML = fs.readFileSync(filepath, 'utf-8');
  if (!targetHTML) {
    return next('输入路径无效');
  }
  // 发送获取到的页面
  res.render(pagename, {
    name: pageHTML,
  });
});

const port = 5000;

app.listen(port, () => {
  console.log('Listening on %j', port);
});
