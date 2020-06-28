(function(window, document, undefined) {
'use strict';
var ns = window.tau = window.tau || {},
nsConfig = window.tauConfig = window.tauConfig || {};
nsConfig.rootNamespace = 'tau';
nsConfig.fileName = 'tau';
ns.version = '1.2.5';
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/* global window, define */
/* eslint-disable no-console */
/**
 * #Core namespace
 * Object contains main framework methods.
 * @class ns
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
(function (document, console) {
	"use strict";
			var idNumberCounter = 0,
			currentDate = +new Date(),
			slice = [].slice,
			rootNamespace = "",
			fileName = "",
			infoForLog = function (args) {
				var dateNow = new Date();

				args.unshift("[" + rootNamespace + "][" + dateNow.toLocaleString() + "]");
			},
			ns = window.ns || window.tau || {},
			nsConfig = window.nsConfig || window.tauConfig || {};

		ns.info = ns.info || {
			profile: "custom"
		};
		ns.tauPerf = ns.tauPerf || {};

		window.ns = ns;
		window.nsConfig = nsConfig;

		window.tau = ns;
		window.tauConfig = nsConfig;

		rootNamespace = nsConfig.rootNamespace;
		fileName = nsConfig.fileName;

		/**
		 * Return unique id
		 * @method getUniqueId
		 * @static
		 * @return {string}
		 * @member ns
		 */
		ns.getUniqueId = function () {
			return rootNamespace + "-" + ns.getNumberUniqueId() + "-" + currentDate;
		};

		/**
		 * Return unique id
		 * @method getNumberUniqueId
		 * @static
		 * @return {number}
		 * @member ns
		 */
		ns.getNumberUniqueId = function () {
			return idNumberCounter++;
		};

		/**
		 * logs supplied messages/arguments
		 * @method log
		 * @static
		 * @member ns
		 */
		ns.log = function () {
			var args = slice.call(arguments);

			infoForLog(args);
			if (console) {
				console.log.apply(console, args);
			}
		};

		/**
		 * logs supplied messages/arguments ad marks it as warning
		 * @method warn
		 * @static
		 * @member ns
		 */
		ns.warn = function () {
			var args = slice.call(arguments);

			infoForLog(args);
			if (console) {
				console.warn.apply(console, args);
			}
		};

		/**
		 * logs supplied messages/arguments and marks it as error
		 * @method error
		 * @static
		 * @member ns
		 */
		ns.error = function () {
			var args = slice.call(arguments);

			infoForLog(args);
			if (console) {
				console.error.apply(console, args);
			}
		};

		/**
		 * get from nsConfig
		 * @method getConfig
		 * @param {string} key
		 * @param {*} [defaultValue] value returned when config is not set
		 * @return {*}
		 * @static
		 * @member ns
		 */
		ns.getConfig = function (key, defaultValue) {
			return nsConfig[key] === undefined ? defaultValue : nsConfig[key];
		};

		/**
		 * set in nsConfig
		 * @method setConfig
		 * @param {string} key
		 * @param {*} value
		 * @param {boolean} [asDefault=false] value should be treated as default (doesn't overwrites
		 * the config[key] if it already exists)
		 * @static
		 * @member ns
		 */
		ns.setConfig = function (key, value, asDefault) {
			if (!asDefault || nsConfig[key] === undefined) {
				nsConfig[key] = value;
			}
		};

		/**
		 * Return path for framework script file.
		 * @method getFrameworkPath
		 * @return {?string}
		 * @member ns
		 */
		ns.getFrameworkPath = function () {
			var scripts = document.getElementsByTagName("script"),
				countScripts = scripts.length,
				i,
				url,
				arrayUrl,
				count;

			for (i = 0; i < countScripts; i++) {
				url = scripts[i].src;
				arrayUrl = url.split("/");
				count = arrayUrl.length;
				if (arrayUrl[count - 1] === fileName + ".js" ||
					arrayUrl[count - 1] === fileName + ".min.js") {
					return arrayUrl.slice(0, count - 1).join("/");
				}
			}
			return null;
		};

		}(window.document, window.console));

/*global window, ns, define, XMLHttpRequest, console, Blob */
/*jslint nomen: true, browser: true, plusplus: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Utilities
 *
 * The Tizen Advanced UI (TAU) framework provides utilities for easy-developing
 * and fully replaceable with jQuery method. When user using these DOM and
 * selector methods, it provide more light logic and it proves performance
 * of web app. The following table displays the utilities provided by the
 * TAU framework.
 *
 * @class ns.util
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (window, document, ns) {
	"use strict";
				var currentFrame = null,
				util = ns.util || {},
				// frames callbacks which should be run in next request animation frame
				waitingFrames = [],
				slice = [].slice,
				// inform that loop was added to request animation frame callback
				loopWork = false;

			/**
			 * Function which is use as workaround when any type of request animation frame not exists
			 * @param {Function} callback
			 * @method _requestAnimationFrameOnSetTimeout
			 * @static
			 * @member ns.util
			 * @protected
			 */
			util._requestAnimationFrameOnSetTimeout = function (callback) {
				currentFrame = window.setTimeout(callback.bind(callback, +new Date()), 1000 / 60);
			};

			/**
			 * Function which support every request animation frame.
			 * @method _loop
			 * @protected
			 * @static
			 * @member ns.util
			 */
			util._loop = function () {
				var loopWaitingFrames = slice.call(waitingFrames),
					currentFrameFunction = loopWaitingFrames.shift(),
					loopTime = performance.now();

				waitingFrames = [];

				while (currentFrameFunction) {
					currentFrameFunction(loopTime);
					if (performance.now() - loopTime < 15) {
						currentFrameFunction = loopWaitingFrames.shift();
					} else {
						currentFrameFunction = null;
					}
				}
				if (loopWaitingFrames.length || waitingFrames.length) {
					waitingFrames.unshift.apply(waitingFrames, loopWaitingFrames);
					util.windowRequestAnimationFrame(util._loop);
				} else {
					loopWork = false;
				}
			};

			/**
			 * Find browser prefixed request animation frame function.
			 * @method _getRequestAnimationFrame
			 * @protected
			 * @static
			 * @member ns.util
			 */
			util._getRequestAnimationFrame = function () {
				return (window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					util._requestAnimationFrameOnSetTimeout).bind(window);
			};

			/**
			 * Original requestAnimationFrame from object window.
			 * @method windowRequestAnimationFrame
			 * @static
			 * @member ns.util
			 */
			util.windowRequestAnimationFrame = util._getRequestAnimationFrame();

			/**
			 * Special requestAnimationFrame function which add functions to queue of callbacks
			 * @method requestAnimationFrame
			 * @static
			 * @member ns.util
			 */
			util.requestAnimationFrame = function (callback) {
				waitingFrames.push(callback);
				if (!loopWork) {
					util.windowRequestAnimationFrame(util._loop);
					loopWork = true;
				}
			};

			util._cancelAnimationFrameOnSetTimeout = function () {
				// probably wont work if there is any more than 1
				// active animationFrame but we are trying anyway
				window.clearTimeout(currentFrame);
			};

			/**
			 * Remove animation callbacks added by requestAnimationFrame
			 * @method cancelAnimationFrames
			 * @static
			 * @member ns.util
			 * @param {*} animationId value for identify animation in queue
			 */
			util.cancelAnimationFrames = function (animationId) {
				var found = 0,
					len = waitingFrames.length,
					i = 0;

				if (animationId) {
					// remove selected requests
					while (len > 0 && found > -1) {
						found = -1;
						for (; i < len; i++) {
							if (waitingFrames[i].animationId === animationId) {
								found = i;
								break;
							}
						}

						if (found > -1) {
							waitingFrames.splice(found, 1);
							len--;
						}
					}
				} else {
					ns.warn("cancelAnimationFrames() require one parameter for request identify");
				}
			};

			util._getCancelAnimationFrame = function () {
				return (window.cancelAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.mozCancelAnimationFrame ||
					window.oCancelAnimationFrame ||
					window.msCancelAnimationFrame ||
					util._cancelAnimationFrameOnSetTimeout).bind(window);
			};

			util.cancelAnimationFrame = util._getCancelAnimationFrame();

			/**
			 * fetchSync retrieves a text document synchronously, returns null on error
			 * @param {string} url
			 * @param {=string} [mime=""] Mime type of the resource
			 * @return {string|null}
			 * @static
			 * @member ns.util
			 */
			function fetchSync(url, mime) {
				var xhr = new XMLHttpRequest(),
					status;

				xhr.open("get", url, false);
				if (mime) {
					xhr.overrideMimeType(mime);
				}
				xhr.send();
				if (xhr.readyState === 4) {
					status = xhr.status;
					if (status === 200 || (status === 0 && xhr.responseText)) {
						return xhr.responseText;
					}
				}

				return null;
			}

			util.fetchSync = fetchSync;

			/**
			 * Removes all script tags with src attribute from document and returns them
			 * @param {HTMLElement} container
			 * @return {Array.<HTMLElement>}
			 * @protected
			 * @static
			 * @member ns.util
			 */
			function removeExternalScripts(container) {
				var scripts = slice.call(container.querySelectorAll("script[src]")),
					i = scripts.length,
					script;

				while (--i >= 0) {
					script = scripts[i];
					script.parentNode.removeChild(script);
				}

				return scripts;
			}

			util._removeExternalScripts = removeExternalScripts;

			/**
			 * Evaluates code, reason for a function is for an atomic call to evaluate code
			 * since most browsers fail to optimize functions with try-catch blocks, so this
			 * minimizes the effect, returns the function to run
			 * @param {string} code
			 * @return {Function}
			 * @static
			 * @member ns.util
			 */
			function safeEvalWrap(code) {
				return function () {
					try {
						window.eval(code);
					} catch (e) {
						if (e.stack) {
							ns.error(e.stack);
						} else if (e.name && e.message) {
							ns.error(e.name, e.message);
						} else {
							ns.error(e);
						}
					}
				};
			}

			util.safeEvalWrap = safeEvalWrap;

			/**
			 * Calls functions in supplied queue (array)
			 * @param {Array.<Function>} functionQueue
			 * @static
			 * @member ns.util
			 */
			function batchCall(functionQueue) {
				var i,
					length = functionQueue.length;

				for (i = 0; i < length; ++i) {
					functionQueue[i]();
				}
			}

			util.batchCall = batchCall;

			/**
			 * Creates new script elements for scripts gathered from a different document
			 * instance, blocks asynchronous evaluation (by renaming src attribute) and
			 * returns an array of functions to run to evaluate those scripts
			 * @param {Array.<HTMLElement>} scripts
			 * @param {HTMLElement} container
			 * @return {Array.<Function>}
			 * @protected
			 * @static
			 * @member ns.util
			 */
			function createScriptsSync(scripts, container) {
				var scriptElement,
					scriptBody,
					i,
					length,
					queue = [];

				// proper order of execution
				for (i = 0, length = scripts.length; i < length; ++i) {
					scriptBody = util.fetchSync(scripts[i].src, "text/plain");
					if (scriptBody) {
						scriptElement = document.adoptNode(scripts[i]);
						scriptElement.setAttribute("data-src", scripts[i].src);
						scriptElement.removeAttribute("src"); // block evaluation
						queue.push(util.safeEvalWrap(scriptBody));
						if (container) {
							container.appendChild(scriptElement);
						}
					}
				}

				return queue;
			}

			util._createScriptsSync = createScriptsSync;

			function removeInlineScripts(element) {
				var result = [],
					script;

				slice.call(element.querySelectorAll(
					"script:not([data-src]):not([type]):not([id]):not([src])"
					)).forEach(function (item) {
						script = document.createElement("script");
						script.innerText = item.textContent;
						// move attributes from original script element
						slice.call(item.attributes).forEach(function (attribute) {
							script.setAttribute(attribute.name, item.getAttribute(attribute.name));
						});
						item.parentNode.removeChild(item);
						result.push(script);
					});

				return result;
			}

			util._removeInlineScripts = removeInlineScripts;

			/**
			 * Method make asynchronous call of function
			 * @method async
			 * @inheritdoc #requestAnimationFrame
			 * @member ns.util
			 * @static
			 */
			util.async = util.requestAnimationFrame;

			/**
			 * Appends element from different document instance to current document in the
			 * container element and evaluates scripts (synchronously)
			 * @param {HTMLElement} element
			 * @param {HTMLElement} container
			 * @return {HTMLElement}
			 * @method importEvaluateAndAppendElement
			 * @member ns.util
			 * @static
			 */
			util.importEvaluateAndAppendElement = function (element, container) {
				var externalScriptsQueue =
						util._createScriptsSync(util._removeExternalScripts(element), element),
					inlineScripts = util._removeInlineScripts(element),
					newNode = document.importNode(element, true);

				container.appendChild(newNode); // append and eval inline
				inlineScripts.forEach(function (script) {
					container.appendChild(script);
				});
				util.batchCall(externalScriptsQueue);

				return newNode;
			};

			/**
			 * Checks if specified string is a number or not
			 * @method isNumber
			 * @param {string} query
			 * @return {boolean}
			 * @member ns.util
			 * @static
			 */
			util.isNumber = function (query) {
				var parsed = parseFloat(query);

				return !isNaN(parsed) && isFinite(parsed);
			};

			/**
			 * Reappear script tags to DOM structure to correct run script
			 * @method runScript
			 * @param {string} baseUrl
			 * @param {HTMLScriptElement} script
			 * @member ns.util
			 * @deprecated 2.3
			 */
			util.runScript = function (baseUrl, script) {
				var newScript = document.createElement("script"),
					scriptData,
					i,
					scriptAttributes = slice.call(script.attributes),
					src = script.getAttribute("src"),
					attribute,
					status;

				// 'src' may become null when none src attribute is set
				if (src !== null) {
					src = util.path.makeUrlAbsolute(src, baseUrl);
				}

				//Copy script tag attributes
				i = scriptAttributes.length;
				while (--i >= 0) {
					attribute = scriptAttributes[i];
					if (attribute.name !== "src") {
						newScript.setAttribute(attribute.name, attribute.value);
					} else {
						newScript.setAttribute("data-src", attribute.value);
					}
				}

				if (src) {
					scriptData = util.fetchSync(src, "text/plain");
									} else {
					scriptData = script.textContent;
				}

				if (scriptData) {
					// add the returned content to a newly created script tag
					newScript.src = window.URL.createObjectURL(new Blob([scriptData], {type: "text/javascript"}));
					newScript.textContent = scriptData; // for compatibility with some libs ex. template systems
				}
				script.parentNode.replaceChild(newScript, script);
			};

			ns.util = util;
			}(window, window.document, ns));

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/*global window, ns, define */
/**
 * #Array Utility
 *
 * Utility helps work with arrays.
 *
 * @class ns.util.array
 */
(function (ns) {
	"use strict";
	
			/**
			 * Convert values to common type and return information about type string or not.
			 * @param {number|string} low
			 * @param {number|string} high
			 * @return {{inival: *, endval: *, chars: boolean}}
			 */
			function convertTypes(low, high) {
				var inival,
					endval,
					chars = false;

				if (isNaN(low) && isNaN(high)) {
					chars = true;
					inival = low.charCodeAt(0);
					endval = high.charCodeAt(0);
				} else {
					inival = (isNaN(low) ? 0 : low);
					endval = (isNaN(high) ? 0 : high);
				}
				return {
					inival: inival,
					endval: endval,
					chars: chars
				};
			}

			/**
			 * Create an array containing the range of integers or characters
			 * from low to high (inclusive)
			 * @method range
			 * @param {number|string} low
			 * @param {number|string} high
			 * @param {number} step
			 * @static
			 * @return {Array} array containing continuos elements
			 * @member ns.util.array
			 */
			function range(low, high, step) {
				// Create an array containing the range of integers or characters
				// from low to high (inclusive)
				//
				// version: 1107.2516
				// discuss at: http://phpjs.org/functions/range
				// +   original by: Waldo Malqui Silva
				// *	example 1: range ( 0, 12 );
				// *	returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
				// *	example 2: range( 0, 100, 10 );
				// *	returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
				// *	example 3: range( 'a', 'i' );
				// *	returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
				// *	example 4: range( 'c', 'a' );
				// *	returns 4: ['c', 'b', 'a']
				var matrix = [],
					inival,
					endval,
					plus,
					walker = step || 1,
					chars,
					typeData;

				typeData = convertTypes(low, high);
				inival = typeData.inival;
				endval = typeData.endval;
				chars = typeData.chars;

				plus = inival <= endval;
				if (plus) {
					while (inival <= endval) {
						matrix.push((chars ? String.fromCharCode(inival) : inival));
						inival += walker;
					}
				} else {
					while (inival >= endval) {
						matrix.push((chars ? String.fromCharCode(inival) : inival));
						inival -= walker;
					}
				}

				return matrix;
			}

			function isCorrectType(object) {
				return Array.isArray(object) || object instanceof NodeList || typeof object === "function";
			}

			function hasCorrectLength(object) {
				var length = object.length;

				return (length === 0 || typeof length === "number" && length > 0 && (length - 1) in object);
			}

			/**
			 * Check object is array-like (array-like include array and
			 * collection)
			 * @method isArrayLike
			 * @param {Object} object
			 * @return {boolean} Whether array-like object or not
			 * @member ns.util.array
			 * @static
			 */
			function isArrayLike(object) {

				// if object exists and is different from window
				// window object has length property
				if (object && object !== object.window) {
					// If length value is not number, object is not array and collection.
					// Collection type is not array but has length value.
					// e.g) Array.isArray(document.childNodes) ==> false
					return isCorrectType(object) && hasCorrectLength(object);
				}
				return false;
			}

			/**
			 * Faster version of standard forEach method in array
			 * Confirmed that this method is 20 times faster then native
			 * @method forEach
			 * @param {Array} array
			 * @param {Function} callback
			 * @member ns.util.array
			 * @static
			 */
			function forEach(array, callback) {
				var i,
					length,
					convertedArray = array;

				if (!(array instanceof Array)) {
					convertedArray = [].slice.call(array);
				}
				length = convertedArray.length;
				for (i = 0; i < length; i++) {
					callback(convertedArray[i], i, convertedArray);
				}
			}


			/**
			 * Faster version of standard filter method in array
			 * @method filter
			 * @param {Array} array
			 * @param {Function} callback
			 * @member ns.util.array
			 * @static
			 */
			function filter(array, callback) {
				var result = [],
					i,
					length,
					value,
					convertedArray = array;

				if (!(array instanceof Array)) {
					convertedArray = [].slice.call(array);
				}
				length = convertedArray.length;
				for (i = 0; i < length; i++) {
					value = convertedArray[i];
					if (callback(value, i, convertedArray)) {
						result.push(value);
					}
				}
				return result;
			}

			/**
			 * Faster version of standard map method in array
			 * Confirmed that this method is 60% faster then native
			 * @method map
			 * @param {Array} array
			 * @param {Function} callback
			 * @member ns.util.array
			 * @static
			 */
			function map(array, callback) {
				var result = [],
					i,
					length,
					convertedArray = array;

				if (!(array instanceof Array)) {
					convertedArray = [].slice.call(array);
				}
				length = convertedArray.length;
				for (i = 0; i < length; i++) {
					result.push(callback(convertedArray[i], i, convertedArray));
				}
				return result;
			}

			/**
			 * Faster version of standard reduce method in array
			 * Confirmed that this method is 60% faster then native
			 * @method reduce
			 * @param {Array} array
			 * @param {Function} callback
			 * @param {*} [initialValue]
			 * @member ns.util.array
			 * @return {*}
			 * @static
			 */
			function reduce(array, callback, initialValue) {
				var i,
					length,
					value,
					result = initialValue,
					convertedArray = array;

				if (!(array instanceof Array)) {
					convertedArray = [].slice.call(array);
				}
				length = convertedArray.length;
				for (i = 0; i < length; i++) {
					value = convertedArray[i];
					if (result === undefined && i === 0) {
						result = value;
					} else {
						result = callback(result, value, i, convertedArray);
					}
				}
				return result;
			}

			ns.util.array = {
				range: range,
				isArrayLike: isArrayLike,
				forEach: forEach,
				filter: filter,
				map: map,
				reduce: reduce
			};

			}(ns));

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/* global ns, define, CustomEvent */
/**
 * #Events
 *
 * The Tizen Advanced UI (TAU) framework provides events optimized for the Tizen
 * Web application. The following table displays the events provided by the TAU
 * framework.
 * @class ns.event
 */
(function (window, ns) {
	"use strict";
				/**
			 * Checks if specified variable is a array or not
			 * @method isArray
			 * @return {boolean}
			 * @member ns.event
			 * @private
			 * @static
			 */
			var instances = [],
				isArray = Array.isArray,
				isArrayLike = ns.util.array.isArrayLike,
				/**
				 * @property {RegExp} SPLIT_BY_SPACES_REGEXP
				 */
				SPLIT_BY_SPACES_REGEXP = /\s+/g,

				/**
				 * Returns trimmed value
				 * @method trim
				 * @param {string} value
				 * @return {string} trimmed string
				 * @static
				 * @private
				 * @member ns.event
				 */
				trim = function (value) {
					return value.trim();
				},

				/**
				 * Split string to array
				 * @method getEventsListeners
				 * @param {string|Array|Object} names string with one name of event, many names of events
				 * divided by spaces, array with names of widgets or object in which keys are names of
				 * events and values are callbacks
				 * @param {Function} globalListener
				 * @return {Array}
				 * @static
				 * @private
				 * @member ns.event
				 */
				getEventsListeners = function (names, globalListener) {
					var name,
						result = [],
						i;

					if (typeof names === "string") {
						names = names.split(SPLIT_BY_SPACES_REGEXP).map(trim);
					}

					if (isArray(names)) {
						for (i = 0; i < names.length; i++) {
							result.push({type: names[i], callback: globalListener});
						}
					} else {
						for (name in names) {
							if (names.hasOwnProperty(name)) {
								result.push({type: name, callback: names[name]});
							}
						}
					}
					return result;
				};

			/**
			 * Find instance by element
			 * @method findInstance
			 * @param {HTMLElement} element
			 * @return {ns.event.gesture.Instance}
			 * @member ns.event
			 * @static
			 * @private
			 */
			function findInstance(element) {
				var instance;

				instances.forEach(function (item) {
					if (item.element === element) {
						instance = item.instance;
					}
				});
				return instance;
			}

			/**
			 * Remove instance from instances by element
			 * @method removeInstance
			 * @param {HTMLElement} element
			 * @member ns.event
			 * @static
			 * @private
			 */
			function removeInstance(element) {
				instances.forEach(function (item, key) {
					if (item.element === element) {
						instances.splice(key, 1);
					}
				});
			}


			ns.event = {

				/**
				 * Triggers custom event fastOn element
				 * The return value is false, if at least one of the event
				 * handlers which handled this event, called preventDefault.
				 * Otherwise it returns true.
				 * @method trigger
				 * @param {HTMLElement|HTMLDocument} element
				 * @param {string} type
				 * @param {?*} [data=null]
				 * @param {boolean=} [bubbles=true]
				 * @param {boolean=} [cancelable=true]
				 * @return {boolean}
				 * @member ns.event
				 * @static
				 */
				trigger: function (element, type, data, bubbles, cancelable) {
					var evt = new CustomEvent(type, {
						"detail": data,
						//allow event to bubble up, required if we want to allow to listen fastOn document etc
						bubbles: typeof bubbles === "boolean" ? bubbles : true,
						cancelable: typeof cancelable === "boolean" ? cancelable : true
					});
										return element.dispatchEvent(evt);
				},

				/**
				 * Prevent default on original event
				 * @method preventDefault
				 * @param {Event} event
				 * @member ns.event
				 * @static
				 */
				preventDefault: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;

					if (originalEvent && originalEvent.preventDefault) {
						originalEvent.preventDefault();
					}
					event.preventDefault();
				},

				/**
				 * Stop event propagation
				 * @method stopPropagation
				 * @param {Event} event
				 * @member ns.event
				 * @static
				 */
				stopPropagation: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;

					if (originalEvent && originalEvent.stopPropagation) {
						originalEvent.stopPropagation();
					}
					event.stopPropagation();
				},

				/**
				 * Stop event propagation immediately
				 * @method stopImmediatePropagation
				 * @param {Event} event
				 * @member ns.event
				 * @static
				 */
				stopImmediatePropagation: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;

					if (originalEvent && originalEvent.stopImmediatePropagation) {
						originalEvent.stopImmediatePropagation();
					}
					event.stopImmediatePropagation();
				},

				/**
				 * Return document relative cords for event
				 * @method documentRelativeCoordsFromEvent
				 * @param {Event} event
				 * @return {Object}
				 * @return {number} return.x
				 * @return {number} return.y
				 * @member ns.event
				 * @static
				 */
				documentRelativeCoordsFromEvent: function (event) {
					var _event = event ? event : window.event,
						client = {
							x: _event.clientX,
							y: _event.clientY
						},
						page = {
							x: _event.pageX,
							y: _event.pageY
						},
						posX = 0,
						posY = 0,
						touch0,
						body = document.body,
						documentElement = document.documentElement;

					if (event.type.match(/^touch/)) {
						touch0 = _event.targetTouches[0] || _event.originalEvent.targetTouches[0];
						page = {
							x: touch0.pageX,
							y: touch0.pageY
						};
						client = {
							x: touch0.clientX,
							y: touch0.clientY
						};
					}

					if (page.x || page.y) {
						posX = page.x;
						posY = page.y;
					} else if (client.x || client.y) {
						posX = client.x + body.scrollLeft + documentElement.scrollLeft;
						posY = client.y + body.scrollTop + documentElement.scrollTop;
					}

					return {x: posX, y: posY};
				},

				/**
				 * Return target relative cords for event
				 * @method targetRelativeCoordsFromEvent
				 * @param {Event} event
				 * @return {Object}
				 * @return {number} return.x
				 * @return {number} return.y
				 * @member ns.event
				 * @static
				 */
				targetRelativeCoordsFromEvent: function (event) {
					var target = event.target,
						cords = {
							x: event.offsetX,
							y: event.offsetY
						};

					if (cords.x === undefined || isNaN(cords.x) ||
						cords.y === undefined || isNaN(cords.y)) {
						cords = ns.event.documentRelativeCoordsFromEvent(event);
						cords.x -= target.offsetLeft;
						cords.y -= target.offsetTop;
					}

					return cords;
				},

				/**
				 * Add event listener to element
				 * @method fastOn
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				fastOn: function (element, type, listener, useCapture) {
					element.addEventListener(type, listener, useCapture || false);
				},

				/**
				 * Remove event listener to element
				 * @method fastOff
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				fastOff: function (element, type, listener, useCapture) {
					element.removeEventListener(type, listener, useCapture || false);
				},

				/**
				 * Add event listener to element with prefixes for all browsers
				 *
				 *	@example
				 * 		tau.event.prefixedFastOn(document, "animationEnd", function() {
				 *			console.log("animation ended");
				 *		});
				 *		// write "animation ended" on console on event "animationEnd", "webkitAnimationEnd", "mozAnimationEnd", "msAnimationEnd", "oAnimationEnd"
				 *
				 * @method fastPrefixedOn
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				prefixedFastOn: function (element, type, listener, useCapture) {
					var nameForPrefix = type.charAt(0).toLocaleUpperCase() + type.substring(1);

					element.addEventListener(type.toLowerCase(), listener, useCapture || false);
					element.addEventListener("webkit" + nameForPrefix, listener, useCapture || false);
					element.addEventListener("moz" + nameForPrefix, listener, useCapture || false);
					element.addEventListener("ms" + nameForPrefix, listener, useCapture || false);
					element.addEventListener("o" + nameForPrefix.toLowerCase(), listener, useCapture || false);
				},

				/**
				 * Remove event listener to element with prefixes for all browsers
				 *
				 *	@example
				 *		tau.event.prefixedFastOff(document, "animationEnd", functionName);
				 *		// remove listeners functionName on events "animationEnd", "webkitAnimationEnd", "mozAnimationEnd", "msAnimationEnd", "oAnimationEnd"
				 *
				 * @method fastPrefixedOff
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				prefixedFastOff: function (element, type, listener, useCapture) {
					var nameForPrefix = type.charAt(0).toLocaleUpperCase() + type.substring(1);

					element.removeEventListener(type.toLowerCase(), listener, useCapture || false);
					element.removeEventListener("webkit" + nameForPrefix, listener, useCapture || false);
					element.removeEventListener("moz" + nameForPrefix, listener, useCapture || false);
					element.removeEventListener("ms" + nameForPrefix, listener, useCapture || false);
					element.removeEventListener("o" + nameForPrefix.toLowerCase(), listener, useCapture || false);
				},

				/**
				 * Add event listener to element that can be added addEventListener
				 * @method on
				 * @param {HTMLElement|HTMLDocument|Window} element
				 * @param {string|Array|Object} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				on: function (element, type, listener, useCapture) {
					var i,
						j,
						elementsLength,
						typesLength,
						elements,
						listeners;

					if (isArrayLike(element)) {
						elements = element;
					} else {
						elements = [element];
					}
					elementsLength = elements.length;
					listeners = getEventsListeners(type, listener);
					typesLength = listeners.length;
					for (i = 0; i < elementsLength; i++) {
						if (typeof elements[i].addEventListener === "function") {
							for (j = 0; j < typesLength; j++) {
								ns.event.fastOn(elements[i], listeners[j].type, listeners[j].callback, useCapture);
							}
						}
					}
				},

				/**
				 * Remove event listener to element
				 * @method off
				 * @param {HTMLElement|HTMLDocument|Window} element
				 * @param {string|Array|Object} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				off: function (element, type, listener, useCapture) {
					var i,
						j,
						elementsLength,
						typesLength,
						elements,
						listeners;

					if (isArrayLike(element)) {
						elements = element;
					} else {
						elements = [element];
					}
					elementsLength = elements.length;
					listeners = getEventsListeners(type, listener);
					typesLength = listeners.length;
					for (i = 0; i < elementsLength; i++) {
						if (typeof elements[i].addEventListener === "function") {
							for (j = 0; j < typesLength; j++) {
								ns.event.fastOff(elements[i], listeners[j].type, listeners[j].callback, useCapture);
							}
						}
					}
				},

				/**
				 * Add event listener to element only for one trigger
				 * @method one
				 * @param {HTMLElement|HTMLDocument|window} element
				 * @param {string|Array|Object} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @member ns.event
				 * @static
				 */
				one: function (element, type, listener, useCapture) {
					var arraySlice = [].slice,
						i,
						j,
						elementsLength,
						typesLength,
						elements,
						listeners,
						callbacks = [];

					if (isArrayLike(element)) {
						elements = arraySlice.call(element);
					} else {
						elements = [element];
					}
					elementsLength = elements.length;
					// pair type with listener
					listeners = getEventsListeners(type, listener);
					typesLength = listeners.length;
					// on each element
					for (i = 0; i < elementsLength; i++) {
						// if element has possibility of add listener
						if (typeof elements[i].addEventListener === "function") {
							callbacks[i] = [];
							// for each event type
							for (j = 0; j < typesLength; j++) {
								callbacks[i][j] = (function (i, j) {
									var args = arraySlice.call(arguments);

									ns.event.fastOff(elements[i], listeners[j].type, callbacks[i][j], useCapture);
									// remove the first argument of binding function
									args.shift();
									// remove the second argument of binding function
									args.shift();
									listeners[j].callback.apply(this, args);
								}).bind(null, i, j);
								ns.event.fastOn(elements[i], listeners[j].type, callbacks[i][j], useCapture);
							}
						}
					}
				},

				// disable is required because method has changing arguments

				/**
				 * Enable gesture handling on given HTML element or object
				 * @method enableGesture
				 * @param {HTMLElement} element
				 * @param {...Object} [gesture] Gesture object {@link ns.event.gesture}
				 * @member ns.event
				 */
				enableGesture: function (element) {
					var gestureInstance = findInstance(element),
						length = arguments.length,
						i = 1;

					if (!gestureInstance) {
						gestureInstance = new ns.event.gesture.Instance(element);
						instances.push({element: element, instance: gestureInstance});
					}

					for (; i < length; i++) {
						gestureInstance.addDetector(arguments[i]);
					}
				},

				/**
				 * Disable gesture handling from given HTML element or object
				 * @method disableGesture
				 * @param {HTMLElement} element
				 * @param {...Object} [gesture] Gesture object {@link ns.event.gesture}
				 * @member ns.event
				 */
				disableGesture: function (element) {
					var gestureInstance = findInstance(element),
						length = arguments.length,
						i = 1;

					if (!gestureInstance) {
						return;
					}

					if (length > 1) {
						gestureInstance.removeDetector(arguments[i]);
					} else {
						gestureInstance.destroy();
						removeInstance(element);
					}
				}

			};

			}(window, ns));

