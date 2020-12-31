/* global tau */
var card = document.querySelector(".app-video-service");

function playOnTV(mediaId) {
	tau.event.trigger(card, "webclip-message", {
		remoteui: true,
		action: "playtv",
		data: {
			index: mediaId
		}
	});
} 
