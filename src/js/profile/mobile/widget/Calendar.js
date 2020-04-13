/*global define, ns */
/*
 * Copyright (c) 2020 Samsung Electronics Co., Ltd
 *
 * Licensed under the Flora License, Version 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://floralicense.org/license/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * @example
 * 1. default
 * <div class="ui-calendar"></div>
 *
 * 2. past selection option
 * <div class="ui-calendar" data-past-selection="true"></div>
 *
 * @since 1.2
 * @class ns.widget.mobile.Calendar
 * @extends ns.widget.BaseWidget
 * @author Dohyung Lim <delight.lim@samsung.com>
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../../core/engine",
			"../../../core/util/DOM/attributes",
			"../../../core/event",
			"../widget"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			var utilsObject = ns.util.object,
				engine = ns.engine,
				events = ns.event,
				days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
				fullNameMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				dateData = new Date(),
				todayYear = dateData.getFullYear(),
				todayMonth = dateData.getMonth() + 1,
				defaultToday = dateData.getUTCDate(),
				loadTodayFlag = true,
				activeMonth,
				fixMonth,
				selectDay,
				classes = {
					PREV_DISABLE_DAY: "prevDisableDay",
					NON_SELECTION_DAY: "nonSelectionDay",
					NEXT_DISABLE_DAY: "nextDisableDay",
					CURRENT_ENABLE_DAY: "currentEnableDay",
					SELECTION: "selection",
					ARROW_RIGHT: "calendarArrowRight",
					ARROW_LEFT: "calendarArrowLeft",
					NON_SELECTION_ARROW: "ui-nonSelectionArrow",
					NON_ARROW_LEFT: "calendarArrowLeft ui-nonSelectionArrow",
					NON_SELECT_PREV_DISABLE_DAY: "prevDisableDay nonSelectionDay",
					CONTROLLER: "controller",
					SWITCH_VIEW: "calendarSwitch",
					CALENDAR_VIEW: "calendarView"
				},

				Calendar = function () {
					this.options = utilsObject.merge({}, defaultOptions),
					this._ui = {
						switch: null,
						leftArrow: null,
						calendarEl: null
					};
				},

				/**
				* Options for widget
				* @property {Object} options
				* @property {boolean} [options.pastSelection=true]
				* @member ns.widget.mobile.Calendar
				*/
				defaultOptions = {
					pastSelection: false
				},

				BaseWidget = ns.widget.BaseWidget,
				prototype = new BaseWidget();

			Calendar.prototype = prototype;
			Calendar.classes = classes;

			/**
			* Init widget
			* @method _init
			* @param {HTMLElement} element
			* @return {HTMLElement} Returns built element
			* @member ns.widget.mobile.Calendar
			* @protected
			*/
			prototype._init = function (element) {
				var self = this;

				this._ui.calendarEl = element.querySelector("." + Calendar.classes.CALENDAR_VIEW);
				this._ui.switch = element.querySelector("." + Calendar.classes.SWITCH_VIEW);
				this._ui.leftArrow = element.querySelector("." + Calendar.classes.ARROW_LEFT);

				if (self.options.pastSelection) {
					this._ui.leftArrow.classList.add(Calendar.classes.NON_SELECTION_ARROW);
				}

				if (activeMonth === undefined) {
					fixMonth = activeMonth = todayMonth;
				}

				if (selectDay === undefined) {
					selectDay = defaultToday;
				}

				self._buildCalendar(this._ui.calendarEl);

				return element;
			};

			/**
			* Draw a calendar on the table
			* @method _buildCalendar
			* @member ns.widget.mobile.Calendar
			* @protected
			*/
			prototype._buildCalendar = function (calendarElement) {
				var firstDate = new Date(todayYear, todayMonth - 1, 0),
					lastDate = new Date(todayYear, todayMonth, 0),
					day = firstDate.getDay(),
					prevLastDate = lastDate.getDate(),
					week = Math.ceil(prevLastDate / 7) + 1,
					leftDays = 7,
					setDays = 1,
					nextMonthDate = 1,
					cell = null,
					marginRow = calendarElement.insertRow(),
					divElement = "<div></div>",
					idx,
					row,
					div = null,
					self = this;

				marginRow.style.height = "7px";

				for (idx = 1; idx < week + 1; idx++) {
					row = calendarElement.insertRow();

					while (day != 0) { // prev disabled days.
						day = day - 1;
						leftDays = leftDays - 1;
						cell = row.insertCell();
						cell.insertAdjacentHTML("afterbegin", divElement);
						div = cell.firstChild;
						div.classList.add(Calendar.classes.PREV_DISABLE_DAY);
						div.innerHTML = prevLastDate - day;
						if (fixMonth === todayMonth && self.options.pastSelection) {
							div.classList.add(Calendar.classes.NON_SELECTION_DAY);
						}
					}
					while (leftDays != 0) {
						if (setDays > prevLastDate) { // next disabled days.
							cell = row.insertCell();
							cell.insertAdjacentHTML("afterbegin", divElement);
							div = cell.firstChild;
							div.classList.add(Calendar.classes.NEXT_DISABLE_DAY);
							div.innerHTML = nextMonthDate;
							leftDays = leftDays - 1;
							nextMonthDate = nextMonthDate + 1;
						} else { // current enabled days.
							cell = row.insertCell();
							cell.insertAdjacentHTML("afterbegin", divElement);
							div = cell.firstChild;
							div.classList.add(Calendar.classes.CURRENT_ENABLE_DAY);
							div.innerHTML = setDays;
							setDays = setDays + 1;
							leftDays = leftDays - 1;

							if (defaultToday > parseInt(div.innerHTML, 10)) {
								if (fixMonth === todayMonth && self.options.pastSelection) {
									div.classList.remove(Calendar.classes.CURRENT_ENABLE_DAY);
									div.classList.add(Calendar.classes.PREV_DISABLE_DAY);
									div.classList.add(Calendar.classes.NON_SELECTION_DAY);
								} else {
									div.classList.add(Calendar.classes.CURRENT_ENABLE_DAY);
								}
							} else {
								div.classList.add(Calendar.classes.CURRENT_ENABLE_DAY);
							}

							if (loadTodayFlag && div.innerHTML === defaultToday.toLocaleString()) { // dateData selected.
								div.classList.add(Calendar.classes.SELECTION);
								selectDay = div;
								activeMonth = todayMonth;
								loadTodayFlag = false;
							} else {
								if (activeMonth === todayMonth && div.innerHTML === selectDay.innerHTML) {
									div.classList.add(Calendar.classes.SELECTION);
									selectDay = div;
								}
							}
						}
					}
					leftDays = 7;
				}

				if (self.options.pastSelection) {
					if (fixMonth != todayMonth) {
						this._ui.leftArrow.classList.remove(Calendar.classes.NON_SELECTION_ARROW);
					} else {
						this._ui.leftArrow.classList.add(Calendar.classes.NON_SELECTION_ARROW);
					}
				}
				this._ui.switch.innerHTML = fullNameMonth[todayMonth - 1] + " " + todayYear;
			};

			/**
			* Moving to another month erases the existing calendar
			* @method _deleteCalendar
			* @member ns.widget.mobile.Calendar
			* @protected
			*/
			prototype._deleteCalendar = function (calendarElement) {
				while (calendarElement.rows.length > 2) {
					calendarElement.deleteRow(2);
				}
			};

			/**
			* Click the arrow on the calendar to move to another month
			* @method _onClick
			* @param {Event} event
			* @member ns.widget.mobile.Calendar
			* @protected
			*/
			prototype._onClick = function (event) {
				var calendarElement = this.element.querySelector("." + Calendar.classes.CALENDAR_VIEW),
					self = this;

				if (event.srcElement.className === Calendar.classes.ARROW_RIGHT) {
					self._moveMonth("right", calendarElement);
				} else if (event.srcElement.className === Calendar.classes.ARROW_LEFT) {
					self._moveMonth("left", calendarElement);
				} else if (event.srcElement.className === Calendar.classes.NON_ARROW_LEFT) {
					return;
				} else if (event.srcElement.className === Calendar.classes.NON_SELECT_PREV_DISABLE_DAY ||
					event.srcElement.firstChild.className === Calendar.classes.NON_SELECT_PREV_DISABLE_DAY) {
					return;
				} else if (event.srcElement.className === Calendar.classes.PREV_DISABLE_DAY) {
					self._moveMonth("left", calendarElement);
					self._selection(event.target, event.target.innerHTML);
				} else if (event.srcElement.className === Calendar.classes.NEXT_DISABLE_DAY) {
					self._moveMonth("right", calendarElement);
					self._selection(event.target, event.target.innerHTML);
				} else {
					self._selection(event.target);
				}
			};

			/**
			* Selecting a date leaves a mark
			* @method _moveMonth
			* @param {string} direction
			* @param {HTMLElement} calendarElement
			* @member ns.widget.mobile.Calendar
			* @protected
			*/
			prototype._moveMonth = function (direction, calendarElement) {
				var self = this;

				if (direction === "left") {
					todayMonth = todayMonth - 1;
					if (todayMonth === 0) {
						todayMonth = 12;
						todayYear = todayYear - 1;
					}
				} else {
					todayMonth = todayMonth + 1;
					if (todayMonth === 13) {
						todayMonth = 1;
						todayYear = todayYear + 1;
					}
				}
				self._deleteCalendar(calendarElement);
				dateData = new Date(todayYear, todayMonth - 1);
				self._buildCalendar(calendarElement);
			};

			/**
			* Selecting a date leaves a mark
			* @method _selection
			* @param {HTMLElement} element
			* @member ns.widget.mobile.Calendar
			* @protected
			*/
			prototype._selection = function (element, value) {
				var otherMonthDay;

				if (value != undefined) {
					otherMonthDay = this.element.querySelectorAll("." + Calendar.classes.CURRENT_ENABLE_DAY);
					otherMonthDay.forEach(function (idx) {
						if (idx.innerHTML === value) {
							idx.classList.add(Calendar.classes.SELECTION);
							selectDay.classList.remove(Calendar.classes.SELECTION);
							selectDay = idx;
							activeMonth = todayMonth;
						}
					})
				} else {
					if (element.tagName === "TD") {
						element = element.firstChild;
					}
					if (selectDay.innerHTML != element.innerHTML) {
						element.classList.add(Calendar.classes.SELECTION);
						selectDay.classList.remove(Calendar.classes.SELECTION);
						selectDay = element;
						activeMonth = todayMonth;
					}
				}
			};

			prototype._unBindEvents = function (element) {
				var self = this;

				events.off(element, "vclick", self, false);
			};

			prototype._bindEvents = function (element) {
				var self = this;

				events.on(element, "vclick", self, false);
			};

			prototype.handleEvent = function (event) {
				var self = this;

				if (event.type === "vclick") {
					self._onClick(event);
				} else {
					event.preventDefault();
				}
			};

			prototype._setPastSelection = function (element, value) {
				this.options.pastSelection = value;
				return true;
			};

			prototype._refresh = function () {
				var self = this,
					calendarView = self._ui.calendarView;

				self._deleteCalendar(calendarView);
				self._buildCalendar(calendarView);
			};

			prototype._setValue = function (value) {
				var self = this,
					options = self.options;

				options.pastSelection = value;
			};

			prototype._build = function (element) {
				var controllerElement = document.createElement("div"),
					leftArrowElement = document.createElement("div"),
					rightArrowElement = document.createElement("div"),
					viewChangeElement = document.createElement("div"),
					viewTableElement = document.createElement("table"),
					spaceElement = document.createElement("tr"),
					oneWeekElement = document.createElement("tr"),
					monElement = document.createElement("td"),
					tueElement = document.createElement("td"),
					wedElement = document.createElement("td"),
					thuElement = document.createElement("td"),
					friElement = document.createElement("td"),
					satElement = document.createElement("td"),
					sunElement = document.createElement("td");

				// Controller
				controllerElement.classList.add(Calendar.classes.CONTROLLER);
				leftArrowElement.classList.add(Calendar.classes.ARROW_LEFT);
				rightArrowElement.classList.add(Calendar.classes.ARROW_RIGHT);
				viewChangeElement.classList.add(Calendar.classes.SWITCH_VIEW);

				controllerElement.appendChild(leftArrowElement);
				controllerElement.appendChild(rightArrowElement);
				controllerElement.appendChild(viewChangeElement);

				// View Container
				viewTableElement.classList.add(Calendar.classes.CALENDAR_VIEW);
				spaceElement.classList.add("topSpace");
				oneWeekElement.classList.add("oneWeek");

				monElement.innerHTML = days[0];
				oneWeekElement.appendChild(monElement);
				tueElement.innerHTML = days[1];
				oneWeekElement.appendChild(tueElement);
				wedElement.innerHTML = days[2];
				oneWeekElement.appendChild(wedElement);
				thuElement.innerHTML = days[3];
				oneWeekElement.appendChild(thuElement);
				friElement.innerHTML = days[4];
				oneWeekElement.appendChild(friElement);
				satElement.innerHTML = days[5];
				oneWeekElement.appendChild(satElement);
				sunElement.innerHTML = days[6];
				sunElement.classList.add("sunday");
				oneWeekElement.appendChild(sunElement);

				viewTableElement.appendChild(spaceElement);
				viewTableElement.appendChild(oneWeekElement);

				// append Elements
				element.appendChild(controllerElement);
				element.appendChild(viewTableElement);

				return element;
			};

			prototype._destroy = function () {
				var self = this;

				self.options = null;
				self._unBindEvents(self.element);
			};

			ns.widget.mobile.Calendar = Calendar;
			engine.defineWidget(
				"Calendar",
				".ui-calendar",
				[],
				Calendar,
				"mobile"
			);
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.widget.mobile.Calendar;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(document, ns));
