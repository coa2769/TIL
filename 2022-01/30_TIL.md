# 01월 30일

> 공부했던 HTML 내용 정리

## 폼 요소

### 1. 폼 이란?

> 정보를 제출하기 위한 텍스트 필드, 버튼, 체크박스와 같은 폼 컨트롤을 포함한 문서 구획을 말한다. `<form>` 로 구획을 나타낸다. 사용자와 인터넥션을 수행한 결과(ex: 검색, 로그인)를 서버로 보낼 수 있다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/form)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b0f2677-44a7-466d-980f-6d9edfd079b0/Untitled.png)

```html
<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required>
  </div>

  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required>
  </div>

  <div class="form-example">
    <input type="submit" value="Subscribe!">
  </div>

</form>
```

### 2. 폼 컨트롤

<input>

사용자의 데이터를 입력 받을 수 있는 폼 컨트롤이다.

다양한 유형(Type) 설정이 가능하며, 유형에 맞는 역할을 수행한다. (아래 URL에서 여러 유형을 확인 할 수 있다.

[: 입력 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input)

```html
<input type="text">
<input type="submit" value="전송">
<input type="button" value="버튼">
<input type="image" src="<https://goo.gl/Ng66oQ>" alt="체크인" width="20" height="20">
<input type="reset" value="초기화">
<input type="hidden" name="using-ajax" value="true">
<input type="number" name="" id="" min="100" step="10" max="1000" value="150">
<input type="range" name="" id="" min="10" step="5" max="25" value="15">
<input type="color" name="" id="" value="#F7CC60">
```

<label>

컨트롤에 이름(레이블)을 붙일 때 사용한다.

```html
<label>이름 <input type="text" placeholder="이두연"></label>

<label for="u_pass">비밀번호</label>
<input id="u_pass" name="u_pass" type="password" maxlength="8" placeholder="비밀번호 8자리를 입력해주세요">
```

<button>

버튼 폼 컨트롤로 사용자의 인터랙션을 받아 액션을 행하려 할 때 트리거로 사용된다.

type속성의 기본 값으로 submit으로 되어 있다.

[: 버튼 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/button)

```html
<button type="submit">전송</button>
<button type="button">버튼</button>
<button type="reset">초기화</button>
```

**<select>**

드롭 다운 메뉴(옵션을 선택 할 수 있는) 컨트롤을 말한다.

내부에 `<option>` 를 포함하여 사용자에게 선택할 수 있도록 한다.

<option>을 묶어 그룹으로 만들고자 한다면 <optgroup> 요소를 사용하고,

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/select)

```html
<label for="pet-select">Choose a pet:</label>

<select name="pets" id="pet-select">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select>
```

<option>

선택 항목을 만드는데 사용된다.

<select>, <datalist>, <optgroup> 내부에 포함하게 된다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/option)

<optgroup>

<option> 컨트를을 그룹지을 때 사용됨.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/optgroup)

```html
<label for="dino-select">Choose a dinosaur:</label>
<select id="dino-select">
    <optgroup label="Theropods">
        <option>Tyrannosaurus</option>
        <option>Velociraptor</option>
        <option>Deinonychus</option>
    </optgroup>
    <optgroup label="Sauropods">
        <option>Diplodocus</option>
        <option>Saltasaurus</option>
        <option>Apatosaurus</option>
    </optgroup>
</select>
```



**<textarea>**

멀티라인 일반 텍스트 편집 컨트롤을 말한다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/textarea)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/81792ac6-4492-4883-81ac-c9427ab632a5/Untitled.png)

```html
<label for="story">Tell us your story:</label>

<textarea id="story" name="story"
          rows="5" cols="33">
It was a dark and stormy night...
</textarea>
```

<fieldset>

하나 이상의 폼 컨트롤을 그룹화 하는데 사용된다.

[: 필드셋 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/fieldset)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a2f5de6-2663-41e8-935c-be8a720ada3d/Untitled.png)

```html
<form>
  <fieldset>
    <legend>Choose your favorite monster</legend>

    <input type="radio" id="kraken" name="monster">
    <label for="kraken">Kraken</label><br/>

    <input type="radio" id="sasquatch" name="monster">
    <label for="sasquatch">Sasquatch</label><br/>

    <input type="radio" id="mothman" name="monster">
    <label for="mothman">Mothman</label>
  </fieldset>
</form>
```

<legend>

`<fieldset>` 컨트롤의 레이블(이름)을 설정하는 컨트롤.

<output>

계산된 결과를 출력하는 컨트롤.

[: 출력 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/output)

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" id="b" name="b" value="50" /> +
  <input type="number" id="a" name="a" value="10" /> =
  <output name="result" for="a b">60</output>
</form>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b3837303-bcde-47c2-9836-b4e852325262/Untitled.png)

**<datalist>**

데이터 목록 요소 컨테이너 컨트롤.

내부에 <option> 요소를 사용해 항목을 만든다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/datalist)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2098bc51-315e-45d1-b9c6-b3f0d08851f8/Untitled.png)

```html
<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
    <option value="Chocolate">
    <option value="Coconut">
    <option value="Mint">
    <option value="Strawberry">
    <option value="Vanilla">
</datalist>
```

<progress>

작업의 완료 진행 상황을 표시하는데 사용되는 컨트롤.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/progress)

```html
<label for="file">File progress:</label>

<progress id="file" max="100" value="70"> 70% </progress>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/00f815e7-aff6-4180-a4d3-2fa14ff9f949/Untitled.png)

<meter>

알려진 범위 내에서의 스칼라 측정 또는 분포 비율을 나타내는 컨트롤. (게이지(gauge)라고도 불림)

디스크 사용 현황, 쿼리 결과의 관련성, 특정 후보에 대한 투표율 등이 해당됨.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/meter)

```html
<label for="fuel">Fuel level:</label>

<meter id="fuel"
       min="0" max="100"
       low="33" high="66" optimum="80"
       value="50">
    at 50/100
</meter>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04b8c6ca-c4c9-483a-923b-d32de73f7ec0/Untitled.png)