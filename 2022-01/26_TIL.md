# 01월 26일

> 공부했던 HTML 내용 정리

## 섹션 메인 요소

### 1. Root Section 요소

<body>

HTML문서의 내용을 나타낸다. 문서에서 단 1번 사용가능.

### 2. Sections 요소

문서 개요에 명시적으로 나열되는 요소들에 사용된다.

컨테이너 요소(`<div>`, `<span>`)들과는 다르다.

<article>

문서, 페이지, 애플리케이션, 사이트 등에 포함된 ‘독립적인 섹션’을 말한다.

하나의 문서가 여러 개의 `<article>`을 가질 수 있다.

ex) 블로그 글, 뉴스 기사, 에세이, 보고서

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/article)

- 일반적으로 요소의 하위 항목으로 제목(h1~h6요소)을 포함시켜 식별한다.

  ```html
  <article>
  	<h2>기사 제목</h2>
  </article>
  ```

- `<article>` 가 중첩되어 있을 때, 안쪽 요소는 바깥 요소와 관련된 글이다.

- `<article>` 내부에 `<section>` 태그를 포함할 수 있고, 반대도 가능하다.

- `<article>`의 작성자 정보를 `<address>`를 이용하여 제공한다.

- `<article>`의 작성일자와 시간은 `<time>`의 datetime요소를 이용한다.

<section>

문서, 애플리케이션의 ‘일반적인 섹션’을 말한다.

HTML문서의 독립적인 구획을 타나내며, 더 적합한 의미를 가진 요소가 없을 때 사용한다.

[: 일반 구획 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/section)

ex) 소개, 뉴스 항목, 연락처 정보

```html
<h1>Choosing an Apple</h1>
<section>
    <h2>Introduction</h2>
    <p>This document provides a guide to help with the important task of choosing the correct Apple.</p>
</section>

<section>
    <h2>Criteria</h2>
    <p>There are many different criteria to be considered when choosing an Apple — size, color, firmness, sweetness, tartness...</p>
</section>
```

- 일반적으로 요소의 하위 항목으로 제목(h1~h6요소)을 포함시켜 식별할 수 있다.
  - 만약 디자인의 이유로 섹션 제목을 감춰야 한다면 hidden속성을 이용한다.
- 사이트에 포함된 독립적인 섹션의 성향이 크다면 section 요소 대신 article 요소를 사용하는 것이 좋다.
- 단순한 스타일링 목적이라면 `<div>` 를 사용해야 한다.

<aside>

웹 사이트의 사이드바에 해당되는 부 콘텐츠(메인 콘텐츠와 분리된) 섹션을 말한다.

문서의 주요 내용과 간접적으로만 연관된 부분을 나타낸다.

[: 별도 구획 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/aside)

```html
<p>Salamanders are a group of amphibians with a lizard-like appearance, including short legs and a tail in both larval and adult forms.</p>

<aside>
    <p>The Rough-skinned Newt defends itself with a deadly neurotoxin.</p>
</aside>
```

<nav>

다른 페이지로 이동하는 링크 또는 사이트 내 탐색 링크를 포함하는 섹션 요소이다.

[: 탐색 구획 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/nav)

```html
<nav class="crumbs">
    <ol>
        <li class="crumb"><a href="#">Bikes</a></li>
        <li class="crumb"><a href="#">BMX</a></li>
        <li class="crumb">Jump Bike 3000</li>
    </ol>
</nav>

<h1>Jump Bike 3000</h1>
<p>This BMX bike is a solid step into the pro world. It looks as legit as it rides and is built to polish your skills.</p>
```

- 내용을 쉽게 이해할 수 있도록 내부에 비순차 목록(ul)을 사용한다.
- 주로 사이트를 탐색하는 링크를 포함한다.

### 3. 섹션 내부에 사용되는 요소들

<header>

소개 및 탐색에 도움을 주는 콘텐츠를 타나낸다.

제목, 로고, 검색 폼, 작성자 이름 등의 요소를 포함한다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/header)

```html
<header class="page-header">
    <h1>Cute Puppies Express!</h1>
</header>

<main>
    <p>I love beagles <em>so</em> much! Like, really, a lot. They’re adorable and their ears are so, so snuggly soft!</p>
</main>
```

<footer>

일반적으로 섹션의 저자, 링크, 저작권 정보 등을 포함하는데 사용한다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/footer)

```html
<article>
    <h1>How to be a wizard</h1>
    <ol>
        <li>Grow a long, majestic beard.</li>
        <li>Wear a tall, pointed hat.</li>
        <li>Have I mentioned the beard?</li>
    </ol>
    <footer>
        <p>© 2018 Gandalf</p>
    </footer>
</article>
```

### 4. Main 요소

<main>

문서 또는 애플리케이션 `<body>`의 주요 콘텐츠에 해당한다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/main)

```html
<header>Gecko facts</header>

<main>
    <p>Geckos are a group of usually small, usually nocturnal lizards. They are found on every continent except Australia.</p>
 
    <p>Many species of gecko have adhesive toe pads which enable them to climb walls and even windows.</p>
</main>
```

- main 요소는 섹션 요소가 아니며, 보이는 요소가 2개 이상이면 안된다.
- 사용되지 않는 main요소는 화면에서 감춤(hidden) 처리해야 한다.
- main 내부에는 header, footer 요소를 직접적으로 포함하면 안된다.
- main 요소는 섹션은 아니며, body에 직접 포함되어야 합니다.body를 제외한 섹션 요소(article, section, aside, nav)는 main을 포함할 수 없습니다.
  - 반대로 main요소는 섹션 요소들을 포함할 수 있다.

### 5. 예시 이미지

body, header, main, footer

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df251a86-6b82-4858-8f41-61ec4de409f5/Untitled.png)

Section 내부

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5d9cbe2f-18af-453b-bbb4-a9f5c95985b4/Untitled.png)

Main 내부

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7da7c450-4c46-49a0-8a18-23744f845add/Untitled.png)

예시 마크업

```html
<!DOCTYPE html>
<html lang="ko-KR">

<head>
  <meta charset="UTF-8">
  <title>섹션(Sections) 요소들과 메인(Main) 요소</title>
</head>

<body>
  <header>
    <h1><a href="/">JTBC</a></h1>

    <nav id="global-navigation">
      <h2>글로벌 내비게이션</h2>
    </nav>

    <aside id="review-banner">
      <h3>리뷰 배너</h3>
    </aside>

  </header>

  <main>
    <article id="on-air-banner">
      <h2>온에어 배너 섹션</h2>
      <!-- ... -->
    </article>
    <section id="realtime-vod">
      <header>
        <h2>리얼타임 VOD 섹션</h2>
      </header>
      <!-- ... -->
    </section>
    <article id="daily-programs">
      <h2>데일리 프로그램 섹션</h2>
      <!-- ... -->
    </article>
    <section id="news">
      <h2>뉴스 섹션</h2>
      <!-- ... -->
    </section>

    <section id="program">
      <h2>JTBC 프로그램</h2>
      <!-- ... -->
      <article id="jtbc-news-room">
        <h3>JTBC 뉴스룸</h3>
        <!-- <section>섹션 추가 가능</section> -->
      </article>
    </section>
    <aside id="advertising">
      <h4>광고</h4>
      <!-- ... -->
    </aside>
    <section id="trailer">
      <h2>트레일러(예고편)</h2>
      <!-- ... -->
    </section>

    <section id="notice">
      <h2>공지사항</h2>
      <!-- ... -->
    </section>
  </main>
  <footer>
    <nav id="footer-navigation">
      <h3>푸터 내비게이션</h3>
    </nav>
  </footer>
```