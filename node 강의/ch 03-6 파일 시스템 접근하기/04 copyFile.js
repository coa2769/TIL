const fs = require('fs').promises;

fs.copyFile('03 readme4.txt', 'writeme4.txt')
.then(()=>{
    console.log('복사 완료');
})
.catch((error)=>{
    console.error(error);
});