/*global define: false, window: false, ns: false */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Selectors Utility
 * Object contains functions to get HTML elements by different selectors.
 * @class ns.util.selectors
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Damian Osipiuk <d.osipiuk@samsung.com>
 */
(function (document, ns) {
	"use strict";
				/**
			 * @method slice Alias for array slice method
			 * @member ns.util.selectors
			 * @private
			 * @static
			 */
			var slice = [].slice,
				/**
				 * @method matchesSelectorType
				 * @return {string|boolean}
				 * @member ns.util.selectors
				 * @private
				 * @static
				 */
				matchesSelectorType = (function () {
					var el = document.createElement("div");

					if (typeof el.webkitMatchesSelector === "function") {
						return "webkitMatchesSelector";
					}

					if (typeof el.mozMatchesSelector === "function") {
						return "mozMatchesSelector";
					}

					if (typeof el.msMatchesSelector === "function") {
						return "msMatchesSelector";
					}

					if (typeof el.matchesSelector === "function") {
						return "matchesSelector";
					}

					if (typeof el.matches === "function") {
						return "matches";
					}

					return "";
				}());

			/**
			 * Prefix selector with 'data-' and namespace if present
			 * @method getDataSelector
			 * @param {string} selector
			 * @return {string}
			 * @member ns.util.selectors
			 * @private
			 * @static
			 */
			function getDataSelector(selector) {
				var namespace = ns.getConfig("namespace");

				return "[data-" + (namespace ? namespace + "-" : "") + selector + "]";
			}

			/**
			 * Runs matches implementation of matchesSelector
			 * method on specified element
			 * @method matchesSelector
			 * @param {HTMLElement} element
			 * @param {string} selector
			 * @return {boolean}
			 * @static
			 * @member ns.util.selectors
			 */
			function matchesSelector(element, selector) {
				if (matchesSelectorType && element[matchesSelectorType]) {
					return element[matchesSelectorType](selector);
				}
				return false;
			}

			/**
			 * Return array with all parents of element.
			 * @method parents
			 * @param {HTMLElement} element
			 * @return {Array}
			 * @member ns.util.selectors
			 * @private
			 * @static
			 */
			function parents(element) {
				var items = [],
					current = element.parentNode;

				while (current && current !== document) {
					items.push(current);
					current = current.parentNode;
				}
				return items;
			}

			/**
			 * Checks if given element and its ancestors matches given function
			 * @method closest
			 * @param {HTMLElement} element
			 * @param {Function} testFunction
			 * @return {?HTMLElement}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function closest(element, testFunction) {
				var current = element;

				while (current && current !== document) {
					if (testFunction(current)) {
						return current;
					}
					current = current.parentNode;
				}
				return null;
			}

			/**
			 * @method testSelector
			 * @param {string} selector
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function testSelector(selector, node) {
				return matchesSelector(node, selector);
			}

			/**
			 * @method testClass
			 * @param {string} className
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function testClass(className, node) {
				return node && node.classList && node.classList.contains(className);
			}

			/**
			 * @method testTag
			 * @param {string} tagName
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @member ns.util.selectors
			 * @static
			 * @private
			 */
			function testTag(tagName, node) {
				return node.tagName.toLowerCase() === tagName;
			}

			/**
			 * @class ns.util.selectors
			 */
			ns.util.selectors = {
				matchesSelector: matchesSelector,

				/**
				 * Return array with children pass by given selector.
				 * @method getChildrenBySelector
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getChildrenBySelector: function (context, selector) {
					return slice.call(context.children).filter(testSelector.bind(null, selector));
				},

				/**
				 * Return array with children pass by given data-namespace-selector.
				 * @method getChildrenByDataNS
				 * @param {HTMLElement} context
				 * @param {string} dataSelector
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getChildrenByDataNS: function (context, dataSelector) {
					return slice.call(context.children).filter(testSelector.bind(null,
						getDataSelector(dataSelector)));
				},

				/**
				 * Return array with children with given class name.
				 * @method getChildrenByClass
				 * @param {HTMLElement} context
				 * @param {string} className
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getChildrenByClass: function (context, className) {
					return slice.call(context.children).filter(testClass.bind(null, className));
				},

				/**
				 * Return array with children with given tag name.
				 * @method getChildrenByTag
				 * @param {HTMLElement} context
				 * @param {string} tagName
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getChildrenByTag: function (context, tagName) {
					return slice.call(context.children).filter(testTag.bind(null, tagName));
				},

				/**
				 * Return array with all parents of element.
				 * @method getParents
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getParents: parents,

				/**
				 * Return array with all parents of element pass by given selector.
				 * @method getParentsBySelector
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getParentsBySelector: function (context, selector) {
					return parents(context).filter(testSelector.bind(null, selector));
				},

				/**
				 * Return array with all parents of element pass by given selector with namespace.
				 * @method getParentsBySelectorNS
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getParentsBySelectorNS: function (context, selector) {
					return parents(context).filter(testSelector.bind(null, getDataSelector(selector)));
				},

				/**
				 * Return array with all parents of element with given class name.
				 * @method getParentsByClass
				 * @param {HTMLElement} context
				 * @param {string} className
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getParentsByClass: function (context, className) {
					return parents(context).filter(testClass.bind(null, className));
				},

				/**
				 * Return array with all parents of element with given tag name.
				 * @method getParentsByTag
				 * @param {HTMLElement} context
				 * @param {string} tagName
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getParentsByTag: function (context, tagName) {
					return parents(context).filter(testTag.bind(null, tagName));
				},

				/**
				 * Return first element from parents of element pass by selector.
				 * @method getClosestBySelector
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {HTMLElement}
				 * @static
				 * @member ns.util.selectors
				 */
				getClosestBySelector: function (context, selector) {
					return closest(context, testSelector.bind(null, selector));
				},

				/**
				 * Return first element from parents of element pass by selector with namespace.
				 * @method getClosestBySelectorNS
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {HTMLElement}
				 * @static
				 * @member ns.util.selectors
				 */
				getClosestBySelectorNS: function (context, selector) {
					return closest(context, testSelector.bind(null, getDataSelector(selector)));
				},

				/**
				 * Return first element from parents of element with given class name.
				 * @method getClosestByClass
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {HTMLElement}
				 * @static
				 * @member ns.util.selectors
				 */
				getClosestByClass: function (context, selector) {
					return closest(context, testClass.bind(null, selector));
				},

				/**
				 * Return first element from parents of element with given tag name.
				 * @method getClosestByTag
				 * @param {HTMLElement} context
				 * @param {string} selector
				 * @return {HTMLElement}
				 * @static
				 * @member ns.util.selectors
				 */
				getClosestByTag: function (context, selector) {
					return closest(context, testTag.bind(null, selector));
				},

				/**
				 * Return array of elements from context with given data-selector
				 * @method getAllByDataNS
				 * @param {HTMLElement} context
				 * @param {string} dataSelector
				 * @return {Array}
				 * @static
				 * @member ns.util.selectors
				 */
				getAllByDataNS: function (context, dataSelector) {
					return slice.call(context.querySelectorAll(getDataSelector(dataSelector)));
				},

				/**
				 * Get scrollable parent element
				 * @method getScrollableParent
				 * @param {HTMLElement} element
				 * @return {HTMLElement}
				 * @static
				 * @member ns.util.selectors
				 */
				getScrollableParent: function (element) {
					var overflow,
						style;

					while (element && element !== document.body) {
						style = window.getComputedStyle(element);

						if (style) {
							overflow = style.getPropertyValue("overflow-y");
							if (overflow === "scroll" || (overflow === "auto" &&
								element.scrollHeight > element.clientHeight)) {
								return element;
							}
						}
						element = element.parentNode;
					}
					return null;
				}
			};
			}(window.document, ns));

/*global define, ns */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Object Utility
 * Object contains functions help work with objects.
 * @class ns.util.object
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function () {
	"use strict";
	
			var object = {
				/**
				 * Copy object to new object
				 * @method copy
				 * @param {Object} orgObject
				 * @return {Object}
				 * @static
				 * @member ns.util.object
				 */
				copy: function (orgObject) {
					return object.merge({}, orgObject);
				},

				/**
				 * Attach fields from second object to first object.
				 * @method fastMerge
				 * @param {Object} newObject
				 * @param {Object} orgObject
				 * @return {Object}
				 * @static
				 * @member ns.util.object
				 */
				fastMerge: function (newObject, orgObject) {
					var key,
						propertyDescriptor;

					for (key in orgObject) {
						if (orgObject.hasOwnProperty(key)) {
							propertyDescriptor = Object.getOwnPropertyDescriptor(newObject, key);
							if (!propertyDescriptor || propertyDescriptor.writable === true || propertyDescriptor.set != undefined) {
								newObject[key] = orgObject[key];
							} else {
								console.warn("Attempt to override object readonly property (" + key + ") during merge.")
							}
						}
					}
					return newObject;
				},

				/**
				 * Attach fields from second and next object to first object.
				 * @method merge
				 * @return {Object}
				 * @static
				 * @member ns.util.object
				 */
				merge: function (/* newObject, orgObject, override */) {
					var newObject,
						orgObject,
						override,
						key,
						args = [].slice.call(arguments),
						argsLength = args.length,
						i,
						propertyDescriptor;

					newObject = args.shift();
					override = true;
					if (typeof arguments[argsLength - 1] === "boolean") {
						override = arguments[argsLength - 1];
						argsLength--;
					}
					for (i = 0; i < argsLength; i++) {
						orgObject = args.shift();
						if (orgObject !== null) {
							for (key in orgObject) {
								if (orgObject.hasOwnProperty(key)) {
									propertyDescriptor = Object.getOwnPropertyDescriptor(newObject, key);
									if (!propertyDescriptor ||
										(override && (propertyDescriptor.writable === true || propertyDescriptor.set != undefined))) {
										newObject[key] = orgObject[key];
									} else if (override) {
										console.warn("Attempt to override object readonly property (" + key + ") during merge.")
									}
								}
							}
						}
					}
					return newObject;
				},

				/**
				 * Function add to Constructor prototype Base object and add to prototype properties and methods from
				 * prototype object.
				 * @method inherit
				 * @param {Function} Constructor
				 * @param {Function} Base
				 * @param {Object} prototype
				 * @static
				 * @member ns.util.object
				 */
				/* jshint -W083 */
				inherit: function (Constructor, Base, prototype) {
					var basePrototype = new Base(),
						property,
						value;

					for (property in prototype) {
						if (prototype.hasOwnProperty(property)) {
							value = prototype[property];
							if (typeof value === "function") {
								basePrototype[property] = (function (Base, property, value) {
									var _super = function () {
										var superFunction = Base.prototype[property];

										if (superFunction) {
											return superFunction.apply(this, arguments);
										}
										return null;
									};

									return function () {
										var __super = this._super,
											returnValue;

										this._super = _super;
										returnValue = value.apply(this, arguments);
										this._super = __super;
										return returnValue;
									};
								}(Base, property, value));
							} else {
								basePrototype[property] = value;
							}
						}
					}

					Constructor.prototype = basePrototype;
					Constructor.prototype.constructor = Constructor;
				},

				/**
				 * Returns true if every property value corresponds value from 'value' argument
				 * @method hasPropertiesOfValue
				 * @param {Object} obj
				 * @param {*} [value=undefined]
				 * @return {boolean}
				 */
				hasPropertiesOfValue: function (obj, value) {
					var keys = Object.keys(obj),
						i = keys.length;

					// Empty array should return false
					if (i === 0) {
						return false;
					}

					while (--i >= 0) {
						if (obj[keys[i]] !== value) {
							return false;
						}
					}

					return true;
				},

				/**
				 * Remove properties from object.
				 * @method removeProperties
				 * @param {Object} object
				 * @param {Array} propertiesToRemove
				 * @return {Object}
				 */
				removeProperties: function (object, propertiesToRemove) {
					var length = propertiesToRemove.length,
						property,
						i;

					for (i = 0; i < length; i++) {
						property = propertiesToRemove[i];
						if (object.hasOwnProperty(property)) {
							delete object[property];
						}
					}
					return object;
				}
			};

			ns.util.object = object;
			}());

/*global window, define, ns, Node */
/*jslint nomen: true, plusplus: true, bitwise: false */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Engine
 * Main class with engine of library which control communication
 * between parts of framework.
 * @class ns.engine
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Michal Szepielak <m.szepielak@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Przemyslaw Ciezkowski <p.ciezkowski@samsung.com>
 * @author Hyunkook, Cho <hk0713.cho@samsung.com>
 * @author Hyeoncheol Choi <hc7.choi@samsung.com>
 * @author Piotr Ostalski <p.ostalski@samsung.com>
 */
(function (window, document) {
	"use strict";
				var slice = [].slice,
				/**
				 * @property {Object} eventUtils {@link ns.event}
				 * @private
				 * @static
				 * @member ns.engine
				 */
				eventUtils = ns.event,
				util = ns.util,
				objectUtils = util.object,
				selectors = util.selectors,
				arrayUtils = ns.util.array,
				/**
				 * @property {Object} widgetDefinitions Object with widgets definitions
				 * @private
				 * @static
				 * @member ns.engine
				 */
				widgetDefinitions = {},
				/**
				 * @property {Object} widgetBindingMap Object with widgets bindings
				 * @private
				 * @static
				 * @member ns.engine
				 */
				widgetBindingMap = {},
				location = window.location,
				/**
				 * engine mode, if true then engine only builds widgets
				 * @property {boolean} justBuild
				 * @private
				 * @static
				 * @member ns.engine
				 */
				justBuild = location.hash === "#build",
				/**
				 * @property {string} [TYPE_STRING="string"] local cache of string type name
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				TYPE_STRING = "string",
				/**
				 * @property {string} [TYPE_FUNCTION="function"] local cache of function type name
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				TYPE_FUNCTION = "function",
				/**
				 * @property {string} [DATA_BUILT="data-tau-built"] attribute informs that widget id build
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				DATA_BUILT = "data-tau-built",
				/**
				 * @property {string} [DATA_NAME="data-tau-name"] attribute contains widget name
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				DATA_NAME = "data-tau-name",
				/**
				 * @property {string} [DATA_BOUND="data-tau-bound"] attribute informs that widget id bound
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				DATA_BOUND = "data-tau-bound",
				/**
				 * @property {string} [DATA_WIDGET_WRAPPER="data-tau-wrapper"] attribute informs that widget has wrapper
				 * @private
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				DATA_WIDGET_WRAPPER = "data-tau-wrapper",
				/**
				 * @property {string} NAMES_SEPARATOR
				 * @private
				 * @static
				 * @readonly
				 */
				NAMES_SEPARATOR = ",",
				/**
				 * @property {string} [querySelectorWidgets="*[data-tau-built][data-tau-name]:not([data-tau-bound])"] query selector for all widgets which are built but not bound
				 * @private
				 * @static
				 * @member ns.engine
				 */
				querySelectorWidgets = "*[" + DATA_BUILT + "][" + DATA_NAME + "]:not([" + DATA_BOUND + "])",
				/**
				 * @method excludeBuildAndBound
				 * @private
				 * @static
				 * @param {string} widgetType
				 * @member ns.engine
				 * @return {string} :not([data-tau-built*='widgetName']):not([data-tau-bound*='widgetName'])
				 */
				excludeBuiltAndBound = function (widgetType) {
					return ":not([" + DATA_BUILT + "*='" + widgetType + "']):not([" + DATA_BOUND + "*='" + widgetType + "'])";
				},

				/**
				 * Engine event types
				 * @property {Object} eventType
				 * @property {string} eventType.INIT="tauinit" INIT of framework init event
				 * @property {string} eventType.WIDGET_BOUND="widgetbound" WIDGET_BOUND of widget bound event
				 * @property {string} eventType.WIDGET_DEFINED="widgetdefined" WIDGET_DEFINED of widget built event
				 * @property {string} eventType.WIDGET_BUILT="widgetbuilt" WIDGET_BUILT of widget built event
				 * @property {string} eventType.BOUND="bound" BOUND of bound event
				 * @static
				 * @readonly
				 * @member ns.engine
				 */
				eventType = {
					INIT: "tauinit",
					READY: "tauready",
					WIDGET_BOUND: "widgetbound",
					WIDGET_DEFINED: "widgetdefined",
					WIDGET_BUILT: "widgetbuilt",
					DESTROY: "taudestroy",
					BOUND: "bound",
					WIDGET_INIT: "init",
					STOP_ROUTING: "tauroutingstop"
				},
				engine;

			/**
			 * This function prepares selector for widget' definition
			 * @method selectorChange
			 * @param {string} selectorName
			 * @return {string} new selector
			 * @member ns.engine
			 * @static
			 */
			function selectorChange(selectorName) {
				if (selectorName.match(/\[data-role=/) && !selectorName.match(/:not\(\[data-role=/)) {
					return selectorName.trim();
				}
				return selectorName.trim() + ":not([data-role='none'])";
			}

			/**
			 * Function to define widget
			 * @method defineWidget
			 * @param {string} name
			 * @param {string} selector
			 * @param {Array} methods
			 * @param {Object} widgetClass
			 * @param {string} [namespace]
			 * @param {boolean} [redefine]
			 * @param {boolean} [widgetNameToLowercase=true]
			 * @return {boolean}
			 * @member ns.engine
			 * @static
			 */
			function defineWidget(name, selector, methods, widgetClass, namespace, redefine, widgetNameToLowercase, BaseElement, buildOptions) {
				var definition;
				// Widget name is absolutely required

				buildOptions = buildOptions || {};
				if (name) {
					if (!widgetDefinitions[name] || redefine) {
												methods = methods || [];
						methods.push("destroy", "disable", "enable", "option", "refresh", "value");
						definition = {
							name: name,
							methods: methods,
							selector: selector || "",
							selectors: selector ? selector.split(",").map(selectorChange) : [],
							widgetClass: widgetClass || null,
							namespace: namespace || "",
							widgetNameToLowercase: widgetNameToLowercase === undefined ? true : !!widgetNameToLowercase,
							BaseElement: BaseElement,
							buildOptions: buildOptions
						};

						widgetDefinitions[name] = definition;
						if (namespace) {
							widgetDefinitions[namespace + "." + name] = definition;
						}
						eventUtils.trigger(document, "widgetdefined", definition, false);
						return true;
					}
									} else {
					ns.error("Widget with selector [" + selector + "] defined without a name, aborting!");
				}
				return false;
			}


			/**
			 * Get widget instance from binding for given element and type
			 * @method getInstanceByElement
			 * @static
			 * @param {Object} binding
			 * @param {HTMLElement} element
			 * @param {string} [type] widget name, if is empty then return first built widget
			 * @return {?Object}
			 * @member ns.engine
			 */
			function getInstanceByElement(binding, element, type) {
				var widgetInstance,
					bindingElement,
					storedWidgetNames,
					names = type ? type.split(".") : [],
					name = names.pop(),
					namespace = names.pop();

				// If name is defined it's possible to fetch it instantly
				if (name) {
					widgetInstance = binding.instances[name];
				} else {
					storedWidgetNames = Object.keys(binding.instances);
					widgetInstance = binding.instances[storedWidgetNames[0]];
				}

				if (namespace && widgetInstance && widgetInstance.namespace !== namespace) {
					widgetInstance = null;
				}

				// Return only it instance of the proper widget exists
				if (widgetInstance) {
					
					// Check if widget instance has that same object referenced
					if (widgetInstance.element === element) {
						return widgetInstance;
					}
				}

				return null;
			}

			/**
			 * Filter children with DATA_BUILT attribute
			 * @param {HTMLElement} child
			 * @private
			 */
			function filterBuiltWidget(child) {
				return child.hasAttribute(DATA_BUILT);
			}

			/**
			 * Get binding for element
			 * @method getBinding
			 * @static
			 * @param {HTMLElement|string} element
			 * @param {string} [type] widget name
			 * @return {?Object}
			 * @member ns.engine
			 */
			function getBinding(element, type) {
				var id = !element || typeof element === TYPE_STRING ? element : element.id,
					binding,
					baseElement;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(id);
				}

				if (element) {
					// Fetch group of widget defined for this element
					binding = widgetBindingMap[id];

					if (binding && typeof binding === "object") {
						return getInstanceByElement(binding, element, type);
					} else {
						// Check if widget has wrapper and find base element
						if (typeof element.hasAttribute === TYPE_FUNCTION &&
								element.hasAttribute(DATA_WIDGET_WRAPPER)) {
							baseElement = slice.call(element.children).filter(filterBuiltWidget)[0];
							if (baseElement) {
								return getBinding(baseElement, type);
							}
						}
					}
				}

				return null;
			}

			/**
			 * Set binding of widget
			 * @method setBinding
			 * @param {ns.widget.BaseWidget} widgetInstance
			 * @static
			 * @member ns.engine
			 */
			function setBinding(widgetInstance) {
				var id = widgetInstance.element.id,
					type = widgetInstance.name,
					widgetBinding = widgetBindingMap[id];

				
				// If the HTMLElement never had a widget declared create an empty object
				if (!widgetBinding) {
					widgetBinding = {
						elementId: id,
						element: widgetInstance.element,
						instances: {}
					};
				}

				widgetBinding.instances[type] = widgetInstance;
				widgetBindingMap[id] = widgetBinding;
			}

			/**
			 * Returns all bindings for element or id gives as parameter
			 * @method getAllBindings
			 * @param {HTMLElement|string} element
			 * @return {?Object}
			 * @static
			 * @member ns.engine
			 */
			function getAllBindings(element) {
				var id = !element || typeof element === TYPE_STRING ? element : element.id;

				return (widgetBindingMap[id] && widgetBindingMap[id].instances) || null;
			}

			/**
			 * Removes given name from attributeValue string.
			 * Names should be separated with a NAMES_SEPARATOR
			 * @param {string} name
			 * @param {string} attributeValue
			 * @private
			 * @static
			 * @return {string}
			 */
			function _removeWidgetNameFromAttribute(name, attributeValue) {
				var widgetNames,
					searchResultIndex;

				// Split attribute value by separator
				widgetNames = attributeValue.split(NAMES_SEPARATOR);
				searchResultIndex = widgetNames.indexOf(name);

				if (searchResultIndex > -1) {
					widgetNames.splice(searchResultIndex, 1);
					attributeValue = widgetNames.join(NAMES_SEPARATOR);
				}

				return attributeValue;
			}

			function _removeAllBindingAttributes(element) {
				element.removeAttribute(DATA_BUILT);
				element.removeAttribute(DATA_BOUND);
				element.removeAttribute(DATA_NAME);
			}

			/**
			 * Remove binding data attributes for element.
			 * @method _removeBindingAttributes
			 * @param {HTMLElement} element
			 * @param {string} type widget type (name)
			 * @private
			 * @static
			 * @member ns.engine
			 */
			function _removeWidgetFromAttributes(element, type) {
				var dataBuilt,
					dataBound,
					dataName;

				// Most often case is that name is not defined
				if (!type) {
					_removeAllBindingAttributes(element);
				} else {
					dataBuilt = _removeWidgetNameFromAttribute(type, element.getAttribute(DATA_BUILT) || "");
					dataBound = _removeWidgetNameFromAttribute(type, element.getAttribute(DATA_BOUND) || "");
					dataName = _removeWidgetNameFromAttribute(type, element.getAttribute(DATA_NAME) || "");

					// Check if all attributes have at least one widget
					if (dataBuilt && dataBound && dataName) {
						element.setAttribute(DATA_BUILT, dataBuilt);
						element.setAttribute(DATA_BOUND, dataBound);
						element.setAttribute(DATA_NAME, dataName);
					} else {
						// If something is missing remove everything
						_removeAllBindingAttributes(element);
					}
				}
			}

			/**
			 * Method removes binding for single widget.
			 * @method _removeSingleBinding
			 * @param {Object} bindingGroup
			 * @param {string} type
			 * @return {boolean}
			 * @private
			 * @static
			 */
			function _removeSingleBinding(bindingGroup, type) {
				var widgetInstance = bindingGroup[type];

				if (widgetInstance) {
					if (widgetInstance.element && typeof widgetInstance.element.setAttribute === TYPE_FUNCTION) {
						_removeWidgetFromAttributes(widgetInstance.element, type);
					}

					delete bindingGroup[type];

					return true;
				}

				return false;
			}

			/**
			 * Remove group of bindings for all types of widgets based on the same element
			 * @method removeGroupBindingAllTypes
			 * @param {Object} bindingGroup
			 * @param {string} id widget element id
			 * @return {boolean}
			 * @static
			 * @member ns.engine
			 */
			function removeGroupBindingAllTypes(bindingGroup, id) {
				var singleSuccess,
					widgetName,
					fullSuccess = true;

				// Iterate over group of created widgets
				for (widgetName in bindingGroup) {
					if (bindingGroup.hasOwnProperty(widgetName)) {
						singleSuccess = _removeSingleBinding(bindingGroup, widgetName);
						
						// As we iterate over keys we are sure we want to remove this element
						// NOTE: Removing property by delete is slower than assigning null value
						bindingGroup[widgetName] = null;

						fullSuccess = (fullSuccess && singleSuccess);
					}
				}

				// If the object bindingGroup is empty or every key has a null value
				if (objectUtils.hasPropertiesOfValue(bindingGroup, null)) {
					// NOTE: Removing property by delete is slower than assigning null value
					widgetBindingMap[id] = null;
				}

				return fullSuccess;
			}

			/**
			 * Remove group of bindings for widgets based on the same element
			 * @method removeGroupBinding
			 * @param {Object} bindingGroup
			 * @param {string} type object name
			 * @param {string} id widget element id
			 * @return {boolean}
			 * @static
			 * @member ns.engine
			 */
			function removeGroupBinding(bindingGroup, type, id) {
				var success;

				if (!type) {
					success = removeGroupBindingAllTypes(bindingGroup, id);
				} else {
					success = _removeSingleBinding(bindingGroup, type);
					if (objectUtils.hasPropertiesOfValue(bindingGroup, null)) {
						widgetBindingMap[id] = null;
					}
				}
				return success;
			}

			/**
			 * Remove binding for widget based on element.
			 * @method removeBinding
			 * @param {HTMLElement|string} element
			 * @param {?string} [type=null] widget name
			 * @return {boolean}
			 * @static
			 * @member ns.engine
			 */
			function removeBinding(element, type) {
				var id = (typeof element === TYPE_STRING) ? element : element.id,
					binding = widgetBindingMap[id],
					bindingGroup;

				// [NOTICE] Due to backward compatibility calling removeBinding
				// with one parameter should remove all bindings

				if (binding) {
					if (typeof element === TYPE_STRING) {
						// Search based on current document may return bad results,
						// use previously defined element if it exists
						element = binding.element;
					}

					if (element) {
						_removeWidgetFromAttributes(element, type);
					}

					bindingGroup = widgetBindingMap[id] && widgetBindingMap[id].instances;
					if (bindingGroup) {
						return removeGroupBinding(bindingGroup, type, id);
					}

					if (widgetBindingMap[id].instances && (Object.keys(widgetBindingMap[id].instances).length === 0)) {
						widgetBindingMap[id] = null;
					}
				}

				return false;
			}

			/**
			 * Removes all bindings of widgets.
			 * @method removeAllBindings
			 * @param {HTMLElement|string} element
			 * @return {boolean}
			 * @static
			 * @member ns.engine
			 */
			function removeAllBindings(element) {
				// @TODO this should be coded in the other way around, removeAll should loop through all bindings and inside call removeBinding
				// but due to backward compatibility that code should be more readable
				return removeBinding(element);
			}

			/**
			 * If element not exist create base element for widget.
			 * @method ensureElement
			 * @param {HTMLElement} element
			 * @param {ns.widget.BaseWidget} Widget
			 * @return {HTMLElement}
			 * @static
			 * @private
			 * @member ns.engine
			 */
			function ensureElement(element, Widget) {
				if (!element || !(element instanceof HTMLElement)) {
					if (typeof Widget.createEmptyElement === TYPE_FUNCTION) {
						element = Widget.createEmptyElement();
					} else {
						element = document.createElement("div");
					}
				}
				return element;
			}

			/**
			 * Process core widget method
			 * - configure
			 * - build
			 * - init
			 * - bindEvents
			 * @method processWidget
			 * @param {HTMLElement} element base element of widget
			 * @param {Object} widgetInstance instance of widget
			 * @param {Object} definition definition of widget
			 * @param {ns.widget.BaseWidget} definition.widgetClass
			 * @param {string} definition.name
			 * @param {Object} [options] options for widget
			 * @private
			 * @static
			 * @member ns.engine
			 */
			function coreProcessWidget(element, widgetInstance, definition, options) {
				var widgetOptions = options || {},
					createFunction = widgetOptions.create,
					buildAttribute;

				
				element = widgetInstance.configure(definition, element, options);

				// Run .create method from widget options when a [widgetName]create event is triggered
				if (typeof createFunction === TYPE_FUNCTION) {
					eventUtils.one(element, definition.name.toLowerCase() + "create", createFunction);
				}

				if (element.id) {
					widgetInstance.id = element.id;
				}

				// Check if this type of widget was build for this element before
				buildAttribute = element.getAttribute(DATA_BUILT);
				if (!buildAttribute ||
					buildAttribute.split(NAMES_SEPARATOR).indexOf(widgetInstance.name) === -1) {
					element = widgetInstance.build(element);
				}

				if (element) {
					widgetInstance.element = element;

					setBinding(widgetInstance);

					widgetInstance.trigger(eventType.WIDGET_BUILT, widgetInstance, false);

					if (!justBuild) {
						widgetInstance.init(element);
					}

					widgetInstance.bindEvents(element, justBuild);

					widgetInstance.trigger(widgetInstance.widgetEventPrefix + eventType.WIDGET_INIT);
					widgetInstance.trigger(eventType.WIDGET_BOUND, widgetInstance, false);
					eventUtils.trigger(document, eventType.WIDGET_BOUND, widgetInstance);
				} else {
									}
			}

			/**
			 * Load widget
			 * @method processWidget
			 * @param {HTMLElement} element base element of widget
			 * @param {Object} definition definition of widget
			 * @param {ns.widget.BaseWidget} definition.widgetClass
			 * @param {string} definition.name
			 * @param {Object} [options] options for widget
			 * @return {?HTMLElement}
			 * @private
			 * @static
			 * @member ns.engine
			 */
			function processWidget(element, definition, options) {
				var Widget = definition.widgetClass,
					/**
					 * @type {ns.widget.BaseWidget} widgetInstance
					 */
					widgetInstance,
					parentEnhance,
					existingBinding;

				element = ensureElement(element, Widget);
				widgetInstance = Widget ? new Widget(element, options) : false;

				// if any parent has attribute data-enhance=false then stop building widgets
				parentEnhance = selectors.getParentsBySelectorNS(element, "enhance=false");

				// While processing widgets queue other widget may built this one before
				// it reaches it's turn
				existingBinding = getBinding(element, definition.name);
				if (existingBinding && existingBinding.element === element) {
					return element;
				}

				if (widgetInstance) {
					if (!parentEnhance.length) {
						coreProcessWidget(element, widgetInstance, definition, options);
					}
					return widgetInstance.element;
				}

				return null;
			}

			/**
			 * Destroys widget of given 'type' for given HTMLElement.
			 * [NOTICE] This method won't destroy any children widgets.
			 * @method destroyWidget
			 * @param {HTMLElement|string} element
			 * @param {string} type
			 * @static
			 * @member ns.engine
			 */
			function destroyWidget(element, type) {
				var widgetInstance;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(element);
				}

				
				// If type is not defined all widgets should be removed
				// this is for backward compatibility
				widgetInstance = getBinding(element, type);

				if (widgetInstance) {
					//Destroy widget
					widgetInstance.destroy();
					widgetInstance.trigger("widgetdestroyed");

					removeBinding(element, type);
				}
			}

			/**
			 * Calls destroy on group of widgets connected with given HTMLElement
			 * @method destroyGroupWidgets
			 * @param {HTMLElement|string} element
			 * @static
			 * @private
			 * @member ns.engine
			 */
			function destroyGroupWidgets(element) {
				var widgetName,
					widgetInstance,
					widgetGroup;

				widgetGroup = getAllBindings(element);
				for (widgetName in widgetGroup) {
					if (widgetGroup.hasOwnProperty(widgetName)) {
						widgetInstance = widgetGroup[widgetName];

						//Destroy widget
						if (widgetInstance) {
							widgetInstance.destroy();
							widgetInstance.trigger("widgetdestroyed");
						}
					}
				}
			}

			/**
			 * Calls destroy on widget (or widgets) connected with given HTMLElement
			 * Removes child widgets as well.
			 * @method destroyAllWidgets
			 * @param {HTMLElement|string} element
			 * @param {boolean} [childOnly=false] destroy only widgets on children elements
			 * @static
			 * @member ns.engine
			 */
			function destroyAllWidgets(element, childOnly) {
				var childWidgets,
					i;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(element);
				}

				
				if (!childOnly) {
					// If type is not defined all widgets should be removed
					// this is for backward compatibility
					destroyGroupWidgets(element);
				}

				//Destroy child widgets, if something left.
				childWidgets = slice.call(element.querySelectorAll("[" + DATA_BOUND + "]"));
				for (i = childWidgets.length - 1; i >= 0; i -= 1) {
					if (childWidgets[i]) {
						destroyAllWidgets(childWidgets[i], false);
					}
				}

				removeAllBindings(element);
			}

			/**
			 * Load widgets from data-* definition
			 * @method processHollowWidget
			 * @param {HTMLElement} element base element of widget
			 * @param {Object} definition widget definition
			 * @param {Object} [options] options for create widget
			 * @return {HTMLElement} base element of widget
			 * @private
			 * @static
			 * @member ns.engine
			 */
			function processHollowWidget(element, definition, options) {
				var name = (element && element.getAttribute(DATA_NAME)) ||
					(definition && definition.name);
								definition = definition || (name && widgetDefinitions[name]) || {
					"name": name
				};
				return processWidget(element, definition, options);
			}

			/**
			 * Compare function for nodes on build queue
			 * @param {Object} nodeA
			 * @param {Object} nodeB
			 * @return {number}
			 * @private
			 * @static
			 */
			function compareByDepth(nodeA, nodeB) {
				/*jshint -W016 */
				var mask = Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING;

				if (nodeA.element === nodeB.element) {
					return 0;
				}

				if (nodeA.element.compareDocumentPosition(nodeB.element) & mask) {
					return 1;
				}
				/*jshint +W016 */
				return -1;
			}

			/**
			 * Processes one build queue item. Runs processHollowWidget
			 * underneath
			 * @method processBuildQueueItem
			 * @param {Object|HTMLElement} queueItem
			 * @private
			 * @static
			 */
			function processBuildQueueItem(queueItem) {
				// HTMLElement doesn't have .element property
				// widgetDefinitions will return undefined when called widgetDefinitions[undefined]
				processHollowWidget(queueItem.element || queueItem, widgetDefinitions[queueItem.widgetName]);
			}

			function boundPerfListener() {
				document.removeEventListener(eventType.BOUND, boundPerfListener);
				window.tauPerf.get("engine/createWidgets", "event: " + eventType.BOUND);
			}

			function builtPerfListener() {
				document.removeEventListener("built", builtPerfListener);
				window.tauPerf.get("engine/createWidgets", "event: built");
			}

			/**
			 * Build widgets on all children of context element
			 * @method createWidgets
			 * @static
			 * @param {HTMLElement} context base html for create children
			 * @member ns.engine
			 */
			function createWidgets(context) {
				// find widget which are built
				var builtWidgetElements = slice.call(context.querySelectorAll(querySelectorWidgets)),
					normal,
					buildQueue = [],
					selectorKeys = Object.keys(widgetDefinitions),
					excludeSelector,
					i,
					j,
					len = selectorKeys.length,
					definition,
					widgetName,
					definitionSelectors;

				
				
				// process built widgets
				builtWidgetElements.forEach(processBuildQueueItem);

				// process widgets didn't build
				for (i = 0; i < len; ++i) {
					widgetName = selectorKeys[i];
					if (widgetName.indexOf(".") === -1) {
						definition = widgetDefinitions[widgetName];
						definitionSelectors = definition.selectors;
						if (definitionSelectors.length) {
							excludeSelector = excludeBuiltAndBound(widgetName);

							normal = slice.call(context.querySelectorAll(definitionSelectors.join(excludeSelector + ",") +
							excludeSelector));
							j = normal.length;

							while (--j >= 0) {
								buildQueue.push({
									element: normal[j],
									widgetName: widgetName
								});
							}
						}
					}
				}

				// Sort queue by depth, on every DOM branch outer most element go first
				buildQueue.sort(compareByDepth);

				// Build all widgets from queue
				buildQueue.forEach(processBuildQueueItem);

				
				eventUtils.trigger(document, "built");
				eventUtils.trigger(document, eventType.BOUND);
							}

			/**
			 * Handler for event create
			 * @method createEventHandler
			 * @param {Event} event
			 * @static
			 * @member ns.engine
			 */
			function createEventHandler(event) {
				createWidgets(event.target);
			}

			function setViewport() {
				/**
				 * Sets viewport tag if not exists
				 */
				var documentHead = document.head,
					metaTagListLength,
					metaTagList,
					metaTag,
					i;

				metaTagList = documentHead.querySelectorAll("[name=\"viewport\"]");
				metaTagListLength = metaTagList.length;

				if (metaTagListLength > 0) {
					// Leave the last viewport tag
					--metaTagListLength;

					// Remove duplicated tags
					for (i = 0; i < metaTagListLength; ++i) {
						// Remove meta tag from DOM
						documentHead.removeChild(metaTagList[i]);
					}
				} else {
					// Create new HTML Element
					metaTag = document.createElement("meta");

					// Set required attributes
					metaTag.setAttribute("name", "viewport");
					metaTag.setAttribute("content", "width=device-width, user-scalable=no");

					// Force that viewport tag will be first child of head
					if (documentHead.firstChild) {
						documentHead.insertBefore(metaTag, documentHead.firstChild);
					} else {
						documentHead.appendChild(metaTag);
					}
				}
			}

			/**
			 * Build first page
			 * @method build
			 * @static
			 * @member ns.engine
			 */
			function build() {
				eventUtils.trigger(document, eventType.READY);
				setViewport();
			}

			/**
			 * Method to remove all listeners bound in run
			 * @method stop
			 * @static
			 * @member ns.engine
			 */
			function stop() {
				eventUtils.trigger(document, eventType.STOP_ROUTING);
			}

			/**
			 * Method to remove all listeners bound in run
			 * @method destroy
			 * @static
			 * @member ns.engine
			 */
			function destroy() {
				stop();
				eventUtils.fastOff(document, "create", createEventHandler);
				destroyAllWidgets(document, true);
				eventUtils.trigger(document, eventType.DESTROY);
			}

			/**
			 * Add to object value at index equal to type of arg.
			 * @method getType
			 * @param {Object} result
			 * @param {*} arg
			 * @return {Object}
			 * @static
			 * @private
			 * @member ns.engine
			 */
			function getType(result, arg) {
				var type = arg instanceof HTMLElement ? "HTMLElement" : typeof arg;

				result[type] = arg;
				return result;
			}

			/**
			 * Convert args array to object with keys being types and arguments mapped by values
			 * @method getArgumentsTypes
			 * @param {Arguments[]} args
			 * @return {Object}
			 * @static
			 * @private
			 * @member ns.engine
			 */
			function getArgumentsTypes(args) {
				return arrayUtils.reduce(args, getType, {});
			}

			ns.widgetDefinitions = {};
			engine = {
				justBuild: location.hash === "#build",
				/**
				 * object with names of engine attributes
				 * @property {Object} dataTau
				 * @property {string} [dataTau.built="data-tau-built"] attribute inform that widget id build
				 * @property {string} [dataTau.name="data-tau-name"] attribute contains widget name
				 * @property {string} [dataTau.bound="data-tau-bound"] attribute inform that widget id bound
				 * @property {string} [dataTau.separator=","] separation string for widget names
				 * @static
				 * @member ns.engine
				 */
				dataTau: {
					built: DATA_BUILT,
					name: DATA_NAME,
					bound: DATA_BOUND,
					separator: NAMES_SEPARATOR,
					widgetWrapper: DATA_WIDGET_WRAPPER
				},
				destroyWidget: destroyWidget,
				destroyAllWidgets: destroyAllWidgets,
				createWidgets: createWidgets,

				/**
				 * Method to get all definitions of widgets
				 * @method getDefinitions
				 * @return {Object}
				 * @static
				 * @member ns.engine
				 */
				getDefinitions: function () {
					return widgetDefinitions;
				},
				/**
				 * Returns definition of widget
				 * @method getWidgetDefinition
				 * @param {string} name
				 * @static
				 * @member ns.engine
				 * @return {Object}
				 */
				getWidgetDefinition: function (name) {
					return widgetDefinitions[name];
				},
				defineWidget: defineWidget,
				getBinding: getBinding,
				getAllBindings: getAllBindings,
				setBinding: setBinding,
				removeBinding: removeBinding,
				removeAllBindings: removeAllBindings,

				/**
				 * Clear bindings of widgets
				 * @method _clearBindings
				 * @static
				 * @member ns.engine
				 */
				_clearBindings: function () {
					//clear and set references to the same object
					widgetBindingMap = {};
				},

				build: build,

				/**
				 * Run engine
				 * @method run
				 * @static
				 * @member ns.engine
				 */
				run: function () {
										// stop the TAU process if exists before
					stop();

					eventUtils.fastOn(document, "create", createEventHandler);

					eventUtils.trigger(document, eventType.INIT, {tau: ns});

					switch (document.readyState) {
						case "interactive":
						case "complete":
							// build widgets and initiate router
							build();
							break;
						default:
							// build widgets and initiate router
							eventUtils.one(document, "DOMContentLoaded", build.bind(engine));
							break;
					}
				},

				/**
				 * Build instance of widget and binding events
				 * Returns error when empty element is passed
				 * @method instanceWidget
				 * @param {HTMLElement|string} [element]
				 * @param {string} name
				 * @param {Object} [options]
				 * @return {?Object}
				 * @static
				 * @member ns.engine
				 */
				instanceWidget: function (element, name, options) {
					var binding,
						definition,
						argumentsTypes = getArgumentsTypes(arguments);

					// Map arguments with specific types to correct variables
					// Only name is required argument
					element = argumentsTypes.HTMLElement;
					name = argumentsTypes.string;
					options = argumentsTypes.object;
					// If element exists try to find existing binding
					if (element) {
						binding = getBinding(element, name);
					}
					// If didn't found binding build new widget
					if (!binding && widgetDefinitions[name]) {
						definition = widgetDefinitions[name];
						if (definition.buildOptions.requireMatchSelector &&
							!ns.util.selectors.matchesSelector(element, definition.selector)) {
							return null;
						}
						element = processHollowWidget(element, definition, options);
						binding = getBinding(element, name);
					} else if (binding) {
						// if widget was built early we should set options delivered to constructor
						binding.option(options);
					}
					return binding;
				},

				stop: stop,

				destroy: destroy,

				/**
				 * Method to change build mode
				 * @method setJustBuild
				 * @param {boolean} newJustBuild
				 * @static
				 * @member ns.engine
				 */
				setJustBuild: function (newJustBuild) {
					// Set location hash to have a consistent behavior
					if (newJustBuild) {
						location.hash = "build";
					} else {
						location.hash = "";
					}

					justBuild = newJustBuild;
				},

				/**
				 * Method to get build mode
				 * @method getJustBuild
				 * @return {boolean}
				 * @static
				 * @member ns.engine
				 */
				getJustBuild: function () {
					return justBuild;
				},
				_createEventHandler: createEventHandler
			};

			engine.eventType = eventType;
			ns.engine = engine;
			}(window, window.document));

