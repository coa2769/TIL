# 05월 22일

> 프론트 엔드 면접 질문 정리

---

- 해당 URL의 내용을 참조했다. -> https://xiubindev.tistory.com/119

- #  

- # << CS >>

- - 브라우저 주소창에 [www.google.com을](http://www.google.com을) 입력하면 어떤 일이 일어나나요?

- 해당 URL 내용 -> [https://velog.io/@eassy/www.google.com%EC%9D%84-%EC%A3%BC%EC%86%8C%EC%B0%BD%EC%97%90%EC%84%9C-%EC%9E%85%EB%A0%A5%ED%95%98%EB%A9%B4-%EC%9D%BC%EC%96%B4%EB%82%98%EB%8A%94-%EC%9D%BC](https://velog.io/@eassy/www.google.com을-주소창에서-입력하면-일어나는-일)

-  

- 1. 웹브라우저는 캐싱된 DNS기록들 에서 해당 도메인주소와 대응된 IP주소가 있는지 확인합니다.

- 만약 있다면 해당 IP로 페이지를 요청합니다.

- 1. 캐싱된 IP주소가 없다면 DNS로 입력된 도메인 주소의 IP를 요청합니다.
  2. DNS에게 받은 IP로 페이지를 요청합여 응답을 받으면 페이지가 출력됩니다.

-  

- - GET과 POST의 차이는 무엇인가요?

  - - GET은 서버에 데이터을 읽어오거나 검색할 때 사용되는 요청입니다. 검색할 때는 쿼리 스티링(QueryString)을 이용합니다.
    - POST는 서버에 데이터의 생성이나 업데이트를 할 때 사용되는 요청입니다. 생성할 데이터의 정보는 HTTP의 Body에 담아 전송합니다.

-  

-  

- - REST API에 대해 설명해주세요.

- REST 란?

- HTTP URI를 통해 데이터 명시하고 HTTP Method를 통해 데이터에 대한 CRUD 명령을 나타내는 URL 아키텍처이다.

- REST API는 이런 규칙들을 지키며 작성된 URL들을 말한다.

-  

- - 객체 지향 프로그래밍이란 무엇인가요?

- 데이터를 객체로 추상화하여 객체 간의 유기적인 상호 작용을 로직으로 작성하는 프로그래밍 방법이라고 생각합니다.

-  

- - 프로세스와 스레드에 대해 설명해주세요.

-  

-  

-  

- # << Frontend >>

- - 브라우저 렌더링 과정을 설명해주세요

-  

-  

- - 브라우저는 어떻게 동작하나요?

-  

-  

- - Webpack, Babel,      Polyfill에 대해 설명해주세요.

-  

-  

- - ![중요](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFCSURBVDhPnZNRTsMwDIbtthJ7GxXjmXECxibedwN2A8oN9hoJCU1C9BrrDcYN4BkV6A32DlPHG0htgx2yqEm7afBJUX4ntePELuziIx5GPLTZiqfnbUQgcap1K6jnBvndxaDyq1fWXumdhzfPb2rDYWsG5GxOrmsXfI9HY60tUMICEbqspYRPiTBRGw64ikdzmq9+zT+TqDf4Z5DkSKSRegMWvMB6H+hKmfdVqHexqrBPJuzsfxfjcJat2W6UcXU/XADipTYtXGemWUZEs9kA5bruzFgZ5Ldnh+VBsNyUrw0PitNQZEtt2hmUHX/iOnMPaKmoZGA1lRWAmsc0iwT5xKf5WAwoyoNepnX6P2qYK3D6VSfI1Ykopz3xwhUxcMfSx3MaJxT8erNvMuD0aUrolfuuM3Ms0seeSPskZwio2x/gBxXHd1j10YF/AAAAAElFTkSuQmCC) CSR과 SSR의 차이는 무엇인가요?

-  

-  

-  

-  

-  

- - CORS는 무엇인지, 이를 처리를 해본 경험을 말씀해주세요.

-  

-  

- - 웹 표준을 지키며 개발하시나요?

-  

-  

- - 쿠키와 세션에 대해 설명해주세요. or 쿠키, 세션, 웹 스토리지의 차이에 대해 설명해주세요.

- URL --> [https://racoonlotty.tistory.com/entry/%EC%BF%A0%ED%82%A4%EC%99%80-%EC%84%B8%EC%85%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%A1%9C%EC%BB%AC-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80%EC%99%80-%EC%84%B8%EC%85%98-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80](https://racoonlotty.tistory.com/entry/쿠키와-세션-그리고-로컬-스토리지와-세션-스토리지)

-  

- 쿠키 란?

- - 클라이언트(브라우저) 로컬에 저장된 키와 값으로 구성된 작은 데이터. 
  - 유효한 시간을 정해줄 수 있고 유효 시간 동안까지는 브라우저가 종료되어도 키와 값이 유지된다.

-  

-  

- 세션 란?

- - 사용자 정보를 브라우저가 아닌 서버 측에 저장하여 관리하는 데이터.
  - 서버에서는 클라이언트를 구분하기 위해 세션 ID를 보내고 해당 세션 
                ID를 쿠키에 저장한다.
  - 브라우저를 종료할 때까지 인증상태를 유지한다.

-  

-  

- 웹 스토리지 란?

- - HTML5에서 추가된 저장소로 간단한 키와 값으로 구성된 데이터를 저장할 수 있다. 
  - 사용자가 지우지 않는 한 영구적이다.
  - 자동 로그인 기능에 사용된다.

-  

-  

-  

- - 로그인 처리를 할 때 쿠키와 세션을 어떻게 사용하시나요?

-  

-  

-  

- - 이벤트 루프와 태스크 큐에 대해 설명해주세요.

- 
     

-  

-  

- - 타입스크립트를 사용하는 이유는 무엇인가요?

-  

-  

-  

- - 웹사이트 성능 최적화에는 어떤 방법이 있나요?

-  

-  

-  

-  

- - 전 프로젝트에서 electron.js 선택한 이유는?

-  

-  

- - 데스톱 앱과 웹의 차이와 데스크톱 앱의 문제점들

- - 업데이트 배포
  - os에 종속적인 데스크톱 앱
  - 데스크톱 앱의 데이터 캐싱에 의해 서버와 앱 간의 데이터 차이가 생김
  -    웹 데이터 동기화에 대해 좀 더 알아보기

-  

- - vue.js react.js 외에 사용해본 웹 프레임 워크는?

-  

-  

- - 웹 프레임 워크가 다양한 이유는?

-  

-  

- - react.js      vue.js 어느걸 더 선호하는가....다른 의미로 각각의 특징

-  

-  

- - ssr 이란

-  

-  

- - react-adim

-  

-  

- - Vue.js에서 React.js로 넘어간 이유는?

-  

-  

-  

-  

-  

-  

-  

-  