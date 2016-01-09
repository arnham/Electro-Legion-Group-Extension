//DEFUALTS
window.login = true //it better be .-.
window.debouncecheck = "herp"
window.url = 'http://www.roblox.com/My/Groups.aspx?gid=527677'
window.onoroff = false

var settings = {
  baseurl: 'http://www.roblox.com/My/Groups.aspx?gid=',
  el: 527677
}
/*
var options = {
   type: "basic",
   title: "Electro Legion " + window.type + ":",
   message: window.shout,
   iconUrl: 'logo.png',
   priority: 2
};*/

//make features for special groups
//make buttons for raid only shouts exct
//rules: start urls with www.
//start raid with Raid | and blah blah blah

/*
 bugs, notifaction doesnt pop up just in bacjground
 opens a lot of tabs
 doesnt keep old notifactions
*/


//http://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRank&groupid=527677&playerid=46591508

console.log("Running")
//STARTS ONAND NEW EVENT WARNING ON LETA GOOO
// admins pls 1v1 me i will destroy you and ur dog


chrome.storage.sync.get(null, function(obj){   //getting the data from stuff
  console.log('Is it on ' + obj.onoroff)
  window.onoroff = obj.onoroff 
});

chrome.storage.onChanged.addListener(function(changes, namespace){
  for (key in changes){
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
    'Old value was "%s", new value is "%s".',
    key,
    namespace,
    storageChange.oldValue,
    storageChange.newValue);
//-------------------------------------------
    if (key == 'onoroff' && storageChange.newValue == true){
      window.onoroff = true //all ends here ecks deee
    }else if (key == 'onoroff' && storageChange.newValue == false){ //its on boys!!
      window.onoroff = false
    }
//-------------------------------------------
    if (key == 'newevent' && storageChange.newValue == true){
      window.newevent = true
    }else if (key == 'newevent' && storageChange.newValue == false){
      window.newevent = false
    }
//-------------------------------------------
    if (key == 'min5' && storageChange.newValue == true){
      window.min5 = true
    }else if (key == 'min5' && storageChange.newValue == false){
      window.min5 = false
    }
//-------------------------------------------
    if (key == 'min15' && storageChange.newValue == true){
      window.min15 = true
    }else if (key == 'min15' && storageChange.newValue == false){
      window.min15 = false
    }
//-------------------------------------------
    if (key == 'min30' && storageChange.newValue == true){
      window.min30 = true
    }else if (key == 'min30' && storageChange.newValue == false){
      window.min30 = false
    }
//-------------------------------------------
    if (key == 'name'){
      window.name = storageChange.newValue
    }else{
      console.log("No name found")
    }
//-------------------------------------------
  }
});
//chrome.notifications.create(string notificationId, NotificationOptions options, function callback)
//www.roblox.com/Groups/group.aspx?gid=2688011 |
function getdata(){
  if(window.onoroff == false || window.onoroff == null){ //on
    console.log("--------------------------------------------------------------------")
    console.log("--------------------------------------------------------------------")
    //try{
      $.ajax({   //put in a try so when it fails it doesnt explode all over???????
        	//type: "POST",
        	//dataType: 'json',
        url: 'http://www.roblox.com/My/Groups.aspx?gid=527677',
        success: function(data){ 
          window.html = data
          var shout = data.match(/(?:class="StatusTextField linkify">)(.*)(?:<\/span>)/i)
          if(shout[1] == null){
           console.log("welp no shout?")
           setTimeout(getdata, 15000)
           //no shout or something wrong such as not logged in
          }
          //console.log(shout[1]) ///	HAHASDHFASDFASD IT WORKS HAIL HYDRA take that MERELY xdddd
          window.shout = shout[1]
          console.log("Got data string is: " + shout[1])
          //checking for URL and time
          //var URL = shout[1].match(/(www..*.com\/.*\|)/i)
          var URL = shout[1].match(/(www..*.com\S*)/i)
          console.log(URL)
          if(URL == null){
          	console.log("no url")
            window.url = false
          }else{
            console.log("url found" + URL[1])
            window.url = URL[1]
          }
          var minutes = shout[1].match(/(?:Time:\s*)(\S*)(?:.*)(?:\/)/i)
          if(minutes == null){
          	window.minutes = false
          }else{
            console.log(minutes[1])	
            window.minutes = minutes[1]
          }
        window.debounce = window.shout
          //add stuff to get time, and any other variables such as url
          shouttype()
        }
      });
   // }catch(err){

   // }finally{
    //  console.log("Welp internet is off?")
     // setTimeout(getdata, 15000)

    //}
  }else{
  	console.log
    console.log("Not on.")
  }
  setTimeout(getdata, 15000)
  
}