/*global window, ns, define, ns */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Namespace For Widgets
 * Namespace For Widgets
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @class ns.widget
 */
(function (document) {
	"use strict";
				var engine = ns.engine,
				eventType = engine.eventType,
				widget = {
					/**
					 * Get bound widget for element
					 * @method getInstance
					 * @static
					 * @param {HTMLElement|string} element
					 * @param {string} type widget name
					 * @return {?Object}
					 * @member ns.widget
					 */
					getInstance: engine.getBinding,
					/**
					 * Returns Get all bound widget for element or id gives as parameter
					 * @method getAllInstances
					 * @param {HTMLElement|string} element
					 * @return {?Object}
					 * @static
					 * @member ns.widget
					 */
					getAllInstances: engine.getAllBindings
				};

			function mapWidgetDefinition(name, element, options) {
				var widgetParams = {
					name: name,
					element: element,
					options: options
				}

				return widgetParams;
			}

			function widgetConstructor(name, element, options) {
				var widgetParams = mapWidgetDefinition(name, element, options);

				return engine.instanceWidget(widgetParams.element, widgetParams.name, widgetParams.options);
			}

			/**
			 * Register simple widget constructor in namespace
			 * @param {Event} event
			 */
			function defineWidget(event) {
				var definition = event.detail,
					name = definition.name;

				ns.widget[name] = widgetConstructor.bind(null, name);
			}

			/**
			 * Remove event listeners on framework destroy
			 */
			function destroy() {
				document.removeEventListener(eventType.WIDGET_DEFINED, defineWidget, true);
				document.removeEventListener(eventType.DESTROY, destroy, false);
			}

			document.addEventListener(eventType.WIDGET_DEFINED, defineWidget, true);
			document.addEventListener(eventType.DESTROY, destroy, false);

			/** @namespace ns.widget */
			ns.widget = widget;
			}(window.document));

/*global window, ns, define, ns */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
 * #Namespace For Core Widgets
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @class ns.widget.core
 */
(function (document, ns) {
	"use strict";
				ns.widget.core = ns.widget.core || {};
			}(window.document, ns));

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/*global define, ns */
/**
 * #String Utility
 * Utility helps work with strings.
 * @class ns.util.string
 */
(function () {
	"use strict";
				var DASH_TO_UPPER_CASE_REGEXP = /-([a-z])/gi,
				UPPER_TO_DASH_CASE_REGEXP = /([A-Z])/g,
				arrayUtil = ns.util.array;

			/**
			 * Callback method for regexp used in dashesToCamelCase method
			 * @method toUpperCaseFn
			 * @param {string} match
			 * @param {string} value
			 * @return {string}
			 * @member ns.util.string
			 * @static
			 * @private
			 */
			function toUpperCaseFn(match, value) {
				return value.toLocaleUpperCase();
			}

			/**
			 * Callback method for regexp used in camelCaseToDashes method
			 * @method toUpperCaseFn
			 * @param {string} match
			 * @param {string} value
			 * @return {string}
			 * @member ns.util.string
			 * @static
			 * @private
			 */
			function toLowerCaseFn(match, value) {
				return "-" + value.toLowerCase();
			}

			/**
			 * Changes dashes string to camel case string
			 * @method firstToUpperCase
			 * @param {string} str
			 * @return {string}
			 * @member ns.util.string
			 * @static
			 */
			function dashesToCamelCase(str) {
				return str.replace(DASH_TO_UPPER_CASE_REGEXP, toUpperCaseFn);
			}

			/**
			 * Changes camel case string to dashes string
			 * @method camelCaseToDashes
			 * @param {string} str
			 * @return {string}
			 * @member ns.util.string
			 * @static
			 */
			function camelCaseToDashes(str) {
				return str.replace(UPPER_TO_DASH_CASE_REGEXP, toLowerCaseFn);
			}

			/**
			 * Changes the first char in string to uppercase
			 * @method firstToUpperCase
			 * @param {string} str
			 * @return {string}
			 * @member ns.util.string
			 * @static
			 */
			function firstToUpperCase(str) {
				return str.charAt(0).toLocaleUpperCase() + str.substring(1);
			}

			/**
			 * Map different types to number if is possible.
			 * @param {string|*} x
			 * @return {*}
			 */
			function mapToNumber(x) {
				var parsed;

				if (x && (x + "").indexOf("%") === -1) {
					parsed = parseInt(x, 10);
					if (isNaN(parsed)) {
						parsed = null;
					}
					return parsed;
				}
				return x;
			}

			/**
			 * Parses comma separated string to array
			 * @method parseProperty
			 * @param {string} property
			 * @return {Array} containing number or null
			 * @member ns.util.string
			 * @static
			 */
			function parseProperty(property) {
				var arrayProperty;

				if (typeof property === "string") {
					arrayProperty = property.split(",");
				} else {
					arrayProperty = property || [];
				}

				return arrayUtil.map(arrayProperty, mapToNumber);
			}

			/**
			 * Returns a string of tags that exist in the first param but do not exist
			 * in rest of the params
			 * @param {string} baseWithTags
			 * @param {...string} compare
			 * @return {string}
			 */
			function removeExactTags(baseWithTags) {
				var tags = [];

				[].slice
					.call(arguments)
					.slice(1)
					.forEach(function (arg) {
						arg.split(" ")
							.forEach(function (tag) {
								tags.push(tag.trim());
							});
					});

				return baseWithTags
					.split(" ")
					.filter(function (tag) {
						return tags.indexOf(tag) === -1;
					}).join(" ");
			}

			ns.util.string = {
				dashesToCamelCase: dashesToCamelCase,
				camelCaseToDashes: camelCaseToDashes,
				firstToUpperCase: firstToUpperCase,
				parseProperty: parseProperty,
				removeExactTags: removeExactTags
			};
			}());

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/*global window, define, ns */
/**
 * #Utility DOM
 * Utility object with function to DOM manipulation, CSS properties support
 * and DOM attributes support.
 *
 * # How to replace jQuery methods  by ns methods
 * ## append vs appendNodes
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).append( "<span>Test</span>" );

 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.util.DOM.appendNodes(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And
 *             <span>Test</span>
 *         </div>
 *        <div id="third">Goodbye</div>
 *     </div>
 *
 * ## replaceWith vs replaceWithNodes
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $('#second').replaceWith("<span>Test</span>");
 *
 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.util.DOM.replaceWithNodes(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <span>Test</span>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * ## before vs insertNodesBefore
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).before( "<span>Test</span>" );
 *
 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.util.DOM.insertNodesBefore(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <span>Test</span>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * ## wrapInner vs wrapInHTML
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).wrapInner( "<span class="new"></span>" );
 *
 * #### ns manipulation
 *
 *     @example
 *     var element = document.getElementById("second");
 *     ns.util.DOM.wrapInHTML(element, "<span class="new"></span>");
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">
 *             <span class="new">And</span>
 *         </div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * @class ns.util.DOM
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function () {
	"use strict";
				ns.util.DOM = ns.util.DOM || {};
			}());

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/*global window, ns, define */
/*
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function () {
	"use strict";
	

			var selectors = ns.util.selectors,
				DOM = ns.util.DOM,
				NAMESPACE = "namespace";

			/**
			 * Returns given attribute from element or the closest parent,
			 * which matches the selector.
			 * @method inheritAttr
			 * @member ns.util.DOM
			 * @param {HTMLElement} element
			 * @param {string} attr
			 * @param {string} selector
			 * @return {?string}
			 * @static
			 */
			DOM.inheritAttr = function (element, attr, selector) {
				var value = element.getAttribute(attr),
					parent;

				if (!value) {
					parent = selectors.getClosestBySelector(element, selector);
					if (parent) {
						return parent.getAttribute(attr);
					}
				}
				return value;
			};

			/**
			 * Returns Number from properties described in html tag
			 * @method getNumberFromAttribute
			 * @member ns.util.DOM
			 * @param {HTMLElement} element
			 * @param {string} attribute
			 * @param {string=} [type] auto type casting
			 * @param {number} [defaultValue] default returned value
			 * @static
			 * @return {number}
			 */
			DOM.getNumberFromAttribute = function (element, attribute, type, defaultValue) {
				var value = element.getAttribute(attribute),
					result = defaultValue;

				if (!isNaN(value)) {
					if (type === "float") {
						value = parseFloat(value);
						if (!isNaN(value)) {
							result = value;
						}
					} else {
						value = parseInt(value, 10);
						if (!isNaN(value)) {
							result = value;
						}
					}
				}
				return result;
			};

			function getDataName(name, skipData) {
				var _namespace = ns.getConfig(NAMESPACE),
					prefix = "";

				if (!skipData) {
					prefix = "data-";
				}
				return prefix + (_namespace ? _namespace + "-" : "") + name;
			}

			/**
			 * Special function to set attribute and property in the same time
			 * @method setAttribute
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @param {Mixed} value
			 * @member ns.util.DOM
			 * @static
			 */
			function setAttribute(element, name, value) {
				element[name] = value;
				element.setAttribute(name, value);
			}

			/**
			 * This function sets value of attribute data-{namespace}-{name} for element.
			 * If the namespace is empty, the attribute data-{name} is used.
			 * @method setNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @param {string|number|boolean} value New value
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.setNSData = function (element, name, value) {
				element.setAttribute(getDataName(name), value);
			};

			/**
			 * This function returns value of attribute data-{namespace}-{name} for element.
			 * If the namespace is empty, the attribute data-{name} is used.
			 * Method may return boolean in case of 'true' or 'false' strings as attribute value.
			 * @method getNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @param {boolean} skipData
			 * @member ns.util.DOM
			 * @return {?string|boolean}
			 * @static
			 */
			DOM.getNSData = function (element, name, skipData) {
				var value = element.getAttribute(getDataName(name, skipData));

				if (value === "true") {
					return true;
				}

				if (value === "false") {
					return false;
				}

				return value;
			};

			/**
			 * This function returns true if attribute data-{namespace}-{name} for element is set
			 * or false in another case. If the namespace is empty, attribute data-{name} is used.
			 * @method hasNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @member ns.util.DOM
			 * @return {boolean}
			 * @static
			 */
			DOM.hasNSData = function (element, name) {
				return element.hasAttribute(getDataName(name));
			};

			/**
			 * Get or set value on data attribute.
			 * @method nsData
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @param {?Mixed} [value]
			 * @static
			 * @member ns.util.DOM
			 */
			DOM.nsData = function (element, name, value) {
				if (value === undefined) {
					return DOM.getNSData(element, name);
				} else {
					return DOM.setNSData(element, name, value);
				}
			};

			/**
			 * This function removes attribute data-{namespace}-{name} from element.
			 * If the namespace is empty, attribute data-{name} is used.
			 * @method removeNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.removeNSData = function (element, name) {
				element.removeAttribute(getDataName(name));
			};

			/**
			 * Returns object with all data-* attributes of element
			 * @method getData
			 * @param {HTMLElement} element Base element
			 * @member ns.util.DOM
			 * @return {Object}
			 * @static
			 */
			DOM.getData = function (element) {
				var dataPrefix = "data-",
					data = {},
					attributes = element.attributes,
					attribute,
					nodeName,
					value,
					i,
					length = attributes.length,
					lowerCaseValue;

				for (i = 0; i < length; i++) {
					attribute = attributes.item(i);
					nodeName = attribute.nodeName;
					if (nodeName.indexOf(dataPrefix) > -1) {
						value = attribute.value;
						lowerCaseValue = value.toLowerCase();
						if (lowerCaseValue === "true") {
							value = true;
						} else if (lowerCaseValue === "false") {
							value = false;
						}
						data[nodeName.replace(dataPrefix, "")] = value;
					}
				}

				return data;
			};

			/**
			 * Special function to remove attribute and property in the same time
			 * @method removeAttribute
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.removeAttribute = function (element, name) {
				element.removeAttribute(name);
				element[name] = false;
			};

			DOM.setAttribute = setAttribute;
			/**
			 * Special function to set attributes and properties in the same time
			 * @method setAttribute
			 * @param {HTMLElement} element
			 * @param {Object} values
			 * @member ns.util.DOM
			 * @static
			 */
			DOM.setAttributes = function (element, values) {
				var i,
					names = Object.keys(values),
					name,
					len;

				for (i = 0, len = names.length; i < len; i++) {
					name = names[i];
					setAttribute(element, name, values[name]);
				}
			};
			}());

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/*global window, ns, define */
/*
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (window, ns) {
	"use strict";
	
			var DOM = ns.util.DOM,
				stringUtil = ns.util.string,
				appStyleSheet;

			/**
			 * Returns css property for element
			 * @method getCSSProperty
			 * @param {HTMLElement} element
			 * @param {string} property
			 * @param {string|number|null} [def=null] default returned value
			 * @param {"integer"|"float"|null} [type=null] auto type casting
			 * @return {string|number|null}
			 * @member ns.util.DOM
			 * @static
			 */
			function getCSSProperty(element, property, def, type) {
				var style = window.getComputedStyle(element),
					value,
					result = def;

				if (style) {
					value = style.getPropertyValue(property);
					if (value) {
						switch (type) {
							case "integer":
								value = parseInt(value, 10);
								if (!isNaN(value)) {
									result = value;
								}
								break;
							case "float":
								value = parseFloat(value);
								if (!isNaN(value)) {
									result = value;
								}
								break;
							default:
								result = value;
								break;
						}
					}
				}
				return result;
			}

			/**
			 * Convert string to float or integer
			 * @param {string} value
			 * @return {number}
			 */
			function convertToNumber(value) {
				if ((value + "").indexOf(".") > -1) {
					return parseFloat(value);
				}
				return parseInt(value, 10);
			}

			/**
			 * Extracts css properties from computed css for an element.
			 * The properties values are applied to the specified
			 * properties list (dictionary)
			 * @method extractCSSProperties
			 * @param {HTMLElement} element
			 * @param {Object} properties
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [noConversion=false]
			 * @member ns.util.DOM
			 * @static
			 */
			function extractCSSProperties(element, properties, pseudoSelector, noConversion) {
				var style = window.getComputedStyle(element, pseudoSelector),
					property,
					value,
					newValue;

				for (property in properties) {
					if (properties.hasOwnProperty(property)) {
						value = style.getPropertyValue(property);
						newValue = convertToNumber(value);

						if (!isNaN(newValue) || !noConversion) {
							value = newValue;
						}

						properties[property] = value;
					}
				}
			}

			function getOffset(element, props, pseudoSelector, force, offsetProperty) {
				var originalDisplay,
					originalVisibility,
					originalPosition,
					offsetValue,
					style = element.style;

				if (style.display !== "none") {
					extractCSSProperties(element, props, pseudoSelector, true);
					offsetValue = element[offsetProperty];
				} else if (force) {
					originalDisplay = style.display;
					originalVisibility = style.visibility;
					originalPosition = style.position;

					style.display = "block";
					style.visibility = "hidden";
					style.position = "relative";

					extractCSSProperties(element, props, pseudoSelector, true);
					offsetValue = element[offsetProperty];

					style.display = originalDisplay;
					style.visibility = originalVisibility;
					style.position = originalPosition;
				}
				return offsetValue;
			}

			/**
			 * Returns elements height from computed style
			 * @method getElementHeight
			 * @param {HTMLElement} element
			 * if null then the "inner" value is assigned
			 * @param {"outer"|null} [type=null]
			 * @param {boolean} [includeOffset=false]
			 * @param {boolean} [includeMargin=false]
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [force=false] check even if element is hidden
			 * @return {number}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementHeight(element, type, includeOffset, includeMargin, pseudoSelector, force) {
				var height = 0,
					outer = (type && type === "outer") || false,
					offsetHeight,
					property,
					props = {
						"height": 0,
						"margin-top": 0,
						"margin-bottom": 0,
						"padding-top": 0,
						"padding-bottom": 0,
						"border-top-width": 0,
						"border-bottom-width": 0,
						"box-sizing": ""
					};

				if (element) {
					offsetHeight = getOffset(element, props, pseudoSelector, force, "offsetHeight");

					for (property in props) {
						if (props.hasOwnProperty(property) && property !== "box-sizing") {
							props[property] = convertToNumber(props[property]);
						}
					}

					height += props["height"];

					if (props["box-sizing"] !== "border-box") {
						height += props["padding-top"] + props["padding-bottom"];
					}

					if (includeOffset) {
						height = offsetHeight;
					} else if (outer && props["box-sizing"] !== "border-box") {
						height += props["border-top-width"] + props["border-bottom-width"];
					}

					if (includeMargin) {
						height += Math.max(0, props["margin-top"]) + Math.max(0, props["margin-bottom"]);
					}
				}
				return height;
			}

			/**
			 * Returns elements width from computed style
			 * @method getElementWidth
			 * @param {HTMLElement} element
			 * if null then the "inner" value is assigned
			 * @param {"outer"|null} [type=null]
			 * @param {boolean} [includeOffset=false]
			 * @param {boolean} [includeMargin=false]
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [force=false] check even if element is hidden
			 * @return {number}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementWidth(element, type, includeOffset, includeMargin, pseudoSelector, force) {
				var width = 0,
					value,
					offsetWidth,
					property,
					outer = (type && type === "outer") || false,
					props = {
						"width": 0,
						"margin-left": 0,
						"margin-right": 0,
						"padding-left": 0,
						"padding-right": 0,
						"border-left-width": 0,
						"border-right-width": 0,
						"box-sizing": ""
					};

				if (element) {
					offsetWidth = getOffset(element, props, pseudoSelector, force, "offsetWidth");

					for (property in props) {
						if (props.hasOwnProperty(property) && property !== "box-sizing") {
							value = parseFloat(props[property]);
							props[property] = value;
						}
					}

					width += props["width"];
					if (props["box-sizing"] !== "border-box") {
						width += props["padding-left"] + props["padding-right"];
					}

					if (includeOffset) {
						width = offsetWidth;
					} else if (outer && props["box-sizing"] !== "border-box") {
						width += props["border-left-width"] + props["border-right-width"];
					}

					if (includeMargin) {
						width += Math.max(0, props["margin-left"]) + Math.max(0, props["margin-right"]);
					}
				}
				return width;
			}

			/**
			 * Returns offset of element
			 * @method getElementOffset
			 * @param {HTMLElement} element
			 * @return {Object}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementOffset(element) {
				var left = 0,
					top = 0,
					loopElement = element;

				do {
					top += loopElement.offsetTop;
					left += loopElement.offsetLeft;
					loopElement = loopElement.offsetParent;
				} while (loopElement !== null);

				return {
					top: top,
					left: left
				};
			}

			/**
			 * Check if element occupies place at view
			 * @method isOccupiedPlace
			 * @param {HTMLElement} element
			 * @return {boolean}
			 * @member ns.util.DOM
			 * @static
			 */
			function isOccupiedPlace(element) {
				return !(element.offsetWidth <= 0 && element.offsetHeight <= 0);
			}

			/**
			 * Set values for element with prefixes for browsers
			 * @method setPrefixedStyle
			 * @param {HTMLElement | CSSStyleRule} elementOrRule
			 * @param {string} property
			 * @param {string|Object|null} value
			 * @member ns.util.DOM
			 * @static
			 */
			function setPrefixedStyle(elementOrRule, property, value) {
				var style = elementOrRule.style,
					propertyForPrefix = property,
					values = (typeof value !== "object") ? {
						webkit: value,
						moz: value,
						o: value,
						ms: value,
						normal: value
					} : value;

				style.setProperty(property, values.normal);
				style.setProperty("-webkit-" + propertyForPrefix, values.webkit);
				style.setProperty("-moz-" + propertyForPrefix, values.moz);
				style.setProperty("-o-" + propertyForPrefix, values.o);
				style.setProperty("-ms-" + propertyForPrefix, values.ms);
			}

			/**
			 * Get value from element with prefixes for browsers
			 * @method getCSSProperty
			 * @param {string} value
			 * @return {Object}
			 * @member ns.util.DOM
			 * @static
			 */
			function getPrefixedValue(value) {
				return {
					webkit: "-webkit-" + value,
					moz: "-moz-" + value,
					o: "-ms-" + value,
					ms: "-o-" + value,
					normal: value
				};
			}

			/**
			 * Returns style value for css property with browsers prefixes
			 * @method getPrefixedStyleValue
			 * @param {HTMLStyle} styles
			 * @param {string} property
			 * @return {string|undefined}
			 * @member ns.util.DOM
			 * @static
			 */
			function getPrefixedStyleValue(styles, property) {
				var prefixedProperties = getPrefixedValue(property),
					value,
					key;

				for (key in prefixedProperties) {
					if (prefixedProperties.hasOwnProperty(key)) {
						value = styles[prefixedProperties[key]];
						if (value && value !== "none") {
							break;
						}
					}
				}
				return value;
			}

			/**
			 * Returns size (width, height) as CSS string
			 * @method toCSSSize
			 * @param {string|Array} size has to be comma separated string (eg. "10,100") or array with 2
			 * elements
			 * @return {string} if not enough arguments the method returns empty string
			 * @member ns.util.DOM
			 * @static
			 */
			function toCSSSize(size) {
				var cssSize = "",
					arraySize = stringUtil.parseProperty(size);

				if (arraySize && arraySize.length === 2) {
					cssSize = "width: " + arraySize[0] + "px; " +
					"height: " + arraySize[1] + "px;";
				}

				return cssSize;
			}

			/**
			 * Set CSS styles for pseudo class selector.
			 * @method setStylesForPseudoClass
			 * @param {string} selector selector of elements
			 * @param {string} pseudoClassName CSS pseudo class name to set, for example after, before
			 * @param {Object} cssValues object with styles to set
			 * @return {number?} return index of inserted rule
			 * @member ns.util.DOM
			 * @static
			 */
			function setStylesForPseudoClass(selector, pseudoClassName, cssValues) {
				var cssValuesArray = [],
					headElement,
					styleElement,
					name;

				// create style element on first use
				if (!appStyleSheet) {
					headElement = document.head || document.getElementsByTagName("head")[0];
					styleElement = document.createElement("style");
					styleElement.type = "text/css";
					headElement.appendChild(styleElement);
					appStyleSheet = styleElement.sheet;
				}

				for (name in cssValues) {
					if (cssValues.hasOwnProperty(name)) {
						cssValuesArray.push(name + ": " + cssValues[name]);
					}
				}

				if (cssValuesArray.length) {
					return appStyleSheet.addRule(selector + "::" + pseudoClassName, cssValuesArray.join("; "));
				}

				return null;
			}

			/**
			 * Remove CSS rule from sheet.
			 * @method removeCSSRule
			 * @param {number} ruleIndex Index of rule to remove
			 * @static
			 */
			function removeCSSRule(ruleIndex) {

				// create style element on first use
				if (appStyleSheet) {
					appStyleSheet.deleteRule(ruleIndex);
				}
			}

			// assign methods to namespace
			DOM.getCSSProperty = getCSSProperty;
			DOM.extractCSSProperties = extractCSSProperties;
			DOM.getElementHeight = getElementHeight;
			DOM.getElementWidth = getElementWidth;
			DOM.getElementOffset = getElementOffset;
			DOM.isOccupiedPlace = isOccupiedPlace;
			DOM.setPrefixedStyle = setPrefixedStyle;
			DOM.getPrefixedValue = getPrefixedValue;
			DOM.getPrefixedStyleValue = getPrefixedStyleValue;
			DOM.toCSSSize = toCSSSize;
			DOM.setStylesForPseudoClass = setStylesForPseudoClass;
			DOM.removeCSSRule = removeCSSRule;

			}(window, ns));

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/*global window, ns, define */
/**
 * #Set Utility
 *
 * Own implementation of ECMAScript Set.
 *
 * @class ns.util.Set
 */
