# 02월 03일

> 공부했던 HTML 내용 정리

## 문서 메타데이터 요소들

### <head> 요소

기계가 식별할 수 있는 문서 정보(메타데이터)를 담는다.

문서 제목, 스크립트, 스타일시트 등이 있다.

대부분 브라우저는 마크업에서 <head> 요소가 생략될 경우, 자동으로 <head> 요소를 생성하지만 일부는 그렇지 않을 때도 있다.

**[자동으로 <head> 요소를 생성하지 않는 브라우저 환경]**

- *Android <= 1.6*
- *iPhone  <= 3.1.3*
- *Opera  <= 9.27*
- *Safari  <= 3.2.1.*
- *Nokia 90*

### <title> 요소

브라우저의 타이틀 바(Title Bar)나 페이지 탭에 보여지는 문서의 제목을 정의한다.

텍스트만 포함할 수 있으며 포함된 태그들은 해석되지 않는다.

### <meta> 요소

다른 메타 요소들(<title>, <base>, <link>, <style>)로 나타낼 수 없는 메타데이터를 정의할 때 사용한다.

[: 문서 레벨 메타데이터 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/meta)

**[메타데이터의 종류]**

- charset이 설정된 경우 :

  - 페이지의 문자 인코딩을 선언한다.
  - 이 속성보다 요소의 `<head>`의 lang속성이 우선하여 적용된다. (예: <div lang="fr">)

- http-equiv 속성이 설정된 경우:

  - pragma 지시어(Directive)로 일반적으로 웹서버가 제공하는 웹페이지가 어떻게 제공되어야 하는지에 대한 정보를 제공.

  ```html
  <!--HTML 5에서는 더 이상 아래와 같이 사용되길 권장하지 않음.-->
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <!--3초 뒤에 url 값에 설정된 페이지로 이동하게 됨.-->
  <meta http-equiv="refresh" content="3;url=https://google.com">
  ```

- *name 속성이 설정된 경우:*

  - 전체 페이지에 적용되는 “문서 레벨 메타데이터”를 제공한다.
  - content 속성 값을 통해 설정

*- name 속성이 설정된 경우:*

*문서 수준 메타 데이터의 이름을 정의하며, content 속성 값을 통해 설정.*

### <link> 요소

현재 문서와 외부 리소스와의 관계(relation)를 명시한다.

이 요소는 스타일시트를 링크 하는데 가장 많이 사용된다.

[: 외부 리소스 연결 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/link)

**[속성]**

- *rel    : 문서와의 관계 명시.*
- *type   : 링크된 리소스 MIME 타입 정의. (기본 적용: text/css)*
- *href   : 링크된 리소스 URL 설정.*

```html
<!--기본 스타일시트 설정-->
<link href="style.css" rel="stylesheet">

<!--대체 스타일시트 설정: View > Page Style 메뉴에서 사용할 스타일시트를 고를 수 있다. (Chrome은 해당 X)-->
<link href="default.css" rel="stylesheet" title="기본 스타일">
<link href="fancy.css" rel="alternate stylesheet" title="팬시">
<link href="basic.css" rel="alternate stylesheet" title="베이직">
```

### <style> 요소

문서나 문서 일부에 대한 스타일 정보를 포함한다.

기본적으로 CSS 언어가 사용된다.

[: 스타일 정보 요소 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/style)

```html
<!--일반적인 사용 예:-->
<style type="text/css">
  body {
    color: #323232;
  }
</style>

<!--scoped 속성 사용 예: ❖ 현재 제대로 지원하는 브라우저 없음.-->
<section>
  <style scoped>
    p { color: #902c1f; }
  </style>
  <p> ... </p>
</section>
```

### <base> 요소

문서 안의 모든 상대 URL이 사용할 기준 URL을 지정한다.

문서 하나에 하나만 존재해야한다.

```html
<base target="_blank" href="<http://www.example.com/>">
```