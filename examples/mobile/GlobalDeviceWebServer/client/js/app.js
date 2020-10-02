(function () {
	"use strict";
	var tau = window.tau,
		state = {
			widgets: {
				news: false,
				nowontv: false,
				restaurant: true
			}
		};

	function getWidgetsState() {
		var latestNews = document.querySelector("#latest-news-check"),
			nowOnTV = document.querySelector("#now-on-tv-check"),
			hotelRestaurant = document.querySelector("#hotel-restaurant-check");

		state.widgets.news = latestNews.checked;
		state.widgets.nowontv = nowOnTV.checked;
		state.widgets.restaurant = hotelRestaurant.checked;
	}

	function toggleWidgetsState() {
		var latestNews = document.querySelector("#latest-news-container"),
			nowOnTv = document.querySelector("#now-on-tv-container"),
			hotelRestaurant = document.querySelector("#restaurant-container");

		latestNews.classList.toggle("app-display-none", !state.widgets.news);
		nowOnTv.classList.toggle("app-display-none", !state.widgets.nowontv);
		hotelRestaurant.classList.toggle("app-display-none", !state.widgets.restaurant);
	}

	function changeTheme(event) {
		tau.theme.setTheme(event.target.value);
	}

	function onPopupSubmit() {
		getWidgetsState();
		toggleWidgetsState();
		tau.history.back();
	}

	/**
     * Click button event handler
     * Opens drawer
     */
	function onButtonClick() {
		var drawerWidget = tau.widget.Drawer(document.querySelector(".ui-drawer"));

		drawerWidget.open();
	}

	function init() {
		var themeChanger = document.querySelector("#theme-selector"),
			page = document.querySelector(".ui-page"),
			themeChangerButton = page.querySelector("#selector-opener"),
			burgerButton = page.querySelector(".app-btn-icon-burger"),
			popupButton = page.querySelector("#popup-submit");

		themeChanger.addEventListener("change", changeTheme);

		themeChangerButton.addEventListener("vclick", function () {
			var dropdownmenuWidget = tau.widget.DropdownMenu(themeChanger);

			dropdownmenuWidget.open();
		});

		burgerButton.addEventListener("click", onButtonClick);
		popupButton.addEventListener("click", onPopupSubmit);
		var card = document.getElementById("apps-on-tv"),
		apps;

		apps = card.querySelector(".webclip-apps");
		apps.addEventListener("vclick", function (e) {
			var currentActive = apps.querySelector(".ui-active-item"),
				selected = tau.util.selectors.getClosestBySelector(e.target, ".ui-container > *"),
				activeContainer,
				selectedContainer;
			// toggle selected

			if (currentActive && currentActive !== selected) {
				currentActive.classList.remove("ui-active-item");
				selected.classList.add("ui-active-item");
				// container change

				activeContainer = card.querySelector(".ui-container-active");
				activeContainer.classList.remove("ui-container-active");
				activeContainer.classList.add("ui-container-hidden");
				selectedContainer = card.querySelector(".app-" + selected.dataset.container);
				selectedContainer.classList.add("ui-container-active");
				selectedContainer.classList.remove("ui-container-hidden");
				// reset scroll position
				card.querySelector(".ui-content").scrollLeft = 0;
			}
		}, true)
	}

	document.addEventListener("pagebeforeshow", init);
}());