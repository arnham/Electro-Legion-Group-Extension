// Saves options to chrome.storage

function save_options() {
	var onoroff = document.getElementById('onoroff').checked;
	var onStartup = document.getElementById('onStartup').checked;
	var newevent = document.getElementById('newevent').checked;
	var sound = document.getElementById('sound').checked;
	var name = document.getElementById('input1').value;
	chrome.storage.sync.set({
		onoroff: onoroff,
        onStartup: onStartup,
		newevent: newevent,
		sound: sound,
		name: name
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Settings Saved';
		setTimeout(function() {
			status.textContent = '';
		}, 1750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
		onoroff: true,
        onStartup: true,
		newevent: true,
        sound: true,
		name: 'Enter Name Here'
	}, function(items) {
		document.getElementById('onoroff').checked = items.onoroff;
        document.getElementById('onStartup').checked = items.onStartup;
		document.getElementById('newevent').checked = items.newevent;
		document.getElementById('sound').checked = items.sound;
		document.getElementById('input1').value = items.name;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);