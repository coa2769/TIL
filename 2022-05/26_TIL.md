# 05월 26일

> 프로그래머스 코딩 테스트 문제 

---

## 2021 카카오 채용연계형 인터십 - 나의 풀이

```js
function solution(s) {
    var answer = 0;

    let num_array = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    num_array.forEach((num_str, index)=>{
        s = s.replace(new RegExp(num_str, 'g'), index);
    });

    answer = Number(s);
    return answer;
}
```

## 다른 풀이

```js
function solution(s) {
    s = s.replace(/zero/gi, 0)
    .replace(/one/gi, 1)
    .replace(/two/gi, 2)
    .replace(/three/gi, 3)
    .replace(/four/gi, 4)
    .replace(/five/gi, 5)
    .replace(/six/gi, 6)
    .replace(/seven/gi, 7)
    .replace(/eight/gi, 8)
    .replace(/nine/gi, 9)
    return parseInt(s);
}
```

```js
function solution(s) {
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var answer = s;

    for(let i=0; i< numbers.length; i++) {
        let arr = answer.split(numbers[i]);
        answer = arr.join(i);
    }

    return Number(answer);
}
```

