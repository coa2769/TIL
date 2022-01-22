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







# 두 번째 튜토리얼 - 로더가 없는 경우의 에러 확인과 CSS 로더 적용









# 두 번째 튜토리얼 - 웹팩 로더 적용 순서와 style-loader





# 두 번째 튜토리얼 - 플러그인 적용 및 분석







# 두 번째 튜토리얼 - 플러그인 적용 결과 확인







# plugin







# 주요 속성 4가지 리뷰 및 정리







# 강좌 이후에 웹팩 설정 파일 및 변경할 때 참고할 자료





