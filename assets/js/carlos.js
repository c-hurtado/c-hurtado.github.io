
var globalXpDict = {};
globalXpDict["art"]                   = [100, "You visited the Art page for the first time!"];
globalXpDict["gamedev"]               = [100, "You visited the Game Development page for the first time!"];
globalXpDict["thoughts"]              = [100, "You checked out my blog for the forst time"];
globalXpDict["contact"]               = [100, "You went to the contact page for the first time"];
globalXpDict["about"]                 = [100, "You visited the About Me page for the first time."];
globalXpDict["leaderboards"]          = [100, "You visited the Leaderboard page for the first time"];
globalXpDict["menu"]                  = [100, "You opened the Menu for the first time"];
globalXpDict["home"]                  = [100, "You went back to the main page for the first time"];
globalXpDict["social_email"]          = [100, "You attempted to email me!"];
globalXpDict["social_twitter"]        = [100, "You opened my twitter page"];
globalXpDict["social_linkedIn"]       = [100, "You visited my linked in"];
globalXpDict["social_instagram"]      = [100, "You visited my instagram"];
globalXpDict["social_gitHub"]         = [100, "You visited my GitHub"];
globalXpDict["about_tool"]            = [100, "Art"];
globalXpDict["art_open_portrait"]     = [100, "Art"];
globalXpDict["art_open_photography"]  = [100, "Art"];
globalXpDict["art_open_figureDrawing"]= [100, "Art"];
globalXpDict["art_open_figureDrawing"]= [100, "Art"];
globalXpDict["art_open_3Drender"]     = [100, "Art"];
globalXpDict["contact_resume"]        = [100, "Art"];
globalXpDict["thoughts_post"]         = [100, "Art"];
globalXpDict["demo"]                  = [50, "You clicked on the demo"];

globalUnlockData = {}
globalUnlockData["secret1"]=[1,"<i class=\"fa fa-lock\"></i><br/>You need to have 1 <i class=\"fa fa-star\"></i> to see this content", "Content Unlocked!<br/><img src='https://c-hurtado.github.io/assets/img/baby91.jpg'>"];


var globalXpLevel = {};
globalXpLevel[0] = 0;
globalXpLevel[1] = 200;
globalXpLevel[2] = 510;
globalXpLevel[3] = 760;
globalXpLevel[4] = 1250;
globalXpLevel[5] = 1480;

function typeWriter(id,txt, speed, i) {
  if (i < txt.length) {
    document.getElementById(id).innerHTML += txt.charAt(i);

    setTimeout(typeWriter, speed, id, txt, speed, i+1);
  }
}

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

function AddPendingXP(xpAmount, xpReason)
{
  var pendingXP = Cookies.get('pendingXP');
  if(pendingXP !== undefined)
  {
    var numScore = parseInt(pendingXP);
    numScore = numScore + xpAmount;
    Cookies.remove('pendingXP');
    Cookies.set('pendingXP', ''+ numScore);
    Cookies.remove('pendingReason');
    Cookies.set('pendingReason', xpReason);
  }
  else {
    Cookies.set('pendingXP', xpAmount);
    Cookies.set('pendingReason', xpReason);
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
    var currentReason = Cookies.get('pendingReason');
    var numXP = parseInt(currentXP);
    return [numXP, currentReason];
  }
  return [0,""];
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
      return xpAmount[0];
    }
    return 0;
}
function GetReasonToAdd(xpSource)
{
    var xpAmount = globalXpDict[xpSource];
    if(xpAmount !== undefined)
    {
      return xpAmount[1];
    }
    return xpSource;
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
    AddPendingXP(GetXPToAdd(xpSource),GetReasonToAdd(xpSource));
    Cookies.set(xpSource, 1);
  }
}

