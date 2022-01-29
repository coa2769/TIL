# 01월 29일

> 공부했던 HTML 내용 정리

## 테이블 요소

> 복잡한 내용을 x, y축에 따라 이해하기 쉽게 데이터를 구조화하는데 테이블을 사용한다.

### 1. 테이블 필수 요소

<table>

테이블 몸체에 해당되며, 행(row)/열(column) 및 셀(cell)을 포함한다.

- 테이블 내 테이블을 중첩해서는 안된다.
- 테이블을 레이아웃(배치) 목적으로 사용해서는 안된다.
- border 속성을 사용해 테두리를 그릴 수 있지만 CSS로 대체하는 것이 더 다양하게 테두리를 꾸밀 수 있다.

<caption>

테이블의 설명 또는 제목을 나타낸다. `<table>`요소의 첫 번째 자식이여야 한다.

- 테이블 내용이 설명하는 방법에는 

  링크

  에 여러 방법들이 있다.(아래는 그 대표적인 방법이다.)

  - *aria-describedby 속성을 사용해 설명 단락(paragraph)을 연결*

    ```html
    <p id="summary">표를 설명하는 글을 씁니다.</p>
    
    <table border="1" aria-describedby="summary">
      <caption>
        <strong>Mordem browser</strong>
        <p>국내에서 자주 사용하는 모던 브라우저</p>
      </caption>
    
      <tr>
        <th>바라우저</th>
        <th>제조업체</th> 
        <th>다운로드</th>
      </tr>
    
      <tr>
        <th>크롬(chrome)</th>
        <td>google</td>
        <td>www.google.com</td>
      </tr>
    
      <tr>
        <th>파이어폭스</th>
        <td>mozilla</td>
        <td>www.mozilla.org</td>
      </tr>
    
      <tr>
        <th>엣지</th>
        <td>Microsoft</td>
        <td>www.microsoft.com</td>
      </tr>
    </table>
    ```

<tr>

테이블의 행(row)을 나타낸다. 내부에 셀 제목(header)과 셀 내용(data)을 포함한다.

행(row) : 가로 방향으로 줄 세운 것.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e4615746-5d14-4eac-b7b1-96dc5125a379/Untitled.png)

<th>

테이블 셀 제목(header cell in a table)으로 행(tr) 내부에 포함되어야 한다.

**[ 속성 ]**

- *scope: 행그룹(rowgroup), 열그룹(colgroup)의 제목임을 명시. (`row` or `col`)*
- *abbr: 제목이 길어 축약(Abbreviation)이 필요할 때 사용한다.*
- *colspan: 열(column)을 그룹 지을 때 사용한다.*
- *rowspan: 행(row)을 그룹 지을 때 사용한다.*

<td>

테이블 셀 내용(data cell in a table)으로 행(tr) 내부에 포함되어야 한다.

**[ 속성 ]**

- *colspan: 열(column)을 그룹 지을 때 사용*
- *rowspan: 행(row)을 그룹 지을 때 사용*
- *headers: 셀 제목을 하나 이상 연결하여 읽기 용이하도록 구성할 때 사용(?)*

### 2. 테이블 선택 요소

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dbbec834-85b5-4b6b-812f-d668d4d95fd0/Untitled.png)

```html
<table>
    <caption>Council budget (in £) 2018</caption>
    <thead>
        <tr>
            <th scope="col">Items</th>
            <th scope="col">Expenditure</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Donuts</th>
            <td>3,000</td>
        </tr>
        <tr>
            <th scope="row">Stationery</th>
            <td>18,000</td>
        </tr>
    </tbody>
</table>
```

<thead>

테이블의 헤더 내용을 그룹화할 때 사용된다. 행 블록 내에 열 그룹으로 된 제목을 구성할 때 사용한다.(선택적으로 사용한다.)

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/thead)

<tbody>

행 블록 내에 테이블 데이터로 구성할 때 사용한다. (선택적으로 사용한다.)

`<thead>` 요소를 사용하는 경우 반드시 그 뒤에 위치해야 한다.

[: 표 본문 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/tbody)

<tfoot>

행 블록 내에 열 요약(column summaries)로 구성할 때 사용한다.(선택적으로 사용한다.)

```html
<table>
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>
</table>
```

<col>

테이블의 열을 나타내며 하나 이상의 열을 묶고자 할 때 사용한다.(선택적으로 사용한다.)

일반적으로 colgroup 요소 내부에 포함된다.

**[속성]**

- *span: 열 묶음 개수 설정*

<colgroup>

테이블 열(column) 그룹을 만들고자 할 때 사용한다.(선택적으로 사용한다.)

내부에 col요소 포함 유무는 선택적 이다.

**[속성]**

- *span: colgroup 요소가 col을 포함하지 않을 경우, 열 묶음 개수 설정*

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8210aa23-2048-479f-a465-7e30810dfd9b/Untitled.png)

```html
<table>
    <caption>Superheros and sidekicks</caption>
    <colgroup>
        <col>
        <col span="2" class="batman">
        <col span="2" class="flash">
    </colgroup>
    <tr>
        <td> </td>
        <th scope="col">Batman</th>
        <th scope="col">Robin</th>
        <th scope="col">The Flash</th>
        <th scope="col">Kid Flash</th>
    </tr>
    <tr>
        <th scope="row">Skill</th>
        <td>Smarts</td>
        <td>Dex, acrobat</td>
        <td>Super speed</td>
        <td>Super speed</td>
    </tr>
</table>
```