function shouttype(){
  //console.log(window.shout)
  var type = window.shout.match(/(raid.*)(|)/i)
  //console.log(type)
  if(type == null)
  	console.log("Not a raid")
  else{
  	console.log("It is a raid")
  	shoutlogic("raid")
  	return 'raid'; //if raid make it clicakble to raid base
  }

  type = window.shout.match(/(train.*)(|)/i)
  if(type == null)
  	console.log("Not a training")
  else{
  	console.log("It is a training")
  	shoutlogic('training')
  	return 'train';  //if train make it clicakble to training base
  }

  type = window.shout.match(/(defen.*)(|)/i)
  if(type == null)
  	console.log("Not a defence")
  else{
  	console.log("It is a defence")
  	shoutlogic('defence')
  	return 'defence';
  }

  type = window.shout.match(/(rall.*)(|)/i)
  if(type == null)
  	console.log("Not a rally")
  else{
  	console.log("It is a rally")
  	shoutlogic('rally')
  	return 'rally';
  }

  type = window.shout.match(/(anno.*)(|)/i)
  if(type == null)
  	console.log("Not an announcement")
  else{
  	console.log("It is an announcement")
  	shoutlogic('announcement')
  	return 'announcement';
  }

  type = window.shout.match(/(forum.*)(|)/i)
  if(type == null)
  	console.log("Not an forum post")
  else{
  	console.log("It is a forum post")
  	shoutlogic('forum')
  	return 'forum';
  }

  shoutlogic('unknown')
  return 'unknown';
}

//add sounds to notifcation

function shoutlogic(x){
  console.log(x)
  //window.shoutold1 = window.shout
  if(window.debouncecheck != window.debounce){
    window.debouncecheck = window.debounce
    if("raid" == x){
      window.type = 'Raid'
      createshout()
    }else if('training' == x){
      window.type = 'Training'       //no this isnt redudent dont tell me how to live my life
      createshout()
    }else if('rally' == x){
      window.type = 'Rally'
      createshout()
    }else if('defence' == x){
      window.type = 'Defence'
      createshout()
    }else if('announcement' == x){
      window.type = 'Announcement'
      createshout()
    }else if('forum' == x){
      window.type = 'Forum'
      createshout()
    }else if('unknown' == x){
      window.type = 'Shout'
      createshout()
    }
  }else{
    console.log("Old shout. Not creating new notifaction.") //old die pls die

  }
}
//milliseconds = minutes x 60,000
function createshout(){
  console.log("Creating " + window.type +  " shout.")
  var audio = new Audio('/lib/sound/ding.mp3'); //ding ding asshole
  audio.play();

  chrome.notifications.create(window.type, {
    type: "basic",
    title: "Electro Legion " + window.type + ":",
    message: window.shout,
    iconUrl: 'logo.png',
    priority: 2
  }); 
}

chrome.notifications.onClicked.addListener(function(){
  if(window.url != false){
    chrome.tabs.create({url: 'http://' + window.url});
  }else{
    chrome.tabs.create({url: 'http://www.roblox.com/My/Groups.aspx?gid=527677'});
  }
});


