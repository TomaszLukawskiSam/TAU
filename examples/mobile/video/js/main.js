var d2dservice = new D2DServiceLocal();
var vid;
var channelList = [
    //"http://media.myhome.com:8000/movie_300.mp4",
    //"http://media.myhome.com:8000/movie.mp4",
    //"http://media.myhome.com:8000/trailer.mp4",
    //"http://media.myhome.com:8000/ThisisCo1961_tiny.mp4",
    "https://ak.picdn.net/shutterstock/videos/1058954246/preview/stock-footage-children-toddlers-run-jumping-play-together-on-a-children-s-swing-in-the-park-happy-brother-and.webm",
    "https://cdn.videvo.net/videvo_files/video/free/2012-07/small_watermarked/hd0936_preview.webm",
    "https://videos.files.wordpress.com/4CjZLK5X/sample-video-1_hd.mp4",
    "http://techslides.com/demos/sample-videos/small.mp4",
    ];

var currentChannel = 0;

function init() {
    vid = document.getElementById("myVideo");
    vid.width = window.innerWidth;
    vid.height = window.innerHeight - 90;
    vid.addEventListener("ended", function(){
        vid.play();
    });
}

// TODO:: Developer websocket handling.
// d2dservice.websocket.onopen = function(evt) {}
// d2dservice.websocket.onclose = function(evt) {}
// d2dservice.websocket.onerror = function(evt) {}

function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.id == d2dservice.SERVER) {
    } else {
        if (msg.type == "channellist") {
            d2dservice.sendMessage("channellist", {channelList: channelList});
        } else if (msg.type == "playtv") {
            currentChannel = msg.data.index;
            vid.src = channelList[msg.data.index];
            vid.currentTime = msg.data.time;
            vid.play();
            /*
            vid.oncanplaythrough = function() {
                vid.play();
            };
            */
        } else if (msg.type == "playmobile") {
            d2dservice.sendMessage("playmobile", {index: currentChannel, time: vid.currentTime});
            vid.pause();
        }
    }
}

////////////////////////////////////////

window.onload = function() {
    // TODO:: Do your initialization job
	init();

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
};
