import Storage from "./clipping-storage.js";

const moduleapp = {};

(function () {
	"use strict";
	var tau = window.tau,
		storage = new Storage(),
		appsList = [],
		socket = null;

	const defaultList = [
		{
			"appID": "vUf39tzQ3s.UIComponents",
			"isInstalled": true,
			"isActive": true,
			"webClipsList": [
				{
					url: "webclip/apps-on-tv",
					isSelected: true
				}
			]
		}, {
			"appID": "vUf39tzQ3t.UIComponents",
			"isInstalled": true,
			"isActive": false,
			"webClipsList": [
				{
					url: "webclip/now-on-tv",
					isSelected: false
				},
				{
					url: "webclip/restaurant",
					isSelected: true
				}
			]
		}],
		getAppsList = new Promise((resolve, reject) => {
			const requestURL = "updateWebclip";

			fetch(requestURL)
				.then((response) => response.json())
				.then((data) => {
					//addWSListener(data.wsPort);
					resolve(data.apps);
				})
				.catch((e) => {
					reject(e);
				})
		});

	function updateAppsList(message) {
		if (message.type === "full") {
			return updateAppsListFull(message.data);
		} else if (message.type === "diff") {
			updateAppsListDiff(message.data);
			return true;
		} else {
			console.warn("app.js: unsupported type of applist.");
		}
		return false;
	}

	function updateAppsListDiff(apps) {
		apps.forEach(function (remoteApp) {
			if (remoteApp.action === "add") { // add (or update if app already added)
				let localApp = appsList.filter(function (localApp) {
					return remoteApp.appID === localApp.appID;
				})[0];
				delete remoteApp.action;

				if (!localApp) { // add new
					appsList.push(remoteApp);
				} else { // update local app
					/**
					 * @todo
					 * Which properties we need update
					 */
					localApp.isActive = remoteApp.isActive;
				}
			} else if (remoteApp.action === "remove") { // remove local app
				appsList = appsList.filter(function (localApp) {
					return remoteApp.appID !== localApp.appID;
				});
			} else {
				console.warn("Unsupported action:", remoteApp.action);
			}

		});

		updateOrderOfApplist();
	}

	function updateOrderOfApplist() {
		var change = false,
			currentOrder = "";

		currentOrder = appsList.reduce(function (prev, app) {
			return prev + app.appID;
		}, "");

		// check apps order
		appsList = appsList.sort(function (app1, app2) {
			return (app1.isActive) ?
				(app2.isActive) ? 0 : -1 : 1
		});

		// order has been changed
		if (currentOrder !== appsList.reduce(function (prev, app) {
			return prev + app.appID;
		}, "")) {
			change = true;
		}

		return change;
	}

	function updateAppsListFull(apps) {
		var change = false,
			appsCount = appsList.length;

		// remove app from local apps list if not exists on remote host
		appsList = appsList.filter(function (localApp) {
			return apps.some(function (remoteApp) {
				return remoteApp.appID === localApp.appID;
			});
		});

		if (appsCount !== appsList.length) {
			change = true;
		}

		// filter app which should be add to local apps list
		const added = apps.filter(function (remoteApp) {
			return !appsList.some(function (localApp) {
				return localApp.appID === remoteApp.appID;
			});
		});

		if (added.length) {
			change = true;
		}

		// add apps to local apps list
		added.forEach(function (remoteApp) {
			appsList.push(remoteApp);
		});

		// update active items
		appsList.forEach(function (localApp) {
			apps.forEach(function (remoteApp) {
				if (remoteApp.appID === localApp.appID) {
					if (localApp.isActive !== remoteApp.isActive) {
						localApp.isActive = remoteApp.isActive;
						change = true;
					}
				}
			})
		});

		if (updateOrderOfApplist()) {
			change = true;
		};

		return change;
	}

	function onWSMessage(message) {
		if (updateAppsList(message)) {
			tau.log("change");
			storage.refreshStorage(Storage.elements.APPSLIST, appsList);

			updateWebClipsUI();
			updateWebClipListPopup();
		} else {
			tau.log("nothing change");
		}
	}

	async function validateAppsList() {
		const promisesList = [],
			indexesList = [];
		let	i,
			j,
			responses = [];

		for (i = 0; i < appsList.length; i++) {
			for (j = 0; j < appsList[i].webClipsList.length; j++) {
				promisesList.push(fetch(appsList[i].webClipsList[j].url + "\\webclip.html"));
				indexesList.push({appIndex: i, webClipIndex: j})
			}
		}

		responses = await Promise.allSettled(promisesList);

		for (i = 0; i < responses.length; i++) {
			if (responses[i].status === "rejected" || !responses[i].value.ok) {
				appsList[indexesList[i].appIndex].webClipsList.splice(indexesList[i].webClipIndex, 1);
			}
		}
	}

	function changeTheme(event) {
		tau.theme.setTheme(event.target.value);
	}

	function onPopupSubmit() {
		appsList.forEach(function (app) {
			app.webClipsList.forEach(function (webclip) {
				const webClipName = getWebClipName(webclip.url),
					checkbox = document.getElementById("popup-checkbox-" + webClipName);

				webclip.isSelected = checkbox.checked;
			})
		});
		storage.refreshStorage(Storage.elements.APPSLIST, appsList);

		updateWebClipsUI();
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

	function createWebClipCard(webClip) {
		var card = document.createElement("div"),
			webClipUrl = webClip.url;

		// add slash for name of webClip
		if (!webClipUrl.match(/\/$/)) {
			webClipUrl += "/";
		}
		webClipUrl += "webclip.html";

		card.classList.add("ui-card");
		card.setAttribute("data-src", webClipUrl);

		return card;
	}

	function updateWebClipsUI() {
		var webclipsContainer = document.getElementById("web-clips"),
			// get Cards elements and convert NodeList to array
			currentWebClipsCards = [].slice.call(webclipsContainer.querySelectorAll(".ui-card[data-url],.ui-card[data-src]")),
			// list of webClips url in order
			webClipsUrlList = appsList.reduce(function (prev, app) {
				return prev.concat(
					app.webClipsList.filter((webClip) => webClip.isSelected)
						.map((webClip) => webClip.url));
			}, []);

		// remove card
		currentWebClipsCards.forEach(function (card) {
			const found = webClipsUrlList.filter(function (webClipUrl) {
				return card.dataset.url && card.dataset.url.indexOf(webClipUrl) > -1 ||
					card.dataset.src && card.dataset.src.indexOf(webClipUrl) > -1;
			});

			// remove card from UI if not exists on list
			if (found.length === 0) {
				card.parentElement.removeChild(card);
			}
		});

		// add card
		appsList.forEach(function (app) {
			app.webClipsList.forEach((webClip) => {
				const found = currentWebClipsCards.filter(function (card) {
					return card.dataset.url && card.dataset.url.indexOf(webClip.url) > -1 ||
						card.dataset.src && card.dataset.src.indexOf(webClip.url) > -1;
				});

				if (found.length === 0) {
					if (webClip.isSelected) {
						webclipsContainer.appendChild(
							createWebClipCard(webClip)
						);
					}
				}
			});
		});

		// set proper order of cards
		// @todo change inline styles to css class after merge HomeApp branches
		webclipsContainer.style.display = "flex";
		webclipsContainer.style.flexDirection = "column";
		currentWebClipsCards = [].slice.call(webclipsContainer.querySelectorAll(".ui-card[data-url],.ui-card[data-src]"));

		webClipsUrlList.forEach(function (url, order) {
			const card = currentWebClipsCards.filter(function (card) {
				return card.dataset.url && card.dataset.url.indexOf(url) > -1 ||
					card.dataset.src && card.dataset.src.indexOf(url) > -1;
			})[0];

			if (card) {
				card.style.order = order;
			}
		});

		tau.engine.createWidgets(webclipsContainer);
	}

	//TODO: provide mechanism for getting web clip name from webClip meta data
	//		and separate from getting ID
	function getWebClipName(webClip) {
		// remove all text to the last \
		return webClip.replace(/.*\//, "");
	}

	function updateWebClipListPopup() {

		var popupList = document.getElementById("popup-list");

		// remove previous li items
		while (popupList.firstChild) {
			popupList.firstChild.remove()
		}

		appsList.forEach(function (app) {
			app.webClipsList.forEach(function (webclip) {
				var li = document.createElement("li"),
					input = document.createElement("input"),
					label = document.createElement("label"),
					webClipName = getWebClipName(webclip.url);

				li.classList.add("ui-li-has-checkbox");
				li.classList.add("ui-group-index");

				input.setAttribute("type", "checkbox");
				input.setAttribute("id", "popup-checkbox-" + webClipName);

				label.setAttribute("for", "popup-checkbox-" + webClipName);
				label.classList.add("ui-li-text");

				fetch(`${webclip.url}/manifest.json`)
					.then((out) => out.json())
					.then((manifest) => {
						label.innerHTML = manifest.description;
					})
					.catch((err) => {
						console.error(err);
					});

				li.appendChild(input);
				li.appendChild(label);
				popupList.appendChild(li);

			});
		});

		tau.engine.createWidgets(popupList);

		appsList.forEach(function (app) {
			app.webClipsList.forEach(function (webclip) {
				if (webclip.isSelected) {
					const webClipName = getWebClipName(webclip.url),
						checkbox = document.getElementById("popup-checkbox-" + webClipName);

					if (checkbox) {
						checkbox.checked = true;
					}
				}
			});
		});
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

		// use apps list from storage or default apps list if sth wrong
		appsList = storage.readAllFromStorage(Storage.elements.APPSLIST);

		// check webclips on remote server
		getAppsList.then((apps) => {
			updateAppsListFull(apps);
		})
			.catch((e) => {
				console.warn("Error getting app lits: " + e.message);
				if (appsList.length === 0) {
					updateAppsListFull(defaultList);
				}
			})
			.finally(() => {
				validateAppsList().then(() => {
					storage.refreshStorage(Storage.elements.APPSLIST, appsList);
					updateWebClipsUI();
					updateWebClipListPopup();
				});
			});

	}

	function onPageBeforeShow(event) {
		if (event.target.id === "main") {
			init();
		}
	}

	document.addEventListener("pagebeforeshow", onPageBeforeShow);
	moduleapp.onWSMessage = onWSMessage;
}());

export function UpdateWebClip(message) {
	moduleapp.onWSMessage(message);
};
