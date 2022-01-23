# 웹팩 소개 영상1

[웹팩 소개 영상](https://www.youtube.com/watch?v=WQue1AN93YU&ab_channel=FrontEndCenter)

![chrom-develop-tool-network](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\chrom-develop-tool-network.png)



- No Throtting 설정을 변경하여 외부 환경과 비슷한 상황에서 웹 페이지를 불러올 때 시간이 얼마나 걸릴지 영상에서 테스트 하고 있다.
  - 테스트 결과 영상의 예제는 굉장히 로딩이 느린 웹 페이지 였다.
  - 이를 웹팩을 이용해 해결해 보자라고 동영상에서 말하고 있다.
- ''브라우저를 위한 사전 컴파일러''라고 웹팩을 설명한다. 





# 웹팩 소개 영상2

위에 내용에서 이어진다.

- 웹팩은 HTML, CSS, JS의 최적화를 간단한 설정만으로 자동화 할 수 있다. (스크립트 작성 없이)

- 진입점을 하나만 지정하면 나머지 파일들의 연관점을 웹팩에서 해석한다.
  
  ![webpack 파일간의 연관점](C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\image\webpack 파일간의 연관점.png)

### glup 란?

- 웹페이지에 필요한 HTML, CSS, JS에 대한 최적화 작업 스크립트를 직접 작성하여 glup로 실행한다.



# 웹팩과 모듈 소개

section04의 모듈 번들러 내용 참조

### 웹팩에서의 모듈이란?

웹 애플리케이션을 제작에 필요한 HTML, CSS, JS, Images, Font 등의 많은 파일들을 모두 모듈이라 한다.



# 웹팩 등장 배경-1

- 이유 01) 파일 단위의 JS  모듈 관리의 필요성
  - 같은 이름으로 선언된 변수와 함수들의 충돌을 막기 위해.



# 웹팩 등장 배경-2

- 이유 02) 웹 개발 작업 자동화 도구(Web Task Manager)

  - 프런트엔드 개발 업무를 할 때 가장 많이 반복되는 작업을 자동화가 필요했다.(아래는 그 예시이다)

  - 편집기에서 코드를 수정하고 저장한 뒤 브라우저 새로 고침
  - 배포할 때 필요한 작업
    - HTML, CSS, JS 압축
    - 이미지 압축
    - CSS 전처리기 변환

- 이유 03) 웹 애플리케이션의 빠른 로딩 속도와 높은 성능
  - 5초 이내로 웹 사이트가 표시되도록 해주어야 한다.
  - 웹팩은 빠른 로딩을 위해 필요한 자원을 그 때 그 때 요청하는 것을 중점으로 두고 있는 도구이다. (Lazy Loading 지원)

# 웹팩으로 해결하려는 문제4가지



- 문제 1) JS 변수 유효 범위
  - 파일 별로 구분 되지 않는 문제
- 문제 2) 브라우저별 HTTP 요청 숫자의 제약
  - 브라우저마다 한번 연결에 보낼 수 있는  HTTP 요청 숫자에는 제약이 있다.
    - 'TCP로 연결을 맺은 후 HTTP 요청을 몇번 보낼 수 있는가?'를 나타낸다.
- 문제 3) 사용하지 않는 코드의 관리
- 문제 4) Dynamic Loading & Lazy Loading 미지원
  - 특정 라이브러리를 이용하지 않고서는 동적으로 원하는 순간에 모듈을 불러 올 수 없었다.
  - 웹팩의 Code Splitting 기능으로 이를 해결할 수 있었다.