(function (window, ns) {
	"use strict";
				var set = function () {
				this._data = [];
			};

			set.prototype = {
				/**
				 * Add one or many arguments to set
				 * @method add
				 * @member ns.util.Set
				 */
				add: function () {
					var data = this._data;

					this._data = data.concat.apply(data, [].slice.call(arguments))
						.filter(function (item, pos, array) {
							return array.indexOf(item) === pos;
						});
				},
				/**
				 * Remove all items from set
				 * @method clear
				 * @member ns.util.Set
				 */
				clear: function () {
					this._data = [];
				},
				/**
				 * delete one item from set
				 * @method delete
				 * @param {*} item
				 * @member ns.util.Set
				 */
				delete: function (item) {
					var data = this._data,
						index = data.indexOf(item);

					if (index > -1) {
						data.splice(index, 1);
					}
				},
				/**
				 * Check that item exists in set
				 * @method has
				 * @param {Object} item
				 * @member ns.util.Set
				 * @return {boolean}
				 */
				has: function (item) {
					return this._data.indexOf(item) > -1;
				},
				/**
				 * Iterate on each set elements
				 * @method forEach
				 * @param {Function} cb
				 * @member ns.util.Set
				 */
				forEach: function (cb) {
					this._data.forEach(cb);
				}
			};

			// for tests
			ns.util._Set = set;
			ns.util.Set = window.Set || set;

			}(window, ns));

/*global ns, define */
/*jslint nomen: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #BaseWidget
 * Prototype class of widget
 *
 * ## How to invoke creation of widget from JavaScript
 *
 * To build and initialize widget in JavaScript you have to use method
 * {@link ns.engine#instanceWidget}. First argument for method is HTMLElement, which specifies the
 * element of widget. Second parameter is name of widget to create.
 *
 * If you load jQuery before initializing tau library, you can use standard jQuery UI Widget
 * notation.
 *
 * ### Examples
 * #### Build widget from JavaScript
 *
 *        @example
 *        var element = document.getElementById("id"),
 *            ns.engine.instanceWidget(element, "Button");
 *
 * #### Build widget from jQuery
 *
 *        @example
 *        var element = $("#id").button();
 *
 * ## How to create new widget
 *
 *        @example
 *        (function (ns) {
 *			"use strict";
 *			 *					var BaseWidget = ns.widget.BaseWidget, // create alias to main objects
 *						...
 *						arrayOfElements, // example of private property, common for all instances of widget
 *						Button = function () { // create local object with widget
 *							...
 *						},
 *						prototype = new BaseWidget(); // add ns.widget.BaseWidget as prototype to widget's
 *						object, for better minification this should be assign to local variable and next
 *						variable should be assign to prototype of object.
 *
 *					function closestEnabledButton(element) { // example of private method
 *						...
 *					}
 *					...
 *
 *					prototype.options = { //add default options to be read from data- attributes
 *						theme: "s",
 *						...
 *					};
 *
 *					prototype._build = function (template, element) {
 *						// method called when the widget is being built, should contain all HTML
 *						// manipulation actions
 *						...
 *						return element;
 *					};
 *
 *					prototype._init = function (element) {
 *						// method called during initialization of widget, should contain all actions
 *						// necessary fastOn application start
 *						...
 *						return element;
 *					};
 *
 *					prototype._bindEvents = function (element) {
 *						// method to bind all events, should contain all event bindings
 *						...
 *					};
 *
 *					prototype._enable = function (element) {
 *						// method called during invocation of enable() method
 *						...
 *					};
 *
 *					prototype._disable = function (element) {
 *						// method called during invocation of disable() method
 *						...
 *					};
 *
 *					prototype.refresh = function (element) {
 *						// example of public method
 *						...
 *					};
 *
 *					prototype._refresh = function () {
 *						// example of protected method
 *						...
 *					};
 *
 *					Button.prototype = prototype;
 *
 *					engine.defineWidget( // define widget
 *						"Button", //name of widget
 *						"[data-role='button'],button,[type='button'],[type='submit'],[type='reset']",
 *						//widget's selector
 *						[ // public methods, here should be list all public method
 *							"enable",
 *							"disable",
 *							"refresh"
 *						],
 *						Button, // widget's object
 *						"mobile" // widget's namespace
 *					);
 *					ns.widget.Button = Button;
 *					 *		}(ns));
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Przemyslaw Ciezkowski <p.ciezkowski@samsung.com>
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Michał Szepielak <m.szepielak@samsung.com>
 * @class ns.widget.BaseWidget
 */
(function (document, ns) {
	"use strict";
				var slice = [].slice,
				/**
				 * Alias to ns.engine
				 * @property {ns.engine} engine
				 * @member ns.widget.BaseWidget
				 * @private
				 * @static
				 */
				engine = ns.engine,
				engineDataTau = engine.dataTau,
				util = ns.util,
				/**
				 * Alias to {@link ns.event}
				 * @property {Object} eventUtils
				 * @member ns.widget.BaseWidget
				 * @private
				 * @static
				 */
				eventUtils = ns.event,
				/**
				 * Alias to {@link ns.util.DOM}
				 * @property {Object} domUtils
				 * @private
				 * @static
				 */
				domUtils = util.DOM,
				utilString = util.string,
				/**
				 * Alias to {@link ns.util.object}
				 * @property {Object} objectUtils
				 * @private
				 * @static
				 */
				objectUtils = util.object,
				selectorUtils = util.selectors,
				setUtils = util.Set,
				BaseWidget = function () {
					this.flowState = "created";
					return this;
				},
				getNSData = domUtils.getNSData,
				prototype = {},
				/**
				 * Property with string represent function type
				 * (for better minification)
				 * @property {string} [TYPE_FUNCTION="function"]
				 * @private
				 * @static
				 * @readonly
				 */
				TYPE_FUNCTION = "function",
				TYPE_STRING = "string",
				DEFAULT_STRING_DELIMITER = ",",
				disableClass = "ui-state-disabled",
				ariaDisabled = "aria-disabled",
				commonClasses = {
					INLINE: "ui-inline"
				},
				__callbacks;

			BaseWidget.classes = {
				disable: disableClass
			};

			prototype._configureDefinition = function (definition) {
				var self = this,
					definitionName,
					definitionNamespace;

				if (definition) {
					definitionName = definition.name;
					definitionNamespace = definition.namespace;
					/**
					 * Name of the widget
					 * @property {string} name
					 * @member ns.widget.BaseWidget
					 */
					self.name = definitionName;

					/**
					 * Name of the widget (in lower case)
					 * @property {string} widgetName
					 * @member ns.widget.BaseWidget
					 */
					self.widgetName = definitionName;

					/**
					 * Namespace of widget events
					 * @property {string} widgetEventPrefix
					 * @member ns.widget.BaseWidget
					 */
					self.widgetEventPrefix = definitionName.toLowerCase();

					/**
					 * Namespace of the widget
					 * @property {string} namespace
					 * @member ns.widget.BaseWidget
					 */
					self.namespace = definitionNamespace;

					/**
					 * Full name of the widget
					 * @property {string} widgetFullName
					 * @member ns.widget.BaseWidget
					 */
					self.widgetFullName = ((definitionNamespace ? definitionNamespace + "-" : "") +
						definitionName).toLowerCase();
					/**
					 * Id of widget instance
					 * @property {string} id
					 * @member ns.widget.BaseWidget
					 */
					self.id = ns.getUniqueId();

					/**
					 * Widget's selector
					 * @property {string} selector
					 * @member ns.widget.BaseWidget
					 */
					self.selector = definition.selector;
				}
			};

			/**
			 * Protected method configuring the widget
			 * @method _configure
			 * @member ns.widget.BaseWidget
			 * @protected
			 * @template
			 * @ignore
			 */
			/**
			 * Configures widget object from definition.
			 *
			 * It calls such methods as #\_getCreateOptions and #\_configure.
			 * @method configure
			 * @param {Object} definition
			 * @param {string} definition.name Name of the widget
			 * @param {string} definition.selector Selector of the widget
			 * @param {HTMLElement} element Element of widget
			 * @param {Object} options Configure options
			 * @member ns.widget.BaseWidget
			 * @return {ns.widget.BaseWidget}
			 * @ignore
			 */
			prototype.configure = function (definition, element, options) {
				var self = this;

				/**
				 * Object with options for widget
				 * @property {Object} [options={}]
				 * @member ns.widget.BaseWidget
				 */

				self.flowState = "configuring";

				self.options = self.options || {};
				/**
				 * Base element of widget
				 * @property {?HTMLElement} [element=null]
				 * @member ns.widget.BaseWidget
				 */
				self.element = self.element || null;

				self._configureDefinition(definition);

				if (typeof self._configure === TYPE_FUNCTION) {
					element = self._configure(element) || element;
				}

				self.isCustomElement = !!element.createdCallback;

				self._getCreateOptions(element);

				objectUtils.fastMerge(self.options, options);

				// move style attribute to another attribute for recovery in init method
				// this feature is required in widgets with container
				if (element.style.cssText) {
					element.dataset.originalStyle = element.style.cssText;
				}

				self.flowState = "configured";

				return element;
			};

			/**
			 * Reads data-* attributes and save to options object.
			 * @method _getCreateOptions
			 * @param {HTMLElement} element Base element of the widget
			 * @return {Object}
			 * @member ns.widget.BaseWidget
			 * @protected
			 */
			prototype._getCreateOptions = function (element) {
				var self = this,
					options = self.options,
					tag = element.localName.toLowerCase(),
					delimiter;

				if (options) {
					Object.keys(options).forEach(function (option) {
						var attributeName = utilString.camelCaseToDashes(option),
							baseValue = getNSData(element, attributeName, true),
							prefixedValue = getNSData(element, attributeName);

						if (prefixedValue !== null) {
							if (typeof options[option] === "number") {
								prefixedValue = parseFloat(prefixedValue);
							} else if (typeof options[option] === "object" &&
										typeof prefixedValue === "string" &&
										Array.isArray(options[option])) {
								delimiter = element.dataset.delimiter || DEFAULT_STRING_DELIMITER;
								prefixedValue = prefixedValue.split(delimiter);
							}
							options[option] = prefixedValue;
						} else {
							if (typeof options[option] === "boolean") {
								if (!self._readCommonOptionFromElementClassname(element, option)) {
									if (!self._readPrefixedOptionFromElementClassname(element, option)) {
										if (typeof self._readWidgetSpecyficOptionFromElementClassname !== TYPE_FUNCTION ||
											typeof self._readWidgetSpecyficOptionFromElementClassname === TYPE_FUNCTION &&
											!self._readWidgetSpecyficOptionFromElementClassname(element, option)) {
											if (typeof self._getDefaultOption === TYPE_FUNCTION) {
												options[option] = self._getDefaultOption(option);
											}
										}
									}
								}
							}
						}

						if (option === "type" && tag === "input" ||
							option === "style"
						) { // don't set conflicting props
							return;
						}

						if (baseValue !== null) {
							if (typeof options[option] === "number") {
								baseValue = parseFloat(baseValue);
							}
							options[option] = baseValue;
						}
					});
				}
				return options;
			};

			/**
			 * Protected method building the widget
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement} widget's element
			 * @member ns.widget.BaseWidget
			 * @protected
			 * @template
			 */
			/**
			 * Builds widget.
			 *
			 * It calls method #\_build.
			 *
			 * Before starting building process, the event beforecreate with
			 * proper prefix defined in variable widgetEventPrefix is triggered.
			 * @method build
			 * @param {HTMLElement} element Element of widget before building process
			 * @return {HTMLElement} Element of widget after building process
			 * @member ns.widget.BaseWidget
			 * @ignore
			 */
			prototype.build = function (element) {
				var self = this,
					id,
					node,
					dataBuilt = element.getAttribute(engineDataTau.built),
					dataName = element.getAttribute(engineDataTau.name);

				eventUtils.trigger(element, self.widgetEventPrefix + "beforecreate");

				self.flowState = "building";

				id = element.id;
				if (id) {
					self.id = id;
				} else {
					element.id = self.id;
				}

				if (typeof self._build === TYPE_FUNCTION) {
					node = self._build(element);
				} else {
					node = element;
				}

				self._setBooleanOptions(element);

				// Append current widget name to data-tau-built and data-tau-name attributes
				dataBuilt = !dataBuilt ? self.name : dataBuilt + engineDataTau.separator + self.name;
				dataName = !dataName ? self.name : dataName + engineDataTau.separator + self.name;

				element.setAttribute(engineDataTau.built, dataBuilt);
				element.setAttribute(engineDataTau.name, dataName);

				self.flowState = "built";
				return node;
			};

			/**
			 * Protected method initializing the widget
			 * @method _init
			 * @param {HTMLElement} element
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Initializes widget.
			 *
			 * It calls method #\_init.
			 * @method init
			 * @param {HTMLElement} element Element of widget before initialization
			 * @member ns.widget.BaseWidget
			 * @return {ns.widget.BaseWidget}
			 * @ignore
			 */
			prototype.init = function (element) {
				var self = this,
					container,
					originalStyleText;

				self.id = element.id;

				self.flowState = "initiating";

				// Move style properties that was defined before building to container element
				if (element.dataset.originalStyle) {
					container = self.getContainer();
					if (container != element) {
						originalStyleText = element.dataset.originalStyle;

						originalStyleText.split(";").forEach(function (keyValue) {
							var key,
								value,
								keyValuePair;

							keyValuePair = keyValue.split(":");
							if (keyValuePair.length === 2) {
								key = keyValuePair[0].trim();
								value = keyValuePair[1].trim();

								container.style[key] = element.style[key];

								if (element.style[key] === value) {
									element.style[key] = "";
								}
							}
						});
					}
				}

				if (typeof self._init === TYPE_FUNCTION) {
					self._init(element);
				}

				if (element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false" ||
					self.options.disabled === true) {
					self.disable();
				} else {
					self.enable();
				}

				self.flowState = "initiated";
				return self;
			};

			/**
			 * Returns base element widget
			 * @member ns.widget.BaseWidget
			 * @return {HTMLElement|null}
			 * @instance
			 */
			prototype.getContainer = function () {
				var self = this;

				if (typeof self._getContainer === TYPE_FUNCTION) {
					return self._getContainer();
				}
				return self.element;
			};

			/**
			 * Bind widget events attached in init mode
			 * @method _bindEvents
			 * @param {HTMLElement} element Base element of widget
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Binds widget events.
			 *
			 * It calls such methods as #\_buildBindEvents and #\_bindEvents.
			 * At the end of binding process, the event "create" with proper
			 * prefix defined in variable widgetEventPrefix is triggered.
			 * @method bindEvents
			 * @param {HTMLElement} element Base element of the widget
			 * @param {boolean} onlyBuild Inform about the type of bindings: build/init
			 * @member ns.widget.BaseWidget
			 * @return {ns.widget.BaseWidget}
			 * @ignore
			 */
			prototype.bindEvents = function (element, onlyBuild) {
				var self = this,
					dataBound = element.getAttribute(engineDataTau.bound);

				if (!onlyBuild) {
					dataBound = !dataBound ? self.name : dataBound + engineDataTau.separator + self.name;
					element.setAttribute(engineDataTau.bound, dataBound);
				}
				if (typeof self._buildBindEvents === TYPE_FUNCTION) {
					self._buildBindEvents(element);
				}
				if (!onlyBuild && typeof self._bindEvents === TYPE_FUNCTION) {
					self._bindEvents(element);
				}

				self.trigger(self.widgetEventPrefix + "create", self);

				return self;
			};

			/**
			 * Event triggered when method focus is called
			 * @event taufocus
			 * @member ns.widget.BaseWidget
			 */

			/**
			 * Focus widget's element.
			 *
			 * This function calls function focus on element and if it is known
			 * the direction of event, the proper css classes are added/removed.
			 * @method focus
			 * @param {Object} options The options of event.
			 * @param {HTMLElement} options.previousElement Element to blur
			 * @param {HTMLElement} options.element Element to focus
			 * @member ns.widget.BaseWidget
			 */
			prototype.focus = function (options) {
				var self = this,
					element = self.element,
					blurElement,
					scrollview,
					scrollviewElement,
					blurWidget;

				options = options || {};

				blurElement = options.previousElement;
				// we try to blur element, which has focus previously
				if (blurElement) {
					blurWidget = engine.getBinding(blurElement);
					// call blur function on widget
					if (blurWidget) {
						options = objectUtils.merge({}, options, {element: blurElement});
						blurWidget.blur(options);
					} else {
						// or on element, if widget does not exist
						blurElement.blur();
					}
				}

				options = objectUtils.merge({}, options, {element: element});
				scrollviewElement = selectorUtils.getClosestBySelector(element, "[data-tau-name='Scrollview']");
				if (scrollviewElement) {
					scrollview = engine.getBinding(scrollviewElement);
				}

				// set focus on element
				eventUtils.trigger(document, "taufocus", options);
				if (typeof self._focus === TYPE_FUNCTION) {
					if (options.event) {
						scrollview && scrollview.ensureElementIsVisible(element);
					}
					self._focus(element);
				} else {
					element.focus();
				}

				return true;
			};

			/**
			 * Event triggered then method blur is called.
			 * @event taublur
			 * @member ns.widget.BaseWidget
			 */

			/**
			 * Blur widget's element.
			 *
			 * This function calls function blur on element and if it is known
			 * the direction of event, the proper css classes are added/removed.
			 * @method blur
			 * @param {Object} options The options of event.
			 * @param {HTMLElement} options.element Element to blur
			 * @member ns.widget.BaseWidget
			 */
			prototype.blur = function (options) {
				var self = this,
					element = self.element;

				options = objectUtils.merge({}, options, {element: element});

				// blur element
				eventUtils.trigger(document, "taublur", options);
				if (typeof self._blur === TYPE_FUNCTION) {
					self._blur(element);
				} else {
					element.blur();
				}
				return true;
			};

			/**
			 * Protected method destroying the widget
			 * @method _destroy
			 * @template
			 * @protected
			 * @member ns.widget.BaseWidget
			 */
			/**
			 * Destroys widget.
			 *
			 * It calls method #\_destroy.
			 *
			 * At the end of destroying process, the event "destroy" with proper
			 * prefix defined in variable widgetEventPrefix is triggered and
			 * the binding set in engine is removed.
			 * @method destroy
			 * @param {HTMLElement} element Base element of the widget
			 * @member ns.widget.BaseWidget
			 */
			prototype.destroy = function (element) {
				var self = this;

				element = element || self.element;

				// the widget is in during destroy process
				self.flowState = "destroying";

				if (typeof self._destroy === TYPE_FUNCTION) {
					self._destroy(element);
				}
				if (self.element) {
					self.trigger(self.widgetEventPrefix + "destroy");
					if (self.element.dataset.originalStyle) {
						self.element.style.cssText = self.element.dataset.originalStyle;
						delete self.element.dataset.originalStyle;
					}
				}
				if (element) {
					engine.removeBinding(element, self.name);
				}
				// the widget was destroyed
				self.flowState = "destroyed";
			};

			/**
			 * Protected method disabling the widget
			 * @method _disable
			 * @protected
			 * @member ns.widget.BaseWidget
			 * @template
			 */
			/**
			 * Disables widget.
			 *
			 * It calls method #\_disable.
			 * @method disable
			 * @member ns.widget.BaseWidget
			 * @return {ns.widget.BaseWidget}
			 */
			prototype.disable = function () {
				var self = this,
					args = slice.call(arguments),
					element = self.element;

				element.classList.add(disableClass);
				element.setAttribute(ariaDisabled, true);

				if (typeof self._disable === TYPE_FUNCTION) {
					args.unshift(element);
					self._disable.apply(self, args);
				}
				return this;
			};

			/**
			 * Check if widget is disabled.
			 * @method isDisabled
			 * @member ns.widget.BaseWidget
			 * @return {boolean} Returns true if widget is disabled
			 */
			prototype.isDisabled = function () {
				var self = this;

				return self.element.getAttribute("disabled") || self.options.disabled === true;
			};

			/**
			 * Protected method enabling the widget
			 * @method _enable
			 * @protected
			 * @member ns.widget.BaseWidget
			 * @template
			 */
			/**
			 * Enables widget.
			 *
			 * It calls method #\_enable.
			 * @method enable
			 * @member ns.widget.BaseWidget
			 * @return {ns.widget.BaseWidget}
			 */
			prototype.enable = function () {
				var self = this,
					args = slice.call(arguments),
					element = self.element;

				element.classList.remove(disableClass);
				element.setAttribute(ariaDisabled, false);

				if (typeof self._enable === TYPE_FUNCTION) {
					args.unshift(element);
					self._enable.apply(self, args);
				}
				return this;
			};

			/**
			 * Protected method causing the widget to refresh
			 * @method _refresh
			 * @protected
			 * @member ns.widget.BaseWidget
			 * @template
			 */
			/**
			 * Refreshes widget.
			 *
			 * It calls method #\_refresh.
			 * @method refresh
			 * @member ns.widget.BaseWidget
			 * @return {ns.widget.BaseWidget}
			 */
			prototype.refresh = function () {
				var self = this,
					element = self.element;

				self._getCreateOptions(element);

				if (typeof self._refresh === TYPE_FUNCTION) {
					self._refresh.apply(self, arguments);
				}
				return self;
			};

			/**
			 * Reads class based on name conversion option value, for all options which have boolean value
			 * we can read option value by check that exists classname connected with option name. To
			 * correct use this method is required define in widget property _classesPrefix. If this
			 * condition is not met method returns false, otherwise returns true.
			 *
			 * For example for option middle in Button widget we will check existing of class
			 * ui-btn-middle.
			 *
			 * @method _readPrefixedOptionFromElementClassname
			 * @param {HTMLElement} element Main element of widget
			 * @param {string} name Name of option which should be used
			 * @return {boolean} If option value was successfully read
			 * @member ns.widget.BaseWidget
			 * @protected
			 */
			prototype._readPrefixedOptionFromElementClassname = function (element, name) {
				var classesPrefix = this._classesPrefix,
					className;

				if (classesPrefix) {
					className = classesPrefix + utilString.camelCaseToDashes(name);
					if (element.classList.contains(className)) {
						this.options[name] = element.classList.contains(className);
						// property exists in classname
						return true;
					}
				}

				return false;
			};

			/**
			 * Reads class based on name conversion option value, for all options which have boolean value
			 * we can read option value by check that exists classname connected with option name.
			 * Method returns true if class name contains common option, otherwise returns false.
			 *
			 * For example for option inline in widget we will check existing of class
			 * ui-inline.
			 *
			 * @method _readPrefixedOptionFromElementClassname
			 * @param {HTMLElement} element Main element of widget
			 * @param {string} name Name of option which should be used
			 * @return {boolean} If option value was successfully read
			 * @member ns.widget.BaseWidget
			 * @protected
			 */
			prototype._readCommonOptionFromElementClassname = function (element, name) {
				var options = this.options,
					classList = element.classList;

				switch (name) {
					case "inline" :
						if (classList.contains(commonClasses.INLINE)) {
							options.inline = true;
							return true;
						}
						break;
				}
				return false;
			};

			/**
			 * Sets or removes class based on name conversion option, for all options which have boolean
			 * value we can just set classname which is converted from camel case to dash style.
			 * To correct use this method is required define in widget property _classesPrefix.
			 *
			 * For example for option middle in Button widget we will set or remove class ui-btn-middle.
			 *
			 * @method _setBooleanOption
			 * @param {HTMLElement} element Main element of widget
			 * @param {string} name Name of option which should be used
			 * @param {boolean} value New value of option to set
			 * @member ns.widget.BaseWidget
			 * @protected
			 * @return {false} always return false to block refreshing
			 */
			prototype._setBooleanOption = function (element, name, value) {
				var classesPrefix = this._classesPrefix,
					className;

				if (classesPrefix) {
					className = classesPrefix + utilString.camelCaseToDashes(name);
					element.classList.toggle(className, value);
				}

				// we don't need refresh, always can return false
				return false;
			};

			/**
			 * For each options which has boolean value set or remove connected class.
			 *
			 * @method _setBooleanOptions
			 * @param {HTMLElement} element Base element of the widget
			 * @return {Object}
			 * @member ns.widget.BaseWidget
			 * @protected
			 */
			prototype._setBooleanOptions = function (element) {
				var self = this,
					classesPrefix = self._classesPrefix,
					options = self.options;

				if (classesPrefix && options !== undefined) {
					Object.keys(options).forEach(function (option) {
						if (typeof options[option] === "boolean") {
							options[option] = self._setBooleanOption(element, option, options[option]);
						}
					});
				}
				return options;
			};

			prototype._processOptionObject = function (firstArgument) {
				var self = this,
					key,
					partResult,
					refresh = false;

				for (key in firstArgument) {
					if (firstArgument.hasOwnProperty(key)) {
						partResult = self._oneOption(key, firstArgument[key]);
						if (key !== undefined && firstArgument[key] !== undefined) {
							refresh = refresh || partResult;
						}
					}
				}
				return refresh;
			};

			/**
			 * Gets or sets options of the widget.
			 *
			 * This method can work in many context.
			 *
			 * If first argument is type of object them, method set values for options given in object.
			 * Keys of object are names of options and values from object are values to set.
			 *
			 * If you give only one string argument then method return value for given option.
			 *
			 * If you give two arguments and first argument will be a string then second argument will be
			 * intemperate as value to set.
			 *
			 * @method option
			 * @param {string|Object} [name] name of option
			 * @param {*} [value] value to set
			 * @member ns.widget.BaseWidget
			 * @return {*} return value of option or null if method is called in setter context
			 */
			prototype.option = function (name, value) {
				var self = this,
					firstArgument = name,
					secondArgument = value,
					result = null,
					refresh = false;

				if (typeof firstArgument === "string") {
					result = self._oneOption(firstArgument, secondArgument);
					if (secondArgument !== undefined) {
						refresh = result;
						result = null;
					}
				} else if (typeof firstArgument === "object") {
					refresh = self._processOptionObject(firstArgument);
				}
				if (refresh) {
					self.refresh();
				}
				return result;
			};

			/**
			 * Gets or sets one option of the widget.
			 *
			 * @method _oneOption
			 * @param {string} field
			 * @param {*} value
			 * @member ns.widget.BaseWidget
			 * @return {*}
			 * @protected
			 */
			prototype._oneOption = function (field, value) {
				var self = this,
					methodName,
					refresh = false;

				if (value === undefined) {
					methodName = "_get" + (field[0].toUpperCase() + field.slice(1));

					if (typeof self[methodName] === TYPE_FUNCTION) {
						return self[methodName]();
					}

					return self.options[field];
				}

				methodName = "_set" + (field[0].toUpperCase() + field.slice(1));
				if (typeof self[methodName] === TYPE_FUNCTION) {
					refresh = self[methodName](self.element, value);
					if (self.element && (typeof value !== "object" || Array.isArray(value))) {
						self.element.setAttribute("data-" + (field.replace(/[A-Z]/g, function (c) {
							return "-" + c.toLowerCase();
						})), value);
					}
				} else if (typeof value === "boolean") {
					refresh = self._setBooleanOption(self.element, field, value);
				} else {
					self.options[field] = value;

					if (self.element && (typeof value !== "object" || Array.isArray(value))) {
						self.element.setAttribute("data-" + (field.replace(/[A-Z]/g, function (c) {
							return "-" + c.toLowerCase();
						})), value);
						refresh = true;
					}
				}

				if (value === "" && self.element) {
					self.element.removeAttribute("data-" + (field.replace(/[A-Z]/g, function (c) {
						return "-" + c.toLowerCase();
					})));
				}

				return refresh;
			};

			/**
			 * Returns true if widget has bounded events.
			 *
			 * This methods enables to check if the widget has bounded
			 * events through the {@link ns.widget.BaseWidget#bindEvents} method.
			 * @method isBound
			 * @param {string} [type] Type of widget
			 * @member ns.widget.BaseWidget
			 * @ignore
			 * @return {boolean} true if events are bounded
			 */
			prototype.isBound = function (type) {
				var element = this.element;

				type = type || this.name;
				return element && element.hasAttribute(engineDataTau.bound) &&
					element.getAttribute(engineDataTau.bound).indexOf(type) > -1;
			};

			/**
			 * Returns true if widget is built.
			 *
			 * This methods enables to check if the widget was built
			 * through the {@link ns.widget.BaseWidget#build} method.
			 * @method isBuilt
			 * @param {string} [type] Type of widget
			 * @member ns.widget.BaseWidget
			 * @ignore
			 * @return {boolean} true if the widget was built
			 */
			prototype.isBuilt = function (type) {
				var element = this.element;

				type = type || this.name;
				return element && element.hasAttribute(engineDataTau.built) &&
					element.getAttribute(engineDataTau.built).indexOf(type) > -1;
			};

			/**
			 * Protected method getting the value of widget
			 * @method _getValue
			 * @return {*}
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Protected method setting the value of widget
			 * @method _setValue
			 * @param {*} value
			 * @return {*}
			 * @member ns.widget.BaseWidget
			 * @template
			 * @protected
			 */
			/**
			 * Gets or sets value of the widget.
			 *
			 * @method value
			 * @param {*} [value] New value of widget
			 * @member ns.widget.BaseWidget
			 * @return {*}
			 */
			prototype.value = function (value) {
				var self = this;

				if (value !== undefined) {
					if (typeof self._setValue === TYPE_FUNCTION) {
						return self._setValue(value);
					}
					return self;
				}
				if (typeof self._getValue === TYPE_FUNCTION) {
					return self._getValue();
				}
				return self;
			};

			/**
			 * Triggers an event on widget's element.
			 *
			 * @method trigger
			 * @param {string} eventName The name of event to trigger
			 * @param {?*} [data] additional Object to be carried with the event
			 * @param {boolean} [bubbles=true] Indicating whether the event
			 * bubbles up through the DOM or not
			 * @param {boolean} [cancelable=true] Indicating whether
			 * the event is cancelable
			 * @member ns.widget.BaseWidget
			 * @return {boolean} False, if any callback invoked preventDefault on event object
			 */
			prototype.trigger = function (eventName, data, bubbles, cancelable) {
				if (this.element) {
					return eventUtils.trigger(this.element, eventName, data, bubbles, cancelable);
				}
				return false;
			};

			/**
			 * Adds event listener to widget's element.
			 * @method on
			 * @param {string} eventName The name of event
			 * @param {Function} listener Function called after event will be trigger
			 * @param {boolean} [useCapture=false] useCapture Parameter of addEventListener
			 * @member ns.widget.BaseWidget
			 */
			prototype.on = function (eventName, listener, useCapture) {
				eventUtils.on(this.element, eventName, listener, useCapture);
			};

			/**
			 * Removes event listener from  widget's element.
			 * @method off
			 * @param {string} eventName The name of event
			 * @param {Function} listener Function call after event will be trigger
			 * @param {boolean} [useCapture=false] useCapture Parameter of addEventListener
			 * @member ns.widget.BaseWidget
			 */
			prototype.off = function (eventName, listener, useCapture) {
				eventUtils.off(this.element, eventName, listener, useCapture);
			};

			prototype._framesFlow = function () {
				var self = this,
					args = slice.call(arguments),
					func = args.shift();

				if (typeof func === "function") {
					func();
				}
				if (func !== undefined) {
					util.requestAnimationFrame(function () {
						self._framesFlow.apply(self, args);
					});
				}
			};

			function callbacksFilter(item) {
				return !item.toRemove;
			}

			function callbacksForEach(item) {
				if (item.object[item.property] === item.value) {
					util.requestAnimationFrame(item.callback.bind(item.object));
					item.toRemove = true;
				}
			}

			function _controlWaitFor() {
				__callbacks.forEach(callbacksForEach);
				__callbacks = __callbacks.filter(callbacksFilter);
				if (__callbacks.length) {
					util.requestAnimationFrame(_controlWaitFor);
				}
			}

			prototype._waitFor = function (property, value, callback) {
				var self = this;

				if (self[property] === value) {
					callback.call(self);
				} else {
					__callbacks = __callbacks || [];
					__callbacks.push({
						object: self,
						property: property,
						value: value,
						callback: callback
					});
				}
				_controlWaitFor();
			};

			function readDOMElementStateClassList(element, stateObject) {
				var classList = stateObject.classList;

				if (classList !== undefined) {
					if (classList instanceof setUtils) {
						classList.clear();
					} else {
						classList = new setUtils();
						stateObject.classList = classList;
					}
					if (element.classList.length) {
						slice.call(element.classList).forEach(function (className) {
							classList.add(className);
						});
					}
				}
			}

			function readDOMElementState(element, stateObject) {
				readDOMElementStateClassList(element, stateObject);
				if (stateObject.offsetWidth !== undefined) {
					stateObject.offsetWidth = element.offsetWidth;
				}
				if (stateObject.style !== undefined) {
					domUtils.extractCSSProperties(element, stateObject.style, null, true);
				}
				if (stateObject.children !== undefined) {
					stateObject.children.forEach(function (child, index) {
						readDOMElementState(element.children[index], child);
					});
				}
			}

			function render(stateObject, element, isChild) {
				var recalculate = false;

				if (stateObject.classList !== undefined) {
					slice.call(element.classList).forEach(function (className) {
						if (!stateObject.classList.has(className)) {
							element.classList.remove(className);
							recalculate = true;
						}
					});
					stateObject.classList.forEach(function (className) {
						if (!element.classList.contains(className)) {
							element.classList.add(className);
							recalculate = true;
						}
					});
				}
				if (stateObject.style !== undefined) {
					Object.keys(stateObject.style).forEach(function (styleName) {
						element.style[styleName] = stateObject.style[styleName];
					});
				}
				if (stateObject.children !== undefined) {
					stateObject.children.forEach(function (child, index) {
						render(child, element.children[index], true);
					});
				}
				if (recalculate && !isChild) {
					util.requestAnimationFrame(readDOMElementState.bind(null, element, stateObject));
				}
			}

			prototype._render = function (now) {
				var self = this,
					stateDOM = self._stateDOM,
					element = self.element;

				if (now === true) {
					render(stateDOM, element, false);
				} else {
					util.requestAnimationFrame(render.bind(null, stateDOM, element, false));
				}
			};

			prototype._initDOMstate = function () {
				readDOMElementState(this.element, this._stateDOM);
			};

			prototype._togglePrefixedClass = function (stateDOM, prefix, name) {
				var requireRefresh = false,
					prefixedClassName = prefix + name;

				stateDOM.classList.forEach(function (className) {
					if (className.indexOf(prefix) === 0 && prefixedClassName !== className) {
						stateDOM.classList.delete(className);
						requireRefresh = true;
					}
				});
				if (!stateDOM.classList.has(prefixedClassName)) {
					stateDOM.classList.add(prefixedClassName);
					requireRefresh = true;
				}
				return requireRefresh;
			};

			/**
			 * Create widget wrapper element
			 * @param {string|null} [type=div] type of HTML element
			 * @protected
			 * @member ns.widget.BaseWidget
			 * @return {HTMLElement}
			 */
			prototype._createWrapper = function (type) {
				var wrapper;

				type = (typeof type === TYPE_STRING) ? type : "div";

				wrapper = document.createElement(type);
				wrapper.setAttribute(engineDataTau.widgetWrapper, true);
				return wrapper;
			}

			BaseWidget.prototype = prototype;

			// definition
			ns.widget.BaseWidget = BaseWidget;

			}(window.document, ns));

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/* global window, define */
/* eslint-disable no-console */
/**
 * #Core namespace
 * Object contains main framework methods.
 * @class ns
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
(function (document, console) {
	"use strict";
			var idNumberCounter = 0,
			currentDate = +new Date(),
			slice = [].slice,
			rootNamespace = "",
			fileName = "",
			infoForLog = function (args) {
				var dateNow = new Date();

				args.unshift("[" + rootNamespace + "][" + dateNow.toLocaleString() + "]");
			},
			ns = window.ns || window.tau || {},
			nsConfig = window.nsConfig || window.tauConfig || {};

		ns.info = ns.info || {
			profile: "custom"
		};
		ns.tauPerf = ns.tauPerf || {};

		window.ns = ns;
		window.nsConfig = nsConfig;

		window.tau = ns;
		window.tauConfig = nsConfig;

		rootNamespace = nsConfig.rootNamespace;
		fileName = nsConfig.fileName;

		/**
		 * Return unique id
		 * @method getUniqueId
		 * @static
		 * @return {string}
		 * @member ns
		 */
		ns.getUniqueId = function () {
			return rootNamespace + "-" + ns.getNumberUniqueId() + "-" + currentDate;
		};

		/**
		 * Return unique id
		 * @method getNumberUniqueId
		 * @static
		 * @return {number}
		 * @member ns
		 */
		ns.getNumberUniqueId = function () {
			return idNumberCounter++;
		};

		/**
		 * logs supplied messages/arguments
		 * @method log
		 * @static
		 * @member ns
		 */
		ns.log = function () {
			var args = slice.call(arguments);

			infoForLog(args);
			if (console) {
				console.log.apply(console, args);
			}
		};

		/**
		 * logs supplied messages/arguments ad marks it as warning
		 * @method warn
		 * @static
		 * @member ns
		 */
		ns.warn = function () {
			var args = slice.call(arguments);

			infoForLog(args);
			if (console) {
				console.warn.apply(console, args);
			}
		};

		/**
		 * logs supplied messages/arguments and marks it as error
		 * @method error
		 * @static
		 * @member ns
		 */
		ns.error = function () {
			var args = slice.call(arguments);

			infoForLog(args);
			if (console) {
				console.error.apply(console, args);
			}
		};

		/**
		 * get from nsConfig
		 * @method getConfig
		 * @param {string} key
		 * @param {*} [defaultValue] value returned when config is not set
		 * @return {*}
		 * @static
		 * @member ns
		 */
		ns.getConfig = function (key, defaultValue) {
			return nsConfig[key] === undefined ? defaultValue : nsConfig[key];
		};

		/**
		 * set in nsConfig
		 * @method setConfig
		 * @param {string} key
		 * @param {*} value
		 * @param {boolean} [asDefault=false] value should be treated as default (doesn't overwrites
		 * the config[key] if it already exists)
		 * @static
		 * @member ns
		 */
		ns.setConfig = function (key, value, asDefault) {
			if (!asDefault || nsConfig[key] === undefined) {
				nsConfig[key] = value;
			}
		};

		/**
		 * Return path for framework script file.
		 * @method getFrameworkPath
		 * @return {?string}
		 * @member ns
		 */
		ns.getFrameworkPath = function () {
			var scripts = document.getElementsByTagName("script"),
				countScripts = scripts.length,
				i,
				url,
				arrayUrl,
				count;

			for (i = 0; i < countScripts; i++) {
				url = scripts[i].src;
				arrayUrl = url.split("/");
				count = arrayUrl.length;
				if (arrayUrl[count - 1] === fileName + ".js" ||
					arrayUrl[count - 1] === fileName + ".min.js") {
					return arrayUrl.slice(0, count - 1).join("/");
				}
			}
			return null;
		};

		}(window.document, window.console));

