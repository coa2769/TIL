# 월간 코드 챌린지 시즌2 - 약수의 개수와 덧셈

## 나의 풀이

```js
function solution(left, right) {
    var answer = 0;

    for(let i = left; i <= right; i++){
        let count = 0;
        for(let j = 1; j <= i; j++){
            if(i % j === 0){
                count++;
            }
        }

        if(count % 2 === 0) answer += i;
        else answer -= i;
    }

    return answer;
}
```

- 나눗셈 나머지 연산인 %를 이용하여 풀었다.
- 더 좋은 방법으로 소인수분해하여 소인수의 제곱 수를 곱하는 방법이 있는데....코드로 짤 방법이 떠오르지 않음
  - https://mathbang.net/201

## 다른 사람 풀이

```js
function solution(left, right) {
    var answer = 0;
    for (let i = left; i <= right; i++) {
        if (Number.isInteger(Math.sqrt(i))) {
            answer -= i;
        } else {
            answer += i;
        }
    }
    return answer;
}
```

- Number.isInteger 는 주어진 값이 정수인지 판별한다.
  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger

- 제곱근이 정수면 약수 갯수가 홀수 이다.
  - 약수의 갯수가 홀수이려면 제곱근인 정수가 꼭 존재해야 한다.(다른 약수들은 짝지어진다.)
  - Math.sqrt() 숫자에 루트(√)를 씌워 계산합니다.
  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt


```js
function solution(left, right) {
    let sum = (left+right)/2*(right-left+1);
    let l = Math.ceil(Math.sqrt(left));
    while (l**2 <= right) sum -= (l++**2)*2
    return sum
}
```

- 일단 다 더하고, 제곱수 인거만 두번 빼줌.
  - 여기서도 제곱근이 정수인 것들은 빼준다.
  - 단 더해진 짝수 값에 홀수 값을 빼는 것이므로 두번 빼준다.