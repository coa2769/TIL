# 웹팩 주요 속성 소개

- entry : 빌드 할 대상 파일
- output : 빌드 후 결과물이 저장되는 곳을 정의
- module : 변환 과정 중에 개입하는 것들.
  - loader
- plugin

[웹팩의 4가지 주요 속성](https://joshua1988.github.io/webpack-guide/concepts/overview.html)

# entry

> 웹팩에서 변환을 위한 최초 집입점이 되는 JS파일 경로를 말한다.

```json
// webpack.config.js
module.exports = {
  entry: './src/index.js'
}

```

## Entry 파일에는 어떤 내용이 들어가야 하나?

- 웹 애플리케이션의 전반적인 구조와 내용이 담겨 있어야 한다.

  - 해당 파일로 모듈들의 연관 관계를 분석하기 때문이다.
    - 모듈 간의 의존 관계가 생기는 구조를 `디펜던시 그래프(Dependency Graph)라고 한다.

  ```js
  // index.js
  import LoginView from './LoginView.js';
  import HomeView from './HomeView.js';
  import PostView from './PostView.js';
  
  function initApp() {
    LoginView.init();
    HomeView.init();
    PostView.init();
  }
  
  initApp();
  ```

- 엔트리 포인트는 여러개 일 수 있다.

  - 멀티 페이지 애플리케이션에는 아래와 같은 형태가 더 적합하다.

  ```json
  entry: {
    login: './src/LoginView.js',
    main: './src/MainView.js'
  }
  ```

​	**멀티 페이지 애플리케이션** : 특정 페이지로 집입했을 때 서버에서 해당 정보를 내려주는 형태의 애플리케이션.

# output

> 웹팩으로 변환한 후 결과물의 파일 경로를 의미한다.

```js
// webpack.config.js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    //path.resolve()코드는 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어주는 Node.js API
    path: path.resolve(__dirname, './dist')
  }
}
```

- `filename` : 웹팩으로 빌드한 파일의 이름

- `path` : 웹팩으로 빌드된 파일이 저장되는 경로.

- 최소한 filename은 지정해 줘야 한다.

- 좀더 간결하게 아래와 같이 표현할 수 있다.

  ```js
  output: './dist/bundle.js'
  ```

## Output 파일 이름 옵션

`file` 속성에는 여러 가지 옵션을 넣을 수 있다.

1. 결과 파일 이름에 `entry`속성을 포함하는 옵션

   ```js
   module.exports = {
     output: {
       filename: '[name].bundle.js'
     }
   };
   ```

2. 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함하는 옵션

   ```js
   module.exports = {
     output: {
       filename: '[id].bundle.js'
     }
   };
   ```

3. 매 빌드시 마다 고유 해시 값을 분이는 옵션

   ```js
   module.exports = {
     output: {
       filename: '[name].[hash].bundle.js'
     }
   };
   ```

4. 웹팩의 각 모듈 내용을 기준으로 생성된 해시 값을 붙이는 옵션

   ```js
   module.exports = {
     output: {
       filename: '[chunkhash].bundle.js'
     }
   };
   ```

# loader

> 웹팩이 모듈 간의 관계를 분석할 때 JS 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성이다.

```js
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}
```



# 주요 속성을 이해하기 위한 두 번째 튜토리얼 실습

[튜토리얼 실습에 대한 설명](https://joshua1988.github.io/webpack-guide/tutorials/code-splitting.html#code-splitting)

- 'code-splitting' 예제 참조

- 1~6번까지만 추가 후 실습

- 'package.json'에 아래 내용 추가

  ```js
  "build" : "webpack"
  ```

# 두 번째 튜토리얼 - 웹팩 결과 로그 분석

![웹팩 결과 로그](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\웹팩 결과 로그.png)

- 강의에서 설명하는 로그와는 다르게 되어있다.
- 'code-splitting' 예제 참조



# 두 번째 튜토리얼 - 브라우저에서 빌드 결과물 확인

- 'code-splitting' 예제 참조
- 결과물을 보면 <p>에 color가 blue이도록 css가 적용되어 있다.
- 원본 html에는 <style>이 없지만 웹브라우저에 전송된 html에는 있다. 이게 어떻게 이루어진 결과인지는 다음 강의에서 설명한다.

# 두 번째 튜토리얼 - 웹팩 빌드 결과 파일 분석

- js가 아닌 파일에 대해 js에 포함될 수 있도록 변환을 지원해주는 것을 loader속성이다.

  - 이렇게 JS파일 안에 CSS의 내용이 들어간다. (./dist/bundle.js의 /* 8 */번째에 있다.)

  ```js
  ___CSS_LOADER_EXPORT___.push([module.id, "p {\r\n    color : blue;\r\n  }", ""]);
  ```

  

# 두 번째 튜토리얼 - 웹팩 설정 파일 분석

- `mode` 속성 : 아래 3가지 모드 중 하나를 선택한다.

  - `none ` : 기본 모드
  - `production ` : 배포 때 사용되는 모드. 난독화가 이루어진다.
  - `development` : 개발 때 사용되는 모드.

- `module` 속성 : loader들이 선언되는 속성이다. (위의 loader에 대한 설명 들은 모두 해당 속성을 뜻한다.)

  ```js
    module: {
      rules: [
          {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
          },
          {
  			test:/\.js$/,
              use:['babel-loader']
          }
      ]
    },
  ```

  - `rules`의 배열에는 규칙들이 추가된다.
  - 이 규칙들은 웹팩으로 어떤 파일을 변환할 때 어떤 loader를 이용할 것인지 작성되어 있다.
    - 배열의 첫번째 객체의 뜻은 모든 css파일에 대해 `style-loader`, `css-loader`을 통해 변환하겠다는 뜻이다.
    - 배열의 두번째 객체의 뜻은 모드 js파일에 대해 `babel-loader`를 통해 변환하겠다는 뜻이다.



# 두 번째 튜토리얼 - 로더가 없는 경우의 에러 확인과 CSS 로더 적용

>  module속성을 주석처리한 후 build를 하게 되면 어떻게 될까?

![module속성 주석처리](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\module속성 주석처리.png)

- 해당 css파일을 해석할 수 없으니 loader를 추가하라고 error가 뜬다.



### css-loader 란?

js 파일에서 css파일을 가져올 때 필요하다. 해당 loader를 module속성에 추가하면 css파일을 로드하는 중에 error가 나지 않지만 실행된 웹 애플리케이션에 style이 적용되지는 않는다.



# 두 번째 튜토리얼 - 웹팩 로더 적용 순서와 style-loader

> css파일 변환에 사용되는 loader의 순서를 `css-loader` , `style-loader` 순으로 작성하면 안되는 이유는?

프로젝트 test 중 아래와 같이 module속성을 작성하니 error가 발생 했습니다.

```js
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['css-loader', 'style-loader']
        }
    ]
  },
