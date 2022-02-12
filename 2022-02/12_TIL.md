# 02월 08일

> 'WebCafe' 구조 분석 

## WebCafe 구조 분석

### body의 첫번째 자식은 div.container

- div.container로 페이지 전체를 감쌌다.
- 이렇게 만든 이유는?

### header 구조

[ 내가 작성한 html ]

```jsx
<header>
    <img src="./css/images/logo.png" alt="logo">
    <ul>
        <li><a href="">로그인</a></li>
        <li><a href="">회원가입</a></li>
        <li><a href="">커뮤니티</a></li>
    </ul>
    <input type="text" name="검색어" alt="검색어를 입력하세요">
    <button>검색</button>
</header>
```

[ 원본 html ]

```html
<header class="header">
	<!---------------------------------------------------------------->
  <h1 class="logo"><a href="../after/index.html"><img src="./images/rwd-logo.png" alt="Web Cafe"></a></h1>
  <!---------------------------------------------------------------->
	<ul class="member">
    <li><a href="#">로그인</a></li>
    <li><span class="divider" aria-hidden="true">ㅣ</span><a href="#">회원가입</a></li>
    <li><span class="divider" aria-hidden="true">ㅣ</span><a href="#">커뮤니티</a></li>
  </ul>
  <!---------------------------------------------------------------->
	<form action="서버URL" class="search-form">
    <fieldset>
      <legend>검색</legend>
      <label for="search" class="a11y-hidden">검색어</label><input type="search" id="search" required
        placeholder="검색어를 입력하세요">
      <button type="submit" class="btn-search">검색</button>
    </fieldset>
  </form>
<!---------------------------------------------------------------->
</header>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/843d5e55-af54-44e3-a244-331dc760ac1b/Untitled.png)

- `<header>`에 디자인을 적용하기 위해 .header 부여

- 카페 로그

  - ```
    <h1>
    ```

    로 로고 전체를 감싼다.

    - css 디자인을 적용하기 위해 .logo 부여

  - `<a>`로 링크를 표현

  - `<img>`로 로그 이미지 출력

- 로그인 | 회원가입 | 커뮤니티 링크

  - ```
    <ul>
    ```

     & 

    ```
    <li>
    ```

     비순차 목록으로 각 항목을 감싼다.

    - css디자인 적용하기 위해 .member 부여

  - ```
    <span>
    ```

    으로 구분자인 ’|’를 나타낸다.

    - 구분자에 디자인 적용을 위해 .divider 부여
    - aria-hidden 속성은 무슨 의미 인가?

  - ‘로그인’, ‘회원가입’, 커뮤니티’ 각 링크를 표현하기 위해 `<a>`로 표현

- 검색창

  - 폼으로 검색창 구현

    - `<form>`에 디자인을 적용하기 위해 .search-form 부여

  - ```
    <label>
    ```

    과 

    ```
    <input>
    ```

    으로 검색어를 입력는 입력창을 구현한다.

    - `<input>`의 type속성을 ‘search’로 한다.
    - `<input>` 에게 #search를 부여한 이유는?
    - required 속성은 무슨 뜻 인가요?
    - `<label>`을 어떻게 해서 화면에 보이지 않게 했는가?

  - `<button>` 에 디자인을 적용하기 위해 .btn-search 부여

### nav 구조

[ 내가 작성한 html ]

```html
<nav>
    <ul>
        <li><a href=""> <strong>HTML에 대해</strong> </a></li>
        <li><a href="">HTML5 소개</a></li>
        <li><a href="">레퍼런스 소개</a></li>
        <li><a href="">활용 예제</a></li>
    </ul>
    <ul>
        <li><a href=""> <strong>CSS에 대해</strong> </a></li>
        <li><a href="">CSS 소개</a></li>
        <li><a href="">CSS2 vs CSS3</a></li>
        <li><a href="">CSS애니메이션</a></li>
    </ul>
    <ul>
        <li><a href=""> <strong>웹표준/웹접근성</strong> </a></li>
        <li><a href="">웹표준 이란?</a></li>
        <li><a href="">웹접근성의 개요</a></li>
        <li><a href="">HTML5의 현재와 미래</a></li>
    </ul>
    <ul>
        <li><a href=""> <strong>묻고 답하기</strong> </a></li>
        <li><a href="">문고 답하기</a></li>
        <li><a href="">FAQ</a></li>
        <li><a href="">1대1 질문</a></li>
    </ul>
    <ul>
        <li><a href=""> <strong>자료실</strong> </a></li>
        <li><a href="">공개자료실</a></li>
        <li><a href="">이미지 자료실</a></li>
        <li><a href="">예제 자료실</a></li>
    </ul>
