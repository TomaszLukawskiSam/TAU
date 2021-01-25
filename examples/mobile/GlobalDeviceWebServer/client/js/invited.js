/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
import { UpdateWebClip } from './app.js';
import Actions from './actions.js';

const serverPort = 9000;
const serverURL = window.location.protocol + '//' + window.location.hostname;
const actions = new Actions();
const NEW_WINDOW_TIMEOUT = 1000;
const myappsmodule = {};

(function () {
    var xhr;
    function emptyElement(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
        return elm;
    }
    /**
     * Open app in new window
     * @param {Object} response
     * @private
     */
    function openAppWindow(response) {
        document.getElementById("page-invited").style.display = "none";
        var timer = setTimeout(function () {
            clearTimeout(timer);
            document.getElementById("page-invited").style.display = "block";
            window.open(serverURL + ':' + response.port + '/app', 'newWindow');
        }, NEW_WINDOW_TIMEOUT);
    };

    function showListView(dataArray) {
        var formResult = document.getElementById("d2dApps"),
            imgResult = document.getElementById("d2dAppList"),
            formObj,
            imgObj,
            textObj,
            objTable,
            objRow,
            i,
            d2dApp,
            icon;

        emptyElement(imgResult);

        objTable = document.createElement("div");
        objTable.className = "result-table";

        if (dataArray.length > 0) {
            for (i = 0; i < dataArray.length; i++) {
                if (dataArray[i]['d2dApp'].appName === 'Watch Together') {
                    formObj = document.createElement("div");
                    imgObj = document.createElement("img");
                    textObj = document.createElement("p");
                    formObj.style.textAlign = "center";
                    d2dApp = dataArray[i]['d2dApp'];
                    if (d2dApp.hasOwnProperty("appName")) {
                        if (d2dApp.iconPath) {
                            icon = d2dApp.iconPath.replace('/opt/usr/globalapps/', '');
                            imgObj.src = `/d2dicon/${icon}`;
                        } else {
                            imgObj.src = `./images/icon.png`;
                        }

                        imgObj.className = "app-icon-big-img";
                        imgObj.alt = d2dApp.appName;
                        textObj.style.display = "block";
                        textObj.style.marginBottom = "60px";
                        textObj.style.fontSize = "16px";
                        textObj.innerHTML = d2dApp.appName;
                    }
                    imgObj.addEventListener("click", actions.launchAppOnTV(
                        d2dApp.appPkgID,
                        d2dApp.appAppID,
                        function (response) {
                            openAppWindow(response);
                        }));
                    formObj.appendChild(imgObj);
                    formObj.appendChild(textObj);

                    imgResult.appendChild(formObj);
                }
            }
            formResult.appendChild(imgResult);
        } else {
            objRow = document.createElement("div");
            objRow.className = "result-table-error";
            objRow.appendChild(document.createTextNode("No Data"));
            objTable.appendChild(objRow);
        }
    }

    function showList() {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    showListView(JSON.parse(xhr.responseText));
                } else {
                    console.error(xhr.responseText);
                }
            }
        };
        xhr.open('GET', serverURL + ':' + serverPort + '/appList');
        xhr.send();
    }

    function init() {
        var eventSource = new EventSource(serverURL + ':' + serverPort + '/updateAppList');
        eventSource.addEventListener('message', evt => {
            showListView(JSON.parse(evt.data));
            UpdateWebClip(JSON.parse(evt.data));
        }, false);
        eventSource.addEventListener('open', evt => {
            console.log("Connected to...");
        }, false);
        eventSource.addEventListener('error', evt => {
            if (evt.target.readyState == EventSource.CLOSED) {
                console.log("Disconnected from...");
            } else if (evt.target.readyState == EventSource.CONNECTING) {
                console.log('Connecting to...');
            }
        }, false);
        showList();
    }
    window.onload = init;
    myappsmodule.openAppWindow = openAppWindow;
}());

export function openAppWindow(response) {
    myappsmodule.openAppWindow(response);
};