function start(){
  if(window.onoroff == false || window.onoroff == null){ //on
  	console.log("Extension is turned on.")
    getdata()
  }else{
  	console.log(window.onoroff)
  	console.log("Extension is turned off.")
    setTimeout(start, 5000)
  }
}
start()




//dont look past this point xd


/*
function training(){
  console.log("Creating raid shout.")
  window.type = 'Raid'
  url = 'www.roblox.com' //get from shout if none found make it nonclickable
  chrome.notifications.create('', {
    type: "basic",
    title: "Electro Legion " + window.type + ":",
    message: window.shout,
    iconUrl: 'logo.png',
    priority: 2
  }); 
}

function rally(){
  console.log("Creating raid shout.")
  window.type = 'Raid'
  url = 'www.roblox.com' //get from shout if none found make it nonclickable
  chrome.notifications.create('', {
    type: "basic",
    title: "Electro Legion " + window.type + ":",
    message: window.shout,
    iconUrl: 'logo.png',
    priority: 2
  }); 
}

function defence(){
  console.log("Creating raid shout.")
  window.type = 'Raid'
  url = 'www.roblox.com' //get from shout if none found make it nonclickable
  chrome.notifications.create('', {
    type: "basic",
    title: "Electro Legion " + window.type + ":",
    message: window.shout,
    iconUrl: 'logo.png',
    priority: 2
  }); 
}

function announcement(){
  console.log("Creating raid shout.")
  window.type = 'Raid'
  url = 'www.roblox.com' //get from shout if none found make it nonclickable
  chrome.notifications.create('', {
    type: "basic",
    title: "Electro Legion " + window.type + ":",
    message: window.shout,
    iconUrl: 'logo.png',
    priority: 2
  }); 
}

function forum(){
  console.log("Creating raid shout.")
  window.type = 'Raid'
  url = 'www.roblox.com' //get from shout if none found make it nonclickable
  chrome.notifications.create('', {
    type: "basic",
    title: "Electro Legion " + window.type + ":",
    message: window.shout,
    iconUrl: 'logo.png',
    priority: 2
  }); 
}

function unknown(){
  console.log("Creating raid shout.")
  window.type = 'Raid'
  url = 'www.roblox.com' //get from shout if none found make it nonclickable
  chrome.notifications.create('', {
    type: "basic",
    title: "Electro Legion " + window.type + ":",
    message: window.shout,
    iconUrl: 'logo.png',
    priority: 2
  });
  if(window.url != null){
  	// bye bye url time to get replaced (isnt this kinda needless though??)
    window.url = null
  }
  if(window.minutes !=null){
  	setTimeout(startTheClockAhmed(window.minutes)), //setting option timer dont use time from shout =spam)
  	window.minutes = null
  }
}
currentTime = new Date()
console.log(currentTime)

function startTheClockAhmed(minutes){    //boom xdroasted
  if(window.name == 'terrorist'){
     console.log('boom goes the clock')
  }
  

  


}
*/



/*


    $.ajax({ url: 'http://www.roblox.com/My/Groups.aspx?gid=527677',
      success: function(data){ 
      	shoutsort = /(?:)class="StatusTextField linkify">(.+)(?:<)/i
        var shout = shoutsort.exec(MyString);
        
      } 
   });

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
});


	chrome.notifications.create('shout', "basic", function callback)

var opt = {
   type: "basic",
   title: "Deploy",
   message: "It worked!",
   iconUrl: "icon.png"
};

chrome.notifications.create("", opt, function(id) {
   console.error(chrome.runtime.lastError);
});
    $.ajax({ url: 'http://www.roblox.com/My/Groups.aspx?gid=527677',
      success: function(data){ 
        window.html = data
        var shout = data.exec(/(?:class="StatusTextField linkify">).+(?:<)/i);
        window.shout = shout
        console.log(window.shout)
      } 
   });
    





*/