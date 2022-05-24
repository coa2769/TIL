# 05월 24일

> 프로그래머스 코딩 테스트 문제 

---

## 로또의 최고 순위와 최저 순위 - 나의 풀이

```js
function solution(lottos, win_nums) {
    var answer = []; //최고 순위, 최저 순위 나란히


    let win_nums_set = new Set(win_nums);

    console.log(win_nums_set);

    let rank = [6, 6, 5, 4, 3, 2, 1];

    let count = 0; 
    let zero_count = 0;

    lottos.forEach((lotto)=>{
        if(lotto === 0){
            zero_count++;
        }

        if(win_nums_set.has(lotto)){
            count++;  
        } 
    });

    answer.push(rank[count + zero_count]);
    answer.push(rank[count]);

    return answer;
}
```

## 다른사람 풀이

```js
function solution(lottos, win_nums) {
    const rank = [6, 6, 5, 4, 3, 2, 1];

    let minCount = lottos.filter(v => win_nums.includes(v)).length;
    let zeroCount = lottos.filter(v => !v).length;

    const maxCount = minCount + zeroCount;

    return [rank[maxCount], rank[minCount]];
}
```

```js
function solution(lottos, win_nums) {
    const answer = [];
    const min = lottos.filter(n => win_nums.includes(n)).length;
    const max = lottos.filter(n => n === 0).length + min;

    max > 1 ? answer.push(7 - max) : answer.push(6);
    min > 1 ? answer.push(7 - min) : answer.push(6);

    return answer;
}
```

- Array.includes()를 사용한다.
- 최저 순위와 0인 숫자의 갯수만을 센다.
- 첫번째는 배열에 순위를 사용한다.
- 두번째는 순위를 계산한다.