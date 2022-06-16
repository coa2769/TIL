# Summer/Winter Coding(~2018) - 소수 만들기

## 나의 풀이

```js
function isPrimeNumber(num){
    for(let i = 2; i <= Math.floor(Math.sqrt(num)); i++){
        if(num % i === 0) return false;
    }

    return true;
}

function solution(nums) {
    var answer = 0;

    for(let i=0; i < nums.length; i++){
        for(let j=i+1; j < nums.length; j++){
            for(let a = j+1; a < nums.length; a++){
                if(isPrimeNumber(nums[i] + nums[j] + nums[a]) === true) answer++;
            }
        }    
    }

    return answer;
}
```

- Math.floor는 1씩 증가하므로  필요없을 듯하다.
- 숫자의 제곱근 까지 중 나눴을 때 0이 나오는 숫자가 없으면 해당 숫자는 소수이다.
  - https://myjamong.tistory.com/139 (해당 URL 참조)

## 다른 사람 풀이

```js
function primecheck(n){
    for(var i=2;i<=Math.sqrt(n);i++){
        if(n%i == 0){
            return false;
        }
    }
    return true;    
}
function solution(nums){
    var cnt = 0;
    for(var i=0;i<nums.length-2;i++){
        for(var j=i+1;j<nums.length-1;j++){
            for(var w=j+1;w<nums.length;w++){
                    //console.log(nums[i]+"/"+nums[j]+"/"+nums[w]);

                    if(primecheck(nums[i]+nums[j]+nums[w])){
                        //console.log(nums[i]+nums[j]+nums[w]);
                        cnt++;
                    }
            }
        }
    }
    return cnt;
}
```

- 나랑 비슷한 풀이를 했다.