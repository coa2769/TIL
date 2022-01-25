# 01월 25일

> 공부했던 HTML 내용 정리

## 인용과 줄 바꿈

### 1. 인용문

> 문장 내에서 인용 구문이 사용될 때 이용한다. `<q>`는 한 문장만을 나타낼 때 `<blockquote>` 여러 문장을 묶은 인용 구문이 필요할 때 사용한다. `<cite>`로 출처를 나타낼 수 있다.

- ```
  <q>
  ```

   : 짧은 인라인 인용문을 나타낸다.

  - 대부분의 브라우저에서는 앞뒤로 따옴표가 붙는다.
  - 줄바꿈이 이루어지지 않는다.
  - 해당 tag그 대신 큰따옴표(””)를 이용해도 된다.

- ```
  <blockquote>
  ```

   : 긴 인용문을 타나낸다.

  - 주로 들여쓰기 한 것으로 그려진다.
  - URL 출처는 <cite>가 아닌 cite 특성으로 나타낸다.

- `<cite>` : 저작물의 출처를 표기를 타나낸다. <blockquote>과 함께 쓰인다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bbe03a86-bb0b-40fb-b8cd-e55cc617cece/Untitled.png)

```jsx
<!DOCTYPE html>
<html lang="ko-KR">
<head>
  <meta charset="UTF-8">
  <title>HTML 인용(Quotation) 구문</title>
</head>
<body>
  <h2>마흔을 통과하며 겪게 되는 몸과 마음의 소란한 풍경</h2>

  <p>어렸을 때 어른들이 <q>너 많이 컸구나</q> 하면 그게 굉장한 칭찬으로 느껴졌었습니다. 다만 시간이 지난 것뿐인데… 지금은 <q>너 아직도 노안이 안 왔구나</q> <q>너 아직 머리숱이 많구나 (혹은 너 아직도 흰머리가 덜 났구나)</q> 등의 이야기가 퍽 반갑습니다. 어렸을 때는 시간이 흐른 것 때문에 칭찬받고, 나이 들어서는 시간을 비껴간 것 때문에 칭찬 비슷한 것을 듣습니다.</p>
  <p>나이가 들었다는 걸 깨닫는 건 흰머리가 늘었다는 사실을 발견하는 순간이 아닙니다. 그 흰머리를 대수롭지 않게 여기고 있다는 걸 발견하는 순간이지요. 듬성듬성 해진 머리, 오르기 시작한 뱃살, 거칠어져가는 피부, 예전 같지 않은 체력, 불쑥 찾아 드는 허무감… 나이 듦의 징후는 몸도 몸이지만 무엇보다 급격히 줄어든 자신감, 즉 심리적 위축감에서 확연히 드러납니다. </p>
  
  <figure>
    <img src="images/sbs-drama__do-you-want-to-kiss-first.png" alt="">
    <figcaption>SBS &lt;키스 먼저 할까요?&gt; 방송화면 캡쳐</figcaption>
  </figure>
  
  <blockquote>
    <!-- ""를 <q>로 바꿔도 상관은 없다. -->
    <p>“…우리 같은 여자들은.”</p>
    <p>“우리?”</p>
    <p>“시절이 끝난 여자들이요. 꽃이 아닌 풀떼기가 된…(중략)”</p>
    <p>“당신 아직 안 늙었어.”</p>
    <p>“맞아요. 안 늙었어요, 나는 아직.<br>그렇게 안 봐주는 세상 때문에 매 순간 늙고 있어서 그렇지.”</p>
    <cite>_SBS 드라마 &lt;키스 먼저 할까요?&gt; 중에서  </cite>
  </blockquote>

  <p>최근 시작한 드라마 ‘키스 먼저 할까요?’에 등장하는 예지원(이미라 역) 님의 대사입니다. 드라마를 보며, 이제 좀 살아봤다 싶은, 40대를 코앞에 둔, 혹은 40대를 지나고 있는 여성분들이라면 크게 공감하시지 않을까 싶었습니다.</p>
  
</body>
</html>
```

### 2. 줄 바꿈

> 줄 바꿈을 HTML에서 나타내기 위해 `<br>`을 이용합니다. HTML에서 ENTER로는 줄바꿈을 할 수 없다.

- ```
  <br>
  ```

   : 텍스트 안에서 줄바꿈을 나타낸다.

  - 한번에 두번 써서는 안된다. (단락과 단락을 나눈때 이렇게 하곤 하는데 해서는 안됨)

