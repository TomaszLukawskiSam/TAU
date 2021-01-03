/* global tau */
var card = document.querySelector(".app-tvplus-service");

function playOnDevice(mediaId) {
	tau.event.trigger(card, "webclip-message", {
		remoteui: false
	});
} 
