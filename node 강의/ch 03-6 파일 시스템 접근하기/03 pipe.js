const fs = require('fs');

const readStream = fs.createReadStream('03 readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);