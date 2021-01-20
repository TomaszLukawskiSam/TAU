/* global tau */
(function () {
	var users = [],
		deviceList = [{
			id: 1,
			name: "TV1"
		}, {
			id: 2,
			name: "TV2"
		}, {
			id: 3,
			name: "TV3"
		}],
		lastId = -1,
		// if submit is true then form is send and page is reload
		submit = false,
		// users have been read from storage
		usersRead = false;

	function getDeviceListItem(device) {
		return `
			<li class="ui-li-divider ui-li-has-radio">
				<label>
					<input data-device-id="${device.id}" name="devices-group" type="radio" />
					<div class="ui-li-text">
						<span class="ui-li-text-title">
							${device.name}
						</span>
					</div>
				</label>
			</li>
			`;
	}

	function onTizenHWKey(e) {
		if (e.keyName === "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) { }
		}
	}

	function onSubmit(ev) {
		// uncoment below line to prevent page reload
		// for single page app
		if (!submit) {
			ev.preventDefault();
		}
	}

	function onLoginSubmitClick() {
		var hidden = document.getElementById("username-domain"),
			username = document.getElementById("username"),
			domain = document.getElementById("domain"),
			form = document.getElementById("login-form");

		hidden.value = username.value + "@" + domain.value;

		// store user data
		users.push({id: ++lastId, username: hidden.value});
		localStorage.setItem("users", JSON.stringify(users));

		if (submit) {
			form.submit();
		} else {
			// send user data
			console.log("send data ...");

			// change page
			tau.changePage("device-list.html");
		}
	}

	function onDeviceSelectClick() {
		var selectedDevices = [],
			list = document.getElementById("device-list"),
			checkboxes = list.querySelectorAll("[data-device-id]"),
			hidden = document.getElementById("selected-device"),
			form = document.getElementById("device-select-form");

		checkboxes.forEach(function (checkbox) {
			if (checkbox.checked) {
				selectedDevices.push(
					parseInt(checkbox.getAttribute("data-device-id"), 10)
				);
			}
		});
		hidden.value = selectedDevices.join(",");

		if (submit) {
			form.submit();
		} else {
			// send user data
			console.log("send data ...", selectedDevices);

			// change page
			tau.changePage("#");
		}
	}

	function onDomainChange(ev) {
		var dropdown = tau.engine.getBinding(ev.target),
			wrapper = ev.target.parentElement,
			placeHolder = wrapper.querySelector(".ui-dropdownmenu-placeholder");

		placeHolder.textContent = dropdown.value();
	}

	function onLoginPageBeforeShow(ev) {
		var pageEl = ev.target,
			appbarEl = pageEl.querySelector(".ui-appbar"),
			appbar = tau.engine.getBinding(appbarEl),
			form = document.getElementById("login-form"),
			submitButton = document.getElementById("submit-button"),
			domain = document.getElementById("domain");

		appbar.expand();
		submitButton.addEventListener("click", onLoginSubmitClick);
		domain.addEventListener("change", onDomainChange);
		form.addEventListener("submit", onSubmit);
	}

	function onDeviceListPageBeforeShow() {
		var list = document.getElementById("device-list"),
			div = document.createElement("div"),
			df = document.createDocumentFragment(),
			form = document.getElementById("device-select-form"),
			selectButton = document.getElementById("submit-selected-device");

		list.innerHTML = "";
		deviceList.forEach((device) => {
			div.innerHTML = getDeviceListItem(device);
			df.appendChild(div.firstElementChild);
		});
		list.appendChild(df);
		tau.engine.createWidgets(list);

		selectButton.addEventListener("click", onDeviceSelectClick);
		form.addEventListener("submit", onSubmit);
	}

	function onPageBeforeShow(ev) {
		switch (ev.target.id) {
			case "login-page" :
				onLoginPageBeforeShow(ev);
				break;
			case "device-list-page":
				onDeviceListPageBeforeShow(ev);
				break;
			default:
				console.log("Unknow page");
				break;
		}
	}

	function readUserFromStorage() {
		users = JSON.parse(localStorage.getItem("users"));
		usersRead = true;
		lastId = Math.max.apply(null, users.map(function (user) {
			return user.id;
		}));
	}

	function init() {
		// load users from localstorage
		if (!usersRead) {
			readUserFromStorage();
		}

		// add listeners
		document.addEventListener("tizenhwkey", onTizenHWKey);
		document.addEventListener("pagebeforeshow", onPageBeforeShow);
	}

	// entry point
	document.addEventListener("DOMContentLoaded", init);
})();

