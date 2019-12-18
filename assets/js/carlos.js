console.log("CarlosScript activated");
Cookie.set('score','0');
var score = Cookie.get('score');
Cookie.remove('score');
Cookie.set('score', score+1111);
console.log("CarlosScript activated"+score);
