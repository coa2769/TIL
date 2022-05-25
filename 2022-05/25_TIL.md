# 05월 25일

> 프로그래머스 코딩 테스트 문제 

---

## 2021 KAKAO BILND RECRUITMENT 문제 - 나의 풀이

```js
//3<= 아이디 길이 <=15
//알파벳 소문자, 숫자, -, _, . 만 사용가능
//처음과 끝에 .사용 X, 연속 사용 X

function solution(new_id) {
    var answer = '';

    //1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
    answer = new_id.toLowerCase();

    //2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
    let id_array = answer.split('');
    id_array = id_array.filter((value)=>{
        if(value.match(/\w|\d|\-|\_|\./) === null) return false;

        return true;
    });

    answer = id_array.join('');

    //3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
    let befor;
    do{
        befor = answer;
        answer = answer.replace(/\.{2,}/, '.');

    }while(befor !== answer)

    //4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
    answer = answer.replace(/^\./, '');
    answer = answer.replace(/\.$/, '');

    //5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
    if(answer.length === 0){
        answer = 'a';
    }

    /*
    6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
     만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
    */
    answer = answer.substring(0, 15);
    answer = answer.replace(/\.$/, '');

    //7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

    if(answer.length <= 2){
        let end = answer.slice(-1);
        let count = answer.length;

        while(count < 3){
            answer = answer.concat(end);
            count++;
        }
    }

    return answer;
}
```

## 다른 사람 풀이

```js
function solution(new_id) {
    const answer = new_id
        .toLowerCase() // 1
        .replace(/[^\w-_.]/g, '') // 2
        .replace(/\.+/g, '.') // 3
        .replace(/^\.|\.$/g, '') // 4
        .replace(/^$/, 'a') // 5
        .slice(0, 15).replace(/\.$/, ''); // 6
    const len = answer.length;
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}
```

- global flag를 사용하여 해당하는 모든 걸 찾도록 한다.
- 길이가 3 이하인 문자열을 repeat함수를 이용하여 마지막 문자를 반복하도록 한다.
- 함수 chaing을 사용한다.