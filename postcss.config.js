const autoprefixer = require("autoprefixer");

module.exports = ({ file, options, env }) => ({
  plugins: () => [autoprefixer()]
})
