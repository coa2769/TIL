# 웹팩 데브 서버가 필요한 이유

코드를 수정했을 때 이를 현재 웹페이지에 적용하기 위해서는 웹팩으로 빌드 하는 과정이 필요하여 그때 그때 명령어로 빌드해주고 있다.

이를 자동화 하기위해 웹팩 데브 서버가 필요하다고 강의에서 설명하고 있다.

# 웹팩 데브 서버 소개

웹팩의 빌드 대상 파일이 변경 후 저장하였을 때 웹팩 명령어 실행 없이 웹팩으로 빌드 후 브라우저를 새로고침 해주는 도구이다.

[Webpack Dev Server 문서](https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html#webpack-dev-server)

### 특징

- 빌드한 결과물이 파일 탐색기나 프로젝트 폴더에서 보이지 않는다.
  - 빌드 결과물을 메모리에 저장하지만 파일로 생성하지는 않는다.
  - 컴퓨터 구조 관점에서 파일 입출력보다 메모리 입출력이 더 빠르고 컴퓨터 자원이 덜 소모되므로 이런 구조가 되었다.
- 개발할 때만 이용하고 개발이 완료되면 웹팩 명령어로 결과물 파일을 생성해야 한다.



# 웹팩 데브 서버 튜토리얼 실습

[웹팩 데브 서버 실습 과정](https://joshua1988.github.io/webpack-guide/tutorials/webpack-dev-server.html#%EC%9B%B9%ED%8C%A9-%EB%8D%B0%EB%B8%8C-%EC%84%9C%EB%B2%84)

- 'devserver' 프로젝트 예제 참조.



# 웹팩 데브 서버 2가지 특징

- 코드 수정 후 저장하면 수정된 내용이 바로 웹 브라우저에 적용된다.

- 프로젝트 폴더 내에는 빌드 결과가 없지만 웹 브라우저의 network에서는 빌드 결과 파일이 전송된 것을 볼 수 있다.(웹팩 데브 서버 소개의 특징 참조)

  ![웹팩 데브 서버 특징](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\웹팩 데브 서버 특징(01).png)



# 웹팩 설정 파일 분석

```js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: 'index.html',
    }),
  ],
};
```

- 'devserver' 프로젝트의 webpack.config.js 파일 참조
- HtmlWebpackPlugin 를 사용한다.
- devServer속성에서 서버의 설정을 줄 수 있다.



# HTMLWebpackPlugin 설명

[HTMLWebpackBlugin 공식 문서](https://webpack.js.org/plugins/html-webpack-plugin/)

- 웹팩 빌드 결과 물들(js, css, image등) 연결된 html 파일을 생성해준다.

  - 아래 코드와 같이 <script>로 bundle.js파일이 연결된다.

  ```html
  <html>
      <head>
      	<meta charset="utf-8">
      	<title>Webpack Dev Server</title>
          <!-- HTML Webpack Plugin에 의해 웹팩 빌드 내용이 아래에 추가됨 -->
    		<script defer="" src="bundle.js"></script>
      </head>
    	<body style="">
      	<!-- 빌드 결과물이 정상적으로 로딩되면 아래 div 태그의 텍스트가 변경됨 -->
      	<div class="container">웹팩 데브!!</div>
  	</body>
  </html>
  ```

- 인스턴스 생성할 때 template으로 특정 html파일을 지정하면 해당 파일에 빌드 결과물들을 연결해 준다.

  ```js
  plugins: [
      new HtmlWebpackPlugin({
        // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
        template: 'index.html',
      }),
    ],
  ```







