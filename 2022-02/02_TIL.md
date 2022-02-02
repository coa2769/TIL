# 02월 02일

> 공부했던 HTML 내용 정리

## 유저 인터렉션 속성

### 1. 상호작용에 필요한 속성

### hidden 속성

해당 속성을 갖게된 tag는 현재 문서에 아직, 또는 더 이상 관련이 없음을 나타내는 불리언 특성이다.

모든 HTML tag들은 hiddent 속성을 가질 수 있다.

브라우저는 hidden 속성이 설정된 tag를 화면에 렌더링하지 않는다.

[hidden - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/hidden)

```html
<h1>hidden 속성 사용 예</h1>
<section id="login">
  <h2>로그인</h2>
  <form>
  ...
  </form>
  <script>
    function login() {
      // 화면 변경
      document.querySelector('#login').hidden = true;
      document.querySelector('#game').hidden  = false;
    }
  </script>
</section>
<section id="game" hidden>
  <h2>게임 시작</h2>
  ...
</section>
```

### tabindex 속성

요소가 포커스 가능함을 나타내며, 주로 tab 키를 사용하는 연속적인 키보드 탐색에서 어느 순서에 위치할지 지정할 수 있다.

[tabindex - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/tabindex)

```html
// [양수] 탭 포커스 순서(2번째)를 설정한다.
// (논리적 포커스 흐름에 방해가 되기에 사용을 권장하지 않음)
<button
  type="button"
  class="button is-play"
  tabindex="2">재생</button>

// [0] div 요소는 포커스를 가지지 않는 요소이지만, 포커스를 적용할 수 있게 된다.
// 컴포넌트 제작 시, 비 포커스 요소에 포커스를 적용해야 할 경우 유용하게 사용됨.
<div tabindex="0"></div>

// [-1] 일반적인 포커스 순서에서 제외시킬 수 있다.
// (JavaScript 프로그래밍으로 포커스 처리 가능)
// 컴포넌트의 일부 요소를 일시적으로 포커스 순서에서 제외한 후,
// 목표에 따라 포커스를 다시 활성화 처리할 수 있다.
<ol class="TOC">
  <li><a href="#pinch">위기</a></li>
  <li><a href="#overcome" tabindex="-1">극복</a></li>
</ol>
```

- 탭(Tab) 이동 : 순차적 포커스 탐색을 사용하여 포커스 가능(Focusable) 요소 사이를 이동하는 것
- 해당 속성을 사용할 수 있는 요소는 아래와 같다.
  - 폼 컨트롤 요소 중 `input, button, textarea, select`
  - href 속성을 가진 요소들 `a, area`
  - controls 속성을 가진 요소들 `video, audio`
  - [그외 포커스가 가능한 요소들](https://allyjs.io/data-tables/focusable.html)

### accesskey 속성

키보드 단축키를 설정하고 그에 대한 힌트를 제공한다. 모든 HTML 요소는  accesskey 속성을 가질 수 있다.

하지만 해당 속성의 단축키는 브라우저와 운영체제 플랫폼에 의존성을 가지고 있어 단축키가 달라진다. (어떻게 달라지는지는 아래의 URL에서 확인 가능하다.)

기존 브라우저 단축키와의 충돌, 특정 키보드에 해당 키가 없는 문제 등이 있어 **잘 사용되지 않는다.**

[accesskey - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/accesskey)

```html
<button
  type="button"
  class="button is-collect"
  accesskey="C"
  onclick="collect()">
  수집
</button>
```

### contenteditable 속성

해당 속성이 설정된 요소는 사용자가 직접 편집할 수 있도록 해준다.

- ‘true’ 또는 빈 문자열일 경우 편집 허용.
- ‘false’일 경우 편집을 허용하지 않음
- ‘inherit’일 결우 부모의 편집 가능 여부를 상속함.

[HTMLElement.contentEditable - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/contentEditable)

![편집이 가능한 상태로 변경됨](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6b5b9e56-aeee-410c-8b89-1214efe8136b/Untitled.png)

편집이 가능한 상태로 변경됨

```html
<div class="dropzone">
  <p *contenteditable*>Drop Zone</p>
</div>
```

### draggable 속성

드래그 가능한지 지정할 수 있다. 모든 HTML요소는 모두 가질 수 있다.

- *true 일 경우 드래그(Drag) 가능.*
- *false 또는 빈 문자열("")일 경우 드래그 불가능.*

[Drag Operations - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)

```html
<p draggable="true">
  ...
</p>
```