# 01월 12일

> 공부했던 HTML 내용 정리

## HTML 문법 유효성 검사(Validator)

### 1. 문법 검사 도구

HTML 문서 문법을 검사해주는 웹페이지

[Markup Validation Service](https://validator.w3.org/#validate_by_upload)

### 2. Entity Code

> <,>,©, ·, €, ♥, ½등과 같은 특수 문자를 HTML 문서에 사용할 때 사용된다.

[Entity Code - A Clear and Quick Reference to HTML Entities Codes](https://entitycode.com/#math-content)

- HTML문서에서 <>는 tag를 분석될 수 있으므로 Entity Code로 작성하여 출력해야 한다.

  - 수정 전

  ```html
  <!DOCTYPE html>
  <html lang="ko-KR">
  <head>
    <meta charset="UTF-8">
    <title>HTML 문법 유효성 검사(Validator)</title>
  </head>
  <body>
  
    <h4>오늘의 나이, 대체로 맑음</h4>
    <h1>이제 좀 살아본 사람들의 마흔, 자기 생의 날씨를 적절히 대처하기 알맞은 나이.</h1>
  
    <h2>이 나이에도 여전히 미숙하고 꾸준히 실수한다</h2>
  
    <!-- 이미지 & 피규어/캡션 -->
    <!-- -이미지 출처: SBS <키스 먼저 할까요?> 방송화면 캡쳐- -->
  
    <p>앞서 소개한 <키스 먼저 할까요?> 드라마는 여주인공의 캐릭터도 흥미롭습니다. 40대 스튜어디스이지만 20년 째 평승무원으로 언제나 권고사직의 압박을 받고, 이혼한 전 남편이 남긴 빚 때문에 독촉에 시달리며, 조울증이 있는 여주인공. ‘기러기 아빠’를 ‘비둘기 아빠’로, ‘양육비’를 ‘사육비’로, ‘결례’를 ‘걸레’로 말하는 등의 잘못된 단어 선택이 폭소를 유발하기도 합니다.</p>
  
    <p><키스 먼저 할까요?>는 ‘성숙한’ 사람들의 ‘의외로’ 서툰 사랑을 그린 드라마입니다. 어른들의 사랑이 그저 도발적이기만 한 것은 아니라고 말합니다. 어른들이라서 누구보다 화끈하고 거침없어 보이지만, 그 뒤에 조금은 서툴고 그래서 더 공감되는 사랑이 있다고요,</p>
  
  </body>
  </html>
  ```

  - 수정 후

  ```html
  <!DOCTYPE html>
  <html lang="ko-KR">
  <head>
    <meta charset="UTF-8">
    <title>HTML 문법 유효성 검사(Validator)</title>
  </head>
  <body>
  
    <h4>오늘의 나이, 대체로 맑음</h4>
    <h1>이제 좀 살아본 사람들의 마흔, 자기 생의 날씨를 적절히 대처하기 알맞은 나이.</h1>
  
    <h2>이 나이에도 여전히 미숙하고 꾸준히 실수한다</h2>
  
    <!-- 이미지 & 피규어/캡션 -->
    <!-- -이미지 출처: SBS <키스 먼저 할까요?> 방송화면 캡쳐- -->
  
    <p>앞서 소개한 &lt;키스 먼저 할까요?&gt; 드라마는 여주인공의 캐릭터도 흥미롭습니다. 40대 스튜어디스이지만 20년 째 평승무원으로 언제나 권고사직의 압박을 받고, 이혼한 전 남편이 남긴 빚 때문에 독촉에 시달리며, 조울증이 있는 여주인공. ‘기러기 아빠’를 ‘비둘기 아빠’로, ‘양육비’를 ‘사육비’로, ‘결례’를 ‘걸레’로 말하는 등의 잘못된 단어 선택이 폭소를 유발하기도 합니다.</p>
  
    <p>&lt;키스 먼저 할까요?&gt;는 ‘성숙한’ 사람들의 ‘의외로’ 서툰 사랑을 그린 드라마입니다. 어른들의 사랑이 그저 도발적이기만 한 것은 아니라고 말합니다. 어른들이라서 누구보다 화끈하고 거침없어 보이지만, 그 뒤에 조금은 서툴고 그래서 더 공감되는 사랑이 있다고요,</p>
  
  </body>
  </html>
  ```

## 순차/비순차 목록

### 1. 순차 목록

> 순서 정해진 목록. 보통 숫자 목록으로 표현한다.

```html
<ol type="i" start="4" reversed>
  <li>Mix flour, baking powder, sugar, and salt.</li>
  <li>In another bowl, mix eggs, milk, and oil.</li>
  <li>Stir both mixtures together.</li>
  <li>Fill muffin tray 3/4 full.</li>
  <li>Bake for 20 minutes.</li>
</ol>
```

- reversed
  - 목록의 순서를 역전 여부 선택.
- start
  - 항목이 시작되는 숫자 선택.(숫자 값만 받는다.)
- type
  - 카운트 유형을 정할 수 있다.
  - ex) ‘a’ 소문자 알파벳, ‘A’ 대문자 알파벳, ‘i’ 소문자 로마 숫자 등

### 2. 비순차 목록

> 정렬되지 않는 목록을 타나낸다. 기본 불릿으로 표현된다.

```html
<ul>
    <li>Milk</li>
    <li>Cheese
        <ul>
            <li>Blue cheese</li>
            <li>Feta</li>
        </ul>
    </li>
</ul>
```

**목록의 item이란?**

<li> tag를 말한다. 언제나 부모 tag로 <ul>이나 <ol>을 갖는다.



## 앵커와 하이퍼링크

### 1. 하이퍼링크(Hyperlink)

> 페이지 내 링크 또는 다른 페이지로 이동한다. <a>으로 HTML에서 표현한다.

```html
<p>You can reach Michael at:</p>

<ul>
  <li><a href="<https://example.com>">Website</a></li>
  <li><a href="mailto:m.bluth@example.com">Email</a></li>
  <li><a href="tel:+123456789">Phone</a></li>
</ul>
```

- href : 하이퍼링크가 가리키는 URL

보다 자세한 내용은 아래의 링크 참조

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/a)

