//DEFUALTS
window.check = null;
window.shout = null;
window.debouncecheck = "herp";
window.url = 'http://www.roblox.com/My/Groups.aspx?gid=10880';
var x = 10880;

/*------------------------------------------------------------------------*/

var config = {
	baseurl: 'http://www.roblox.com/My/Groups.aspx?gid=',
	spam: x
};

/*------------------------------------------------------------------------*/

chrome.storage.sync.get("onoroff", function(obj){
    console.log(obj);
    window.onoroff = obj.onoroff;
});
chrome.storage.sync.get("newevent", function(obj){
    console.log(obj);
    window.newevent = obj.newevent;
});
chrome.storage.sync.get("onStartup", function(obj){
    console.log(obj);
    window.onStartup = obj.onStartup;
});
chrome.storage.sync.get("sound", function(obj){
    console.log(obj);
    window.sound = obj.sound;
});
chrome.storage.sync.get("name", function(obj){
    console.log(obj);
    window.name = obj.name;
});

/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/

chrome.storage.onChanged.addListener(function(changes, namespace){
	for (key in changes){
		var storageChange = changes[key];
		console.log('Key changed. Updating settings.');
			console.log(changes + namespace);
			storageChange.oldValue,
			storageChange.newValue;
		if (key == 'onoroff' && storageChange.newValue == true){
			window.onoroff = true
		}else if (key == 'onoroff' && storageChange.newValue == false){
			window.onoroff = false
		}
		if (key == 'newevent' && storageChange.newValue == true){
			window.newevent = true
		}else if (key == 'newevent' && storageChange.newValue == false){
			window.newevent = false
		}
		if (key == 'onStartup' && storageChange.newValue == true){
			window.onStartup = true
		}else if (key == 'onStartup' && storageChange.newValue == false){
			window.onStartup = false
		}
		if (key == 'sound' && storageChange.newValue == true){
			window.sound = true
		}else if (key == 'sound' && storageChange.newValue == false){
			window.sound = false
		}
		if (key == 'name'){
			window.name = storageChange.newValue
		}else{
			console.log("No name found")
		}
	}
});

/*------------------------------------------------------------------------*/

