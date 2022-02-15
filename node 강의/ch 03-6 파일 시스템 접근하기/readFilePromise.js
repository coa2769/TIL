const fs = require('fs').promises; //프로미스 기반

fs.readFile('./readme.txt')
.then((data)=>{
    console.log(data);
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
});