const KeyCode = {
	BACK: 9,
	_1: 10,
	_2: 11,
	_3: 12,
	_4: 13,
	_5: 14,
	_6: 15,
	_7: 16,
	_8: 17,
	_9: 18,
	_0: 19,
	RETURN: 36,
	HOME: 71,
	VOLUME_DOWN: 75,
	VOLUME_UP: 76,
	CHANNEL_DOWN: 95,
	CHANNEL_UP: 96,
	UP: 111,
	LEFT: 113,
	RIGHT: 114,
	DOWN: 116,
	//POWER: 124,
	EXIT: 182,
};

var websocket;

(function () {
	var page = document.getElementById("open-control-app-1");

	function onPageShow() {
		var x = window.innerWidth / 2;
		var y = window.innerHeight / 2;

		var id;
		var SERVER = -1;
		var link = document.location.href;
		var pkgId = "2FUI52kIJP";
		var wsUri = "ws://" + link.split("/")[2] + "/" + pkgId;

		websocket = new WebSocket(wsUri);
		websocket.onmessage = function(evt) {
			var json = JSON.parse(evt.data);
			if (json.id == SERVER && json.type == "id")
				id = json.data;
		};

		function sendMessage(type, data) {
			var packet = {type: type, data: data, id: id};
			websocket.send(JSON.stringify(packet));
		}

		var volup= page.querySelector(".app-btn-icon-volume-up"),
			voldown= page.querySelector(".app-btn-icon-volume-down"),
			channelup= page.querySelector(".app-btn-icon-channel-up"),
			channeldown= page.querySelector(".app-btn-icon-channel-down"),
			up= page.querySelector(".app-4way-btn-up"),
			down= page.querySelector(".app-4way-btn-down"),
			right= page.querySelector(".app-4way-btn-right"),
			left= page.querySelector(".app-4way-btn-left"),
			enter= page.querySelector(".app-btn-enter"),
			home= page.querySelector(".app-btn-home"),
			backward= page.querySelector(".app-btn-backward"),
			touchpad= page.querySelector(".app-4way-touchpad"),
			num1 = page.querySelector(".app-num-pad-1"),
			num2 = page.querySelector(".app-num-pad-2"),
			num3 = page.querySelector(".app-num-pad-3"),
			num4 = page.querySelector(".app-num-pad-4"),
			num5 = page.querySelector(".app-num-pad-5"),
			num6 = page.querySelector(".app-num-pad-6"),
			num7 = page.querySelector(".app-num-pad-7"),
			num8 = page.querySelector(".app-num-pad-8"),
			num9 = page.querySelector(".app-num-pad-9"),
			num0 = page.querySelector(".app-num-pad-0"),
			mediaProgress = page.querySelector(".app-media-progress input"),
			progressHandler = page.querySelector(".app-media-progress .ui-slider-handler"),
			labelMin = page.querySelector(".app-media-progress .ui-slider-label-min"),
			labelMax = page.querySelector(".app-media-progress .ui-slider-label-max");

		volup.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.VOLUME_UP});
		});
		voldown.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.VOLUME_DOWN});
		});
		channelup.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.CHANNEL_UP});
		});
		channeldown.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.CHANNEL_DOWN});
		});
		up.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.UP});
		});
		down.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.DOWN});
		});
		right.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.RIGHT});
		});
		left.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.LEFT});
		});
		enter.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.RETURN});
		});
		backward.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.BACK});
		});
		home.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode.HOME});
		});
		num1.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._1});
		});
		num2.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._2});
		});
		num3.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._3});
		});
		num4.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._4});
		});
		num5.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._5});
		});
		num6.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._6});
		});
		num7.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._7});
		});
		num8.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._8});
		});
		num9.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._9});
		});
		num0.addEventListener("click", function () {
			sendMessage("keypress", {keycode: KeyCode._0});
		});

		var ontouch = function (ev) {
			switch (ev.type) {
				case "click" :
					sendMessage("click");
					break;
				case "touchstart" :
					x = ev.touches[0].pageX;
					y = ev.touches[0].pageY;
					break;
				case "touchmove" :
					ev.stopPropagation();
					// lock the default web engine behaviour eg. scrolling
					ev.preventDefault();
					sendMessage("touchmove", {x: ev.touches[0].pageX - x, y: ev.touches[0].pageY - y});
					x = ev.touches[0].pageX;
					y = ev.touches[0].pageY;
					break;
				case "touchend" :
					break;
			}
		},
		onProgressTouchmove = function (ev) {
			// lock the section change event listener
			ev.stopPropagation();
		},
		onProgressInput = function () {
			progressHandler.setAttribute("data-value", toTimeString(this.value));
		},
		toTimeString = function (value) {
			return Math.floor(value / 60) + ":" +
				((value % 60 < 10) ? ("0" + value % 60) : value % 60);
		};

		tau.event.on(touchpad, ["click", "touchstart", "touchmove", "touchend"], ontouch);
		tau.event.on(mediaProgress, ["touchmove"], onProgressTouchmove);
		tau.event.on(mediaProgress, ["input"], onProgressInput);

		// update slider labels
		labelMin.innerText = toTimeString(mediaProgress.min);
		labelMax.innerText = toTimeString(mediaProgress.max);
		progressHandler.setAttribute("data-value", toTimeString(mediaProgress.value));
	};

	function onPageHide() {
		websocket.close();
		if (volup) volup.removeEventListener("click");
		if (voldown) voldown.removeEventListener("click");
		if (channelup) channelup.removeEventListener("click");
		if (channeldown) channeldown.removeEventListener("click");
		if (up) up.removeEventListener("click");
		if (down) down.removeEventListener("click");
		if (right) right.removeEventListener("click");
		if (left) left.removeEventListener("click");
		if (enter) enter.removeEventListener("click");
		if (backward) backward.removeEventListener("click");
		if (home) home.removeEventListener("click");
		if (touchpad) {
			touchpad.removeEventListener("click");
			touchpad.removeEventListener("touchstart");
			touchpad.removeEventListener("touchmove");
			touchpad.removeEventListener("touchend");
		}
	};

	page.addEventListener("pagebeforeshow", onPageShow);
	page.addEventListener("pagebeforehide", onPageHide);
}());