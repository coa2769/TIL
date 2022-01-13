# 01월 12일
> 토이 프로젝트를 만드는데 사용된 정규표현식에 관해 정리

## 정규표현식
> regular expression의 약자
문자열에서 특정한 패턴의 문자를 찾는데 쓰인다. 
ex) 010-4983-1866, http://www.hello.com 등
> 

# 1. 문법

## 1.1. 정규표현식 구조

```reason
/regex?/i
```

- `/  ...  /` : slashes 안에 찾고자 하는 패턴식을 작성한다.
- `i` : 옵션을 지정해준다.

## 1.2. 그룹과 범위(Groups and ranges)

| Chracter | 뜻 |
| --- | --- |
| | | or |
| () | group |
| [] | 문자셋, 괄호안의 어떤 문자든 하나라도 같은게 있다면 찾는 문자가 된다. |
| [^] | 부정 문자셋, 괄호안의 어떤 문자도아닌 것을 찾는다. |
| (?:) | 찾지만 기억하지는 않음 (그룹을 지정하지 않는다는 뜻) |
| - | 어디부터 어디까지 (ex) a-f, 0-9 |

### 여러 예제

```
/(Hi | And)/gm    : 1그룹은 Hi이거나 And 인 문자
/gr(e|a)y/gm      : gr로 시작하고 e또는 a가 다음에 오고 y로 끝나는 문자
/gr(?:e|a)y/gm    : 위와 같지만 e와 a를 그룹으로 지정하지 않는다
/gr[ea]y/gm       : 위와 같음
/gr[a-f]y/gm      : gr로 시작하고 a부터 f까지 중 같은 문자가 있고 y로 끝나는 문자
/[^a-f]/gm        : a부터 f까지 문자를 제외한 나머지
```

## 1.3. 수량(Quantifiers)

| Chracter | 뜻 |
| --- | --- |
| ? | 없거나 있거나(zero or one) |
| * | 없거나 있거나 많거나(zero or more) |
| + | 하나 또는 많이(one or more) |
| {n} | n번 반복 |
| {min,} | 최소 |
| {min,max} | 최소, 그리고 최대 |

### 여러 예제

```
/gra?y/gm        : a가 있거나 없는 두 경우의 문자를 모두 찾는다.
/gra*y/gm        : a가 있거나 없거나 많거나 세 경우의 문자를 모두 찾는다.
/gra+y/gm        : a가 하나거나 많이 있는 두 경우의 문자를 모두 찾는다.
/gra{2}y/gm      : a가 2개인 문자
/gra{2,}y/gm     : a가 최소 2개이상인 문자
/gra{2,4}y/gm    : a가 최소 2개에서 4개 이하인 문자
```

## 1.4. 경계 타입(Boundary-type)

| Chracter | 뜻 |
| --- | --- |
| \b | 단어 경계 (단어의 처음과 끝의 경계에서 찾는다.) |
| \B | \b의 반대로 된 단어 경계 (단어의 처음과 끝의 경계에서 찾는다.) |
| ^ | 문장의 시작 |
| $ | 문장의 끝 |

### 여러 예제

```
/\bYa/gm        : 단어 앞에서 쓰이는 Ya를 모두 찾는다.
/Ya\b/gm        : 단어 뒤에서 쓰이는 Ya를 모두 찾는다.
/Ya\B/gm        : 단어 뒤에서 쓰이지 않는 Ya를 모두 찾는다.
/Ya$/gm         : 문장의 끝에 쓰이는 Ya를 모두 찾는다.(m[multiline] 옵션을 주어야 이렇게 동작한다.)
```

## 1.5. 문자 클래스

| Chracter | 뜻 |
| --- | --- |
| \ | 특수 문자가 아닌 문자 |
| . | 어떤 글자 (줄바꿈 문자 제외) |
| \d | digit 숫자 |
| \D | digit 숫자 아님 |
| \w | word 문자 |
| \W | word 문자 아님 |
| \s | space 공백 |
| \S | space 공백 아님 |

### 여러 예제

```
/./gm          : 모든 문자
/\[/gm         : 문자'['를 찾는다.
/\d/           : 모둔 숫자를 찾아준다.
```

# 2. 퀴즈

## 2.1. 숫자 패턴

**찾아야 하는 문자**

```
010-898-0893
010 898 0893
010.898.0893
010-405-3412
02-878-8888
```

**정답**

```
/\d{2,3}[-. ]\d{3}[-. ]\d{4}/gm
```

## 2.2. 이메일 패턴

**찾아야 하는 문자**

```
dream.coder.ellie@gmail.com
hello@daum.net
hello@daum.co.kr
```

**정답**

```
//내가 작성한 답
/[\w.]{1,}@[\w.]{1,}/gm

//실제 정답
[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+
```

## 2.3. URL 패턴

**찾아야 하는 문자**

```
https://www.youtu.be/-ZClicWm0zM
https://youtu.be/-ZClicWm0zM
youtu.be/-ZClicWm0zM
```

**정답**

```
//내가 작성한 답
[a-zA-Z0-9:./]+\/

//실제 정답
(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9-]){11}
- s는 있거나 없을 수 있다.
- https는 있거나 없을 수 있다.
- www.는 있거나 없을 수 있다.
- ([a-zA-Z0-9-]){11} : id는 11개의 문자 숫자 조합으로 이루어져 있었다.
- id만 가져올 것이므로 나머지 그룹에 ?:를 넣어준다.
```

![실제 정규표현식 사용](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e612b5ca-560d-4966-8ea6-021421d2ffad/Untitled.png)

# 3. 참고 URL

- 정규표현식 연습이 가능 ([https://regexr.com/5mhou](https://regexr.com/5mhou))
- 문제를 풀며 알고 있는 것을 점검할 수 있다.([https://regexone.com/](https://regexone.com/))
---