/*global window, ns, define, XMLHttpRequest, console, Blob */
/*jslint nomen: true, browser: true, plusplus: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Utilities
 *
 * The Tizen Advanced UI (TAU) framework provides utilities for easy-developing
 * and fully replaceable with jQuery method. When user using these DOM and
 * selector methods, it provide more light logic and it proves performance
 * of web app. The following table displays the utilities provided by the
 * TAU framework.
 *
 * @class ns.util
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (window, document, ns) {
	"use strict";
				var currentFrame = null,
				util = ns.util || {},
				// frames callbacks which should be run in next request animation frame
				waitingFrames = [],
				slice = [].slice,
				// inform that loop was added to request animation frame callback
				loopWork = false;

			/**
			 * Function which is use as workaround when any type of request animation frame not exists
			 * @param {Function} callback
			 * @method _requestAnimationFrameOnSetTimeout
			 * @static
			 * @member ns.util
			 * @protected
			 */
			util._requestAnimationFrameOnSetTimeout = function (callback) {
				currentFrame = window.setTimeout(callback.bind(callback, +new Date()), 1000 / 60);
			};

			/**
			 * Function which support every request animation frame.
			 * @method _loop
			 * @protected
			 * @static
			 * @member ns.util
			 */
			util._loop = function () {
				var loopWaitingFrames = slice.call(waitingFrames),
					currentFrameFunction = loopWaitingFrames.shift(),
					loopTime = performance.now();

				waitingFrames = [];

				while (currentFrameFunction) {
					currentFrameFunction(loopTime);
					if (performance.now() - loopTime < 15) {
						currentFrameFunction = loopWaitingFrames.shift();
					} else {
						currentFrameFunction = null;
					}
				}
				if (loopWaitingFrames.length || waitingFrames.length) {
					waitingFrames.unshift.apply(waitingFrames, loopWaitingFrames);
					util.windowRequestAnimationFrame(util._loop);
				} else {
					loopWork = false;
				}
			};

			/**
			 * Find browser prefixed request animation frame function.
			 * @method _getRequestAnimationFrame
			 * @protected
			 * @static
			 * @member ns.util
			 */
			util._getRequestAnimationFrame = function () {
				return (window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					util._requestAnimationFrameOnSetTimeout).bind(window);
			};

			/**
			 * Original requestAnimationFrame from object window.
			 * @method windowRequestAnimationFrame
			 * @static
			 * @member ns.util
			 */
			util.windowRequestAnimationFrame = util._getRequestAnimationFrame();

			/**
			 * Special requestAnimationFrame function which add functions to queue of callbacks
			 * @method requestAnimationFrame
			 * @static
			 * @member ns.util
			 */
			util.requestAnimationFrame = function (callback) {
				waitingFrames.push(callback);
				if (!loopWork) {
					util.windowRequestAnimationFrame(util._loop);
					loopWork = true;
				}
			};

			util._cancelAnimationFrameOnSetTimeout = function () {
				// probably wont work if there is any more than 1
				// active animationFrame but we are trying anyway
				window.clearTimeout(currentFrame);
			};

			/**
			 * Remove animation callbacks added by requestAnimationFrame
			 * @method cancelAnimationFrames
			 * @static
			 * @member ns.util
			 * @param {*} animationId value for identify animation in queue
			 */
			util.cancelAnimationFrames = function (animationId) {
				var found = 0,
					len = waitingFrames.length,
					i = 0;

				if (animationId) {
					// remove selected requests
					while (len > 0 && found > -1) {
						found = -1;
						for (; i < len; i++) {
							if (waitingFrames[i].animationId === animationId) {
								found = i;
								break;
							}
						}

						if (found > -1) {
							waitingFrames.splice(found, 1);
							len--;
						}
					}
				} else {
					ns.warn("cancelAnimationFrames() require one parameter for request identify");
				}
			};

			util._getCancelAnimationFrame = function () {
				return (window.cancelAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.mozCancelAnimationFrame ||
					window.oCancelAnimationFrame ||
					window.msCancelAnimationFrame ||
					util._cancelAnimationFrameOnSetTimeout).bind(window);
			};

			util.cancelAnimationFrame = util._getCancelAnimationFrame();

			/**
			 * fetchSync retrieves a text document synchronously, returns null on error
			 * @param {string} url
			 * @param {=string} [mime=""] Mime type of the resource
			 * @return {string|null}
			 * @static
			 * @member ns.util
			 */
			function fetchSync(url, mime) {
				var xhr = new XMLHttpRequest(),
					status;

				xhr.open("get", url, false);
				if (mime) {
					xhr.overrideMimeType(mime);
				}
				xhr.send();
				if (xhr.readyState === 4) {
					status = xhr.status;
					if (status === 200 || (status === 0 && xhr.responseText)) {
						return xhr.responseText;
					}
				}

				return null;
			}

			util.fetchSync = fetchSync;

			/**
			 * Removes all script tags with src attribute from document and returns them
			 * @param {HTMLElement} container
			 * @return {Array.<HTMLElement>}
			 * @protected
			 * @static
			 * @member ns.util
			 */
			function removeExternalScripts(container) {
				var scripts = slice.call(container.querySelectorAll("script[src]")),
					i = scripts.length,
					script;

				while (--i >= 0) {
					script = scripts[i];
					script.parentNode.removeChild(script);
				}

				return scripts;
			}

			util._removeExternalScripts = removeExternalScripts;

			/**
			 * Evaluates code, reason for a function is for an atomic call to evaluate code
			 * since most browsers fail to optimize functions with try-catch blocks, so this
			 * minimizes the effect, returns the function to run
			 * @param {string} code
			 * @return {Function}
			 * @static
			 * @member ns.util
			 */
			function safeEvalWrap(code) {
				return function () {
					try {
						window.eval(code);
					} catch (e) {
						if (e.stack) {
							ns.error(e.stack);
						} else if (e.name && e.message) {
							ns.error(e.name, e.message);
						} else {
							ns.error(e);
						}
					}
				};
			}

			util.safeEvalWrap = safeEvalWrap;

			/**
			 * Calls functions in supplied queue (array)
			 * @param {Array.<Function>} functionQueue
			 * @static
			 * @member ns.util
			 */
			function batchCall(functionQueue) {
				var i,
					length = functionQueue.length;

				for (i = 0; i < length; ++i) {
					functionQueue[i]();
				}
			}

			util.batchCall = batchCall;

			/**
			 * Creates new script elements for scripts gathered from a different document
			 * instance, blocks asynchronous evaluation (by renaming src attribute) and
			 * returns an array of functions to run to evaluate those scripts
			 * @param {Array.<HTMLElement>} scripts
			 * @param {HTMLElement} container
			 * @return {Array.<Function>}
			 * @protected
			 * @static
			 * @member ns.util
			 */
			function createScriptsSync(scripts, container) {
				var scriptElement,
					scriptBody,
					i,
					length,
					queue = [];

				// proper order of execution
				for (i = 0, length = scripts.length; i < length; ++i) {
					scriptBody = util.fetchSync(scripts[i].src, "text/plain");
					if (scriptBody) {
						scriptElement = document.adoptNode(scripts[i]);
						scriptElement.setAttribute("data-src", scripts[i].src);
						scriptElement.removeAttribute("src"); // block evaluation
						queue.push(util.safeEvalWrap(scriptBody));
						if (container) {
							container.appendChild(scriptElement);
						}
					}
				}

				return queue;
			}

			util._createScriptsSync = createScriptsSync;

			function removeInlineScripts(element) {
				var result = [],
					script;

				slice.call(element.querySelectorAll(
					"script:not([data-src]):not([type]):not([id]):not([src])"
					)).forEach(function (item) {
						script = document.createElement("script");
						script.innerText = item.textContent;
						// move attributes from original script element
						slice.call(item.attributes).forEach(function (attribute) {
							script.setAttribute(attribute.name, item.getAttribute(attribute.name));
						});
						item.parentNode.removeChild(item);
						result.push(script);
					});

				return result;
			}

			util._removeInlineScripts = removeInlineScripts;

			/**
			 * Method make asynchronous call of function
			 * @method async
			 * @inheritdoc #requestAnimationFrame
			 * @member ns.util
			 * @static
			 */
			util.async = util.requestAnimationFrame;

			/**
			 * Appends element from different document instance to current document in the
			 * container element and evaluates scripts (synchronously)
			 * @param {HTMLElement} element
			 * @param {HTMLElement} container
			 * @return {HTMLElement}
			 * @method importEvaluateAndAppendElement
			 * @member ns.util
			 * @static
			 */
			util.importEvaluateAndAppendElement = function (element, container) {
				var externalScriptsQueue =
						util._createScriptsSync(util._removeExternalScripts(element), element),
					inlineScripts = util._removeInlineScripts(element),
					newNode = document.importNode(element, true);

				container.appendChild(newNode); // append and eval inline
				inlineScripts.forEach(function (script) {
					container.appendChild(script);
				});
				util.batchCall(externalScriptsQueue);

				return newNode;
			};

			/**
			 * Checks if specified string is a number or not
			 * @method isNumber
			 * @param {string} query
			 * @return {boolean}
			 * @member ns.util
			 * @static
			 */
			util.isNumber = function (query) {
				var parsed = parseFloat(query);

				return !isNaN(parsed) && isFinite(parsed);
			};

			/**
			 * Reappear script tags to DOM structure to correct run script
			 * @method runScript
			 * @param {string} baseUrl
			 * @param {HTMLScriptElement} script
			 * @member ns.util
			 * @deprecated 2.3
			 */
			util.runScript = function (baseUrl, script) {
				var newScript = document.createElement("script"),
					scriptData,
					i,
					scriptAttributes = slice.call(script.attributes),
					src = script.getAttribute("src"),
					attribute,
					status;

				// 'src' may become null when none src attribute is set
				if (src !== null) {
					src = util.path.makeUrlAbsolute(src, baseUrl);
				}

				//Copy script tag attributes
				i = scriptAttributes.length;
				while (--i >= 0) {
					attribute = scriptAttributes[i];
					if (attribute.name !== "src") {
						newScript.setAttribute(attribute.name, attribute.value);
					} else {
						newScript.setAttribute("data-src", attribute.value);
					}
				}

				if (src) {
					scriptData = util.fetchSync(src, "text/plain");
									} else {
					scriptData = script.textContent;
				}

				if (scriptData) {
					// add the returned content to a newly created script tag
					newScript.src = window.URL.createObjectURL(new Blob([scriptData], {type: "text/javascript"}));
					newScript.textContent = scriptData; // for compatibility with some libs ex. template systems
				}
				script.parentNode.replaceChild(newScript, script);
			};

			ns.util = util;
			}(window, window.document, ns));

/*global define*/
(function () {
	"use strict";
			/*eslint-disable*/
		/**
		 * BezierEasing - use bezier curve for transition easing function
		 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
		 *
		 * Credits: is based on Firefox's nsSMILKeySpline.cpp
		 * Usage:
		 * var spline = BezierEasing([ 0.25, 0.1, 0.25, 1.0 ])
		 * spline.get(x) => returns the easing value | x must be in [0, 1] range
		 *
		 * @class utils.BezierCurve
		 */


			// These values are established by empiricism with tests (tradeoff: performance VS precision)
		var NEWTON_ITERATIONS = 4;
		var NEWTON_MIN_SLOPE = 0.001;
		var SUBDIVISION_PRECISION = 0.0000001;
		var SUBDIVISION_MAX_ITERATIONS = 10;

		var kSplineTableSize = 11;
		var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

		var float32ArraySupported = typeof Float32Array === "function";

		/**
		 *
		 * @param aA1
		 * @param aA2
		 * @returns {number}
		 */
		function a (aA1, aA2) {
			return 1.0 - 3.0 * aA2 + 3.0 * aA1;
		}

		/**
		 *
		 * @param aA1
		 * @param aA2
		 * @returns {number}
		 */
		function b (aA1, aA2) {
			return 3.0 * aA2 - 6.0 * aA1;
		}

		/**
		 *
		 * @param aA1
		 * @returns {number}
		 */
		function c (aA1) {
			return 3.0 * aA1;
		}

		/**
		 * Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
		 * @param aT
		 * @param aA1
		 * @param aA2
		 * @returns {number}
		 */
		function calcBezier (aT, aA1, aA2) {
			return ((a(aA1, aA2)*aT + b(aA1, aA2))*aT + c(aA1))*aT;
		}


		/**
		 * Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
		 * @param aT
		 * @param aA1
		 * @param aA2
		 * @returns {*}
		 */
		function getSlope (aT, aA1, aA2) {
			return 3.0 * a(aA1, aA2)*aT*aT + 2.0 * b(aA1, aA2) * aT + c(aA1);
		}

		/**
		 *
		 * @param aX
		 * @param aA
		 * @param aB
		 * @param mX1
		 * @param mX2
		 * @returns {*}
		 */
		function binarySubdivide (aX, aA, aB, mX1, mX2) {
			var currentX, currentT, i = 0;
			do {
				currentT = aA + (aB - aA) / 2.0;
				currentX = calcBezier(currentT, mX1, mX2) - aX;
				if (currentX > 0.0) {
					aB = currentT;
				} else {
					aA = currentT;
				}
			} while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
			return currentT;
		}

		/**
		 *
		 * @param aX
		 * @param aGuessT
		 * @param mX1
		 * @param mX2
		 * @returns {*}
		 */
		function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
			for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
				var currentSlope = getSlope(aGuessT, mX1, mX2);
				if (currentSlope === 0.0) {
					return aGuessT;
				}
				var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
				aGuessT -= currentX / currentSlope;
			}
			return aGuessT;
		}

		function validateArguments(points) {
			if (!points || points.length !== 4) {
				throw new Error("BezierEasing: points must contains 4 values");
			}
			for (var i = 0; i < 4; ++i) {
				if (typeof points[i] !== "number" || isNaN(points[i]) || !isFinite(points[i])) {
					throw new Error("BezierEasing: points should be integers.");
				}
			}
			if (points[0] < 0 || points[0] > 1 || points[2] < 0 || points[2] > 1) {
				throw new Error("BezierEasing x values must be in [0, 1] range.");
			}
		}

		/**
		 * points is an array of [ mX1, mY1, mX2, mY2 ]
		 * @param points
		 * @param _b
		 * @param _c
		 * @param _d
		 * @returns {BezierEasing}
		 * @constructor
		 */
		function BezierEasing (points, _b, _c, _d) {
			if (arguments.length === 4) {
				return new BezierEasing([points, _b, _c, _d]);
			}
			if (!(this instanceof BezierEasing)) {
				return new BezierEasing(points);
			}

			validateArguments(points);

			this._str = "BezierEasing(" + points + ")";
			this._css = "cubic-bezier(" + points + ")";
			this._p = points;
			this._mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : [];
			this._precomputed = false;

			this.get = this.get.bind(this);
			return this;
		}

		BezierEasing.prototype = {

			/**
			 *
			 * @param x
			 * @returns {*}
			 */
			get: function (x) {
				var mX1 = this._p[0],
					mY1 = this._p[1],
					mX2 = this._p[2],
					mY2 = this._p[3];
				if (!this._precomputed) {
					this._precompute();
				}
				if (mX1 === mY1 && mX2 === mY2) {
					return x;
				} // linear
				// Because JavaScript number are imprecise, we should guarantee the extremes are right.
				if (x <= 0) {
					return 0;
				}
				if (x >= 1) {
					return 1;
				}
				return calcBezier(this._getTForX(x), mY1, mY2);
			},

			/**
			 *
			 * @private
			 */
			_precompute: function () {
				var mX1 = this._p[0],
					mY1 = this._p[1],
					mX2 = this._p[2],
					mY2 = this._p[3];
				this._precomputed = true;
				if (mX1 !== mY1 || mX2 !== mY2) {
					this._calcSampleValues();
				}
			},

			/**
			 *
			 * @private
			 */
			_calcSampleValues: function () {
				var mX1 = this._p[0],
					mX2 = this._p[2];
				for (var i = 0; i < kSplineTableSize; ++i) {
					this._mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
				}
			},

			/**
			 * getTForX chose the fastest heuristic to determine the percentage value precisely from a
			 * given X projection.
			 * @param aX
			 * @returns {*}
			 * @private
			 */
			_getTForX: function (aX) {
				var mX1 = this._p[0],
					mX2 = this._p[2],
					mSampleValues = this._mSampleValues;

				var intervalStart = 0.0;
				var currentSample = 1;
				var lastSample = kSplineTableSize - 1;

				for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX;
				       ++currentSample) {
					intervalStart += kSampleStepSize;
				}
				--currentSample;

				// Interpolate to provide an initial guess for t
				var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample+1] -
					mSampleValues[currentSample]);
				var guessForT = intervalStart + dist * kSampleStepSize;

				var initialSlope = getSlope(guessForT, mX1, mX2);
				if (initialSlope >= NEWTON_MIN_SLOPE) {
					return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
				} else if (initialSlope === 0.0) {
					return guessForT;
				} else {
					return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
				}
			}
		};

		// CSS mapping
		BezierEasing.css = {
			ease:        BezierEasing.ease = new BezierEasing(0.25, 0.1, 0.25, 1.0),
			easeIn:     BezierEasing.easeIn = new BezierEasing(0.42, 0.0, 1.00, 1.0),
			easeOut:    BezierEasing.easeOut = new BezierEasing(0.00, 0.0, 0.58, 1.0),
			easeInOut: BezierEasing.easeInOut = new BezierEasing(0.42, 0.0, 0.58, 1.0)
		};

		if (ns && ns.util) {
			ns.util.bezierCurve = BezierEasing;
		}

		}());

