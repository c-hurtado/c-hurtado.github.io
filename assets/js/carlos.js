
var globalXpDict = {};
globalXpDict["art"] = 100;
globalXpDict["gamedev"] = 100;
globalXpDict["thoughts"] = 100;
globalXpDict["contact"] = 100;
globalXpDict["about"] = 100;
globalXpDict["leaderboards"] = 100;
globalXpDict["menu"] = 100;
globalXpDict["home"] = 100;
globalXpDict["social_email"] = 100;
globalXpDict["social_twitter"] = 100;
globalXpDict["social_linkedIn"] = 100;
globalXpDict["social_instagram"] = 100;
globalXpDict["social_gitHub"] = 100;
globalXpDict["about_tool"] = 100;
globalXpDict["art_open_portrait"] = 100;
globalXpDict["art_open_photography"] = 100;
globalXpDict["art_open_figureDrawing"] = 100;
globalXpDict["art_open_figureDrawing"] = 100;
globalXpDict["art_open_3Drender"] = 100;
globalXpDict["contact_resume"] = 100;
globalXpDict["thoughts_post"] = 100;

var globalXpLevel = {};
globalXpLevel[0] = 0;
globalXpLevel[1] = 240;
globalXpLevel[2] = 480;
globalXpLevel[3] = 760;
globalXpLevel[4] = 1250;
globalXpLevel[5] = 1480;


function AddXPAmount(xpAmount)
{
  var currentXP = Cookies.get('xp');
  if(currentXP !== undefined)
  {
    var numScore = parseInt(currentXP);
    numScore = numScore + xpAmount;
    Cookies.remove('xp');
    Cookies.set('xp', ''+numScore);
  }
  else {
    Cookies.set('xp', xpAmount);
  }
}

function AddPendingXP(xpAmount)
{
  var pendingXP = Cookies.get('pendingXP');
  if(pendingXP !== undefined)
  {
    var numScore = parseInt(pendingXP);
    numScore = numScore + xpAmount;
    Cookies.remove('pendingXP');
    Cookies.set('pendingXP', ''+ numScore);
  }
  else {
    Cookies.set('pendingXP', xpAmount);
  }
}


function ClearPendingXP()
{
    Cookies.remove('pendingXP');
}

function GetPendingXP()
{
  var currentXP = Cookies.get('pendingXP');
  if(currentXP !== undefined)
  {
    var numXP = parseInt(currentXP);
    return numXP;
  }
  return 0;
}


function GetXP()
{
  var currentXP = Cookies.get('xp');
  if(currentXP !== undefined)
  {
    var numXP = parseInt(currentXP);
    return numXP;
  }
  return 0;
}

function GetLevel()
{
  var currentXP = GetXP();
  var lastKey = 0;
  for (var key in globalXpLevel)
  {
    var value = globalXpLevel[key];
    if (value > currentXP)
    {
      return lastKey;
    }
    lastKey = key;
  }
  return lastKey;
}

function GetXPToAdd(xpSource)
{
    var xpAmount = globalXpDict[xpSource];
    if(xpAmount !== undefined)
    {
      return xpAmount;
    }
    return 0;
}

function UpdateLevel(newLevel)
{
  //do something here
}

function AddXPFromSource(xpSource)
{
  var cookieInfo = Cookies.get(xpSource);
  if(cookieInfo == undefined)
  {
    var level = GetLevel();
    AddPendingXP(GetXPToAdd(xpSource));
    Cookies.set(xpSource, 1);
  }
}

function GetPercentageInLevel()
{
  var startingLevel = parseInt(GetLevel());
  var nextLevel = startingLevel+1;
  var percentage = ( parseInt(GetXP())- parseInt(globalXpLevel[startingLevel]))/( parseInt(globalXpLevel[nextLevel])- parseInt(globalXpLevel[startingLevel]));
  return percentage*100;
}

function GetXPPercentage()
{
  var startingLevel = parseInt(GetLevel());
  var nextLevel = startingLevel+1;
  var currentXP = parseInt(GetXP())- parseInt(globalXpLevel[startingLevel]);
  var endXP = parseInt(globalXpLevel[nextLevel])- parseInt(globalXpLevel[startingLevel]);
  return currentXP + " / " + endXP;
}


function GetXPPercentageBefore()
{

}

function GetXPPercentageAfter()
{

}

function DebugClear()
{
  Cookies.remove('xp');
  Cookies.remove('pendingXP');
  for (var key in globalXpDict)
  {
    Cookies.remove(key);
  }
}

console.log("Current XP:"+GetXP()+" Current Level:"+GetLevel());
window.onload = function(e){
  var progressBar = document.getElementById("xpProgressContent");
  var progressBarContainer = document.getElementById("xpProgress");
  var levelContainer = document.getElementById("levelContainer");
  var scoreWrapper = document.getElementById("scoreWrapper");
  var loadingHolder = document.getElementById("loadingHolder");
  var xpCount = document.getElementById("xpCount");

  //progressBarContainer.style.display = "block";
  levelContainer.innerHTML="Level "+GetLevel();
  $('#xpProgressContent').css('transition','0.1s');
  progressBar.style.width = (GetPercentageInLevel())+'%';
  scoreWrapper.style.display= "flex";
  scoreWrapper.style.opacity = "1";
  loadingHolder.style.opacity = "0";
  xpCount.innerHTML = GetXPPercentage();


    setTimeout(function() {
        if(GetPendingXP() > 0)
        {
          //progressBar.css('background-image', "linear-gradient(to bottom, #ffc522, #581e46)");
          $('#xpProgressContent').css('background-image', "linear-gradient(to bottom, #ffbb22, #581e46)");

            setTimeout(function() {
              var prevLevel = GetLevel();
              AddXPAmount(GetPendingXP());
              ClearPendingXP();
              if(GetLevel()==prevLevel)
              {
                  $('#xpProgressContent').css('transition',('0.4s linear');
                progressBar.style.width = (GetPercentageInLevel())+'%';
                levelContainer.innerHTML="Level "+GetLevel();
                xpCount.innerHTML = GetXPPercentage();
                $('#xpProgressContent').css('background-image', "linear-gradient(to bottom, #ff22b2, #581e46)");
              }
              else {
                progressBar.style.width = '100'%';
                levelContainer.innerHTML="Level "+GetLevel();
                setTimeout(function() {
                    $('#xpProgressContent').css('transition','0.1s');
                    progressBar.style.width = 0;
                    $('#xpProgressContent').css('transition',('0.4s linear');
                    progressBar.style.width = (GetPercentageInLevel())+'%';
                    xpCount.innerHTML = GetXPPercentage();
                    $('#xpProgressContent').css('background-image', "linear-gradient(to bottom, #ff22b2, #581e46)");


                }, 1000);
              }

            }, 1000);
        }
    }, 1000);


}
