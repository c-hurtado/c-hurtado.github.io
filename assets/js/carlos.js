
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
globalXpLevel[1] = 200;
globalXpLevel[2] = 400;
globalXpLevel[3] = 700;
globalXpLevel[4] = 1000;
globalXpLevel[5] = 1400;


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
    AddXPAmount(GetXPToAdd(xpSource));
    Cookies.set(xpSource, 1);
    var newLevel = GetLevel();
    if(newLevel != level)
    {
      UpdateLevel(newLevel);
    }
  }
}


console.log("Current XP:"+GetXP()+" Current Level:"+GetLevel());
window.onload = function(e){
  var progressBar = document.getElementById("xpProgressContent");
  var progressBarContainer = document.getElementById("xpProgress");
  progressBar.style.width = (parseInt(GetXP())/1400)+'%';
  console.log(progressBar);
  console.log(progressBar.style.width);
  console.log( (parseInt(GetXP())/1400));
}