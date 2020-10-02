
(function () {
	var d2dservice = new D2DServiceClient(),
		card;

	function init() {
		var playStop = card.querySelector(".app-play"),
			rewindBackward10 = card.querySelector(".app-rewind-backward-10"),
			rewindForward10 = card.querySelector(".app-rewind-forward-10"),
			previousVideo = card.querySelector(".app-previous-video"),
			nextVideo = card.querySelector(".app-next-video");

		playStop.addEventListener("vclick", function () {
			d2dservice.sendMessage("pausePlayTV", {});
		});
		rewindBackward10.addEventListener("vclick", function () {
			d2dservice.sendMessage("changePosTV", {timeDiff: -10});
		});
		rewindForward10.addEventListener("vclick", function () {
			d2dservice.sendMessage("changePosTV", {timeDiff: 10});
		});
		previousVideo.addEventListener("vclick", function () {
			d2dservice.sendMessage("previous-video", {});
		});
		nextVideo.addEventListener("vclick", function () {
			d2dservice.sendMessage("next-video", {});
		});
	}

	document.addEventListener("cardcontentchange", function (ev) {
		if (ev.target.id === "app-video-control") {
			card = ev.target;
			init();
		}
	});
})();
