(function () {
	/**
	 * Back key event handler
	 */
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			page = document.getElementsByClassName("ui-page")[0];
			pageid = page ? page.id : "";

			if (pageid === "main" ) {
				try {
					/**
					 * Exit application
					 */
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				/**
				 * Go to previous browser window
				 */
				window.history.back();
			}
		}
	});
}());
