var d2dservice = new D2DServiceClient();
var textData;
var textArea;
var user;

function init() {
    console.log('Client Chatting App Init...');
}

function openEmoji() {
    console.log('openEmoji function call...');
}

function uploadText() {
    console.log('uploadText function call...');
    textData = document.getElementById("inputText");
    textArea = document.getElementById("messageBox");

    if (textData.value) {
        var data = user + ' : ' + textData.value;
        var divElement = document.createElement("div");
        divElement.style.padding = "5px 0";
        divElement.appendChild(document.createTextNode(data));
        textArea.appendChild(divElement);
        d2dservice.sendMessage("inputTextData", { userValue: user, textValue: textData.value });
        textData.value = '';
    } else {
        console.log("No input text data.");
    }
}

function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.id == d2dservice.SERVER) {
    } else {
        alert('msg.type : ' + msg.type);
        if (msg.type === "sendClientMessage") {
            var divElement = document.createElement("div");
            textArea = document.getElementById("messageBox");
            divElement.style.padding = "5px 0";
            divElement.appendChild(document.createTextNode(msg.data.index));
            textArea.appendChild(divElement);
        } else {
            console.log('Not matched Message...');
        }
    }
}

function login() {
    var loginButton = document.getElementById("loginButton"),
        userId = document.getElementById("userId"),
        loggedUser = document.getElementById("loggedUser");

    user = userId.value;
    loginButton.classList.add('app-hidden');
    loggedUser.innerHTML = user;
    loggedUser.classList.remove('app-hidden');
}

function play() {
    d2dservice.sendMessage("playVideo");
}

function pause() {
    d2dservice.sendMessage("pauseVideo");
}

window.onload = function () {
    init();

    document.addEventListener('tizenhwkey', function (e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) { }
        }
    });
};
