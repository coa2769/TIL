const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
// 문자열을  버퍼로 바꾸어 준다. 
console.log('from():', buffer); 
// 버퍼의 크기를 나타낸다. (byte 단위)
console.log('length:', buffer.length); 
//버퍼를 다시 문자열로 바꿔준다.(base64 or hex를 인수로 넣으면 인코딩으로도 변환 가능하다.)
console.log('toString():', buffer.toString()); 

const array = [Buffer.from('띄엄'), Buffer.from('띄엄'), Buffer.from('띄어쓰기')];
//배열 안에 든 버퍼들을 하나로 합친다.
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());

//빈 버퍼를 생성한다. (바이트를 인수로 넣는다.)
const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);