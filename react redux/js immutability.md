# 수업소개

해당 수업은 데이터의 원본이 훼손되는 것을 막는 (불변함,immutability) 기술을 다룬다.

- immutability라는 단어의 뜻을 알아보자
  - mutate : 변화
  - mutable : 변화가능한(형용사)
  - mutability : 변화가능함(명사)
  - immutability : 변화가능하지 않음



# 이름에 대한 불변함 : const vs var

```js
var v = 1;
//1억개의 코드 ~
v = 2;
console.log('v : ',v);

const c = 1;
//1억개의 코드 ~
c = 2;
```

- const로 선언한 변수는 값을 변경할 수 없다. 그러므로 1의 또다른 이름은 c라고 고정되게 된다. 
  - 이를 이름을 불변하게 유지하는 방법이라고 강의에서 설명하고 있다.



# 변수 할당 방식 비교

값을 불변하게 유지하는 방법에 대해 강의가 이어진다.









# 초기 값의 비교









# 객체의 가변성









# 중첩된 객체의 복사









# 불변의 함수 만들기







# 가변과 불변 API 비교







# Object freeze로 객체를 불변하게 만들기







# const vs object freeze







# 수업을 마치며

