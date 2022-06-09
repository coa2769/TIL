# URI(Uniform Resource Identifier) 

## URI 란?

- Uniform : 리소스 식별하는 통일된 방식
- Resource : 자원, URI로 식별할 수 있는 모든 것(제한 없음)
  - URI로 식별할 수 있는 모든것을 리소스라고 한다.
  - ex) 실시간 교통 정보, 이미지,  파일 등
- Identifier : 다른 항목과 구분하는데 필요한 정보

```
"URI는 로케이터(locator), 이름(name) 또는 둘 다 추가로 분류될 수 있다."
```

https://www.ietf.org/rfc/rfc3986.txt - 1.1.3. URI, URL, and URN에서 발췌

URI는 큰 개념이고 이 안에 URL과 URN이 들어간다.

![URI - URL,URN](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\URI - URL,URN.png)

![URL,URN](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\URL,URN.png)

## URL(Uniform Resource Locator) 란?

리소스가 있는 위치를 지정.

변경될 수 있다.

### URL 전체 문법

```
scheme://[userinfo@]host[:port][/path][?query][#fragment]
https://www.google.com:443/search?q=hello&hl=ko
```

- scheme
  - 주로 프로토콜로 사용한다.
    - 프로토콜 : 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙
    - http는 80 포트, https는 443 포트를 주로 사용된다.
- userinfo
  - URL에 사용자정보를 포함해서 인증
  - 거의 사용하지 않음
- host
  - 호스트명
  - 도메인명 또는 IP 주소를 직접 사용가능
- port
  - 접속 포트
  - 일반적으로 생략, 생략시 http는 80, https는 443
- path
  - 리소스 경로, 계측적 구조
    - /home/file1.jpg
    - /members
- query
  - key=value형태
  - ?로 시작한다.
  - &로 키와값을 여러개 입력할 수 있다.
  - query parameter, query string 등으로 불린다.
  - 웹서버에 제공하는 파라미터
  - 문자 형태 이다.
- fragment
  - html 내부 북마크 등에 사용
  - 서버에 전송하는 정보가 아니다.



## URN(Uniform Resource Name) 란?

리소스에 이름을 부여한다.

변경되지 않는다.

ex) urn:isbn:8960777331 (어떤 책의 isbn URN)

URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않았다. 사용되지 않는다.





# 웹 브라우저 요청 흐름

1. 웹브라우저가 DNS에 조회, IP와 Port정보를 가져온다.

   ![웹 브라우저 요청 흐름(01)](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(01).png)

2. HTTP메시지 생성

   ![웹 브라우저 요청 흐름(02)](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(02).png)

3. SOKET 라이브러리 사용

   ![웹 브라우저 요청 흐름(03)](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(03).png)

​			![웹 브라우저 요청 흐름(03-1).png](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(03-1).png)

​		3.1. 3 way handshacke를 한다.

​		3.2. 패킷 생성

​		3.3. 인터넷으로 데이터 전송

4. 서버가 패킷을 해제하고 HTTP 메시지를 확인

   ![웹 브라우저 요청 흐름(04)](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(04).png)

5. HTTP 응답 메시지 생성

   ![웹 브라우저 요청 흐름(05).png](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(05).png)

6. 똑같은 TCP/IP를 이용하여 응답 메시지 전송

   ![웹 브라우저 요청 흐름(06)](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(06).png)

7. HTTP 응답 메시지 안의 HTML 렌더링

   ![웹 브라우저 요청 흐름(07)](C:\Users\clnme\Desktop\TIL\HTTP 웹 기본 지식\image\웹 브라우저 요청 흐름(07).png)