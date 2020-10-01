var d2dservice = new D2DServiceClient();
var vid;
var listView;
var listId = 0;
var channelList = [];
var currentChannel = 0;

function init() {
    vid = document.getElementById("myVideo");
    vid.width = window.innerWidth;
    vid.addEventListener("ended", function(){
        vid.play();
    });
    listView = document.getElementById("listView");
    clearChannelList();
    d2dservice.sendMessage("channelList");
}

// TODO:: Developer websocket handling.
// d2dservice.websocket.onopen = function(evt) {}
// d2dservice.websocket.onclose = function(evt) {}
// d2dservice.websocket.onerror = function(evt) {}

function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.id == d2dservice.SERVER) {
    } else {
        if (msg.type == "channelList") {
            channelList = msg.data.channelList;
            for (var i = 0; i < channelList.length; i++) {
                listupChannelList(channelList[i]);
            }
        } else if (msg.type == "playMobile") {
            currentChannel = msg.data.index;
            vid.src = channelList[msg.data.index];
            vid.currentTime = msg.data.time;
            vid.play();
            /*
            vid.oncanplaythrough = function() {
                vid.currentTime = msg.data.time;
                vid.play();
            };
            */
        }
    }
}

////////////////////////////////////////
function playOnTV(currentChannel,currentTime) {
    d2dservice.sendMessage("playTV", {index: currentChannel, time: currentTime});
    vid.pause();
}

function pausePlayOnTV() {
    d2dservice.sendMessage("pausePlayTV");
    vid.pause();
}

function changePosOnTV(value) {
    d2dservice.sendMessage("changePosTV", {timeDiff: value})
    vid.pause();
}


function playOnMobile() {
    d2dservice.sendMessage("playMobile");
}

function playChannel(event) {
    currentChannel = event.target.id;
    vid.src = channelList[event.target.id];
    vid.play();
    /*
    vid.oncanplaythrough = function() {
        vid.play();
    }
    */
}

function listupChannelList(msg) {
    var listView = document.querySelector("#listView");
    var listItem;

    listItem = document.createElement("div");
    listItem.className = "listItem";
    listItem.innerHTML = 'ch. ' + listId;//msg;
    listItem.id = listId++;
    listItem.addEventListener('click', playChannel);
    listView.appendChild(listItem);
}

function clearChannelList() {
    listId = 0;
    while (listView.hasChildNodes()) {
      listView.removeChild(listView.firstChild);
    }
}

window.onload = function() {
    // TODO:: Do your initialization job
	init();
};
