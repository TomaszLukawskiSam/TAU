/* global tau */
var card = document.querySelector(".app-video-service");

function playOnTV(mediaId) {
	tau.event.trigger(card, "webclip-message", {
		action: "play",
		media: mediaId
	});
}