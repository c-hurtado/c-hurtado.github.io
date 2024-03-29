
var globalXpDict = {};
globalXpDict["art"]                   = [100, "Visited ART: "];
globalXpDict["gamedev"]               = [100, "Visited GAME DEVELOPMENT: "];
globalXpDict["thoughts"]              = [100, "Visited THOUGHTS: "];
globalXpDict["contact"]               = [100, "Visited CONTACT ME: "];
globalXpDict["about"]                 = [100, "Visited ABOUT ME: "];
//globalXpDict["leaderboards"]          = [100, "You visited the Leaderboard page for the first time"];
globalXpDict["menu"]                  = [100, "Used MENU: "];
globalXpDict["home"]                  = [100, "Pressed HOME button: "];
globalXpDict["social_email"]          = [50, "Pressed EMAIL button: "];
globalXpDict["social_twitter"]        = [50, "Pressed TWITTER button: "];
globalXpDict["social_linkedIn"]       = [50, "Pressed LINKEDIN button: "];
globalXpDict["social_instagram"]      = [50, "Pressed INSTAGRAM button: "];
globalXpDict["social_gitHub"]         = [50, "Pressed GITHUB button: "];
globalXpDict["social_rss"]            = [50, "Pressed RSS button: "];
globalXpDict["logo"]                  = [100, "Pressed LOGO: "];
globalXpDict["synthwave"]             = [100, "Opened SYNTHWAVE MUSIC: "];
//globalXpDict["art_open_figureDrawing"]= [100, "Art"];
//globalXpDict["art_open_figureDrawing"]= [100, "Art"];
//globalXpDict["art_open_3Drender"]     = [100, "Art"];
globalXpDict["contact_resume"]        = [100, "Art"];
globalXpDict["thoughts_post"]         = [100, "Art"];
//globalXpDict["dot"]                  =  [100, "Clicked on DOT: "];
globalXpDict["demo"]                  = [50, "Used DEMO link: "];
globalXpDict["face"]                  = [100, "Clicked on MY FACE: "];
globalXpDict["resume"]                  = [150, "Downloaded my resume: "];

globalUnlockData = {}
globalUnlockData["secret_home"]=[1,"<i class=\"fa fa-lock lockColor\"></i><br/>Requires 1 <i class=\"fa fa-key starColor\"></i>", "<i class=\"fa fa-unlock lockColor\"></i> Unlocked!<hr>A good way to enjoy this site is by listening to some <a target=\"blank\" onClick=\"AddXPFromSourceNow('synthwave')\" href=\"https://www.youtube.com/watch?v=AGCluKbW1AY\">Synthwave Music <i class=\"fa fa-music\"></i> </a>."];
globalUnlockData["secret_about_1"]=[3,"<i class=\"fa fa-lock lockColor\"></i><br/>Requires 2 <i class=\"fa fa-key starColor\"></i>", "<i class=\"fa fa-unlock lockColor\"></i> Unlocked!<hr><img src='https://c-hurtado.github.io/assets/img/baby91.jpg'>"];
globalUnlockData["secret_about_2"]=[3,"<i class=\"fa fa-lock lockColor\"></i><br/>Requires 3 <i class=\"fa fa-key starColor\"></i>", "<i class=\"fa fa-unlock lockColor\"></i> Unlocked!<hr><img src='https://c-hurtado.github.io/assets/img/baby91.jpg'>"];
globalUnlockData["secret_about_hobbies"]=[2,
  "<div class=\"secretwide\"><i class=\"fa fa-lock lockColor\"></i><br/>Requires 2 <i class=\"fa fa-key starColor\"></i></div>",
  "<div class=\"secretwide\"><i class=\"fa fa-unlock lockColor\"></i> Unlocked!</div><br/>I have an absolutely eclectic set of interests. Here are some: <ul><li><a href=\"https://www.carloshurtado.com/all-started-with-a-dungeon-run/\">Dungeon Run</a>: One of my favorite shows. Its a D&D show, but with a lot of heart. I wrote a review of it here.</li><li><a href=\"http://weirdal.com/\">Weird Al Yankovic</a>: I've been to about 7 of his concerts! </li><li><a href=\"https://palace-games.com/\">Escape Rooms</a>: Me and my friends try to organize escape room outings as much as possible. I love solving puzzles. Not necesarilly great at it though.</li><li><a href=\"https://en.wikipedia.org/wiki/Running_Man_(TV_series)\">Running Man</a>: One of my top shows of all time. I've watched it (and still watch it) for about 9 years, weekly. I can say I've spent countless hours watching it, and I still laugh out loud at every new episode.</li><li><a href=\"https://www.teamgaki.com/\">Gaki No Tsukai</a>: Every year I wait for the translation of this Punishment Game. Comedians all over japan team up to make the comedy elite laugh. If they do, they get punished.</li><li><a href=\"https://www.baronfig.com/\">Baron Fig</a>: I really love this stationery company. I keep buying their products.</li></ul>"];
globalUnlockData["secret_about_personal"]=[3,
  "<div class=\"secretwide\"><i class=\"fa fa-lock lockColor\"></i><br/>Requires 3 <i class=\"fa fa-key starColor\"></i></div>",
  "<div class=\"secretwide\"><i class=\"fa fa-unlock lockColorc\"></i> Unlocked!</div><br/>You can read a more cheesy recap of my life here: <a href='https://www.carloshurtado.com/backstory'>Backstory</a>"];
globalUnlockData["secret_about_site"]=[4,
  "<div class=\"secretwide\"><i class=\"fa fa-lock lockColor\"></i><br/>Requires 4 <i class=\"fa fa-key starColor\"></i></div>",
  "<div class=\"secretwide\"><i class=\"fa fa-unlock lockColor\"></i> Unlocked!</div>You worked hard and unlocked this section. This site was made with javascript and CSS. I started it with the Moon Theme for Jekyll. I am using Github pages to host it, meaning it's a static website. Therefore Cookies were the easiest way to keep information"];

