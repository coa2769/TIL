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

JS에서 데이터 타입이 Primitive인지 Object인지에 따라 값을 가지고 있는 방식이 다르다.

[ Primitive (원시, 원자) 데이터 타입]

- 더이상 쪼갤수 없는 최소한의 정보들

- 종류

  - Number

  - String

  - Boolean

  - Null

  - Undefined

  - Symbol



[ Object(객체) 데이터 타입 ]

- 연관된 데이터들을 모으는데 사용된다.
- 종류
  - Object
  - Array
  - Function



# 초기 값의 비교

![Primitive 타입과 Object 타입의 값 비교](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(01).png)



- p1과 p2는 메모리 상에 존재하는 같은 값을 가리키므로 비교연산하면 true가 된다.
- o1과 o2는 메모리 상에 다른 값을 가리키므로 비교연산하면 false이 된다.
- 원시 데이터는 값이 같다면 메모리상에서도 같은 것을 가리킨다.
- 객체 테이터 타입은 값이 같아도 메모리상에서 다른 것을 가리킨다.



# 객체의 가변성

원시 데이터 타입과 객체 데이터 타입에서 값을 변경할 때의 차이점과 문제점에 대해서 알아본다.

### 차이점

- 원시 데이터는 같은 값을 갖는 변수라면 같은 메모리를 가리킨다.

[원시 데이터 타입에서 값 바꾸기 전]

![원시 데이터 타입에서 값 바꾸기 전](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(02).png)

[원시 데이터 타입에서 값 바꾸기 후]

![원시 데이터 타입에서 값 바꾸기 후](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(03).png)

- 객체 데이터 타입에서 두 변수가 같은 값을 가리킬 때 한 쪽 변수로 속성 값을 변경하면 다른 쪽 변수에서도 똑같이 방영된다.

  ![속성값 변경](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(04).png)

객체 데이터 타입에서 위와 같은 상황을 의도하지 않았다면 매우 위험한 버그가 된다. 그러므로 이런 상황을 방지하기 위한 방법을 이후 강의에서 알려줄 것이다.



# 객체의 복사

객체 데이터 타입을 복제하여 생성하는 방법

![객체 복사](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(05).png)

# 중첩된 객체(Nested Object)의 복사

객체의 속성에 또 다른 객체가 있을 때 생길 수 있는 문제와 그 문제의 해결 방안에 대한 강의이다.



[ 중첩된 객체를 사용할 때 생길 수 있는 문제 ]

객체 속성이 가리키는 또 다른 객체는 복사되지 않아 한쪽 변수에서 변경한 값이 다른 쪽 변수에도 적용되는 문제가 생긴다.

![중첩된 객체를 복사할 때 생기는 문제](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(06).png)



[문제 해결 방법]

속성이 가리키는 객체를 복사하여 넣어준다. concat을 사용하는 이유는 Array 객체가 가진 특수한 함수들을 그대로 사용하기 위해서이다.

![속성이 가리키는 객체 복사](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(07).png)





# 불변의 함수 만들기

[ immutability하지 않은 함수 ]

```js
function fu(person){
    person.name = 'lee';
}

var o1 = { name : 'kim' };

fn(o1);

console.log(o1);
```

[immutability한 함수]

```js
function fu(person){
    person = Object.assign({}, person);
    person.name = 'lee';
    return person;
}

var o1 = { name : 'kim' };

var o2 = fn(o1);

console.log(o1, o2);
```





# 가변과 불변 API 비교

js에서 원본을 가변 또는 불변하게 처리하는 함수들을 비교하는 강의이다.



[ 배열에 값을 추가하는 함수 ]

```js
var score = [1,2,3,];
//원본을 바꾸는 방법
score.push(4);

//원본을 바꾸지 않는 방법
var scroe2 = score.concat(4);
```



# Object freeze로 객체를 불변하게 만들기

Object.freeze함수로 원본 객체를 바꿀 수 없는 상태로 만들 수 있다.

```js
var o1 = {name : 'kim', score:[1,2,]};
Object.freeze(o1);
o1.name = 'lee';
console.log(o1);
```

하지만 해당 객체의 속성이 또 다른 객체 데이터 타입이다면 속성의 객체 데이터 타입은 변경이 가능해지는 문제가 생긴다.

```js
var o1 = {name : 'kim', score:[1,2,]};
Object.freeze(o1);
o1.name = 'lee';
console.log(o1);

o1.score.push(3);
console.log(o1);
```

이런 문제를 해결하기 위해서는 속성의 또 다른 객체 데이터도 Object.freeze해줘야한다.

```js
var o1 = {name : 'kim', score:[1,2,]};
Object.freeze(o1);
Object.freeze(o1.score);
o1.name = 'lee';
console.log(o1);

o1.score.push(3);
console.log(o1);
```



# const vs object freeze

const와 Object.freeze의 차이점

![차이점](C:\Users\clnme\Desktop\TIL\react redux\00 image\js immutability(08).png)

- const는 해당 변수가 어떤 것을 가리키는지를 바꾸지 못하게 한다.
- Object.freeze는 해당 변수가 가리키는 값의 속성들을 바꾸지 못하게 하는 것이다.



그러므로 이 둘을 병행해서 더 견고하게 immutability를 구현할 수 있다.



# 수업을 마치며

