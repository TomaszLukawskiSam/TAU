/* global tau */
var card = document.querySelector(".app-sketch-service");

function playOnDevice(mediaId) {
	tau.event.trigger(card, "webclip-message", {
		remoteui: false
	});
} 
