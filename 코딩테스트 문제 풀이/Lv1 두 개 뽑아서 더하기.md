# 월간 코드 챌린지 시즌1 - 없는 숫자 더하기

## 나의 풀이

```js
function solution(numbers) {
    var answer = [];

    for(let i = 0; i < (numbers.length - 1); i++){
        let num = numbers[i];

       for(let j = i + 1; j < numbers.length; j++){   
           let sum = num + numbers[j];
           if(!answer.includes(sum)) answer.push(sum);
       }  
    }

    //오름차순 정렬
    answer.sort(function(a, b)  {
      return a - b;
    });

    return answer;
}

```

- array.sort 함수 사용
  - https://hianna.tistory.com/409 사용방법
- array.includes함수로 같은 숫자가 answer에 들어가지 못하도록 했다.

## 다른 사람 풀이

```js
function solution(numbers) {
    const temp = []

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            temp.push(numbers[i] + numbers[j])
        }
    }

    const answer = [...new Set(temp)]

    return answer.sort((a, b) => a - b)
}
```

- array.sort함수에서 화살표 함수 사용
- Set 객체로 같은 숫자가 들어가지 못하게 했다.

```js
function solution(numbers) {
    let answer = [];
    for(let i=0; i < numbers.length; i++){
        for(let j=0; j<numbers.length; j++){
            if(i===j) continue; // 동일한 index는 skip
            answer.push(numbers[i]+numbers[j])
        }
    }
    answer = [...new Set(answer)].sort((a,b)=>a-b)
    console.log(answer)
    return answer;
```

- 중첩 for문에서 i와j가 같다면 continue로 skip하도록 구현했다.