/* global define, ns */
/**
 * Main file of applications, which connect other parts
 */
// then we can load plugins for libraries and application
(function (window, document, ns) {
	"use strict";
			var utils = ns.util,
			requestAnimationFrame = utils.requestAnimationFrame,
			/**
			 * Util to change value of object property in given time
			 * @class Animation
			 */
			Animate = function (object) {
				var self = this;

				self._object = object;
				self._animate = {
					chain: [],
					chainIndex: 0
				};
				// This is used to keep track of elapsed time of paused animation
				self._pausedTimeDiff = 0;
				self._animateConfig = null;
			},
			linear = function (x, a, b) {
				a = (a === undefined) ? 1 : a;
				b = (b === undefined) ? 0 : b;
				return x * (a || 0) + (b || 0);
			},
			inverseTiming = function (x) {
				return 1 - x;
			},
			prototype = {};

		utils.bezierCurve = utils.bezierCurve || bezierCurve;

		Animate.prototype = prototype;

		Animate.timing = {
			linear: linear,
			ease: utils.bezierCurve.ease.get,
			easeInOut: utils.bezierCurve.easeInOut.get,
			easeIn: utils.bezierCurve.easeIn.get,
			easeOut: utils.bezierCurve.easeOut.get
		};

		function firstDefined() {
			var args = [].slice.call(arguments),
				i = 0,
				length = args.length,
				arg;

			for (; i < length; i++) {
				arg = args[i];
				if (arg !== undefined) {
					return arg;
				}
			}
			return null;
		}

		prototype.destroy = function () {
			var self = this;

			self._object = null;
			self._animate = null;
			self._animateConfig = null;
		};

		function calculateSteps(option, currentPoint) {
			var percent,
				step,
				steps = option.steps,
				from = option.from,
				to = null,
				percentStart = 0,
				percentStop = 100,
				floatPoint;

			for (percent in steps) {
				if (steps.hasOwnProperty(percent)) {
					step = steps[percent];
					floatPoint = percent / 100;
					if (currentPoint >= floatPoint) {
						from = step;
						percentStart = floatPoint;
					} else if (to === null) {
						to = step;
						percentStop = floatPoint;
					}
				}
			}
			return from + (currentPoint - percentStart) / (percentStop - percentStart) *
				(to - from);
		}

		function eachOption(config, animateConfig, option) {
			var propertyObject,
				from,
				steps = option.steps || config.steps;

			option.duration = firstDefined(option.duration, config.duration);
			option.delay = firstDefined(option.delay, config.delay, 0);
			propertyObject = firstDefined(option.object, this._object);
			option.simpleProperty = option.property;
			option.property.split(".").forEach(function (property) {
				if (typeof propertyObject[property] === "object" && propertyObject[property] !== null) {
					propertyObject = propertyObject[property];
					option.propertyObject = propertyObject;
				} else {
					option.simpleProperty = property;
				}
			});
			option.propertyObject = propertyObject;
			if (steps) {
				option.calculate = calculateSteps.bind(null, option);
				steps[0] = firstDefined(steps[0], option.from, propertyObject[option.simpleProperty]);
				option.from = steps["0"];
				option.to = firstDefined(steps["100"], option.to);
				option.diff = 0;
				option.current = steps[0];
				option.direction = option.from < option.to ? 1 : -1;
			} else {
				option.calculate = option.calculate || linear;
				from = firstDefined(option.from, propertyObject[option.simpleProperty]);
				option.from = from;
				option.diff = (option.to - from);
				option.current = from;
				option.direction = from < option.to ? 1 : -1;
			}

			// calculate value change in full time
			option.startTime = Date.now() + option.delay;

			if (this._pausedTimeDiff > 0) {
				option.startTime = Date.now() - this._pausedTimeDiff;
				this._pausedTimeDiff = 0;
			}
			// save last time of recalculate options
			option.lastCalculationTime = option.startTime;
			// set timing function
			option.timing = firstDefined(option.timing, config.timing, linear);

			animateConfig.push(option);
		}

		prototype.setProgress = function (progress) {
			var self = this,
				animate = self._animate,
				chain;

			if (animate.chainIndex > 0) {
				chain = animate.chain[animate.chainIndex - 1];
			} else {
				chain = animate.chain[0];
			}
			if (chain) {
				chain.forEach(function (option) {
					option.progress = progress;
					if (self._pausedTimeDiff === 0) {
						option.startTime = Date.now() - option.duration * progress;
					} else {
						self._pausedTimeDiff = option.duration * progress;
					}
				});
			}
		};

		prototype.getProgress = function () {
			var self = this,
				animate = self._animate,
				chain;

			if (animate.chainIndex > 0) {
				chain = animate.chain[animate.chainIndex - 1];
			} else {
				chain = animate.chain[0];
			}

			if (chain) {
				return chain[0].progress;
			}
			return 0;
		};

		prototype._initAnimate = function () {
			var self = this,
				animateConfig = [],
				options = self._animate.chain[self._animate.chainIndex++];

			if (options) {
				options.forEach(eachOption.bind(self, self._config, animateConfig));
				self._animateConfig = animateConfig;
			} else {
				self._animateConfig = null;
			}
		};

		function animateLoopCallback(self, copiedArgs) {
			if (self._animate) {
				self._animate.chain = [].slice.call(copiedArgs);
				self.start();
			}
		}

		function animateRevertCallback(self, copiedArgs) {
			var chain = [].slice.call(copiedArgs),
				newChain = [];

			chain.forEach(function (options) {
				newChain.unshift(options);
				options.forEach(function (option) {
					option.timing = inverseTiming;
				});
			});
			self._animate.chain = newChain;
			self._animate.callback = null;
			self.start();
		}

		/**
		 * Set animate
		 * @param {Object...} options list of animations configs
		 * @return {Animate}
		 */
		prototype.set = function (options) {
			var self = this,
				config,
				// converts arguments to array
				args = [].slice.call(arguments),
				copiedArgs;

			// we get last argument
			config = args.pop();

			if (!Array.isArray(config)) {
			// if last arguments is object then we use it as global animation config
				self._animate.config = config;
			} else {
			// otherwise this is description of one animation loop and back to args array
				args.push(config);
				config = null;
			}

			self._config = config;

			// copy array to be sure that we have new reference objects
			copiedArgs = [].slice.call(args);

			if (config) {
				if (config.loop && config.duration > 0) {
				// when animation is in loop then we create callback on animation and to restart animation
					self._animate.callback = animateLoopCallback.bind(null, self, copiedArgs);
				} else if (config.withRevert) {
					self._animate.callback = animateRevertCallback.bind(null, self, copiedArgs);
				} else {
				// otherwise we use callback from options
					self._animate.callback = options.callback || config.callback;
				}
			}

			// cache options in object
			self._animate.chain = args;

			return self;
		};

		/**
		 * Start animation
		 * @param {Function} [callback] function called after finish animation
		 */
		prototype.start = function (callback) {
			var self = this;

			self.active = true;
			// init animate options
			self._initAnimate();

			// setting callback function
			self._animate.callback = self._animate.callback || callback;
			callback = self._animate.callback;

			if (self._animate.chainIndex < self._animate.chain.length) {
			// if we have many animations in chain that we set callback
			// to start next animation from chain after finish current
			// animation
				self._animationTimeout = self._calculateAnimate.bind(self, self.start.bind(self, callback));
			} else {
				self._animationTimeout = self._calculateAnimate.bind(self, callback);
			}
			self._animationId = Math.random() + Date.now();
			self._animationTimeout.animationId = self._animationId;
			self._calculateAnimate(callback);
			return self;
		};

		/**
		 * Stop animations
		 */
		prototype.stop = function () {
			var self = this;

			self.active = false;
			// reset index of animations chain
			self._animate.chainIndex = 0;
			// reset current animation config
			self._animateConfig = null;

			ns.util.cancelAnimationFrames(self._animationId);
			// clear timeout
			self._animationTimeout = null;
			return self;
		};

		prototype.pause = function () {
			var self = this;

			self.active = false;
			if (self._animateConfig) {
				self._pausedTimeDiff = Date.now() - self._animateConfig[0].startTime;
				self.stop();
			}
		};

		/**
		 * Method resets startTime for each animations to current time
		 * @private
		 * @param {*} animateConfig
		 */
		function resetStartTimeForAnimateConfig(animateConfig) {
			var i,
				len;

			if (animateConfig) {
				len = animateConfig.length;
				for (i = 0; i < len; i++) {
					animateConfig[i].startTime = Date.now();
				}
			}
		}

		/**
		 * Reset animations to initial position
		 */
		prototype.reset = function () {
			var self = this,
				restart = self.active;

			if (restart) {
				self.stop();
			}

			self._initAnimate();
			resetStartTimeForAnimateConfig(self._animateConfig);
			self._pausedTimeDiff = 0;
			self._animate.chainIndex = 0;

			self._calculateAnimate();

			if (restart) {
				self.start();
			}
		}

		function calculateOption(option, time) {
			var timeDiff,
				current = null;

			if (option && option.startTime <= time) {
			// if option is not delayed
				timeDiff = time - option.startTime;

				if (timeDiff >= option.duration) {
					// if current is bigger then end we finish loop and we take next animate from chain
					timeDiff = option.duration;
					if (option.callback) {
						option.callback();
					}
				}

				if (option.duration > 0) {
					option.progress = timeDiff / option.duration;
					current = option.calculate(
						option.timing(timeDiff / option.duration),
						option.diff,
						option.from,
						option.current
					);
				}

				if (current !== null) {
					option.current = current;
					// we set next calculation time
					option.propertyObject[option.simpleProperty] = option.current;
					if (timeDiff >= option.duration) {
						// inform about remove animation config
						return 2;
					}
					// inform widget about redraw
					return 1;
				}

				if (timeDiff >= option.duration) {
					// inform about remove animation config
					return 2;
				}
			}
			return 0;
		}

		/**
		 * Method called in loop to calculate current state of animation
		 * @param {Function} callback
		 * @private
		 */
		prototype._calculateAnimate = function (callback) {
			var self = this,
				// current animation config
				animateConfig = self._animateConfig,
				// number of animations which is not finished
				notFinishedAnimationsCount,
				// flag inform that redraw is necessary
				redraw = false,
				i = 0,
				length,
				time = Date.now(),
				calculatedOption;

			if (animateConfig) {
				notFinishedAnimationsCount = animateConfig.length;
				length = animateConfig.length;

				// calculating options changed in animation
				while (i < length) {
					if (animateConfig[i].duration > 0) {
						calculatedOption = calculateOption(animateConfig[i], time);
						if (calculatedOption === 2) {
							notFinishedAnimationsCount--;
							// remove current config and recalculate loop arguments
							animateConfig.splice(i, 1);
							length--;
							i--;
							redraw = true;
						} else if (calculatedOption === 1) {
							redraw = true;
						}
					} else {
						notFinishedAnimationsCount--;
					}
					i++;
				}
				// redraw is necessary
				if (redraw && self._tickFunction) {
					self._tickFunction(self._object);
				}
				if (notFinishedAnimationsCount) {
					// setting next loop state
					if (self._animationTimeout) {
						requestAnimationFrame(self._animationTimeout);
					}
				} else {
					// Animation state can be change to "stopped"
					self.stop();
					// animation is finished
					if (callback) {
						callback();
					}
				}
			}
		};

		/**
		 * Set function which will be called after animation change property of object
		 * @param {Function} tickFunction
		 * @return {Animation}
		 */
		prototype.tick = function (tickFunction) {
			var oldTickFunction = this._tickFunction;

			if (oldTickFunction) {
				this._tickFunction = function (object) {
					oldTickFunction(object);
					tickFunction(object);
				};
			} else {
				this._tickFunction = tickFunction;
			}
			return this;
		};

		utils.Animate = Animate;
		}(window, window.document, ns));


/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/* global window, define, ns, CustomEvent */
/*
 * @class ns.event.gesture
 */
(function (ns) {
	"use strict";
			var event = ns.event,
			gesture = function (elem, options) {
				return new ns.event.gesture.Instance(elem, options);
			};

			/**
			 * Default values for Gesture feature
			 * @property {Object} defaults
			 * @property {boolean} [defaults.triggerEvent=false]
			 * @property {number} [defaults.updateVelocityInterval=16]
			 * Interval in which Gesture recalculates current velocity in ms
			 * @property {number} [defaults.estimatedPointerTimeDifference=15]
			 * pause time threshold.. tune the number to up if it is slow
			 * @member ns.event.gesture
			 * @static
			 */
		gesture.defaults = {
			triggerEvent: false,
			updateVelocityInterval: 16,
			estimatedPointerTimeDifference: 15
		};

		/**
			 * Dictionary of orientation
			 * @property {Object} Orientation
			 * @property {1} Orientation.VERTICAL vertical orientation
			 * @property {2} Orientation.HORIZONTAL horizontal orientation
			 * @member ns.event.gesture
			 * @static
			 */
		gesture.Orientation = {
			VERTICAL: "vertical",
			HORIZONTAL: "horizontal"
		};

		/**
			 * Dictionary of direction
			 * @property {Object} Direction
			 * @property {1} Direction.UP up
			 * @property {2} Direction.DOWN down
			 * @property {3} Direction.LEFT left
			 * @property {4} Direction.RIGHT right
			 * @member ns.event.gesture
			 * @static
			 */
		gesture.Direction = {
			UP: "up",
			DOWN: "down",
			LEFT: "left",
			RIGHT: "right"
		};

		/**
			 * Dictionary of gesture events state
			 * @property {Object} Event
			 * @property {"start"} Event.START start
			 * @property {"move"} Event.MOVE move
			 * @property {"end"} Event.END end
			 * @property {"cancel"} Event.CANCEL cancel
			 * @property {"blocked"} Event.BLOCKED blocked
			 * @member ns.event.gesture
			 * @static
			 */
		gesture.Event = {
			START: "start",
			MOVE: "move",
			END: "end",
			CANCEL: "cancel",
			BLOCKED: "blocked"
		};

		/**
			 * Dictionary of gesture events flags
			 * @property {Object} Result
			 * @property {number} [Result.PENDING=1] is pending
			 * @property {number} [Result.RUNNING=2] is running
			 * @property {number} [Result.FINISHED=4] is finished
			 * @property {number} [Result.BLOCK=8] is blocked
			 * @member ns.event.gesture
			 * @static
			 */
		gesture.Result = {
			PENDING: 1,
			RUNNING: 2,
			FINISHED: 4,
			BLOCK: 8
		};

		/**
			 * Create plugin namespace.
			 * @property {Object} plugin
			 * @member ns.event.gesture
			 * @static
			 */
		gesture.plugin = {};

		/**
			 * Create object of Detector
			 * @method createDetector
			 * @param {string} gesture
			 * @param {HTMLElement} eventSender
			 * @param {Object} options
			 * @return {ns.event.gesture.Gesture}
			 * @member ns.event.gesture
			 * @static
			 */
		gesture.createDetector = function (gesture, eventSender, options) {
			if (!gesture.plugin[gesture]) {
				throw gesture + " gesture is not supported";
			}
			return new gesture.plugin[gesture](eventSender, options);
		};

		event.gesture = gesture;
		}(ns));

/*global ns, window, define */
/*jslint nomen: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Gesture Utilities
 * Contains helper function to gesture support.
 * @class ns.event.gesture.utils
 */
(function (ns, math) {
	"use strict";
	
		/**
			 * Local alias for {@link ns.event.gesture}
			 * @property {Object}
			 * @member ns.event.gesture.utils
			 * @private
			 * @static
			 */
			var gesture = ns.event.gesture;

			gesture.utils = {

			/**
				 * Get center from array of touches
				 * @method getCenter
				 * @param {Event[]} touches description
				 * @member ns.event.gesture.utils
				 * @return {Object} position
				 * @return {number} return.clientX position X
				 * @return {number} return.clientY position Y
				 */
				getCenter: function (touches) {
					var valuesX = [],
						valuesY = [];

					[].forEach.call(touches, function (touch) {
					// I prefer clientX because it ignore the scrolling position
						valuesX.push(!isNaN(touch.clientX) ? touch.clientX : touch.pageX);
						valuesY.push(!isNaN(touch.clientY) ? touch.clientY : touch.pageY);
					});

					return {
						clientX: (math.min.apply(math, valuesX) + math.max.apply(math, valuesX)) / 2,
						clientY: (math.min.apply(math, valuesY) + math.max.apply(math, valuesY)) / 2
					};
				},

			/**
				 * Get velocity
				 * @method getVelocity
				 * @param {number} deltaTime Delta of time
				 * @param {number} deltaX Position change on x axis
				 * @param {number} deltaY Position change on y axis
				 * @return {Object} velocity
				 * @return {number} return.x velocity on X axis
				 * @return {number} return.y velocity on Y axis
				 * @member ns.event.gesture.utils
				 */
				getVelocity: function (deltaTime, deltaX, deltaY) {
					return {
						x: math.abs(deltaX / deltaTime) || 0,
						y: math.abs(deltaY / deltaTime) || 0
					};
				},

			/**
				 * Get angel between position of two touches
				 * @method getAngle
				 * @param {Event} touch1 first touch
				 * @param {Event} touch2 second touch
				 * @return {number} angel (deg)
				 * @member ns.event.gesture.utils
				 */
				getAngle: function (touch1, touch2) {
					var y = touch2.clientY - touch1.clientY,
						x = touch2.clientX - touch1.clientX;

					return math.atan2(y, x) * 180 / math.PI;
				},

			/**
				 * Get direction indicated by position of two touches
				 * @method getDirection
				 * @param {Event} touch1 first touch
				 * @param {Event} touch2 second touch
				 * @return {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN}
				 * @member ns.event.gesture.utils
				 */
				getDirection: function (touch1, touch2) {
					var x = math.abs(touch1.clientX - touch2.clientX),
						y = math.abs(touch1.clientY - touch2.clientY);

					if (x >= y) {
						return touch1.clientX - touch2.clientX > 0 ? gesture.Direction.LEFT : gesture.Direction.RIGHT;
					}
					return touch1.clientY - touch2.clientY > 0 ? gesture.Direction.UP : gesture.Direction.DOWN;
				},

			/**
				 * Get distance indicated by position of two touches
				 * @method getDistance
				 * @param {Event} touch1 first touch
				 * @param {Event} touch2 second touch
				 * @return {number} distance
				 * @member ns.event.gesture.utils
				 */
				getDistance: function (touch1, touch2) {
					var x = touch2.clientX - touch1.clientX,
						y = touch2.clientY - touch1.clientY;

					return math.sqrt((x * x) + (y * y));
				},

			/**
				 * Get scale indicated by position of the first and the last touch
				 * @method getScale
				 * @param {Event} start start touch
				 * @param {Event} end end touch
				 * @return {number} scale
				 * @member ns.event.gesture.utils
				 */
				getScale: function (start, end) {
				// need two fingers...
					if (start.length >= 2 && end.length >= 2) {
						return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
					}
					return 1;
				},

			/**
				 * Get value of rotation indicated by position
				 * of the first and the last touch
				 * @method getRotation
				 * @param {Event} start start touch
				 * @param {Event} end end touch
				 * @return {number} angle (deg)
				 * @member ns.event.gesture.utils
				 */
				getRotation: function (start, end) {
				// need two fingers
					if (start.length >= 2 && end.length >= 2) {
						return this.getAngle(end[1], end[0]) -
							this.getAngle(start[1], start[0]);
					}
					return 0;
				},

			/**
				 * Check if the direction is vertical
				 * @method isVertical
				 * @param {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN} direction start touch
				 * @return {boolean}
				 * @member ns.event.gesture.utils
				 */
				isVertical: function (direction) {
					return direction === gesture.Direction.UP || direction === gesture.Direction.DOWN;
				},

			/**
				 * Check if the direction is horizontal
				 * @method isHorizontal
				 * @param {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN} direction start touch
				 * @return {boolean}
				 * @member ns.event.gesture.utils
				 */
				isHorizontal: function (direction) {
					return direction === gesture.Direction.LEFT || direction === gesture.Direction.RIGHT;
				},

			/**
				 * Check if the direction is horizontal
				 * @method getOrientation
				 * @param {ns.event.gesture.Direction.LEFT|ns.event.gesture.Direction.RIGHT|ns.event.gesture.Direction.UP|ns.event.gesture.Direction.DOWN} direction
				 * @return {boolean}
				 * @member ns.event.gesture.utils
				 */
				getOrientation: function (direction) {
					return this.isVertical(direction) ? gesture.Orientation.VERTICAL : gesture.Orientation.HORIZONTAL;
				}
			};
		}(ns, window.Math));

/*global ns, window, define */
/*jslint nomen: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Gesture.Detector class
 * Base class for create detectors in gestures.
 *
 * @class ns.event.gesture.Detector
 */
(function (ns) {
	"use strict";
				var gesture = ns.event.gesture,

				objectMerge = ns.util.object.merge,

				Detector = function (strategy, sender) {
					this.sender = sender;
					this.strategy = strategy.create();
					this.name = this.strategy.name;
					this.index = this.strategy.index || 100;
					this.options = this.strategy.options || {};
				};

			/**
			 * Start of gesture detection of given type
			 * @method detect
			 * @param {string} gestureEvent
			 * @return {Object}
			 * @member ns.event.gesture.Detector
			 */
			Detector.prototype.detect = function (gestureEvent) {
				return this.strategy.handler(gestureEvent, this.sender, this.strategy.options);
			};

			Detector.Sender = {
				sendEvent: function () {
				// Empty function for creating interface
				}
			};

		/**
			 * Create plugin namespace.
			 * @property {Object} plugin
			 * @member ns.event.gesture.Detector
			 */
			Detector.plugin = {};

		/**
			 * Methods creates plugin
			 * @method create
			 * @param {Object} gestureHandler
			 * @return {ns.event.gesture.Detector} gestureHandler
			 * @member ns.event.gesture.Detector.plugin
			 */
			Detector.plugin.create = function (gestureHandler) {
				var detector;

				if (!gestureHandler.types) {
					gestureHandler.types = [gestureHandler.name];
				}

				detector = function (options) {
					this.options = objectMerge({}, gestureHandler.defaults, options);
				};

				detector.prototype.create = function () {
					return objectMerge({
						options: this.options
					}, gestureHandler);
				};

				Detector.plugin[gestureHandler.name] = detector;

				return detector;
			};

		// definition
			gesture.Detector = Detector;

		}(ns));

/*global ns, define */
/*jslint nomen: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Gesture.Manager class
 * Main class controls all gestures.
 * @class ns.event.gesture.Manager
 */