function AddXPFromSourceNow(xpSource)
{
  AddXPFromSource(xpSource);
  refreshContent();
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
function CountUp()
{

}


(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);

function refreshUnlockedContent()
{
  for (var key in globalUnlockData)
  {
    var div = document.getElementById(key);
    if (div!= null)
    {
      if(GetLevel()>= globalUnlockData[key][0])
      {
          div.innerHTML = globalUnlockData[key][2];
      }
      else {
          div.innerHTML = globalUnlockData[key][1];

      }
    }
  }
}


//changes the score data.
function refreshContent()
{
  if(Cookies.get('demo') == undefined)
  {
    if(document.getElementById("gamenotice")!= null)
    {
      document.getElementById("gamenotice").innerHTML = "<p class=\"notice\">If you navigate this website you can collect <i class=\"fa fa-key\"></i>! With enough of them, unlock <i class=\"fa fa-star\"></i> and get access to secret content. For example click <a href=\"#\" onClick=\"AddXPFromSourceNow('demo')\">here</a> to get 50 <i class=\"fa fa-key\"></i> Enjoy!</p>";

    }
  }
  else {
      if(document.getElementById("gamenotice")!= null){
        document.getElementById("gamenotice").innerHTML = "";
      }
  }

  var progressBar = document.getElementById("xpProgressContent");
  var progressBarContainer = document.getElementById("xpProgress");
  var levelContainer = document.getElementById("levelContainer");
  var scoreWrapper = document.getElementById("scoreWrapper");
  var loadingHolder = document.getElementById("loadingHolder");
  var xpCount = document.getElementById("xpCount");
  var pendingXPHolder = document.getElementById("pendingXP");
    $('#xpProgressContent').css('transition','0.1s');
    progressBar.style.width = (GetPercentageInLevel())+'%';
    scoreWrapper.style.display= "flex";
    scoreWrapper.style.opacity = "1";
    loadingHolder.style.opacity = "0";
    xpCount.innerHTML = GetXPPercentage()+ " <i class='fa fa-key'></i>";
    refreshUnlockedContent();

    var savedPendingXP = GetPendingXP();
      if(savedPendingXP[0] > 0)
      {
          pendingXPHolder.style="display:inline-table";
          pendingXPHolder.innerHTML = "";
          pendingXPHolder.style.opacity = "1";
          typeWriter("pendingXP",savedPendingXP[1]+ ": +"+savedPendingXP[0],50,0);
      }
      else {
        pendingXPHolder.style="display:none";
        pendingXPHolder.innerHTML = "";
      }

      setTimeout(function() {
          if(savedPendingXP[0] > 0)
          {
            //progressBar.css('background-image', "linear-gradient(to bottom, #ffc522, #581e46)");
            $('#xpProgressContent').css('background-image', "linear-gradient(to right, #ff22b2, #ffb400)");

              setTimeout(function() {
                var prevLevel = GetLevel();
                AddXPAmount(savedPendingXP[0]);
                ClearPendingXP();
                if(GetLevel()==prevLevel)
                {
                    $('#xpProgressContent').css('transition','0.4s linear');
                  progressBar.style.width = (GetPercentageInLevel()*0.98)+'%';
                  if(levelContainer != null)
                  {
                    levelContainer.innerHTML = GetLevel()+" <i class='fa fa-star'></i>";
                  }
                  /*jQuery(function($) {
                    $('.timer').countTo({
                        from: 50,
                        to: 2500,
                        speed: 5000,
                        refreshInterval: 50,
                        onComplete: function(value) {
                            console.debug(this);
                        }
                    });
                });*/

                  xpCount.innerHTML = GetXPPercentage()  +" <i class='fa fa-key'></i>";
                  $('#xpProgressContent').css('background-image',"linear-gradient(to right, #ff22b2, #7663e0)");
                }
                else {
                  progressBar.style.width = '98%';
                  levelContainer.innerHTML = GetLevel()+" <i class='fa fa-star'></i>";
                  refreshUnlockedContent();
                  setTimeout(function() {
                      $('#xpProgressContent').css('transition','0s');
                      progressBar.style.width = '0%';
                      setTimeout(function()
                      {
                        $('#xpProgressContent').css('transition','0.4s linear');
                        progressBar.style.width = (GetPercentageInLevel()*0.98)+'%';
                        xpCount.innerHTML = GetXPPercentage() +" <i class='fa fa-key'></i>";
                        $('#xpProgressContent').css('background-image', "linear-gradient(to right, #ff22b2, #ffb400)");
                      },1000);



                  }, 1000);
                }

              }, 1000);
          }
      }, 1000);
}


console.log("Current XP:"+GetXP()+" Current Level:"+GetLevel());
window.onload = function(e){
  var levelContainer = document.getElementById("levelContainer");
  //progressBarContainer.style.display = "block";
  levelContainer.innerHTML=GetLevel()+" <i class='fa fa-star'></i>";
  refreshContent();

}
