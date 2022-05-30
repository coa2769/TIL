# 2019 카카오 개발자 겨울 인턴십 - 크레인 인형뽑기 게임

## 나의 풀이

```js
function solution(board, moves) {
    var answer = 0;
    let dollBasket = [];

    //board 재 구성
    let board2 = [];
    board.reverse();
    board.forEach((arr)=>{
        arr.forEach((doll, x)=>{
            if(board2[x] === undefined) board2[x] = []

            board2[x].push(doll);
        });
    });

    moves.forEach((move)=>{
        let pulledDoll;
        do{
            pulledDoll = board2[move - 1].pop();
        }while(pulledDoll === 0)

        if(pulledDoll === undefined) return;

        if(dollBasket[dollBasket.length - 1] === pulledDoll){
            dollBasket.pop();
            answer = answer + 2;
        }else{
            dollBasket.push(pulledDoll);
        }

    });

    return answer;
}
```

- board를 x방향으로 배열이 놓여 있는 것처럼 변환했음

  - ```text
    [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]]
    는 y방향으로 배열을 나열했다. (아래와 같은 배치가 된다.)
    [[0, 0, 0, 0, 0],
     [0, 0, 1, 0, 3],
     [0 ,2, 5, 0, 1],
     [4 ,2, 4, 4, 2],
     [3 ,5, 1, 3, 1]]
     
    그래서 x방향으로 배열이 놓여 있도록 변환했음
    [[3,4,0,0,0], [5,2,2,0,0],[1,4,5,1,0],[3,4,0,0,0],[1,2,1,3,0]]
    ```

- reverse함수 사용

## 다른 사람 풀이

```js
//y방향으로 배열 나열 -> x방향으로 배열 나열로 변환
//matrix의 x와y 변환 연산 같음.
const transpose = matrix =>
    matrix.reduce(
        (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
        [] //result의 초기값
    );

const solution = (board, moves) => {
    
    //0을 제거하는 중
    const stacks = transpose(board).map(row =>
        row.reverse().filter(el => el !== 0)
    );
    
    const basket = [];
    let result = 0;

    for (const move of moves) {
        //stack에서 꺼내기
        const pop = stacks[move - 1].pop();
        //없으면 다음으로
        if (!pop) continue;
        //
        if (pop === basket[basket.length - 1]) {
            basket.pop();
            result += 2;
            continue;
        }
        basket.push(pop);
    }

    return result;
};
```

- reduce를 사용
  - reduce : 현재 reduce에서 돌아가고 있는 인덱스의 ‘이전 반환값’을 result에 저장한다. 
    - result는 callback함수의 accumulator로 reduce의 두번째 매개변수인 배열로 초기화 되고 요소를 순회하면서 누적된 결과이다.
    - row : y방향으로 나열된 배열
    - [...(result[i] || []), row[i]] 해설
      - result[i] 에 배열이 있으면 ... 연산 실행 없다면 빈 배열로 ...연산 실행
      - row[i]번째 요소를 추가
  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

-  map : 대상의 되는 배열의 ‘각 요소’를 화살표 함수의 ‘반환값으로 대체’한다.
- 화살표함수 : A=>B는 B를 ‘반환’한다는 말이다.
- … : …에 뒤따라오는 것이 ‘배열이라면 요소만 추출’해주고, ‘빈배열이라면 삭제’한다

```js
function solution(board, moves) {

    var count =0;
    var stack = [];

    for(var i=0;i<moves.length;i++){
        var now = moves[i]-1
        for(var j=0;j<board.length;j++){
            if(board[j][now]!=0){
                if(stack[stack.length-1]===board[j][now]){
                    stack.pop();
                    count+=2;
                }
                else{
                    stack.push(board[j][now])
                }
                board[j][now] = 0;
                break;
            }
        }
    }
    console.log(stack)
    return count
}
```

- 좋아요도 많으면서  이해하기 쉬웠던 코드