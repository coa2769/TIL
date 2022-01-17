// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require('path');

module.exports = {
  mode: 'none', //모드
  entry: './src/index.js', //번들링할 파일들의 시작점
  output: { //번들링된 파일이 저장되는 경로
    filename: 'main.js', //번들링된 파일 이름
    path: path.resolve(__dirname, 'dist')  //번들링된 파일이 저장될 폴더 경로
  }
};