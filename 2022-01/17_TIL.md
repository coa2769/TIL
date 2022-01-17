# 01월 12일

> 공부했던 HTML 내용 정리

## 시멘틱 마크업

### 1. HTML 이란?

> HTML(HyperText Markup Language)은 웹 사이트 콘텐츠를 설명하는데 사용되는마크업 언어이다. 구조 설계(Structure Design)를 목표로 한다. (비주얼 디자인은 다른 언어가 지원한다.)

```html
<html>
	<!-- header 영역 -->
	<head>
		<meta charset="utf-8">
		<title>페이지의 제목</title>
	</head>

	<!-- body 영역 -->
	<body>
	...
	</body>
</html>
```

- 웹 페이지는 head 영역과 body 영역으로 구성되어 있다.

- title은 웹 페이지의 제목으로 브라우저 탭에 표시된다.

- HTML 용어

  ```html
  <태그이름 속성="값"> 컨텐츠 </태그이름>
  ```

  | 용어      | 설명      |
  | --------- | --------- |
  | element   | 요소      |
  | open tag  | 여는 태그 |
  | close tag | 닫는 태그 |
  | attribute | 속성      |
  | value     | 값        |

### 2. tag 종류

- block-level elements : 웹 페이지 상에서 Block을 만든다.

  - 자동으로 줄바꿈이 된다.
  - 페이지의 구조적 요소를 나타낼 때 사용됩니다.
  - 다른 block-level elements와 중첩이 가능하다.

  ```html
  <header></header>
  <main></main>
  <footer></footer>
  <div></div>
  ```

- inline elements :  문장, 단어 같은 작은 부분에만 적용될 수 있다.

  - 자동으로 줄바꿈되지 않는다.

  ```html
  <em>first</em>
  <strong>second</strong>
  ```

- empty elements : 무언가를 첨부하기 위해 단일 태그를 사용하는 요소.

  ```html
  <img src="<https://raw.githubusercontent.com/mdn/beginner-html-site/gh-pages/images/firefox-icon.png>">
  <br>
  <hr>
  <col>
  ```

### 3. 표준 호환모드

> 문서 유형 정의(Document Type Definition)를 말하며 브라우저의 렌더링 모드를 표준으로 작동하게 만들어 준다.

```html
<!doctype html>
```

- 언제나 HTML문서의 최상 위에 위치해야한다.

### 4. 주 언어 설정

```html
<html lang="ko">
</html>
```

- `<html>` 에 lang속성을 사용하여 문서에 주요 사용되는 언어를 설정한다.

| 언어     | 코드 |
| -------- | ---- |
| 한국어   | ko   |
| 영어     | en   |
| 일본어   | ja   |
| 스페인어 | es   |

## 제목과 단락

### 1. 제목

> <h1>~<h6>은 글의 제목을 나타낸다. Heading Level 1~6까지가 있다.

```html
<h1>제목 1</h1> <!-- 문서에서 단 1회만 사용 (HTML5 표준 부터는 섹션 콘텐츠 마다 사용 가능) -->
<h2>제목 2</h2>
<h3>제목 3</h3>
<h4>제목 4</h4>
<h5>제목 5</h5>
<h6>제목 6</h6>
```

### 2. 단락

> <p>는 글의 단락을 나타내는데 쓰인다.

```html
<p>사용자가 가장 많이 읽는 콘텐츠는 단락(Paragraph)입니다.</p>
```

### 3. 주석

> <!——>은 HTML의 주석 나타낸다. 브라우저에서 해석되지 않는다.

```html
<!-- HTML 주석 코드는 브라우저에서 해석되지 않습니다. -->
```

## HTML 이미지 & 피규어 & 캡션

### 1. 이미지 요소

> `<img>`는 html에 이미지를 출력해주는 tag이다.

- `src` 필수 속성, 출력하고자 하는 이미지 경로.
- `alt` 속성은 링크가 깨질 경우 화면에 출력되어 이미지의 정보를 제공할 수 있다.

```html
<img class="fit-picture"
     src="/media/cc0-images/grapefruit-slice-332-332.jpg"
     alt="Grapefruit slice atop a pile of other slices">
```

[: 이미지 삽입 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/img)

JPG 이미지

압축률이 높고, 다양한 색상을 처리 할 수 있다.

사진 또는 복잡한 그래픽 이미지에 많이 사용된다. 하지만 투명한 픽셀을 허용하지 않는다.



PNG 이미지

사진이나 애니메이션을 제외한 모든 유형에 적합하다.

동일한 품질의 PNG파일 크기는 JPG 보다 크다. 하지만 JPG와 달리 투명 처리가 가능하다.

아이콘, 로고, 다이어 그램 등에 사용된다.



GIF 이미지

표현 가능한 색상이 256색으로 제한되어 있다. (사진에 적합하지 않다.)

애니메이션을 적용할 수 있는 포멧이다.

투명 처리가 가능하지만 PNG포맷 보다 표현력이 떨어진다.



SVG 이미지

백터 기반 그래픽 포멧이므로 확대 축소할 때 품질 손실이 없다.

다양한 스크린에 대응해야 할 때 매우 적합하다.(반응형 웹 디자인)

### 2. 피규어 요소

> `<figure>` 는 도표, 차트, 표, 이미지 등을 캡션과 함께 묶어주는 tag이다.

- `<figcaption>`가 캡션을 나타낸다.

```html
<figure>
    <img src="/media/cc0-images/elephant-660-480.jpg"
         alt="Elephant at sunset">
    <figcaption>An elephant at sunset</figcaption>
</figure>
```

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/figure)

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/figure)