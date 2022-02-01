# 02월 01일

> 공부했던 HTML 내용 정리

## 인터넥티브 요소

### **<details>**

“열림” 상태일 때만 내부 정보를 보여주는 정보 공개 위젯(*disclosure widget)*을 생성한다.

아코디언(Accordion) 컴포넌트와 비슷하게 작동한다. 참고로 각주(footnote)에는 적합하지 않다.

[- HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/details)

**[속성]**

- *open - 페이지 로딩 시, 위젯을 펼쳐 표시하도록 설정*

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/815d59cb-4573-4c84-b5b3-e4f81320ff57/Untitled.png)

```html
<details>
    <summary>Details</summary>
    Something small enough to escape casual notice.
</details>
<section class="progress window">
  <h1>"Really Achieving Your Childhood Dreams" 파일 복사</h1>
  <details>
  <summary>복사중... <progress max="375505392" value="97543282"></progress> 25%</summary>
  <dl>
    <dt>초당 전송 속도:</dt>
    <dd>452KB/s</dd>
    <dt>로컬 파일이름:</dt>
    <dd>/home/rpausch/raycd.m4v</dd>
    <dt>원격 파일이름:</dt>
    <dd>/var/www/lectures/raycd.m4v</dd>
    <dt>재생시간:</dt>
    <dd>01:16:27</dd>
    <dt>컬러 프로파일:</dt>
    <dd>SD (6-1-6)</dd>
    <dt>영상 크기(너비×높이):</dt>
    <dd>640×480</dd>
  </dl>
  </details>
</section>
```

### **<summary>**

<details>의 레이블/캡션(제목), 서머리(요약) 등을 표시한다.

### <dialog>

사용자의 결정 또는 정보 입력을 요구하는 컴포넌트를 말한다.

'모달 윈도우' 또는 '대화상자'로도 불린다.

**[속성]**

- *open - 페이지 로딩 시, 위젯을 표시하도록 설정*

[: 대화 상자 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/dialog)