# 03월 21일

> CSS 레이아웃 관련 정리

# 02 !important

# CSS가 적용되는 순서

Author Style(개발자) → User Style(사용자) → Brower(기본)

- 우선순위가 높은 style이 없다면 다음으로 넘어간다.(cascading)
- 이런 cascading을 끝어버리는 `!important`라는 문법이 있는데 이는 기본 흐름을 어지럽게 하므로 사용하지 않는 것을 추천한다.

---

# 01 Selectors(선택자)

# 1.1. 분류

- Universal ( * ) : 모든 tag들 선택
- Type ( <tag> ) : 특정 tag들 선택
- ID ( #id ) : 특정 요소 선택
- Class ( .class ) : 특정 그룹 선택
- State ( : ) : 특정 상태 선택
- Attribute ( [] ) : 특정 속성 선택

```css
/* universal */
*{
  color : green;
}
/* type */
li {
  color : blue;
}
/* id */
li#special {
  color : pink;
}
/* class */
.red {
  width : 100px;
  height : 100px;
  background : yellow;
}
/* state */
button:hover{
  color : red;
  background : beige;
}
/* attribute */
a[href$=".com"]{
  color : purple;
}
```

## 선택자에 의한 스타일 적용 특징

- 해당 요소에 더 가까운 선택자를 이용한 스타일이 최우선으로 적용된다.

------

### reference

selector 연습 게임

[CSS Diner](https://flukeout.github.io/)

---