### 1.1. 절대 / 상대 / 루트 경로

- 웹 사이트는 폴더로 구성된 HTML 파일의 모음이다.
- URL은 웹사이트 리소스 위치 경로를 말하며 다른 파일로 이동하기위해 쓰인다.
- URL 작성 방법에는 3가지가 있다.
  - 절대 경로
  - 상대 경로
  - 루트 상대경로

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d051bbe4-4ad3-414e-ad69-0cd5aa6fe949/Untitled.png)

**절대 경로(absolute path)**

현재 HTML 문서와 상관없이 URL 주소를 사용해 리소스를 찾는 방법.

ex) **http://[domain.com/resource.html](http://domain.com/resource.html"과)**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b786e12-bec9-4d93-822c-3098c252bdf1/Untitled.png)

**상대 경로(relative path)**

현재 HTML문서에서 상대적인 위치를 설정하는 방법.

ex) **../**misc/extras.html

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aaad7c87-3792-47e4-951f-fc9ce88c8a95/Untitled.png)

**루트 상대 경로(root-relative path)**

현재 HTML 문서가 존재하는 영역의 최상위 루트에서 대상을 찾는 방법

ex) **/**images.html

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/db83abd2-7a31-4c51-a93c-142907d419fe/Untitled.png)

### 1.2. <a>를 버튼으로 이용할 때 href 속성 값은?

```html
<a href role="button" onclick="thisIsButton()">
  <img src="images/graphic.jpg" alt>
</a>
function thisIsButton(event) {
  event.preventDefault(); // 브라우저 기본 동작 차단
}
```

## 설명 목록 -> [용어 : 설명]

### 1. 설명 목록이란?

> 여러 쌍의 정의된 용어, 설명을 그룹 짓는 요소이다. [용어 : 설명 ] 구조로 되어 있다.

- `<dl>` : <dt>와 <dd>를 그룹으로 묶어 설명 목록을 생성한다.
- `<dt>` : 설명 혹인 정의 리스트에서 용어를 나타낸다.
- `<dd>` : <dt>에 작성된 용어를 설명, 정의 하는 내용을 나타낸다.
- <dt>, <dd>모두 언제나<dl> 가 부모 요소이다.

자세한 내용은 아래 URL 참조

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/dl)

```jsx
<!DOCTYPE html>
<html lang="ko-KR">
<head>
  <meta charset="UTF-8">
  <title>HTML 설명 목록(Description Lists)</title>
</head>
<body>

  <!--
    <dl> 설명 목록(Description Lists)
      <dt> 용어(Definition Term)
      <dd> 설명(Definition Desciption)
  -->

  <h2>추가 정보조회</h2> 

  <dl>
    <dt>워런티</dt>
    <dd>
      <img src="images/additional-info-icon-warranty-mo.png" alt="이미지" width="48" height="48">
      <p>제품 등록 후 보증 정보를 확인하세요.</p>
      <a>더 보기</a>
    </dd>
    
  
    <dt>윈도우 업데이트 정보</dt> 
    <dd>
      <img src="images/additional-info-icon-window-mo.png" alt="이미지" width="48" height="48">
      <ul>
        <li><a href="">Windows 10 업데이트 안내</a></li>
        <li><a href="">Windows 10 S 지원 모델 정보</a></li>
      </ul>
    </dd>
    
  
    <dt>Samsung Flow</dt> 
    <dd>
      <img src="images/Home_addinfo_SamsungFlow.png" alt="이미지" width="48" height="48">
      <p>PC 로그인, 모바일 핫스팟 연결 및 모바일 알림 동기화 기능을 간편하게 사용하실 수 있습니다.</p>
      <a>더 보기</a>
    </dd>
    
  
    <dt>뉴스 &map; 공지사항</dt> 
    <dd>
      <img src="images/additional-info-icon-alert-mo.png" alt="이미지" width="48" height="48">
      <p>제품 및 서비스에 대한 공지사항</p> 
      <a>더 보기</a>
    </dd>
    
  </dl>
  

</body>
</html>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0fa6e74b-c3b9-4d3e-91f5-b160806ee84d/Untitled.png)