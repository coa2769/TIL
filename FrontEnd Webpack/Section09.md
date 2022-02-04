# 실전 퀴즈

아래는 실제 vue프로젝트에 쓰인 webpack설정이다. 이를 해석해 보자.

```js
var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'production', //배포 시 사용되는 모드
  entry: './src/main.js', //변환이 시작되는 파일
  output: {
    path: path.resolve(__dirname, './dist'), //변환된 파일이 저장되는 경로
    publicPath: '/dist/',	//CSS, HTML 파일 안의 URL 또는 webpack plugins이 저장되는 경로
    filename: 'build.js' //변환된 파일 이름.
  },
  module: {
    rules: [
      {
        test: /\.css$/, //css파일을 변환할 때 'vue-style-loader', 'css-loader' 번들러 사용.
        use: [
          'vue-style-loader', 
          'css-loader'
        ],
      },      
      {
        test: /\.vue$/,//vue파일을 변환할 때 'vue-loader' 번들러 사용.
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/, //js파일을 변환할 때 'babel-loader' 번들러 사용.
        loader: 'babel-loader',
        exclude: /node_modules/ //해당 폴더에 있는 파일은 제외한다.
      },
      {
        test: /\.(png|jpg|gif|svg)$/, //이미지 파일을 변환할 때 'file-loader'번들러 사용.
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]' //이름 변환 규칙?
        }
      }
    ]
  },
  resolve: { //특정 모듈의 해석 방식을 변경할 수 있다.
    alias: {
      'vue$': 'vue/dist/vue.esm.js' //특정 모듈의 별칭을 지어줌.
    },
    //여러 파일이 동일한 이름을 공유하지만 확장자가 다른 경우 배열에 나열된 순서 대로 확장자를 검색한다.
    extensions: ['*', '.js', '.vue', '.json'] //확장자 명칭을 생략 가능한 것들을 설정할 수 있다.
  },
  devServer: { //개발 시 테스트 서버
    historyApiFallback: true, //히스토리 API를 사용하는 SPA개발시 설정한다.(404가 발생하면 index.html로 리다이렉트한다.)
    noInfo: true, //?
    overlay: true //빌드시 에러나 경고를 브라우져 화면에 표시한다.
  },
  performance: { //파일 제한을 초과하는 에셋과 엔트리 포인트에 대해 알릴 방법을 제어할 수 있다.
    hints: false //해당 내용을 끈다.
  },
  devtool: '#eval-source-map' //소스맵을 제공하는 옵션
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
```

# 실전 퀴즈 풀이

내가 작성한 설명과 다른 부분만 작성했다.

```js
var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'production', 
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',	//CDN배포를 할 때 CDN주소에 포함될 있게끔 속성 정의.(잘 이해 안됨)
    filename: 'build.js' 
  },
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: [
          'vue-style-loader', 
          'css-loader'
        ],
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/, 
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/, 
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]' 
        }
      }
    ]
  },
  resolve: { //파일 간의 연관 관계를 해석해 나갈 때 파일들의 해석 방법을 정의.
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: { 
    historyApiFallback: true, 
    noInfo: true, 
    overlay: true 
  },
  performance: { 
    hints: false 
  },
  devtool: '#eval-source-map'
}

//아래 코드는 webpack 3까지에서만 필요하다.
//webpack4에서는 mode를 'production'로만 선언하면 된다.
// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
```

