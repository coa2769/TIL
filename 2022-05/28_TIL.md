# 05월 28일

> 코딩 테스트 문제 풀면서 필요한 내용 정리

## String 다루는 방법

# String와 Array 차이

- Filter, map,     forEach 함수가 string에는 없다.

 

# 대문자, 소문자 변환

[toUpperCase](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)(), [toLowerCase](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)() 함수를 사용한다.

 

 

# 정규 표현식에 사용되는 함수들

- Match 함수

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/match

문자열이 정규식에 매칭되는지 부분 검색한다.

- Replace 함수

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace

정규표현식에 일치하는 패턴을 교체하여 새로운 문자열 반환.

 

 

- 정규표현식 테스트 사이트

https://regexr.com/5mhou

 

 

 

# 문자열 자르는데 사용되는 함수들

- Split

특정 문자를 기준으로 문자열을 자를 때

 

- Substring

인덱스를 기준으로 문자열을 자를 때

 

- Substr

시작 인덱스와 길이를 기준으로 문자열을 자를 때

 

 

# 문자열을 다루는 그 외 함수들

- Concat

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/concat

매개변수로 전달된 모든 문자열을 붙여서 새로운 문자를 생성

- String -> Array로 변환

*// String → Array (**문자열* *→* *배열**)*

**const** str **=** 'Hello'**;**

**const** arr **=** str**.split(**''**);**  *//* *배열* *['h', 'e', 'l', 'l', 'o']*

 

- Array -> String으로 변환

// Array → String (배열 → 문자열): join() 이용

**const** arr **= [**'h'**,** 'e'**,** 'l'**,** 'l'**,** 'o'**];**

**const** str1 **=** arr**.**join**();**    // 문자열 'h,e,l,l,o'

**const** str2 **=** arr**.**join**(**'+'**);**    // 문자열 'h+e+l+l+o'

**const** str3 **=** arr**.**join**(**''**);**    // 문자열 'hello'

 

 

 