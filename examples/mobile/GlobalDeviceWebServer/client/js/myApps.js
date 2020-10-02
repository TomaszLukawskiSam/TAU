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
 
const serverPort = 9000;
const serverURL = window.location.protocol + '//' + window.location.hostname;
var slideIndex = 1;
var slideFlag = false;
(function() {
    var xhr ;
    function emptyElement(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
        return elm;
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1;
        }    
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    function minusSlides() {
        showSlides(slideIndex += -1);
    }
    function plusSlides() {
        showSlides(slideIndex += 1);
    }

    function showListView(dataArray) {
        var formResult = document.getElementById("d2dApps"), 
            imgResult = document.getElementById("d2dAppList"),
            formObj,
            imgObj,
            textObj,
            objTable,
            objRow,
            i,
            prop,
            icon;

        emptyElement(imgResult);
        
        if (slideFlag === false) {
            showSlides(slideIndex);
            slideFlag = true;
        }

        var prev = document.getElementById("prevBtn");
        var next = document.getElementById("nextBtn");
        prev.addEventListener("vclick", minusSlides);
        next.addEventListener("vclick", plusSlides);

        objTable = document.createElement("div");
        objTable.className = "result-table";

        if (dataArray.length > 0) {
            for (i = 0; i < dataArray.length; i++) {
                formObj = document.createElement("div");
                imgObj = document.createElement("img");
                textObj = document.createElement("p");
                formObj.style.textAlign = "center";
                for (prop in dataArray[i]) {
                    if (dataArray[i][prop].hasOwnProperty("appName")) {
                        if(dataArray[i][prop].iconName) {
                            imgObj.src = `./images/${dataArray[i][prop].iconName}`;
                        } else {
                            imgObj.src = `./images/icon.png`;
                        }
                        imgObj.className = "app-icon-img";
                        imgObj.alt = dataArray[i][prop].appName;
                        textObj.style.display = "block";
                        textObj.style.margin = "0 auto";
                        textObj.style.fontSize = "14px";
                        textObj.innerHTML = dataArray[i][prop].appName;
                    }
                    imgObj.addEventListener("click", sendAppID(dataArray[i][prop].appPkgID, dataArray[i][prop].appAppID));
                    formObj.appendChild(imgObj);
                    formObj.appendChild(textObj);
                }
                imgResult.appendChild(formObj);
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
        xhr.onreadystatechange = function() {
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

    function sendAppID(appPkgID, appAppID) {
        var retFunc = function() {
            var data = {
                appPkgID: appPkgID,
                appAppID: appAppID
            };
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        var res = JSON.parse(xhr.responseText);
                        document.getElementById("page-main").style.display = "none";
                        var timer = setTimeout(function(){
                            clearTimeout(timer);
                            document.getElementById("page-main").style.display = "block";
                            window.open(serverURL + ':' + res.port + '/app', 'newWindow');
                        }, 1000);
                    } else {
                        console.error(xhr.responseText);
                    }
                }
            }
            xhr.open('POST', serverURL + ':' + serverPort + '/app');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        };
        return retFunc;
    }

    function init() {
        var eventSource = new EventSource(serverURL + ':' + serverPort + '/updateAppList');
        eventSource.addEventListener('message', evt => {
            showListView(JSON.parse(evt.data));
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
}());
