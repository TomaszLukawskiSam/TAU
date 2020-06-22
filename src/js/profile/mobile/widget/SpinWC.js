/*global define, ns */
/*jslint nomen: true, plusplus: true */
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
 *
 */
/**
 * #Spin
 *
 * @class ns.widget.mobile.Spin
 * @since 1.2
 * @extends ns.widget.core.BaseWidget
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
(function (window, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define([
		"./Spin"
	],
	function () {
		//>>excludeEnd("tauBuildExclude");
		class Spin extends HTMLElement {
			connectedCallback() {
				this._widget = ns.widget.Spin(this);
			}
			attributeChangedCallback(name, oldValue, newValue) {
				if (this._widget) {
					if (name === "value") {
						this._widget.value(newValue);
					} else {
						this._widget.option(name, newValue);
					}
				}
			}
			static get observedAttributes() {
				return ["min", "max", "step", "scale-factor",
					"move-factor", "labels", "loop",
					"momentum-level", "momentum-duration",
					"digits", "enabled",
					"value"];
			}
		}

		customElements.define("tau-spin", Spin);
		//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	});
	//>>excludeEnd("tauBuildExclude");

})(window, ns);
