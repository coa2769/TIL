# 클라이언트 서버로 데이터 전송

- Form의 sumit버튼을 누르면 웹 브라우저가 HTTP 메시지(POST)를 만들어 서버에 전송한다.
  - Content-Type을 application/x-www-form-urlencoded 로 자동으로 설정한다.
  - 쿼리스크링과 같이 키-값 형태로 데이터를 보낸다.(단 POST이므로 body에 해당 내용이 적제된다.)
- Form은 get 메서드로 된 HTTP 메시지도 생성할 수 있다.
- Form으로 파일을 전송할때 enctype="multipart/form-data" 속성을 추가해주면 된다.(해당 속성은 HTTP 메시지의 Content-Type에 영향을 준다.)
  - 해당 속성은 Form으로 파일을 포함한 여러 키-값을 보낼 수 있다.
  - HTTP메시지의 Body에 경계가 표시된 상태로 적제된다.
  - 주로  binary data를 전송할 때 사용된다.

## HTTP API로 데이터를 전송할 때

클라이언트에서 브라우져의(Form tag) 기능을 사용하지 않고 직접적으로 데이터를 전송할 때를 말한다.

HTTP 프로토콜을 지원하는 라이브러리를 사용하여 직접 HTTP 메시지를 만들어 전송하면된다.(AJAX 통신)

ex) axios



예전에는 XML 거의 표준처럼 사용했지만 현재는 JSON을 더 많이 사용한다.



# HTTP API 설계 예시

- URI는 꼭 리소스 만을 식별해야한다.

### 1. POST 기반 등록 API 설계

- !!! POST로 신규 회원을 등록 하면 서버에서 리소스를 식별할 URI를 만든다. !!!
  - 이런 형식을 컬렉션(Collection)이라고 한다.
    - 서버가 관리하는 리소스 디렉토리
    - 서버가 리소스의 URI를 생성하고 관리
    - ex) /members 를 컬렉션이라고 한다.
- 클라이언트는 등록될 리소스의 URI를 모른다.(여기서는 신규 회원이 해당 리소스)

[ 설계 예시 ]

- 회원 목록 /members -> GET
  - querystring 사용
- 회원 등록 /members -> POST
  - 
- 회원 조회 /members/{id} -> GET
  - memebers의 하위에 id를 추가하여 조회
- 회원 수정 /members/{id} -> PATCH, PUT, POST
  - 개념적으로 일부 수정인 PATCH를 사용하는 것이 가장 좋다.
  - 덮어쓰기를 해도 상관없는 상황이라면 PUT을 써도 상관 없다.(거의 없음)
    - 게시글 같은 경우에는 쓸 수 있다. (글 전체를 덮어쓰므로)
  - 애매할 때는 POST
- 회원 삭제 /members/{id} -> DELETE

### 2. PUT 기반 등록 API 설계

- 클라이언트가 리소스의 URI를 알고 있어야 사용할 수 있다.(리소스의 URI를 클라이언트가 지정)
  - 파일을 업로드 할 때 URI를 클라이언트가 알고 있다.
  - 리소스들의 URI 관리 또한 클라이언트에서 이루어진다.
- 파일은 보통 등록되거나 기존 리소스가 있다면 덮어 쓰기 되므로 PUT 기반에 적합하다.
- 이러한 형식의 관리를 스토어(Store)라고 한다.
  - 클라이언트가 관리하는 리소스 저장소
  - 클라이언트가 리소스의 URI를 알고 관리
  - ex) /files를 스토어 라고 한다.
- 사용 비중이 적다.

[설계 예시]

- 파일 목록 /files -> GET
- 파일 조회 /files/{filename} -> GET
- 파일 등록 /files/{filename} -> PUT
- 파일 삭제 /files/{filename} -> DELETE
- 파일 대량 등록 /files -> POST

### 3. HTML FORM 사용

- GET, POST만 지원
- 컨트롤 URI 사용
  - 제약을 해결하기 위해 사용한다.
  - 동사를 사용한다.

[설계 예시]

- 회원 목록 /members -> GET
- 회원 등록 폼 /members/new -> GET
- 회원 등록 /members/new, /members -> POST
- 회원 조회 /members/{id} -> GET
- 회원 수정 폼 /members/{id}/edit -> GET
- 회원 수정 /members/{id}/edit, /members/{id} -> POST
- 회원 삭제 /members/{id}/delete -> POST
  - 컨트롤 URI 사용

- 강사는 폼의 URL과 해당 동작 API URI를 같은 걸로 맞추는 걸 선호한다.
  - 만약 신규 회원을 등록하는 API가 처리되지 못해 등록 폼으로 돌아갈 때 같은 URI여야 처리가 쉽다.

## 참고하면 좋은 URI 설계 개념

- 문서(document)
  - 단위 개념(파일 하나, 객체 인스턴스, 데이터 베이스 row)
  - ex) /members/100, /files/start.jpg
- 컬렉션(Collection)
  - 서버가 관리하는 리소스 디렉터리
  - 서버가 리소스의 URI를 생성하고 관리
  - ex) /members
- 스토어(store)
  - 클라이언트가 관리하는 자원 저장소
  - 클라이언트가 리소스의 URI를 알고 관리
  - ex) /files
- 컨트롤러(controller), 컨트롤 URI
  - 위 세 개념으로 해결하기 어려운 추가 프로세스에 사용
  - 동사 직접 사용
  - ex) /members/{id}/delete