(function (ns, window, document) {
	"use strict";
	
		/**
		 * Local alias for {@link ns.event.gesture}
		 * @property {Object}
		 * @member ns.event.gesture.Manager
		 * @private
		 * @static
		 */
		var gesture = ns.event.gesture,

			gestureUtils = gesture.utils,

			utilObject = ns.util.object,

			instance = null,

			touchCheck = /touch/,

			Manager = function () {
				var self = this;

				self.instances = [];
				self.gestureDetectors = [];
				self.runningDetectors = [];
				self.detectorRequestedBlock = null;

				self.unregisterBlockList = [];

				self.gestureEvents = {};
				self.velocity = null;

				self._isReadyDetecting = false;
				self._blockMouseEvent = false;
				self.touchSupport = "ontouchstart" in window;
			};

		function sortInstances(a, b) {
			if (a.index < b.index) {
				return -1;
			} else if (a.index > b.index) {
				return 1;
			}
			return 0;
		}

		Manager.prototype = {
			/**
			 * Bind start events
			 * @method _bindStartEvents
			 * @param {ns.event.gesture.Instance} _instance gesture instance
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_bindStartEvents: function (_instance) {
				var element = _instance.getElement();

				if (this.touchSupport) {
					element.addEventListener("touchstart", this, {passive: false});
				} else {
					element.addEventListener("mousedown", this, false);
				}
			},

			/**
			 * Bind move, end and cancel events
			 * @method _bindEvents
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_bindEvents: function () {
				var self = this;

				if (self.touchSupport) {
					document.addEventListener("touchmove", self, {passive: false});
					document.addEventListener("touchend", self, {passive: false});
					document.addEventListener("touchcancel", self, {passive: false});
				} else {
					document.addEventListener("mousemove", self);
					document.addEventListener("mouseup", self);
				}
			},

			/**
			 * Unbind start events
			 * @method _unbindStartEvents
			 * @param {ns.event.gesture.Instance} _instance gesture instance
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_unbindStartEvents: function (_instance) {
				var element = _instance.getElement();

				if (this.touchSupport) {
					element.removeEventListener("touchstart", this, {passive: false});
				} else {
					element.removeEventListener("mousedown", this, false);
				}
			},

			/**
			 * Unbind move, end and cancel events
			 * @method _bindEvents
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_unbindEvents: function () {
				var self = this;

				if (self.touchSupport) {
					document.removeEventListener("touchmove", self, {passive: false});
					document.removeEventListener("touchend", self, {passive: false});
					document.removeEventListener("touchcancel", self, {passive: false});
				} else {
					document.removeEventListener("mousemove", self, false);
					document.removeEventListener("mouseup", self, false);
				}
			},

			/**
			 * Detect that event should be processed by handleEvent
			 * @param {Event} event Input event object
			 * @return {null|string}
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_detectEventType: function (event) {
				var eventType = event.type;

				if (eventType.match(touchCheck)) {
					this._blockMouseEvent = true;
				} else {
					if (this._blockMouseEvent || event.which !== 1) {
						return null;
					}
				}
				return eventType;
			},

			/**
			 * Handle event
			 * @method handleEvent
			 * @param {Event} event
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			handleEvent: function (event) {
				var self = this,
					eventType = self._detectEventType(event);

				switch (eventType) {
					case "mousedown":
					case "touchstart":
						self._start(event);
						break;
					case "mousemove":
					case "touchmove":
						self._move(event);
						break;
					case "mouseup":
					case "touchend":
						self._end(event);
						break;
					case "touchcancel":
						self._cancel(event);
						break;
				}
			},

			/**
			 * Handler for gesture start
			 * @method _start
			 * @param {Event} event
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_start: function (event) {
				var self = this,
					element = event.currentTarget,
					startEvent = {},
					detectors = [];

				if (!self._isReadyDetecting) {
					self.resetDetecting();
					self._bindEvents();

					startEvent = self._createDefaultEventData(gesture.Event.START, event);

					self.gestureEvents = {
						start: startEvent,
						last: startEvent
					};

					self.velocity = {
						event: startEvent,
						x: 0,
						y: 0
					};

					startEvent = utilObject.fastMerge(startEvent,
						self._createGestureEvent(gesture.Event.START, event));
					self._isReadyDetecting = true;
				}

				self.instances.forEach(function (_instance) {
					if (_instance.getElement() === element) {
						detectors = detectors.concat(_instance.getGestureDetectors());
					}
				}, self);

				detectors.sort(sortInstances);

				self.gestureDetectors = self.gestureDetectors.concat(detectors);

				self._detect(detectors, startEvent);
			},

			/**
			 * Handler for gesture move
			 * @method _move
			 * @param {Event} event
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_move: function (event) {
				var newEvent,
					self = this;

				if (self._isReadyDetecting) {
					newEvent = self._createGestureEvent(gesture.Event.MOVE, event);
					self._detect(self.gestureDetectors, newEvent);
					self.gestureEvents.last = newEvent;
				}
			},

			/**
			 * Handler for gesture end
			 * @method _end
			 * @param {Event} event
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_end: function (event) {
				var self = this,
					newEvent = utilObject.merge(
						{},
						self.gestureEvents.last,
						self._createDefaultEventData(gesture.Event.END, event)
					);

				if (newEvent.pointers.length === 0) {
					self._detect(self.gestureDetectors, newEvent);

					self.unregisterBlockList.forEach(function (_instance) {
						this.unregister(_instance);
					}, self);

					self.resetDetecting();
					self._blockMouseEvent = false;
				}
			},

			/**
			 * Handler for gesture cancel
			 * @method _cancel
			 * @param {Event} event
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_cancel: function (event) {
				var self = this;

				event = utilObject.merge(
					{},
					self.gestureEvents.last,
					self._createDefaultEventData(gesture.Event.CANCEL, event)
				);

				self._detect(self.gestureDetectors, event);

				self.unregisterBlockList.forEach(function (_instance) {
					this.unregister(_instance);
				}, self);

				self.resetDetecting();
				self._blockMouseEvent = false;
			},

			/**
			 * Detect gesture
			 * @method _detect
			 * @param {Array} detectors
			 * @param {Event} event
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_detect: function (detectors, event) {
				var self = this,
					finishedDetectors = [];

				detectors.forEach(function (detector) {
					var result;

					if (!self.detectorRequestedBlock) {
						result = detector.detect(event);
						if ((result & gesture.Result.RUNNING) &&
								self.runningDetectors.indexOf(detector) < 0) {
							self.runningDetectors.push(detector);
						}
						if (result & gesture.Result.FINISHED) {
							finishedDetectors.push(detector);
						}
						if (result & gesture.Result.BLOCK) {
							self.detectorRequestedBlock = detector;
						}
					}
				});

				// remove finished detectors.
				finishedDetectors.forEach(function (detector) {
					var idx = self.gestureDetectors.indexOf(detector);

					if (idx > -1) {
						self.gestureDetectors.splice(idx, 1);
					}
					idx = self.runningDetectors.indexOf(detector);
					if (idx > -1) {
						self.runningDetectors.splice(idx, 1);
					}
				});

				// remove all detectors except the detector that return block result
				if (self.detectorRequestedBlock) {
					// send to cancel event.
					self.runningDetectors.forEach(function (detector) {
						var cancelEvent = utilObject.fastMerge({}, event);

						cancelEvent.eventType = gesture.Event.BLOCKED;
						detector.detect(cancelEvent);
					});
					self.runningDetectors.length = 0;
					self.gestureDetectors.length = 0;
					if (finishedDetectors.indexOf(self.detectorRequestedBlock) < 0) {
						self.gestureDetectors.push(self.detectorRequestedBlock);
					}
				}
			},

			/**
			 * Reset of gesture manager detector
			 * @method resetDetecting
			 * @member ns.event.gesture.Manager
			 * @public
			 */
			resetDetecting: function () {
				var self = this;

				self._isReadyDetecting = false;

				self.gestureDetectors.length = 0;
				self.runningDetectors.length = 0;
				self.detectorRequestedBlock = null;

				self.gestureEvents = {};
				self.velocity = null;

				self._unbindEvents();
			},

			/**
			 * Create default event data
			 * @method _createDefaultEventData
			 * @param {string} type event type
			 * @param {Event} event source event
			 * @return {Object} default event data
			 * @return {string} return.eventType
			 * @return {number} return.timeStamp
			 * @return {Touch} return.pointer
			 * @return {TouchList} return.pointers
			 * @return {Event} return.srcEvent
			 * @return {Function} return.preventDefault
			 * @return {Function} return.stopPropagation
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_createDefaultEventData: function (type, event) {
				var pointers = event.touches;

				if (!pointers) {
					if (event.type === "mouseup") {
						pointers = [];
					} else {
						event.identifier = 1;
						pointers = [event];
					}
				}

				return {
					eventType: type,
					timeStamp: Date.now(),
					pointer: pointers[0],
					pointers: pointers,

					srcEvent: event,
					preventDefault: event.preventDefault.bind(event),
					stopPropagation: event.stopPropagation.bind(event)
				};
			},

			/**
			 * Create gesture event
			 * @method _createGestureEvent
			 * @param {string} type event type
			 * @param {Event} event source event
			 * @return {Object} gesture event consist from Event class and additional properties
			 * @return {number} return.deltaTime
			 * @return {number} return.deltaX
			 * @return {number} return.deltaY
			 * @return {number} return.velocityX
			 * @return {number} return.velocityY
			 * @return {number} return.estimatedX
			 * @return {number} return.estimatedY
			 * @return {number} return.estimatedDeltaX
			 * @return {number} return.estimatedDeltaY
			 * @return {number} return.distance
			 * @return {number} return.angle
			 * @return {number} return.direction
			 * @return {number} return.scale
			 * @return {number} return.rotation (deg)
			 * @return {Event} return.startEvent
			 * @return {Event} return.lastEvent
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_createGestureEvent: function (type, event) {
				var self = this,
					defaultEvent = self._createDefaultEventData(type, event),
					startEvent = self.gestureEvents.start,
					lastEvent = self.gestureEvents.last,
					velocity = self.velocity,
					velocityEvent = velocity.event,
					delta = {
						time: defaultEvent.timeStamp - startEvent.timeStamp,
						x: defaultEvent.pointer.clientX - startEvent.pointer.clientX,
						y: defaultEvent.pointer.clientY - startEvent.pointer.clientY
					},
					deltaFromLast = {
						x: defaultEvent.pointer.clientX - lastEvent.pointer.clientX,
						y: defaultEvent.pointer.clientY - lastEvent.pointer.clientY
					},
					/* pause time threshold.util. tune the number to up if it is slow */
					timeDifference = gesture.defaults.estimatedPointerTimeDifference,
					estimated;

				// reset start event for multi touch
				if (startEvent && defaultEvent.pointers.length !== startEvent.pointers.length) {
					startEvent.pointers = Array.prototype.slice.call(defaultEvent.pointers);
				}

				if (defaultEvent.timeStamp - velocityEvent.timeStamp >
						gesture.defaults.updateVelocityInterval) {
					utilObject.fastMerge(velocity, gestureUtils.getVelocity(
						defaultEvent.timeStamp - velocityEvent.timeStamp,
						defaultEvent.pointer.clientX - velocityEvent.pointer.clientX,
						defaultEvent.pointer.clientY - velocityEvent.pointer.clientY
					));
					velocity.event = defaultEvent;
				}

				estimated = {
					x: Math.round(defaultEvent.pointer.clientX +
							(timeDifference * velocity.x * (deltaFromLast.x < 0 ? -1 : 1))),
					y: Math.round(defaultEvent.pointer.clientY +
							(timeDifference * velocity.y * (deltaFromLast.y < 0 ? -1 : 1)))
				};

				// Prevent that point goes back even though direction is not changed.
				if ((deltaFromLast.x < 0 && estimated.x > lastEvent.estimatedX) ||
						(deltaFromLast.x > 0 && estimated.x < lastEvent.estimatedX)) {
					estimated.x = lastEvent.estimatedX;
				}

				if ((deltaFromLast.y < 0 && estimated.y > lastEvent.estimatedY) ||
						(deltaFromLast.y > 0 && estimated.y < lastEvent.estimatedY)) {
					estimated.y = lastEvent.estimatedY;
				}

				utilObject.fastMerge(defaultEvent, {
					deltaTime: delta.time,
					deltaX: delta.x,
					deltaY: delta.y,

					velocityX: velocity.x,
					velocityY: velocity.y,

					estimatedX: estimated.x,
					estimatedY: estimated.y,
					estimatedDeltaX: estimated.x - startEvent.pointer.clientX,
					estimatedDeltaY: estimated.y - startEvent.pointer.clientY,

					distance: gestureUtils.getDistance(startEvent.pointer, defaultEvent.pointer),

					angle: gestureUtils.getAngle(startEvent.pointer, defaultEvent.pointer),

					direction: gestureUtils.getDirection(startEvent.pointer, defaultEvent.pointer),

					scale: gestureUtils.getScale(startEvent.pointers, defaultEvent.pointers),
					rotation: gestureUtils.getRotation(startEvent.pointers, defaultEvent.pointers),

					startEvent: startEvent,
					lastEvent: lastEvent
				});

				return defaultEvent;
			},

			/**
			 * Register instance of gesture
			 * @method register
			 * @param {ns.event.gesture.Instance} instance gesture instance
			 * @member ns.event.gesture.Manager
			 */
			register: function (instance) {
				var self = this,
					idx = self.instances.indexOf(instance);

				if (idx < 0) {
					self.instances.push(instance);
					self._bindStartEvents(instance);
				}
			},

			/**
			 * Unregister instance of gesture
			 * @method unregister
			 * @param {ns.event.gesture.Instance} instance gesture instance
			 * @member ns.event.gesture.Manager
			 */
			unregister: function (instance) {
				var idx,
					self = this;

				if (self.gestureDetectors.length) {
					self.unregisterBlockList.push(instance);
				} else {
					idx = self.instances.indexOf(instance);
					if (idx > -1) {
						self.instances.splice(idx, 1);
						self._unbindStartEvents(instance);
					}

					if (!self.instances.length) {
						self._destroy();
					}
				}
			},

			/**
			 * Destroy instance of Manager
			 * @method _destroy
			 * @member ns.event.gesture.Manager
			 * @protected
			 */
			_destroy: function () {
				var self = this;

				self.resetDetecting();
				self.instances.length = 0;
				self.unregisterBlockList.length = 0;
				self._blockMouseEvent = false;
				instance = null;
			}

		};

		Manager.getInstance = function () {
			if (!instance) {
				instance = new Manager();
			}
			return instance;
		};

		gesture.Manager = Manager;
		}(ns, window, window.document));

/*global ns, window, define */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
(function (ns) {
	"use strict";
			/**
			 * Local alias for {@link ns.event.gesture}
			 * @property {Object}
			 * @member ns.event.gesture.Instance
			 * @private
			 * @static
			 */
			var gesture = ns.event.gesture,
			/**
				 * Local alias for {@link ns.event.gesture.Detector}
				 * @property {Object}
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				Detector = gesture.Detector,
			/**
				 * Local alias for {@link ns.event.gesture.Manager}
				 * @property {Object}
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				Manager = gesture.Manager,
			/**
				 * Local alias for {@link ns.event}
				 * @property {Object}
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				events = ns.event,
			/**
				 * Alias for method {@link ns.util.object.merge}
				 * @property {Function} merge
				 * @member ns.event.gesture.Instance
				 * @private
				 * @static
				 */
				merge = ns.util.object.merge,

			/**
				 * #Gesture.Instance class
				 * Creates instance of gesture manager on element.
				 * @param {HTMLElement} element
				 * @param {Object} options
				 * @class ns.event.gesture.Instance
				 */
				Instance = function (element, options) {
					this.element = element;
					this.eventDetectors = [];
					this.options = merge({}, gesture.defaults, options);

					this.gestureManager = Manager.getInstance();
					this.eventSender = merge({}, Detector.Sender, {
						sendEvent: this.trigger.bind(this)
					});
				};

			Instance.prototype = {
			/**
				 * Set options
				 * @method setOptions
				 * @param {Object} options options
				 * @return {ns.event.gesture.Instance}
				 * @member ns.event.gesture.Instance
				 */
				setOptions: function (options) {
					merge(this.options, options);
					return this;
				},

			/**
				 * Add detector
				 * @method addDetector
				 * @param {Object} detectorStrategy strategy
				 * @return {ns.event.gesture.Instance}
				 * @member ns.event.gesture.Instance
				 */
				addDetector: function (detectorStrategy) {
					var detector = new Detector(detectorStrategy, this.eventSender),
						alreadyHasDetector = !!this.eventDetectors.length;

					this.eventDetectors.push(detector);

					if (!!this.eventDetectors.length && !alreadyHasDetector) {
						this.gestureManager.register(this);
					}

					return this;
				},

			/**
				 * Remove detector
				 * @method removeDetector
				 * @param {Object} detectorStrategy strategy
				 * @return {ns.event.gesture.Instance}
				 * @member ns.event.gesture.Instance
				 */
				removeDetector: function (detectorStrategy) {
					var idx = this.eventDetectors.indexOf(detectorStrategy);

					if (idx > -1) {
						this.eventDetectors.splice(idx, 1);
					}

					if (!this.eventDetectors.length) {
						this.gestureManager.unregister(this);
					}

					return this;
				},

			/**
				 * Triggers the gesture event
				 * @method trigger
				 * @param {string} gestureName gestureName name
				 * @param {Object} eventInfo data provided to event object
				 * @member ns.event.gesture.Instance
				 */
				trigger: function (gestureName, eventInfo) {
					return events.trigger(this.element, gestureName, eventInfo, false);
				},

			/**
				 * Get HTML element assigned to gesture event instance
				 * @method getElement
				 * @member ns.event.gesture.Instance
				 */
				getElement: function () {
					return this.element;
				},

			/**
				 * Get gesture event detectors assigned to instance
				 * @method getGestureDetectors
				 * @member ns.event.gesture.Instance
				 */
				getGestureDetectors: function () {
					return this.eventDetectors;
				},

			/**
				 * Destroy instance
				 * @method destroy
				 * @member ns.event.gesture.Instance
				 */
				destroy: function () {
					this.element = null;
					this.eventHandlers = {};
					this.gestureManager = null;
					this.eventSender = null;
					this.eventDetectors.length = 0;
				}
			};

			gesture.Instance = Instance;

		}(ns));

/*global ns, window, define */
/*jslint nomen: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * # Gesture Plugin: drag
 * Plugin enables drag event.
 *
 * @class ns.event.gesture.Drag
 */
(function (ns, window, tizen) {
	"use strict";
	
		/**
			 * Local alias for {@link ns.event.gesture}
			 * @property {Object}
			 * @member ns.event.gesture.Drag
			 * @private
			 * @static
			 */
			var gesture = ns.event.gesture,
			/**
				 * Local alias for {@link ns.event.gesture.Detector}
				 * @property {Object}
				 * @member ns.event.gesture.Drag
				 * @private
				 * @static
				 */
				gestureUtils = gesture.utils,

				Detector = gesture.Detector,
			/**
				 * Alias for method {@link ns.util.object.merge}
				 * @property {Function} merge
				 * @member ns.event.gesture.Drag
				 * @private
				 * @static
				 */
				merge = ns.util.object.merge,

				eventNames = {
					start: "dragstart",
					drag: "drag",
					end: "dragend",
					cancel: "dragcancel",
					prepare: "dragprepare"
				},

			// TODO UA test will move to support.
				isTizenWebkit2Browser = !!window.navigator.userAgent.match(/tizen/i) && (function () {
					var result = true,
						version;

					if (tizen && tizen.systeminfo && tizen.systeminfo.getCapability) {
						try {
							version = tizen.systeminfo.getCapability("http://tizen.org/feature/platform.version");
							return version < "3.0";
						} catch (error) {
							ns.error("Error name: " + error.name + ", message: " + error.message);
						}
					}
					return result;
				})(),

				isChromeBrowser = window.navigator.userAgent.indexOf("Chrome") > -1,

				RESULTS = gesture.Result,

				Drag = Detector.plugin.create({

				/**
					 * Gesture name
					 * @property {string} [name="drag"]
					 * @member ns.event.gesture.Drag
					 */
					name: "drag",

				/**
					 * Gesture Index
					 * @property {number} [index=500]
					 * @member ns.event.gesture.Drag
					 */
					index: 500,

				/**
					 * Default values for drag gesture
					 * @property {Object} defaults
					 * @property {boolean} [defaults.blockHorizontal=false]
					 * @property {boolean} [defaults.blockVertical=false]
					 * @property {number} [defaults.threshold=20]
					 * @property {number} [defaults.delay=0]
					 * @member ns.event.gesture.Drag
					 */
					defaults: {
						blockHorizontal: false,
						blockVertical: false,
						threshold: 20,
						delay: 0
					},

				/**
					 * Triggered
					 * @property {boolean} [isTriggered=false]
					 * @member ns.event.gesture.Drag
					 */
					isTriggered: false,

				/**
					 * Handler for drag gesture
					 * @method handler
					 * @param {Event} gestureEvent gesture event
					 * @param {Object} sender event's sender
					 * @param {Object} options options
					 * @return {number}
					 * @member ns.event.gesture.Drag
					 */
					handler: function (gestureEvent, sender, options) {
						var newGestureEvent,
							threshold = options.threshold,
							result = RESULTS.PENDING,
							direction = gestureEvent.direction;

						if (!this.isTriggered && gestureEvent.eventType === gesture.Event.MOVE) {
							if (Math.abs(gestureEvent.deltaX) < threshold && Math.abs(gestureEvent.deltaY) < threshold) {
							// Branching statement for specifying Tizen 2.X and Tizen 3.0
								if (isChromeBrowser) {
									gestureEvent.preventDefault();
								}
								return RESULTS.PENDING;
							}

							if (options.delay && gestureEvent.deltaTime < options.delay) {
								if (!isTizenWebkit2Browser) {
									gestureEvent.preventDefault();
								}
								return RESULTS.PENDING;
							}

							if (options.blockHorizontal && gestureUtils.isHorizontal(gestureEvent.direction) ||
								options.blockVertical && gestureUtils.isVertical(gestureEvent.direction)) {
								return RESULTS.FINISHED;
							}

							this.fixedStartPointX = 0;
							this.fixedStartPointY = 0;
							if (gestureUtils.isHorizontal(gestureEvent.direction)) {
								this.fixedStartPointX = (gestureEvent.deltaX < 0 ? 1 : -1) * threshold;
							} else {
								this.fixedStartPointY = (gestureEvent.deltaY < 0 ? 1 : -1) * threshold;
							}
						}

						if (options.blockHorizontal) {
							direction = gestureEvent.deltaY < 0 ? gesture.Direction.UP : gesture.Direction.DOWN;
						}

						if (options.blockVertical) {
							direction = gestureEvent.deltaX < 0 ? gesture.Direction.LEFT : gesture.Direction.RIGHT;
						}

						newGestureEvent = merge({}, gestureEvent, {
							deltaX: gestureEvent.deltaX + this.fixedStartPointX,
							deltaY: gestureEvent.deltaY + this.fixedStartPointY,
							estimatedDeltaX: gestureEvent.estimatedDeltaX + this.fixedStartPointX,
							estimatedDeltaY: gestureEvent.estimatedDeltaY + this.fixedStartPointY,

							direction: direction
						});

						switch (newGestureEvent.eventType) {
							case gesture.Event.START:
								this.isTriggered = false;
								if (sender.sendEvent(eventNames.prepare, newGestureEvent) === false) {
									result = RESULTS.FINISHED;
								}
								break;
							case gesture.Event.MOVE:
								if (!this.isTriggered && sender.sendEvent(eventNames.start, newGestureEvent) === false) {
									newGestureEvent.preventDefault();
								}
								result = sender.sendEvent(eventNames.drag, newGestureEvent) ? RESULTS.RUNNING : RESULTS.FINISHED;
								if (result === false) {
									newGestureEvent.preventDefault();
								}
								this.isTriggered = true;
								break;

							case gesture.Event.BLOCKED:
							case gesture.Event.END:
								result = RESULTS.FINISHED;
								if (this.isTriggered) {
									if (sender.sendEvent(eventNames.end, newGestureEvent) === false) {
										newGestureEvent.preventDefault();
									}
									this.isTriggered = false;
								}
								break;

							case gesture.Event.CANCEL:
								result = RESULTS.FINISHED;
								if (this.isTriggered) {
									if (sender.sendEvent(eventNames.cancel, newGestureEvent) === false) {
										newGestureEvent.preventDefault();
									}
									this.isTriggered = false;
								}
								break;
						}

						return result;
					}
				});

			ns.event.gesture.Drag = Drag;
		}(ns, window, window.tizen));

/*global CustomEvent, define, window, ns */
/*jslint plusplus: true, nomen: true, bitwise: true */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Virtual Mouse Events
 * Reimplementation of jQuery Mobile virtual mouse events.
 *
 * ##Purpose
 * It will let for users to register callbacks to the standard events like bellow,
 * without knowing if device support touch or mouse events
 * @class ns.event.vmouse
 */
/**
 * Triggered after mouse-down or touch-started.
 * @event vmousedown
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-click or touch-end when touch-move didn't occur
 * @event vclick
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-up or touch-end
 * @event vmouseup
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-move or touch-move
 * @event vmousemove
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-over or touch-start if went over coordinates
 * @event vmouseover
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-out or touch-end
 * @event vmouseout
 * @member ns.event.vmouse
 */
/**
 * Triggered when mouse-cancel or touch-cancel and when scroll occur during touchmove
 * @event vmousecancel
 * @member ns.event.vmouse
 */
(function (window, document, ns) {
	"use strict";
				/**
			 * Object with default options
			 * @property {Object} vmouse
			 * @member ns.event.vmouse
			 * @static
			 * @private
			 **/
			var vmouse,
				/**
				 * @property {Object} eventProps Contains the properties which are copied from the original
				 * event to custom v-events
				 * @member ns.event.vmouse
				 * @static
				 * @private
				 **/
				eventProps,
				/**
				 * Indicates if the browser support touch events
				 * @property {boolean} touchSupport
				 * @member ns.event.vmouse
				 * @static
				 **/
				touchSupport = window.hasOwnProperty("ontouchstart"),
				/**
				 * @property {boolean} didScroll The flag tell us if the scroll event was triggered
				 * @member ns.event.vmouse
				 * @static
				 * @private
				 **/
				didScroll,
				/** @property {HTMLElement} lastOver holds reference to last element that touch was over
				 * @member ns.event.vmouse
				 * @private
				 */
				lastOver = null,
				/**
				 * @property {number} [startX=0] Initial data for touchstart event
				 * @member ns.event.vmouse
				 * @static
				 * @private
				 **/
				startX = 0,
				/**
				 * @property {number} [startY=0] Initial data for touchstart event
				 * @member ns.event.vmouse
				 * @private
				 * @static
				 **/
				startY = 0,
				touchEventProps = ["clientX", "clientY", "pageX", "pageY", "screenX", "screenY"],
				KEY_CODES = {
					enter: 13
				};

			/**
			 * Extends objects with other objects
			 * @method copyProps
			 * @param {Object} from Sets the original event
			 * @param {Object} to Sets the new event
			 * @param {Object} properties Sets the special properties for position
			 * @param {Object} propertiesNames Describe parameters which will be copied from Original to
			 * event
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function copyProps(from, to, properties, propertiesNames) {
				var i,
					length,
					descriptor,
					property;

				for (i = 0, length = propertiesNames.length; i < length; ++i) {
					property = propertiesNames[i];
					if (isNaN(properties[property]) === false || isNaN(from[property]) === false) {
						descriptor = Object.getOwnPropertyDescriptor(to, property);
						if (property !== "detail" && (!descriptor || descriptor.writable)) {
							to[property] = properties[property] || from[property];
						}
					}
				}
			}

			/**
			 * Create custom event
			 * @method createEvent
			 * @param {string} newType gives a name for the new Type of event
			 * @param {Event} original Event which trigger the new event
			 * @param {Object} properties Sets the special properties for position
			 * @return {Event}
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function createEvent(newType, original, properties) {
				var evt = new CustomEvent(newType, {
						"bubbles": original.bubbles,
						"cancelable": original.cancelable,
						"detail": original.detail
					}),
					originalType = original.type,
					changeTouches,
					touch,
					j = 0,
					len,
					prop;

				copyProps(original, evt, properties, eventProps);
				evt._originalEvent = original;

				if (originalType.indexOf("touch") !== -1) {
					originalType = original.touches;
					changeTouches = original.changedTouches;

					if (originalType && originalType.length) {
						touch = originalType[0];
					} else {
						touch = (changeTouches && changeTouches.length) ? changeTouches[0] : null;
					}

					if (touch) {
						for (len = touchEventProps.length; j < len; j++) {
							prop = touchEventProps[j];
							evt[prop] = touch[prop];
						}
					}
				}

				return evt;
			}

			/**
			 * Dispatch Events
			 * @method fireEvent
			 * @param {string} eventName event name
			 * @param {Event} evt original event
			 * @param {Object} [properties] Sets the special properties for position
			 * @return {boolean}
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function fireEvent(eventName, evt, properties) {
				return evt.target.dispatchEvent(createEvent(eventName, evt, properties || {}));
			}

			eventProps = [
				"currentTarget",
				"detail",
				"button",
				"buttons",
				"clientX",
				"clientY",
				"offsetX",
				"offsetY",
				"pageX",
				"pageY",
				"screenX",
				"screenY",
				"toElement",
				"which"
			];

			vmouse = {
				/**
				 * Sets the distance of pixels after which the scroll event will be successful
				 * @property {number} [eventDistanceThreshold=10]
				 * @member ns.event.vmouse
				 * @static
				 */
				eventDistanceThreshold: 10,

				touchSupport: touchSupport
			};

			/**
			 * Handle click down
			 * @method handleDown
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleDown(evt) {
				fireEvent("vmousedown", evt);
			}

			/**
			 * Prepare position of event for keyboard events.
			 * @method preparePositionForClick
			 * @param {Event} event
			 * @return {?Object} options
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function preparePositionForClick(event) {
				var x = event.clientX,
					y = event.clientY;
				// event comes from keyboard

				if (!x && !y) {
					return preparePositionForEvent(event);
				}
				return null;
			}

			/**
			 * Handle click
			 * @method handleClick
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleClick(evt) {
				fireEvent("vclick", evt, preparePositionForClick(evt));
			}

			/**
			 * Handle click up
			 * @method handleUp
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleUp(evt) {
				fireEvent("vmouseup", evt);
			}

			/**
			 * Handle click move
			 * @method handleMove
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleMove(evt) {
				fireEvent("vmousemove", evt);
			}

			/**
			 * Handle click over
			 * @method handleOver
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleOver(evt) {
				fireEvent("vmouseover", evt);
			}

			/**
			 * Handle click out
			 * @method handleOut
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleOut(evt) {
				fireEvent("vmouseout", evt);
			}

			/**
			 * Handle touch start
			 * @method handleTouchStart
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchStart(evt) {
				var touches = evt.touches,
					firstTouch;

				//if touches are registered and we have only one touch
				if (touches && touches.length === 1) {
					didScroll = false;
					firstTouch = touches[0];
					startX = firstTouch.pageX || firstTouch.clientX || 0; // for touch converted from mouse event
					startY = firstTouch.pageY || firstTouch.clientX || 0; // for touch converted from mouse event

					// Check if we have touched something on our page
					// @TODO refactor for multi touch
					/*
					 over = document.elementFromPoint(startX, startY);
					 if (over) {
					 lastOver = over;
					 fireEvent("vmouseover", evt);
					 }
					 */
					fireEvent("vmousedown", evt);
				}

			}

			/**
			 * Handle touch end
			 * @method handleTouchEnd
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchEnd(evt) {
				var touches = evt.touches;

				if (touches && touches.length === 0) {
					fireEvent("vmouseup", evt);
					fireEvent("vmouseout", evt);
					// Reset flag for last over element
					lastOver = null;
				}
			}

			/**
			 * Handle touch move
			 * @method handleTouchMove
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchMove(evt) {
				var over,
					firstTouch = evt.touches && evt.touches[0],
					pointerX,
					pointerY,
					didCancel = didScroll,
					//sets the threshold, based on which we consider if it was the touch-move event
					moveThreshold = vmouse.eventDistanceThreshold;

				/**
				 * Ignore the touch which has identifier other than 0.
				 * Only first touch has control others are ignored.
				 * Patch for webkit behavior where touchmove event
				 * is triggered between touchend events
				 * if there is multi touch.
				 */

				if ((firstTouch === undefined) || firstTouch.identifier > 0) {
					//evt.preventDefault(); // cant preventDefault passive events!!!
					evt.stopPropagation();
					return;
				}

				pointerX = firstTouch.pageX || firstTouch.clientX || 0, // for touch converted from mouse event
				pointerY = firstTouch.pageY || firstTouch.clientY || 0, // for touch converted from mouse event

				didScroll = didScroll ||
					//check in both axes X,Y if the touch-move event occur
					(Math.abs(pointerX - startX) > moveThreshold ||
					Math.abs(pointerY - startY) > moveThreshold);

				// detect over event
				// for compatibility with mouseover because "touchenter" fires only once
				// @TODO Handle many touches
				over = document.elementFromPoint(pointerX, pointerY);
				if (over && lastOver !== over) {
					lastOver = over;
					fireEvent("vmouseover", evt);
				}

				//if didScroll occur and wasn't canceled then trigger touchend otherwise just touchmove
				if (didScroll && !didCancel) {
					fireEvent("vmousecancel", evt);
					lastOver = null;
				}
				fireEvent("vmousemove", evt);
			}

			/**
			 * Handle Scroll
			 * @method handleScroll
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleScroll(evt) {
				if (!didScroll) {
					fireEvent("vmousecancel", evt);
				}
				didScroll = true;
			}

			/**
			 * Handle touch cancel
			 * @method handleTouchCancel
			 * @param {Event} evt
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleTouchCancel(evt) {

				fireEvent("vmousecancel", evt);
				lastOver = null;
			}

			/**
			 * Prepare position of event for keyboard events.
			 * @method preparePositionForEvent
			 * @param {Event} event
			 * @return {Object} properties
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function preparePositionForEvent(event) {
				var targetRect = event.target && event.target.getBoundingClientRect(),
					properties = {};

				if (targetRect) {
					properties = {
						"clientX": targetRect.left + targetRect.width / 2,
						"clientY": targetRect.top + targetRect.height / 2,
						"which": 1
					};
				}
				return properties;
			}

			/**
			 * Handle key up
			 * @method handleKeyUp
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleKeyUp(event) {
				var properties;

				if (event.keyCode === KEY_CODES.enter) {
					properties = preparePositionForEvent(event);
					fireEvent("vmouseup", event, properties);
					fireEvent("vclick", event, properties);
				}
			}

			/**
			 * Handle key down
			 * @method handleKeyDown
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.event.vmouse
			 */
			function handleKeyDown(event) {
				if (event.keyCode === KEY_CODES.enter) {
					fireEvent("vmousedown", event, preparePositionForEvent(event));
				}
			}

			/**
			 * Binds events common to mouse and touch to support virtual mouse.
			 * @method bindCommonEvents
			 * @static
			 * @member ns.event.vmouse
			 */
			vmouse.bindCommonEvents = function () {
				document.addEventListener("keyup", handleKeyUp, true);
				document.addEventListener("keydown", handleKeyDown, true);
				document.addEventListener("scroll", handleScroll, true);
				document.addEventListener("click", handleClick, true);
			};

			// @TODO delete touchSupport flag and attach touch and mouse listeners,
			// @TODO check if v-events are not duplicated if so then called only once

			/**
			 * Binds touch events to support virtual mouse.
			 * @method bindTouch
			 * @static
			 * @member ns.event.vmouse
			 */
			vmouse.bindTouch = function () {
				document.addEventListener("touchstart", handleTouchStart, true);
				document.addEventListener("touchend", handleTouchEnd, true);
				document.addEventListener("touchmove", handleTouchMove, true);
				document.addEventListener("touchcancel", handleTouchCancel, true);
			};

			/**
			 * Binds mouse events to support virtual mouse.
			 * @method bindMouse
			 * @static
			 * @member ns.event.vmouse
			 */
			vmouse.bindMouse = function () {
				document.addEventListener("mousedown", handleDown, true);
				document.addEventListener("mouseup", handleUp, true);
				document.addEventListener("mousemove", handleMove, true);
				document.addEventListener("mouseover", handleOver, true);
				document.addEventListener("mouseout", handleOut, true);
			};

			/**
			 * Unbinds touch events to support virtual mouse.
			 * @method unbindTouch
			 * @static
			 * @member ns.event.vmouse
			 */
			vmouse.unbindTouch = function () {
				document.removeEventListener("touchstart", handleTouchStart, true);
				document.removeEventListener("touchend", handleTouchEnd, true);
				document.removeEventListener("touchmove", handleTouchMove, true);

				document.removeEventListener("touchcancel", handleTouchCancel, true);

				document.removeEventListener("click", handleClick, true);
			};

			/**
			 * Unbinds mouse events to support virtual mouse.
			 * @method unbindMouse
			 * @static
			 * @member ns.event.vmouse
			 */
			vmouse.unbindMouse = function () {
				document.removeEventListener("mousedown", handleDown, true);

				document.removeEventListener("mouseup", handleUp, true);
				document.removeEventListener("mousemove", handleMove, true);
				document.removeEventListener("mouseover", handleOver, true);
				document.removeEventListener("mouseout", handleOut, true);

				document.removeEventListener("keyup", handleKeyUp, true);
				document.removeEventListener("keydown", handleKeyDown, true);
				document.removeEventListener("scroll", handleScroll, true);
				document.removeEventListener("click", handleClick, true);
			};

			ns.event.vmouse = vmouse;

			if (touchSupport) {
				vmouse.bindTouch();
			} else {
				vmouse.bindMouse();
			}
			vmouse.bindCommonEvents();

			}(window, window.document, ns));

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
 *
 */
