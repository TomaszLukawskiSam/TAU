/* global tau */
var card = document.querySelector(".app-video-service");

function playOnDevice(mediaId) {
	tau.event.trigger(card, "webclip-message", {
		remoteui: true,
		action: "play",
		media: mediaId
	});
} 