</nav>
```

[ 원본 html ]

```html
<nav class="navigation menu">
	<!---------------------------------------------------------------->
  <h2 class="a11y-hidden">메인 메뉴</h2>
	<!---------------------------------------------------------------->
  <button class="button-none button-burger" aria-label="메뉴 열기">
    <span class="burger-bar round position-top"></span>
    <span class="burger-bar round position-middle"></span>
    <span class="burger-bar round position-bottom"></span>
  </button>
	<!---------------------------------------------------------------->
  <ul class="menu-list">
	<!---------------------------------------------------------------->
    <li class="menu-item">
      <a href="#" class="menu-link">HTML에 대해</a>
      <ul class="submenu">
        <li><a href="#">HTML5 소개</a></li>
        <li><a href="#">레퍼런스 소개</a></li>
        <li><a href="#">활용 예제</a></li>
      </ul>
    </li>
	<!---------------------------------------------------------------->
    <li class="menu-item">
      <a href="#" class="menu-link">CSS에 대해</a>
      <ul class="submenu">
        <li><a href="#">CSS 소개</a></li>
        <li><a href="#">CSS2 VS CSS3</a></li>
        <li><a href="#">CSS 애니메이션</a></li>
      </ul>
    </li>
	<!---------------------------------------------------------------->
    <li class="menu-item">
      <a href="#" class="menu-link">웹표준/웹접근성</a>
      <ul class="submenu">
        <li><a href="#">웹표준 이란?</a></li>
        <li><a href="#">웹접근성의 개요</a></li>
        <li><a href="#">HTML5의 현재와 미래</a></li>
      </ul>
    </li>
	<!---------------------------------------------------------------->
    <li class="menu-item">
      <a href="#" class="menu-link">묻고 답하기</a>
      <ul class="submenu">
        <li><a href="#">묻고 답하기</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">1대1 질문</a></li>
      </ul>
    </li>
	<!---------------------------------------------------------------->
    <li class="menu-item">
      <a href="#" class="menu-link">자료실</a>
      <ul class="submenu">
        <li><a href="#">공개 자료실</a></li>
        <li><a href="#">이미지 자료실</a></li>
        <li><a href="#">예제 자료실</a></li>
      </ul>
    </li>
	<!---------------------------------------------------------------->
  </ul>
</nav>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e38bdf59-c3ab-4efe-9774-d8c5205db50d/Untitled.png)

- ```
  <nav>
  ```

  에 디자인을 적용하기 위해 .navigation와 .menu 부여

  - 모바일 일 때와 pc일 때를 구분하여 디자인을 적용하는 듯 하다.

- 제목

  - `<h2>`로 메인 메뉴의 제목을 나타낸다. 하지만 화면에 출력되지는 않는 듯 하다.

- 모바일일 때 네이게이션 버튼

  - 디자인 적용을 위해 .button-none .button-burger 부여
    - pc에서는 안보이게 하기 위해 .button-none을 모바일에서는 .button-burger를 스위치하여 적용하는 듯 하다.
  - `<span>`으로 버튼 아이콘을 디자인 했다.

- 메인 메뉴 들

  - 첫 번째 depth `<ul>` & `<li>` 안에 두번째 depth `<ul>` & `<li>`가 있는 걸로 그룹화된 메뉴들의 제목을 표현했다. (아래 와 같은 구조이다.)

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/692dfe10-882e-4e4b-9da5-3778a3e67476/Untitled.png)

  - 첫번째 depth의 `<ul>`에 디자인을 적용하기 위해 .menu-list를 부여

  - 첫번째 depth의 `<li>`에 디자인을 적용하기 위해 .menu-item를 부여

  - 첫번째 depth의 `<a>`에 디자인을 적용하기 위해 .menu-link를 부여

  - 두번째 depth의 `<ul>`에 디자인을 적용하기 위해 .submenu를 부여

    - 두번째 depth의 `<li>`와 `<a>`에는 클래스를 따로 부여하지 않는다.

### main 구조(각 section의 공통 부분)

[ 내가 작성한 html ]

```html
<main>
    <section>
        <h2><img src="./css//images//sprite_main.png" alt="추천 서적">추천 서적 <p>Recommend Book</p> </h2>
		</section>
</main>
```

[ 원본 html ]

```html
<main class="main">
  <section class="book">
		<h2 class="book__title ir irBook">
      추천 서적
      <span class="book__enTitle themeGreen">
        Recommend Book
      </span>
    </h2>
	</section>
</main>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24dad919-11ad-40bd-98e3-91f99f5d810b/Untitled.png)

- 

### 컨텐츠 구조(각 section 마다 사용된 컨텐츠 들)

[ 내가 작성한 html ]

```html

```

[ 원본 html ]

```html

```

### footer 구조

[ 내가 작성한 html ]

```html

```

[ 원본 html ]