```jsx
<p> O’er all the hilltops<br>
    Is quiet now,<br>
    In all the treetops<br>
    Hearest thou<br>
    Hardly a breath;<br>
    The birds are asleep in the trees:<br>
    Wait, soon like these<br>
    Thou too shalt rest.
</p>
```



## 어휘 요소들

> 문장 내 특정 부분의 중요성을 강조하거나, 다른 글자와 구분하기 위한 목적으로 사용된다.

### 1. 의미 요소(Sematic Elements)

강조의 의미를 부여하는 용도로 사용된다.

<strong>

내용의 중요성(importance), 심각성(seriousness), 긴급성(urgency)을 강조할 경우에 사용된다.

대부분의 웹브라우저에서 “굵은 글씨”로 표시된다. 중첩하여 강조할 수 있다.

[: 높은 중요도 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/strong)

- 제목/캡션의 글자 중 일부를 더욱 강조하는데 사용(중요성)

  ```html
  <h1><strong>꽃, 꿀벌, 꿀</strong> 그리고 내가 이해하지 못하는 다른 요소</h1>
  
  <figcaption>피규어 1. <strong>개미 식민지 역학</strong>. 이 식민지 지역의 개미는 열원(왼쪽 위)과 식량 공급원(오른쪽 아래)의 영향을 받습니다.</figcaption>
  ```

- 경고 또는 주의를 주고자 할 때 사용(심각성)

  ```html
  <p>
  	<strong>경고</strong> 이 지하 감옥은 위험합니다.
  	<strong>오리 때를 피하세요.</strong>찾은 금은 가지고 떠나세요.
  	<strong>
  		<strong>다이몬드는 사용하지 마세요.</strong>,
  		그것을 사용하면 폭발할 것이며
  		<strong>10미터 내에 있는 모든 것을 파괴할 것입니다.</strong>
  	</strong>
  	당신에게 경고 했습니다.
  </p>
  ```

- 문서의 다른 부분보다 빨리 보아야 하는 내용을 나타내는데 사용(긴급성)

  ```html
  <p>리마인더 시스템 Remy에 오신 것을 환영합니다.</p>
  <p>오늘 할 일:</p>
  <ul>
  	<li><p><strong>오븐을 끕니다.</strong></p></li>
  	<li><p>휴지통에 불필요한 것을 버립니다.</p></li>
  	<li><p>세탁을 합니다.</p></li>
  </ul>
  ```

<em>

특정 내용의 강조할 때 사용된다. `<strong>` 보다는 약한 의미의 강조이다.

대부분의 웹에서 텍스트에 “기울임꼴”이 적용된다.

[: 강세 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/em)

- 주위 텍스트에 비해 강조되어 의미를 변경하기도 한다.

  ```html
  <p>고양이는 귀여운 동물이다.</p>
  
  <!--고양이라는 종이 다른 동물 보다 귀엽다는 종을 강조-->
  <p><em>고양이</em>는 귀여운 동물이다.</p> 
  
  <!--고양이가 유독 귀엽다는 형용사를 강조-->
  <p>고양이는 <em>귀여운</em> 동물이다.</p>
  ```

### 2. 의미가 없는 요소(Non Sematic Elements)

다른 글자와 구분하기 위한 용도로 사용된다.

<b>

단순히 다른 글자와 구분된 용도로 사용한다. 문서요약의 주요 단어, 리뷰 제품 이름 등.

“굵은 글씨”로 표시된다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/b)

- <h1>~<h6>, <em>, <strong>, <mark> 요소들이 사용되는 조건에는 사용해서는 안된다.

  ```html
  <p>
  	작은 방에 들어가니 <b>낡은 엑자</b>와 <b>거미줄이 엮인 손전등</b>이 탁자에 놓여있었다.
  </p>
  ```

<i>

다른 글자와 구분된 용도로 사용한다. 기술적 용어, 다른 언어(목소리), 인물의 생각 등을 표현

“기울임꼴”로 표시된다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/i)

```html
<p><i class="taxonomy">펠리스 실베스트리 카터스(Felis silvestris catus)</i>는 귀여워요.</p>
<p><i>신문 내용</i> 용어는 위에 기술되어 있습니다.</p>
<p>
	Galileo Galilei는 재판을 받고 나오면서
	<i lang="la">"E pur si muove."</i>
	라고 말했습니다.
</p>
```