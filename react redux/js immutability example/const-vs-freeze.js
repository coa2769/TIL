const o1 = {name : 'kim'};
Object.freeze(o1);
const o2 = {name : 'lee'};
o1 = o2; //error

o1.name = 'park'; //error
console.log(o1);