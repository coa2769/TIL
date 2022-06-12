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

- Number.isInteger  ?

```js
function solution(left, right) {
    let sum = (left+right)/2*(right-left+1);
    let l = Math.ceil(Math.sqrt(left));
    while (l**2 <= right) sum -= (l++**2)*2
    return sum
}
```

- 일단 다 더하고, 제곱수 인거만 두번 빼줌.