const crypto = require('crypto');

//1. 64bit 길이의 문자열을 랜덤으로 만듬(이게 salt가 된다.)
crypto.randomBytes(64, (err, buf)=>{
    const salt = buf.toString('base64');
    console.log('salt : ', salt);

    //2. 암호화한다. (인수 : 비밀번호, salt, 반복횟수, 출력 바인트, 해시 알고리즘.)
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key)=>{
        console.log('password : ', key.toString('base64'));
    });
});