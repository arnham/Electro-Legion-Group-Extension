// Saves options to chrome.storage

function save_options() {
  var onoroff = document.getElementById('onoroff').checked;
  var newevent = document.getElementById('newevent').checked;
  var signature = document.getElementById('signature').value;
  var name = document.getElementById('input1').value;
  chrome.storage.sync.set({
    onoroff: onoroff,
    newevent: newevent,
    signature: signature,
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
    onoroff: false,
    newevent: true,
    signature: 'Join Electro Legion: www.roblox.com/My/Groups.aspx?gid=527677',
    name: 'Undefined'
  }, function(items) {
    document.getElementById('onoroff').checked = items.onoroff;
    document.getElementById('newevent').checked = items.newevent;
    document.getElementById('signature').checked = items.signature;
    document.getElementById('input1').value = items.name;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);