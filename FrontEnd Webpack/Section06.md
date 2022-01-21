# 바벨 소개

JS의 최신 문법들을 최대한 많은 브라우저에 호환이 되도록 컴파일 해주는 도구이다.

[ES6에서 추가된 새로운 문법들](https://babeljs.io/docs/en/learn)



# ES6 Modules 문법

### import & export 기본 문법

JS 코드를 모듈화하는 기능이다.

- 다른 파일에서 가져다 쓸 변수나 함수의 앞에 `export`를 붙입니다.

  ```js
  export 변수, 함수
  ```

- `export`된 변수나 함수를 `import`로 가져 올 수 있다.

  ```js
  import { 불러올 변수 또는 함수 이름 } from '파일 경로';
  ```

# ES6 Modules 실습

[예제 작성 방법](https://joshua1988.github.io/es6-online-book/modules.html#import-export-%EA%B8%B0%EB%B3%B8-%EC%98%88%EC%A0%9C)

- 'es6-modules' 프로젝트를 참조한다.

# ES6 Modules 실습 결과 확인

- webpack의 none 모드 일때는 그나마 구조를 알 수 있지만 production모드에서는 난독화가 된다.
- 예제를 live-server로 실행하면 계산 결과가 console에 출력된다.

# ES6 Modules 빌드 결과물 분석 - sourcemap

빌드되면서 app.js와 math.js는 main.bundle.js에 통합되어 브라우저에 전송되었을 텐데 console에서 'app.js'를 클릭하면 원본 소스를 볼 수 있다. 그 이유는 무엇일까?

![예제 결과의 console](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\예제 결과의 console.png)

![예제 결과 source](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\예제 결과 source.png)

보통 빌드 할 때 'production'모드를 이용하여 난독화 하여 브라우저에 전송되므로 테스트가 힘들어 질 수 있다.

그렇기 때문에 Webpack은 sourcemap을 통해 설령 빌드되어 있다고 하여도 console에서는 원본 파일로 연결될 수 있도록 해준다.

devtool에 'sourve-map'을 등록하면 이용할 수 있다.

```json
var path = require('path');

module.exports = {
	mode: 'none',
	entry: './js/app.js',
	output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'main.bundle.js'
	},
	module: {
		rules: [{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
	stats: {
			colors: true
	},
	devtool: 'source-map'
};
```



