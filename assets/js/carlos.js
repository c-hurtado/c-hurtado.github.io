
var globalXpDict = {};
globalXpDict["art"]                   = 100;
globalXpDict["gamedev"]               = 100;
globalXpDict["thoughts"]              = 100;
globalXpDict["contact"]               = 100;
globalXpDict["about"]                 = 100;
globalXpDict["leaderboards"]          = 100;
globalXpDict["menu"]                  = 100;
globalXpDict["home"]                  = 100;
globalXpDict["social_email"]          = 100;
globalXpDict["social_twitter"]        = 100;
globalXpDict["social_linkedIn"]       = 100;
globalXpDict["social_instagram"]      = 100;
globalXpDict["social_gitHub"]         = 100;
globalXpDict["about_tool"]            = 100;
globalXpDict["art_open_portrait"]     = 100;
globalXpDict["art_open_photography"]  = 100;
globalXpDict["art_open_figureDrawing"]= 100;
globalXpDict["art_open_figureDrawing"]= 100;
globalXpDict["art_open_3Drender"]     = 100;
globalXpDict["contact_resume"]        = 100;
globalXpDict["thoughts_post"]         = 100;
globalXpDict["demo"]               = 50;

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
    AddPendingXP(GetXPToAdd(xpSource),xpSource);
    Cookies.set(xpSource, 1);
  }
}

function AddXPFromSourceNow(xpSource)
{
  var cookieInfo = Cookies.get(xpSource);
  if(cookieInfo == undefined)
  {
    var level = GetLevel();
    AddPendingXP(GetXPToAdd(xpSource),xpSource);
    Cookies.set(xpSource, 1);
  }
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


//changes the score data.
function refreshContent()
{
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

    var savedPendingXP = GetPendingXP();
      if(savedPendingXP[0] > 0)
      {
          pendingXPHolder.style="display:inline-table";
          pendingXPHolder.innerHTML = "";
          pendingXPHolder.style.opacity = "1";
          typeWriter("pendingXP","Visited "+savedPendingXP[1]+ ": +"+savedPendingXP[0],50,0);
      }
      else {
        pendingXPHolder.style="display:none";
        pendingXPHolder.innerHTML = "";
      }

      setTimeout(function() {
          if(savedPendingXP[0] > 0)
          {
            //progressBar.css('background-image', "linear-gradient(to bottom, #ffc522, #581e46)");
            $('#xpProgressContent').css('background-image', "linear-gradient(to bottom, #ffbb22, #581e46)");

              setTimeout(function() {
                var prevLevel = GetLevel();
                AddXPAmount(savedPendingXP[0]);
                ClearPendingXP();
                if(GetLevel()==prevLevel)
                {
                    $('#xpProgressContent').css('transition','0.4s linear');
                  progressBar.style.width = (GetPercentageInLevel())+'%';
                  levelContainer.innerHTML = GetLevel()+" <i class='fa fa-star'></i>";

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
                  $('#xpProgressContent').css('background-image', "linear-gradient(to bottom, #ff22b2, #581e46)");
                }
                else {
                  progressBar.style.width = '100%';
                  levelContainer.innerHTML = GetLevel()+" <i class='fa fa-star'></i>";
                  setTimeout(function() {
                      $('#xpProgressContent').css('transition','0s');
                      progressBar.style.width = '0%';
                      setTimeout(function()
                      {
                        $('#xpProgressContent').css('transition','0.4s linear');
                        progressBar.style.width = (GetPercentageInLevel())+'%';
                        xpCount.innerHTML = GetXPPercentage() +" <i class='fa fa-key'></i>";
                        $('#xpProgressContent').css('background-image', "linear-gradient(to bottom, #ff22b2, #581e46)");
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