function getdata(){
	try{
		window.online = navigator.onLine;
		console.log(window.online);
		if(window.online == true){
			if (window.onoroff == true || window.onoroff == null) { //on
				$.ajax({   //put in a try so when it fails it doesnt explode all over???????
					url: 'http://www.roblox.com/My/Groups.aspx?gid=' + config.spam,
					success: function (data){
						window.html = data;
						var shout = data.match(/(?:class="StatusTextField linkify">)(.*)(?:<\/span>)/i);
						var name = data.match(/(?:\d\/profile" style="font-style: italic;">)(.*)(?:<)/i);
						var id = data.match(/(?:<a id="ctl00_cphRoblox_GroupStatusPane_StatusPoster" href="http:\/\/www\.roblox\.com\/users\/)(\d+)(?:\/profile")/i);
						window.id = id[1];
						window.name = name[1];
						console.log(shout);
						console.log(window.id);
						console.log(window.name);
						$.ajax({   //put in a try so when it fails it doesnt explode all over???????
							url: 'http://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&groupid=' + config.spam + '&playerid=' + window.id,
							success: function (rank) {
								window.rank = rank;
								if (shout == null) {
									console.log("No shout found.");
									//no shout or something wrong such as not logged in
									setTimeout(getdata, 5000);
								}else{
									if (window.shout == null) { //first time run
										console.log("window shout was null");
										window.check = shout[1]
									}
									if (true == true) { //yes i know but didnt want to restructure
										if (window.onStartup == false && window.check == shout[1]) {
											console.log("no shout on startup and old shout");
											window.shout = 'dog';
											setTimeout(getdata, 5000);
										}else{
											window.shout = shout[1];
											window.check = "i hate candy"
											console.log("Got data string is: " + shout[1]);
											//checking for URL and time
											//var URL = shout[1].match(/(www..*.com\/.*\|)/i)
											var URL = shout[1].match(/(www..*.com\S*)/i);
											if (URL == null) {
												console.log("No URL found in shout");
												window.url = false
											}else{
												console.log("Url found in shout: " + URL[1]);
												window.url = URL[1]
											}
											var minutes = shout[1].match(/(?:Time:\s*)(\S*)(?:.*)(?:\/)/i);
											if (minutes == null) {
												window.minutes = false
											} else {
												console.log(minutes[1]);
												window.minutes = minutes[1]
											}
											window.debounce = window.shout;
											//add stuff to get time, and any other variables such as url
											shouttype()
										}
									}else{
										console.log("rip everyone")
									}
								}
							},
						error: function(req, stat, err){
							console.log('Error... Request: ' + req + ' Status: ' + stat + ' Error: ' + err);
							setTimeout(getdata, 5000);
						}
					});
					},
					error: function(req, stat, err){
						console.log('Error... Request: ' + req + ' Status: ' + stat + ' Error: ' + err);
						setTimeout(getdata, 5000);
					}
				});	
			}else{
				console.log("Not turned on.");
				setTimeout(getdata, 5000);
			}
		}else{
			console.log('Error: user offline');
			setTimeout(getdata, 5000);
		}
	}catch(err){
			console.log("Error is: " + err)
			setTimeout(getdata, 5000);
	}
}
/*------------------------------------------------------------------------*/

function shouttype() {
    //console.log(window.shout)
    var type = window.shout.match(/(raid.*)(|)/i);
    //console.log(type)
    if (type == null) {
    //console.log("Not a raid")
    }else{
		//console.log("It is a raid")
		shoutlogic("raid");
		return 'raid'; //if raid make it clicakble to raid base
	}

	type = window.shout.match(/(train.*)(|)/i);
	if(type == null){
        //console.log("Not a training")
    }else{
        //console.log("It is a training")
		shoutlogic('training');
		return 'train';  //if train make it clicakble to training base
	}

	type = window.shout.match(/(defen.*)(|)/i);
	if(type == null){
     //console.log("Not a defence")
    }else{
		//console.log("It is a defence");
		shoutlogic('defence');
		return 'defence';
	}

	type = window.shout.match(/(rall.*)(|)/i);
	if(type == null){
        //console.log("Not a rally")
    }else{
        //console.log("It is a rally")
		shoutlogic('rally');
		return 'rally';
	}

	type = window.shout.match(/(anno.*)(|)/i);
	if(type == null){
        //console.log("Not an announcement")
    }else{
        //console.log("It is an announcement")
		shoutlogic('announcement');
		return 'announcement';
	}

	type = window.shout.match(/(forum.*)(|)/i);
	if(type == null){
        //console.log("Not an forum post")
    }else{
        //console.log("It is a forum post")
		shoutlogic('forum');
		return 'forum';
	}

	shoutlogic('unknown');
	return 'unknown';
}

/*------------------------------------------------------------------------*/

function shoutlogic(x){
    //console.log(x)
	//window.shoutold1 = window.shout
	if(window.debouncecheck != window.debounce){
		window.debouncecheck = window.debounce;
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
		console.log("Old shout. Not creating new notification.") //old die pls die
        console.log("=============================================");
        setTimeout(getdata, 5000);
	}
}

/*------------------------------------------------------------------------*/

function createshout(){
	console.log("Creating " + window.type +  " shout.")
	if(window.sound == true){
		var audio = new Audio('/lib/sound/ding.mp3'); //ding ding asshole
		audio.play();
	}
	chrome.notifications.create(window.type, {
		type: "basic",
		title: "Electro Legion " + window.type + ":",
		message: window.shout + '\n' + 'Shouter: ' + window.name + '(' + window.rank + ')',
		iconUrl: 'logo.png',
		priority: 2
	});
    console.log("=============================================");
    setTimeout(getdata, 5000);
}

chrome.notifications.onClicked.addListener(function(){
	if(window.url != false){
		chrome.tabs.create({url: 'http://' + window.url});
	}else{
		chrome.tabs.create({url: 'http://www.roblox.com/My/Groups.aspx?gid=527677'});
	}
});

/*------------------------------------------------------------------------*/

function start(){
    console.log("=============================================");
	if(window.onoroff == true || window.onoroff == null){ //on
		console.log("Extension is turned on.");
        console.log(window.onoroff);
        setTimeout(getdata, 5000);
	}else{
		console.log(window.onoroff);
		console.log("Extension is turned off.");
        console.log("=============================================");
        setTimeout(start, 5000);
	}
}

/*------------------------------------------------------------------------*/
setTimeout(start, 800);