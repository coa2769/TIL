# 월간 코드 챌린지 시즌3 - 없는 숫자 더하기

## 나의 풀이

```js
function solution(numbers) {
    var answer = -1;
    let numbers_set = new Set(numbers);
    let arr = [0,1,2,3,4,5,6,7,8,9];

    answer = arr.reduce((result, currentValue)=>{
        if(!numbers_set.has(currentValue)) return result + currentValue

        return result;
    }, 0);

    return answer;
}
```

## 다른 사람 풀이

```js
function solution(numbers) {
    return 45 - numbers.reduce((cur, acc) => cur + acc, 0);
}
```

- 0~9까지 숫자를 모두 더한 값에서 numbers 의 원소들 합을 빼는 것으로 해결



```js
function solution(numbers) {
    let answer = 0;

    for(let i = 0; i <= 9; i++) {
        if(!numbers.includes(i)) answer += i;
    }

    return answer;
}
```

- set대신 배열의 includes함수 사용.