var globalXpLevel = {};
globalXpLevel[0] = 0;
globalXpLevel[1] = 200;
globalXpLevel[2] = 400;
globalXpLevel[3] = 700;
globalXpLevel[4] = 1100;
globalXpLevel[5] = 1400;

function typeWriter(id,txt, speed, i, attachString) {
  if (i < txt.length) {
    document.getElementById(id).innerHTML += txt.charAt(i);

    setTimeout(typeWriter, speed, id, txt, speed, i+1, attachString);
  }
  else {
    if(attachString!="")
    {
      document.getElementById(id).innerHTML += attachString;
    }
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

function messWithBG()
{
    //$(.css('background-image', "linear-gradient(to right, #ff22b2, #ffb400)");

}
//changes the score data.
function refreshContent()
{
  if(Cookies.get('demo') == undefined)
  {
    if(document.getElementById("gamenotice")!= null)
    {
      document.getElementById("gamenotice").innerHTML = "<p class=\"notice\">Dig around this site and collect <i class=\"fa fa-star  keyColor\"></i> !<br/>Get enough to trade for <i class=\"fa fa-key starColor\"></i> and unlock secret content.</br>Click <a href=\"#\" onClick=\"AddXPFromSourceNow('demo')\">here</a> to get 50 <i class=\"fa fa-star keyColor\"></i> to get you started. Enjoy!</p>";

    }
  }
  else {
      if(document.getElementById("gamenotice")!= null){
        document.getElementById("gamenotice").innerHTML = "";
      }
  }

  if(!navigator.cookieEnabled)
  {
    return;
  }
  var progressBar = document.getElementById("xpProgressContent");
  var progressBarContainer = document.getElementById("xpProgress");
  var levelContainer = document.getElementById("levelContainer");
  var scoreWrapper = document.getElementById("scoreWrapper");
  var loadingHolder = document.getElementById("loadingHolder");
  var xpCount = document.getElementById("xpCount");
  var pendingXPHolder = document.getElementById("pendingXP");
  var newKeyHolder = document.getElementById("newKey");
    $('#xpProgressContent').css('transition','0.1s');
    progressBar.style.width = (GetPercentageInLevel())+'%';
    scoreWrapper.style.display= "flex";
    scoreWrapper.style.opacity = "1";
    loadingHolder.style.opacity = "0";
    xpCount.innerHTML = GetXPPercentage()+ " <i class='fa fa-star keyColor'></i>";
    refreshUnlockedContent();

    var savedPendingXP = GetPendingXP();
      if(savedPendingXP[0] > 0)
      {
          pendingXPHolder.style="display:inline-table";
          pendingXPHolder.innerHTML = "";
          pendingXPHolder.style.opacity = "1";
          typeWriter("pendingXP",savedPendingXP[1]+ "+ "+savedPendingXP[0],30,0,"  <i class='fa fa-star'></i>");
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
                    levelContainer.innerHTML = GetLevel()+" <i class='fa fa-key starColor'></i>";
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

                  xpCount.innerHTML = GetXPPercentage()  +" <i class='fa fa-star keyColor'></i>";
                  $('#xpProgressContent').css('background-image',"linear-gradient(to right, #ff22b2, #7663e0)");
                }
                else {
                  progressBar.style.width = '98%';
                  levelContainer.innerHTML = GetLevel()+" <i class='fa fa-key starColor'></i>";
                  refreshUnlockedContent();
                  setTimeout(function() {
                      $('#xpProgressContent').css('transition','0s');
                      progressBar.style.width = '0%';
                      setTimeout(function()
                      {
                        newKeyHolder.style="display:inline-table";
                        newKeyHolder.style.opacity = "1";


                        $('#xpProgressContent').css('transition','0.4s linear');
                        progressBar.style.width = (GetPercentageInLevel()*0.98)+'%';
                        xpCount.innerHTML = GetXPPercentage() +" <i class='fa fa-star keyColor'></i>";
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
  levelContainer.innerHTML=GetLevel()+" <i class='fa fa-key starColor'></i>";
  refreshContent();
  var counter = 100.0;
  var direction = -1;

setInterval(function(){
    counter = counter+direction*0.1;
    //console.log("Counter:"+counter);
    if(counter > 100.0)
    {
        direction = -1;
    }
    if(counter < 0.0)
    {
        counter = 0.0
        direction = 1;
    }
    //$('body').css('background-image', "linear-gradient(180deg, #fff 0%, #0c0c0ceb 100%),linear-gradient(231.28deg, #e100ff 0%, #000 "+counter+"%),linear-gradient(180deg, #5200FF 0%, #1A0050 "+counter+"%),linear-gradient(341.1deg, red 7.52%, #1700A4 77.98%),radial-gradient(49.82% 80.51% at 49.82% 50%, #5A0069 0%, #FF3D00 100%),radial-gradient(50% 72.12% at 50% 50%, #EB00FF 0%, #105 100%)");
    document.body.style.backgroundImage = "linear-gradient(180deg, #fff 0%, #0c0c0ceb 100%),linear-gradient(231.28deg, #e100ff 0%, #000 "+counter+"%),linear-gradient(180deg, #5200FF 0%, #1A0050 100%),linear-gradient(341.1deg, red 7.52%, #1700A4 77.98%),radial-gradient(49.82% 80.51% at 49.82% 50%, #5A0069 0%, #FF3D00 "+counter+"%),radial-gradient(50% 72.12% at 50% 50%, #EB00FF 0%, #105 100%)";
   }, 10);



}