```

![로더의 순서때문에 생긴 error](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\로더의 순서.png)

- loader를 use 배열에서 오른쪽에서 왼쪽 순서로 적용이 된다.

  - 그러므로 css-loader로 style 코드를 가져오고 style-loader로 styel 코드를 적용하는 순서에 맞게 작성해야 한다.

    ```js
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
             test: /\.scss$/,
             use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },
    ```

    

### style-loader 란?

웹팩이 변환 중인 style 코드를 html <head>에 inline-style로 넣어준다.



# 두 번째 튜토리얼 - 플러그인 적용 및 분석

- 'code-splitting' 예제 참조 마지막 7번 적용

- plugins 배열에 객체를 생성하는 형태로 plugin을 추가한다.

  ```js
    plugins: [
      new MiniCssExtractPlugin()
    ],
  ```

- build를 하면 dist 폴더에 main.css가 추가로 생성된다.



# 두 번째 튜토리얼 - 플러그인 적용 결과 확인

- JS파일에 병합되었던 css의 내용이 분리되었다.

- 분리된 css를 적용하기 위해 index.html의 <head>에 아래의 코드를 추가해 줘야 한다.

  ```html
  <link rel="stylesheet" href="dist/main.css">
  ```



# plugin

> 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성이다.

```js
// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}
```

- 플러그인 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가할 수있다.



### plugin과 loader의 차이

`loader`는 파일을 해석하고 변환하는 과정에 관여하는 반면에 `plugin`은 변환된 결과물의 형태를 바꾸는 역할을 한다.



# 주요 속성 4가지 리뷰 및 정리

[주요 속성에 대한 전박적인 설명](https://joshua1988.github.io/webpack-guide/concepts/wrapup.html#concepts-review)

![주요 속성 도식](https://joshua1988.github.io/webpack-guide/assets/img/diagram.519da03f.png)



# 강좌 이후에 웹팩 설정 파일 및 변경할 때 참고할 자료

[사용할 수 있는 loader들](https://webpack.js.org/loaders/)

[사용할 수 있는 plugins들](https://webpack.js.org/plugins/)



