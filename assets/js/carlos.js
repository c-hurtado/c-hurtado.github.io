console.log("CarlosScript activated");
Cookies.set('score','0');
var score = Cookie.get('score');
Cookies.remove('score');
Cookies.set('score', score+1111);
console.log("CarlosScript activated"+score);