/**
 * #Spin
 *
 * @class ns.widget.core.Spin
 * @since 1.2
 * @extends ns.widget.core.BaseWidget
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
/**
 * Main file of applications, which connect other parts
 */
// then we can load plugins for libraries and application
(function (window, ns) {
	"use strict";
			var document = window.document,
			BaseWidget = ns.widget.BaseWidget,
			//Page = ns.widget.core.Page,
			//Appbar = ns.widget.core.Appbar,
			engine = ns.engine,
			utilsEvents = ns.event,
			gesture = utilsEvents.gesture,
			utilSelectors = ns.util.selectors,

			Animation = ns.util.Animate,

			ENABLING_DURATION = 300, // [ms]
			ROLL_DURATION = 600,
			DELTA_Y = 100,
			DRAG_STEP_TO_VALUE = 60,
			NUMBER_OF_CAROUSEL_ITEMS = 13,
			EVENT_DRAG_END_TIMEOUT = 500,

			/**
			 * Alias for class Spin
			 * @method Spin
			 * @member ns.widget.core.Spin
			 * @private
			 * @static
			 */
			Spin = function () {
				var self = this;

				/**
				 * Object with default options
				 * @property {Object} options
				 * @property {number} options.min minimum value of spin
				 * @property {number} options.max maximum value of spin
				 * @property {number} options.step step of decrease / increase value
				 * @property {string} [options.moduloValue="enabled"] value will be show as modulo
				 *  // if enabled then value above max will be show as modulo eg. 102
				 *  // with range 0-9 will be show as 2 (12 % 10)
				 * @property {string} [options.shortPath="enabled"] spin rotate with short path
				 *  // eg. when value will be 1 and then will change to 8
				 *  // the spin will rotate by 1 -> 0 -> 9 -> 8
				 * @property {number} [options.duration=ROLL_DURATION] time of rotate to indicated value
				 * @property {string} [options.direction="up"] direction of spin rotation
				 * @property {string} [options.rollHeight="custom"] size of frame to rotate one item
				 * @property {number} [options.itemHeight=38] size of frame for "custom" rollHeight
				 * @property {number} [options.momentumLevel=0] define momentum level on drag
				 * @property {number} [options.scaleFactor=0.4] second / next items scale factor
				 * @property {number} [options.moveFactor=0.4] second / next items move factor from center
				 * @property {number} [options.loop="enabled"] when the spin reaches max value then loops to min value
				 * @property {string} [options.labels=""] defines labels for values likes days of week separated by ","
				 * // eg. "Monday,Tuesday,Wednesday"
				 * @property {string} [options.digits=0] value filling with zeros, eg. 002 for digits=3;
				 * @property {string} [options.dragTarget="document"] set target element for drag gesture
				 * @member ns.widget.core.Spin
				 */
				self.options = {
					min: 0,
					max: 9,
					step: 1,
					moduloValue: "enabled",
					shortPath: "enabled",
					duration: ROLL_DURATION,
					direction: "up",
					rollHeight: "custom", // "container" | "item" | "custom"
					itemHeight: 38,
					momentumLevel: 0, // 0 - one item on swipe,
					momentumDuration: 800,
					scaleFactor: 0.4,
					moveFactor: 0.4,
					loop: "enabled",
					labels: [],
					digits: 0, // 0 - doesn't complete by zeros
					value: 0,
					dragTarget: "document", // "document" | "self",
					enabled: false
				};
				self._ui = {
					scrollableParent: null
					//page: null,
					//appbar: null
				};
				self._carouselItems = [];
				self._numberOfCarouselItems = NUMBER_OF_CAROUSEL_ITEMS;
				self.length = self.options.max - self.options.min + self.options.step;
				self._prevValue = null; // self property has to be "null" on start
				self._overflowYBeforeDrag = null;
				self._lastCurrentIndex = null;
				self._currentCentralCarouseItem = 0;
				self._count = 0;
				self._dragTimeoutHandler = null;
			},

			WIDGET_CLASS = "ui-spin",

			classes = {
				SPIN: WIDGET_CLASS,
				PREFIX: WIDGET_CLASS + "-",
				ITEM: WIDGET_CLASS + "-item",
				SELECTED: WIDGET_CLASS + "-item-selected",
				NEXT: WIDGET_CLASS + "-item-next",
				PREV: WIDGET_CLASS + "-item-prev",
				ENABLED: "enabled",
				ENABLING: WIDGET_CLASS + "-enabling",
				PLACEHOLDER: WIDGET_CLASS + "-placeholder",
				CAROUSEL: WIDGET_CLASS + "-carousel",
				CAROUSEL_ITEM: WIDGET_CLASS + "-carousel-item"
			},

			prototype = new BaseWidget();

		Spin.classes = classes;
		Spin.timing = Animation.timing;

		prototype._fillCarouselByCount = function (count) {
			var self = this,
				itemToAppend,
				diff,
				restDiff,
				i;

			count = Math.round(count);
			// remove all items
			for (i = 0; i < self._numberOfCarouselItems; i++) {
				if (self._carouselItems[i].element.firstElementChild) {
					self._carouselItems[i].element.removeChild(self._carouselItems[i].element.firstElementChild);
				}
			}

			// for case of count of items is less then carousel items
			diff = self._numberOfCarouselItems - self.length;
			if (diff < 0) {
				diff = 0;
			}

			// append new items
			i = Math.floor(diff / 2);
			restDiff = diff - i;
			for (; i < self._numberOfCarouselItems - restDiff; i++) {
				itemToAppend = self._itemByCount(count + i - self._carouselCenterIndex);
				if (itemToAppend) {
					self._carouselItems[self._carouselItemByCount(count + i - self._carouselCenterIndex)]
						.element.appendChild(itemToAppend);
				}
			}
		};

		prototype._rollItems = function (delta, count) {
			var self = this,
				direction = delta > 0 ? 1 : -1,
				borderItem,
				newItemToPlace;

			delta = Math.abs(delta);
			if (delta === 1) { // move one item
				borderItem = self._carouselItems[
					self._carouselItemByCount(count + direction * self._carouselCenterIndex)
				];
				newItemToPlace = self._itemByCount(count + direction * self._carouselCenterIndex);

				if (borderItem.element.firstElementChild) {
					borderItem.element.removeChild(borderItem.element.firstElementChild);
				}
				if (newItemToPlace) {
					borderItem.element.appendChild(newItemToPlace);
				}
			} else if (delta > 1) {
				self._fillCarouselByCount(count);
			}
		}

		function transform(value, index, centerY, options, self) {
			var diff,
				direction,
				diffAbs,
				scale,
				moveY,
				opacity,
				count = value,
				currentIndex = self._carouselItemByCount(count);

			// change carousel items content on change current index
			if (self._lastCurrentIndex !== Math.round(value)) {
				if (self._lastCurrentIndex !== null) {
					self._rollItems(Math.round(value) - self._lastCurrentIndex, Math.round(value));
				}
				self._lastCurrentIndex = Math.round(value);
			}

			diff = index - currentIndex;
			if (diff < -self._carouselCenterIndex) {
				diff += self._numberOfCarouselItems;
			} else if (diff > self._carouselCenterIndex) {
				diff -= self._numberOfCarouselItems;
			}

			direction = diff < 0 ? -1 : 1;
			diffAbs = Math.abs(diff);

			scale = 1 - options.scaleFactor * diffAbs;
			moveY = 1 - options.moveFactor * diffAbs;
			opacity = 1 - ((options.enabled) ? options.scaleFactor : 1) * diffAbs;

			scale = (scale < 0) ? 0 : scale;
			opacity = (opacity < 0) ? 0 : opacity;
			moveY = direction * (DELTA_Y * (1 - moveY)) + centerY;

			return {
				moveY: moveY,
				scale: scale,
				opacity: opacity
			}
		}


		function showAnimationTick(self) {
			var carouselItems = self._carouselItems,
				options = self.options,
				itemHeight = self._itemHeight,
				state = self._objectValue,
				centerY = (self._containerHeight - itemHeight) / 2;

			carouselItems.forEach(function (carouselItem, index) {
				var change = transform(state.value, index, centerY, options, self);

				// set carouselItem position
				if (change.opacity > 0) {
					carouselItem.element.style.transform = "translateY(" + change.moveY + "px) scale(" + change.scale + ")";
				} else {
					carouselItem.element.style.transform = "translateY(-1000px)"; // move carouselItem from active area
				}
				carouselItem.element.style.opacity = change.opacity;
			});

			ns.event.trigger(self.element, "spinstep", parseInt(state.value, 10));
		}

		prototype._valueToIndex = function (value) {
			var options = this.options,
				delta = options.max - options.min + options.step;

			value = value - options.min;
			while (value < options.min) {
				value += delta;
			}
			while (value > options.max) {
				value -= delta;
			}

			return parseInt(value, 10) % this.length;
		};

		prototype._removeSelectedLayout = function () {
			var self = this,
				item = self._itemByCount(self._previousCount);

			if (item) {
				item.classList.remove(classes.SELECTED);
			}
		};

		prototype._addSelectedLayout = function () {
			var self = this,
				item = self._itemByCount(self._count);

			if (item) {
				item.classList.add(classes.SELECTED);
			}
		};

		prototype._show = function () {
			var self = this,
				animation = new Animation({}),
				state = null,
				objectValue = {
					value: self._previousCount
				};

			self._removeSelectedLayout();

			state = {
				animation: [{
					object: objectValue,
					property: "value",
					to: self._count
				}],
				animationConfig: {
					// when widget is disabled then duration of animation should be minimal
					duration: (self.options.enabled) ? self.options.duration : 1,
					timing: Spin.timing.ease
				}
			};
			self.state = state;
			self._objectValue = objectValue;
			self._animation = animation;

			animation.set(state.animation, state.animationConfig);
			animation.tick(showAnimationTick.bind(null, self));
			animation.start(function () {
				self._addSelectedLayout();
				self._prevValue = self.options.value;
				self.options.value = self._getValueByCount(self._count);

				ns.event.trigger(self.element, "spinchange", {
					value: parseInt(self.options.value, 10),
					dValue: parseInt(self.options.value, 10) - parseInt(self._prevValue, 10)
				});
			});

		};

		prototype._modifyItems = function () {
			var self = this,
				options = self.options,
				itemHeight = 0,
				items = [],
				len = Math.abs(options.max - options.min) / options.step + 1,
				index = 0,
				textValue = "",
				centerY,
				item = null,
				i = 0;

			// remove previous
			self._ui.items = items;

			// add new items
			for (; i < len; i++) {
				item = document.createElement("div");
				item.classList.add(classes.ITEM);
				items.push(item);
			}

			// set content for new items
			for (index = 0; index < len; index++) {
				item = items[index];
				textValue = "";

				if (self.options.labels.length) {
					textValue = self.options.labels[index];
				} else {
					textValue += (options.min + index * options.step);
					if (options.digits > 0) {
						while (textValue.length < options.digits) {
							textValue = "0" + textValue;
						}
					}
				}
				item.innerHTML = textValue;
			}

			// determine item height for scroll
			if (options.rollHeight === "container") {
				itemHeight = self._containerHeight;
			} else if (options.rollHeight === "custom") {
				itemHeight = options.itemHeight;
			} else { // item height
				item = items[0];
				itemHeight = (item) ?
					item.getBoundingClientRect().height :
					self._containerHeight;
			}
			self._itemHeight = itemHeight;
			centerY = (self._containerHeight - itemHeight) / 2;

			// set position of carousel items;
			self._carouselItems.forEach(function (carouselItem, index) {
				var change = transform(self._valueToCount(options.value), index, centerY, options, self);

				// set carouselItem position
				carouselItem.element.style.transform = "translateY(" + change.moveY + "px) scale(" + change.scale + ")";
				carouselItem.element.style.opacity = change.opacity;
			});
		};

		prototype._setItemHeight = function (element, value) {
			value = (typeof value === "string") ? parseInt(value.replace("px").trim(), 10) : value;
			this.options.itemHeight = value;
		};

		/**
		 * Update items
		 * @method _updateItems
		 * @member ns.widget.core.Spin
		 * @protected
		 */
		prototype._updateItems = function () {
			var self = this;

			self._removeSelectedLayout();
			self._modifyItems();
			self._addSelectedLayout();
		}

		prototype._refresh = function () {
			var self = this,
				computedHeight = getComputedStyle(self.element).height || 0;

			self._containerHeight = parseInt(computedHeight, 10);
			self._modifyItems();
			self._fillCarouselByCount(self._count);
			self._show();
		};

		/**
		 * Widget init method
		 * @protected
		 * @method _init
		 * @member ns.widget.core.Spin
		 */
		prototype._init = function () {
			var self = this,
				options = self.options;

			// convert options
			options.min = (options.min !== undefined) ? parseInt(options.min, 10) : 0;
			options.max = (options.max !== undefined) ? parseInt(options.max, 10) : 0;
			options.value = (options.value !== undefined) ? parseInt(options.value, 10) : 0;
			options.step = (options.step !== undefined) ? parseInt(options.step, 10) : 1;
			options.duration = (options.duration !== undefined) ? parseInt(options.duration, 10) : 0;
			options.labels = (Array.isArray(options.labels)) ? options.labels : options.labels.split(",");

			self.length = options.max - options.min + options.step;
			self._count = self._valueToCount(options.value);

			self.dragTarget = (options.dragTarget === "document") ? document : self.element;

			self._refresh();
		};

		prototype._buildCarousel = function (count) {
			// create carousel
			var self = this,
				carousel = document.createElement("div"),
				carouselElement,
				fragment = document.createDocumentFragment(),
				i = 0;

			self._carouselItems = [];
			self._numberOfCarouselItems = count;
			self._carouselCenterIndex = Math.floor(count / 2)

			carousel.classList.add(classes.CAROUSEL, classes.PREFIX + count);
			for (; i < count; i++) {
				carouselElement = document.createElement("div");
				carouselElement.id = "cel-" + i;
				carouselElement.classList.add(classes.CAROUSEL_ITEM);
				self._carouselItems[i] = {
					element: carouselElement
				};
				fragment.appendChild(carouselElement);
			}
			carousel.appendChild(fragment);
			return carousel;
		};

		prototype._build = function (element) {
			var placeholder = document.createElement("div"),
				carousel = null,
				self = this;

			element.classList.add(classes.SPIN);

			placeholder.classList.add(classes.PLACEHOLDER);
			element.appendChild(placeholder);

			carousel = self._buildCarousel(self._numberOfCarouselItems);
			element.appendChild(carousel);

			self._ui.carousel = carousel;
			self._ui.placeholder = placeholder;

			return element;
		};

		prototype._valueToCount = function (value) {
			var self = this;

			return (value - self.options.min) / self.options.step || 0;
		};

		prototype._setValue = function (value) {
			var self = this;

			value = window.parseFloat(value, 10);
			// @todo: for spin with labels the textContent should contains label by value;
			self._ui.placeholder.textContent = value;

			if (isNaN(value)) {
				ns.warn("Spin: value is not a number");
			} else if (value !== self.options.value) {
				if (value >= self.options.min && value <= self.options.max || self.options.loop === "enabled") {

					self._previousCount = self._count;
					self._count = self._valueToCount(value);

					self.options.value = value;
					// set data-value on element
					self.element.dataset.value = value;

					// stop previous animation
					self._stopAnimation();

					// update status of widget
					self._show();
				}
			}
		};

		prototype._stopAnimation = function () {
			var self = this,
				animation = self.state.animation[0];

			if (animation !== null && animation.to !== animation.current) {
				self._animation.stop();
			}
		};

		prototype._carouselItemByCount = function (count) {
			var centerIndex = this._carouselCenterIndex,
				carouselItemIndex = (count + centerIndex) % this._numberOfCarouselItems;

			if (carouselItemIndex < 0) {
				carouselItemIndex += this._numberOfCarouselItems;
			}

			return carouselItemIndex;
		};

		prototype._getValueByCount = function (count) {
			var value,
				self = this,
				options = self.options,
				rest;

			if (options.loop !== "enabled") {
				value = count * options.step + options.min;
			} else {
				if (count >= 0) {
					value = (count % self.length) * options.step + options.min;
				} else {
					rest = count % self.length || 0;
					if (rest < 0) {
						rest += self.length;
					}
					value = rest * options.step + options.min;
				}
			}
			return value;
		};

		prototype._getValue = function () {
			var self = this,
				options = self.options,
				value = self._getValueByCount(self._count);

			if (self.options.loop !== "enabled") {
				self._objectValue.value = Math.min(Math.max(value, options.min), options.max);
			}
			return value;
		};

		prototype._setMax = function (element, max) {
			var options = this.options;

			options.max = (max !== undefined) ? parseInt(max, 10) : 0;
			this.length = options.max - options.min + options.step;
			return true;
		};

		prototype._setMin = function (element, min) {
			var options = this.options;

			options.min = (min !== undefined) ? parseInt(min, 10) : 0;
			this.length = options.max - options.min + options.step;
			return true;
		};

		prototype._setLabels = function (element, value) {
			var self = this;

			self.options.labels = value.split(",");
			return true;
		};

		prototype._setModuloValue = function (element, value) {
			this.options.moduloValue = (value === "enabled") ? "enabled" : "disabled";
		};

		prototype._setShortPath = function (element, value) {
			this.options.shortPath = (value === "enabled") ? "enabled" : "disabled";
		};

		prototype._setLoop = function (element, value) {
			this.options.loop = (value === "enabled") ? "enabled" : "disabled";
			return true;
		};

		prototype._setDuration = function (element, value) {
			this.options.duration = window.parseInt(value, 10);
			return true;
		};

		prototype._setDigits = function (element, value) {
			this.options.digits = window.parseInt(value, 10);
			return true;
		};

		prototype._setEnabled = function (element, value) {
			var self = this;

			self.options.enabled = (value === "false") ? false : value;
			if (self.options.enabled) {
				element.classList.add(classes.ENABLING);
				window.setTimeout(function () {
					element.classList.remove(classes.ENABLING);
				}, ENABLING_DURATION);
				element.classList.add(classes.ENABLED);
				utilsEvents.on(self.dragTarget, "drag dragend dragstart", self);
				utilsEvents.on(self.dragTarget, "vmousedown vmouseup", self);
			} else {
				element.classList.add(classes.ENABLING);
				window.setTimeout(function () {
					element.classList.remove(classes.ENABLING);
					self.refresh();
				}, ENABLING_DURATION);
				element.classList.remove(classes.ENABLED);
				utilsEvents.off(self.dragTarget, "drag dragend dragstart", self);
				utilsEvents.off(self.dragTarget, "vmousedown vmouseup", self);
				// disable animation
				self._animation.stop();
			}
			// reset previous value;
			this._prevValue = null;
			return true;
		};

		prototype._setDirection = function (element, direction) {
			this.options.direction = (["up", "down"].indexOf(direction) > -1) ? direction : "up";
		};

		prototype._drag = function (e) {
			var self = this;

			// if element is detached from DOM then event listener should be removed
			if (document.getElementById(self.element.id) === null) {
				utilsEvents.off(self.dragTarget, "drag dragend dragstart", self);
			} else {
				if (self.options.enabled) {
					self._objectValue.value = self._startDragCount - e.detail.deltaY / DRAG_STEP_TO_VALUE;
					if (self.options.loop !== "enabled") {
						self._objectValue.value = Math.min(Math.max(self._objectValue.value, 0), self.length - 1);
					}
					showAnimationTick(self);
				}
			}
			// set timeout in case of drag outside screen
			window.clearTimeout(self._dragTimeoutHandler);
			self._dragTimeoutHandler = window.setTimeout(function () {
				self._dragEnd({
					detail: {
						velocityY: e.velocityY,
						distance: e.distance,
						direction: e.direction
					}
				});
				self._dragTimeoutHandler = null;
				ns.event.gesture.Manager.getInstance().resetDetecting();
			}, EVENT_DRAG_END_TIMEOUT);
		};

		prototype._dragStart = function () {
			var self = this;

			self._animation.pause();
			self._startDragCount = self._count;
			self._previousCount = self._count;
			self._removeSelectedLayout();
		};

		prototype._dragEnd = function (e) {
			var self = this,
				chain = self._animation._animate.chain[0],
				momentum = 0,
				duration = self.options.duration;

			window.clearTimeout(self._dragTimeoutHandler);

			if (self.options.momentumLevel > 0 &&
				e.detail.velocityY > 0.7 &&
				e.detail.distance) {

				momentum = self.options.momentumLevel * Math.round(e.detail.distance / 20);
				if (e.detail.direction === "up") {
					momentum = -momentum;
				}
				self._count = Math.round(self._objectValue.value) - momentum || 0;
				if (self.options.loop !== "enabled") {
					self._count = Math.min(Math.max(self._count, 0), self.length - 1);
				}
				duration = self.options.momentumDuration;
				chain[0].timing = Spin.timing.easeOut;
			} else {
				self._count = Math.round(self._objectValue.value) || 0;
				if (self.options.loop !== "enabled") {
					self._count = Math.min(Math.max(self._count, 0), self.length - 1);
				}
				duration = Math.abs(self._count - self._objectValue.value) * duration;
			}

			chain[0].from = self._objectValue.value;
			// @todo: move to nearest
			chain[0].to = self._count;
			chain[0].duration = duration;
			self._animation.start(self._animation._animate.callback);
		};

		/**
		 * Handler for mouse down / touch start event
		 * The method is intended to block the scroll during drag event on Spin widget
		 * @protected
		 * @method _vmouseDown
		 * @member ns.widget.core.Spin
		 */
		prototype._vmouseDown = function () {
			var self = this,
				ui = self._ui;

			ui.scrollableParent = utilSelectors.getScrollableParent(self.element);
			if (ui.scrollableParent) {
				self._overflowYBeforeDrag = ui.scrollableParent.style.overflowY;
				ui.scrollableParent.style.overflowY = "hidden";
			}
			/*
			ui.page = utilSelectors.getClosestBySelector(self.element, Page.selector);
			if (ui.page) {
				ui.appbar = ui.page.querySelector(Appbar.selector);
				if (ui.appbar) {
					ns.widget.Appbar(ui.appbar).lockExpanding(true);
				}
			}
			*/
		};

		/**
		 * Handler for mouse up / touch end event
		 * The method is intended to unblock the scroll after drag event on Spin widget
		 * @protected
		 * @method _vmouseUp
		 * @member ns.widget.core.Spin
		 */
		prototype._vmouseUp = function () {
			var self = this,
				ui = self._ui;

			if (ui.scrollableParent) {
				ui.scrollableParent.style.overflowY = self._overflowYBeforeDrag;
			}
			/*
			if (ui.appbar) {
				ns.widget.Appbar(ui.appbar).lockExpanding(false);
			}
			*/
		};

		prototype._itemIndexByValue = function (value) {
			var options = this.options;

			return Math.round((value - options.min) / options.step);
		};

		prototype._itemByCount = function (count) {
			var self = this,
				value = self._getValueByCount(count);

			return self._ui.items[self._itemIndexByValue(value)];
		};

		prototype._click = function (e) {
			var self = this,
				target = e.target,
				items = self._ui.items,
				count = self._count,
				targetIndex = items.indexOf(target);

			if (!self.element.classList.contains(classes.ENABLING) &&
				targetIndex > -1) {
				self._previousCount = count;

				if (target === self._itemByCount(count - 1)) {
					self._count--;
				} else if (target === self._itemByCount(count + 1)) {
					self._count++;
				}
				if (self._previousCount !== self._count) {
					self._show();
				}
			}
		}

		prototype.handleEvent = function (event) {
			var self = this;

			switch (event.type) {
				case "drag":
					self._drag(event);
					break;
				case "vmousedown":
					self._vmouseDown(event);
					break;
				case "vmouseup":
					self._vmouseUp(event);
					break;
				case "dragend":
					self._dragEnd(event);
					break;
				case "dragstart":
					self._dragStart(event);
					break;
				case "vclick":
					self._click(event);
					break;
			}
		};

		prototype._bindEvents = function () {
			var self = this;

			// enabled drag gesture for document
			utilsEvents.enableGesture(self.dragTarget, new gesture.Drag({
				blockHorizontal: true,
				threshold: 7 // minimal allowed value from Drag module
			}));

			utilsEvents.on(self.element, "vclick", self);
		};

		prototype._unbindEvents = function () {
			var self = this;

			utilsEvents.disableGesture(self.dragTarget);

			utilsEvents.off(self.dragTarget, "drag dragend dragstart", self);
			utilsEvents.off(self.element, "vclick", self);
		};

		/**
		 * Destroy widget instance
		 * @protected
		 * @method _destroy
		 * @member ns.widget.core.Spin
		 * @protected
		 */
		prototype._destroy = function () {
			var self = this,
				element = self.element,
				ui = self._ui;

			self._unbindEvents();
			ui.items.forEach(function (item) {
				if (item.parentNode) {
					item.parentNode.removeChild(item);
				}
			});
			self._carouselItems.forEach(function (carouselItem) {
				carouselItem.element.parentNode.removeChild(carouselItem.element);
			});
			element.removeChild(ui.carousel);
			element.removeChild(ui.placeholder);
			element.classList.remove(classes.SPIN);
		};

		Spin.prototype = prototype;
		ns.widget.core.Spin = Spin;

		engine.defineWidget(
			"Spin",
			".ui-spin",
			[],
			Spin,
			"core"
		);

		
})(window, ns);

/*global window, define, ns */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
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
/**
 * #Mobile UI Components
 *
 * The Web UI Framework (called as **TAU**; Tizen Advanced UI framework) provides rich Tizen components that are optimized for the Tizen Web browser.
 *
 * ##UI components list
 *
 * The following table displays the components provided by the Tizen mobile Web UI Framework.
 *
 * @class ns.widget.mobile
 * @seeMore https://developer.tizen.org/dev-guide/2.2.1/org.tizen.web.uiwidget.apireference/html/web_ui_framework.htm "Web UI Framework Reference"
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (window, ns) {
	"use strict";
				ns.widget.mobile = ns.widget.mobile || {};
			}(window, ns));

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
 * @author Hunseop Jeong <hs85.jeong@samsung.com>
 */
(function (window, ns) {
	"use strict";
			var CoreSpin = ns.widget.core.Spin,
			CoreSpinPrototype = CoreSpin.prototype,
			engine = ns.engine,
			objectUtil = ns.util.object,
			classes = objectUtil.copy(CoreSpin.classes),
			Spin = function () {
				var self = this,
					options = {
						scaleFactor: 0,
						moveFactor: 0.5,
						itemHeight: 54,
						dragTarget: "self"
					};

				CoreSpin.call(self);

				// Merge options from prototype
				self.options = (!self.options) ?
					options :
					objectUtil.fastMerge(self.options, options);
			},
			prototype = new CoreSpin();

		prototype._init = function () {
			var self = this;

			CoreSpinPrototype._init.call(self);

			// Enable the spin by default
			self.option("enabled", true);
		}

		Spin.prototype = prototype;
		Spin.classes = classes;
		Spin.timing = CoreSpin.timing;

		ns.widget.mobile.Spin = Spin;

		engine.defineWidget(
			"Spin",
			".ui-spin",
			[],
			Spin,
			"mobile",
			true
		);

		
})(window, ns);

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
		
})(window, ns);

/*global define, ns */
/**
 * #Tizen Advanced UI Framework
 *
 * Tizen Advanced UI Framework(TAU) is new name of Tizen Web UI framework. It provides tools, such as widgets, events, effects, and animations, for Web application development. You can leverage these tools by just selecting the required screen elements and creating applications.
 *
 * TAU service is based on a template and works on a Web browser, which runs on the WebKit engine. You can code Web applications using the TAU, standard HTML5, and Tizen device APIs. You can also use different widgets with CSS animations and rendering optimized for Tizen Web browsers.
 *
 * For more information about the basic structure of a page in the Web application using the TAU, see [Application Page Structure](page/app_page_layout.htm).
 *
 * ##Framework Services
 *
 * The Web UI framework consists of the following services:
 *
 *  - Page navigation
 *
 *    Navigation JavaScript library is provided to allow smooth navigation between TAU based application [pages](page/layout.htm).
 *  - Web widgets and themes
 *
 *    We support APIs and CSS themes for Tizen web [widgets](widget/widget_reference.htm)
 *  - Element Events
 *
 *    Some special [events](event/event_reference.htm) are available with TAU that optimized for the Web applications.
 *  - Useful utility
 *
 *    Some special [utility](util/util_reference.htm) are available with TAU that supporting easy DOM methods for the Web applications.
 *
 * !!!The framework runs only on browsers supporting the HTML5/CSS standards. The draft version of the W3C specification is not fully supported.!!!
 * @class ns.mobile
 * @title Tizen Advanced UI Framework
 */
			ns.info.profile = "mobile";
			
}(window, window.document));
