console.log("CarlosScript activated");
var currentScore = Cookies.get('score');
if(currentScore !== undefined)
{
  currentScore = currentScore + 100;
  Cookies.remove('score');
  Cookies.set('score', currentScore);
  console.log("CarlosScript activated"+currentScore);

}
else {
  Cookies.set('score','0');
}
