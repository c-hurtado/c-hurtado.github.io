console.log("CarlosScript activated");
var currentScore = Cookies.get('score');
if(currentScore !== undefined)
{
  var numScore = parseInt(currentScore);
  numScore = numScore + 100;
  Cookies.remove('score');
  Cookies.set('score', ''+numScore);
  console.log('score:'+numScore);

}
else {
  Cookies.set('score','0');
}
