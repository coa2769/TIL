# 05월 27일

> 프로그래머스 코딩 테스트 문제 

---

## 2021 카카오 인턴십 - 나의 풀이

```js
function solution(numbers, hand) {
    var answer = '';

    //* -> 10, 0 -> 11, # -> 12 로 지정
    let left_thum = 10;
    let right_thum = 12;

    //0 -> 11로 변환
    numbers = numbers.map((num)=>{
        if(num === 0) return 11;

        return num;
    });

    numbers.forEach((num, index)=>{
        //1,4,7은 왼손
        if(num === 1 || num === 4 | num === 7){
            answer = answer.concat('L');
            left_thum = num;
        }
        //3,6,9는 오른손
        else if(num === 3 | num === 6 | num === 9){
            answer = answer.concat('R');
            right_thum = num;
        }
        //2,5,8,0은 두 손가락 위치에 따라
        else {
            //상하 이동 3
            //왼오 이동 1
            let left_diff = Math.abs(left_thum - num);
            let right_diff = Math.abs(right_thum - num);

            let left_count = Math.floor(left_diff / 3) + (left_diff % 3);
            let right_count = Math.floor(right_diff / 3) + (right_diff % 3);

            // if(left_count === right_count){
                // answer = answer.concat(left_diff, right_diff);
            // }

            // if(left_count === right_count) answer = answer.concat('0');
            if(left_count === right_count){
                answer = answer.concat(hand === 'left' ? 'L' : 'R');
                hand === 'left' ? left_thum = num : right_thum = num;
            } else{
                answer = answer.concat( left_count < right_count ? 'L' : 'R' );  
                left_count < right_count ? left_thum = num : right_thum = num;
            } 

        }

    });


    return answer;
}
```

## 다른 풀이

```js
function solution(numbers, hand) {
  hand = hand[0] === "r" ? "R" : "L"
  let position = [1, 4, 4, 4, 3, 3, 3, 2, 2, 2]
  let h = { L: [1, 1], R: [1, 1] }
  return numbers.map(x => {
    if (/[147]/.test(x)) {
      h.L = [position[x], 1]
      return "L"
    }
    if (/[369]/.test(x)) {
      h.R = [position[x], 1]
      return "R"
    }
    let distL = Math.abs(position[x] - h.L[0]) + h.L[1]
    let distR = Math.abs(position[x] - h.R[0]) + h.R[1]
    if (distL === distR) {
      h[hand] = [position[x], 0]
      return hand
    }
    if (distL < distR) {
      h.L = [position[x], 0]
      return "L"
    }
    h.R = [position[x], 0]
    return "R"
  }).join("")
}
```

