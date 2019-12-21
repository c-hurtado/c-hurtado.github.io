
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

function GetXPPercentageBefore()
{

}

function GetXPPercentageAfter()
{

}


console.log("Current XP:"+GetXP()+" Current Level:"+GetLevel());
window.onload = function(e){
  var progressBar = document.getElementById("xpProgressContent");
  var progressBarContainer = document.getElementById("xpProgress");
  var levelContainer = document.getElementByID("levelContainer");
  //progressBarContainer.style.display = "block";
  progressBarContainer.style.width="60%";
  progressBar.style.width = (GetPercentageInLevel())+'%';
    setTimeout(function() {
        AddXPAmount(GetPendingXP());
        ClearPendingXP();
        progressBar.style.width = (GetPercentageInLevel())+'%';
        levelContainer.innerHTML="Level "+GetLevel();
        console.log("Current XP:"+GetXP()+" Current Level:"+GetLevel());
      //your code to be executed after 1 second
    }, 1000);


}
