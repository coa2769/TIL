# 웹팩 소개

> 최신 프론트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러이다.

## 모듈 번들링이란?

웹 애플리케이션을 구성하는 많은 자원(HTML, CSS, JS, image 등)들을 하나의 파일로 병합및 압축 해주는 동작.

![모듈 번들링](https://joshua1988.github.io/webpack-guide/assets/img/webpack-bundling.e79747a1.png)



# 웹팩 시작하기 튜토리얼 파트 1 - 웹팩 적용 전

[예제 작성 과정 1~4번까지](https://joshua1988.github.io/webpack-guide/getting-started.html#%EC%8B%A4%EC%8A%B5-%EC%A0%88%EC%B0%A8-%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9E%90%EC%9B%90-%EA%B5%AC%EC%84%B1)

- './getting-started' 예제 참조

# 웹팩 시작하기 튜토리얼 파트 2 - 웹팩 적용 후

[예제 작성 과정 5~6번까지](https://joshua1988.github.io/webpack-guide/getting-started.html#%EC%8B%A4%EC%8A%B5-%EC%A0%88%EC%B0%A8-%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9E%90%EC%9B%90-%EA%B5%AC%EC%84%B1)

- './getting-started' 예제 참조

# 웹팩 시작하기 튜토리얼 파트 3 - mode 적용

- `webpack --mode=none` 에서 mode옵션이 없다면 warning이 뜬다.



# 웹팩 시작하기 튜토리얼 파트 4 - 웹팩 설정 파일 적용

웹팩 명령어에 여러 옵션들이 붙어 명령어가 길어지는 것을 막기 위해 이용된다.

```json
"build" : "webpack --mode=none --entry=src/index.js --output=public/output.js"
```

[예제 작성 과정 7~9번까지](https://joshua1988.github.io/webpack-guide/getting-started.html#%EC%8B%A4%EC%8A%B5-%EC%A0%88%EC%B0%A8-%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9E%90%EC%9B%90-%EA%B5%AC%EC%84%B1)

- `webpack.config.js` 파일은 웹팩 설정 파일로 프로젝트 폴더 최상위에 생성한다.



# 웹팩 시작하기 튜토리얼 파트 5 - 웹팩 설정 파일 설명

- './getting-started' 예제 참조



# 웹팩 시작하기 튜토리얼 파트 6 - 튜토리얼 소스 분석

- './getting-started' 예제 참조



# 웹팩 시작하기 튜토리얼 파트 7 - 웹팩 변환 전후 결과 비교

- 웹브라우저에서 웹페이지를 열때 서버와의 요청 수를 줄일 수 있다.
  - 불러들여야 하는 라이브러리를 병합, 압축된 파일을 가져가기 때문이다.



# 웹팩 시작하기 튜토리얼 파트 8 - 웹팩 빌드 결과 파일 분석

- IIFE(즉시 실행 함수)로 되어 있다.

- 아래와 같이 번호 주속이 달린 즉시 실행 함수는 사용된 모듈들이다.

  ```js
  /* 0 */
  /* 1 */
  ```





