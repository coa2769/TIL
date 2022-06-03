# 월간 코드 챌린지 시즌1 - 내적

## 나의 풀이

```js
function solution(a, b) {
    var answer = 1234567890;

    answer = a.reduce((result, a_value, index)=>{
        return result + (a_value * b[index]);
    }, 0)

    return answer;
}
```



## 다른 사람 풀이

```js
function solution(a, b) {
    return a.reduce((acc, _, i) => acc += a[i] * b[i], 0);
}

```

- _로 필요없는 변수를 나타냄.