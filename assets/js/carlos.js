
var globalXpDict = {};
globalXpDict["art"] = 100;
globalXpDict["gamedev"] = 100;
globalXpDict["thoughts"] = 100;
globalXpDict["contact"] = 100;

var globalXpLevel = {};
globalXpLevel[0] = 0;
globalXpLevel[1] = 100;
globalXpLevel[2] = 200;
globalXpLevel[3] = 300;

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
  var currentXp = GetXP();
  var lastValue = 0;
  for (var key in globalXpLevel)
  {
    var value = globalXpLevel[key];
    if (value > currentXP)
    {
      return lastValue;
    }
    lastValue = value;
  }
  return lastValue;
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

function AddXPFromSource(xpSource, xpMap)
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
AddXPFromSource("art");
AddXPFromSource("gamedev");
AddXPFromSource("invalid");
console.log("After XP:"+GetXP()+" After Level:"+GetLevel());
