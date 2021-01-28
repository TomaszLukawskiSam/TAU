var d2dservice = new D2DServiceClient();
var textData;
var textArea;
var user = null;
var users = [{
        id: 1,
        name: "Tom",
        shared: false
    }, {
        id: 2,
        name: "Ann",
        shared: false
    }, {
        id: 3,
        name: "Dave",
        shared: true
    }, {
        id: 4,
        name: "Ella",
        shared: false
    }, {
        id: 5,
        name: "Julia",
        shared: false
    }];

function getlistItemHTML(user) {
    return `<li class="ui-li-has-checkbox">
        <label style="display: inherit; width: 100%">
            <input class="checkboxes user-share" data-user-id="${user.id}"
             type="checkbox" ${user.shared ? "checked" : ""}/>
            <div class="ui-li-text">
                <span class="ui-li-text-title">${user.name}</span>
            </div>
        </label>
    </li>`;
}

function updatePopup() {
    var popupElement = document.getElementById('share-users-popup');

    // update user list
    updatePopupList(popupElement, users);
    // Refresh popup
    tau.widget.Popup(popupElement).refresh();
}

function onChatPageBeforeShow() {
    var shareButton = document.getElementById('user-share-button');

    updatePopup();
    shareButton.addEventListener('click', onUserShareButtonClick);
}

function onPageBeforeShow(event) {
    if (event.target.id === 'chat-page') {
        onChatPageBeforeShow();
    }
}

function toogleButtons(enabled) {
    var playButton = document.querySelector(".play-button"),
        pauseButton = document.querySelector(".pause-button");

    if (enabled) {
        tau.widget.Button(playButton).enable();
        tau.widget.Button(pauseButton).enable();
    } else {
        tau.widget.Button(playButton).disable();
        tau.widget.Button(pauseButton).disable();
    }
}

function init() {
    console.log('Client Chatting App Init...');
    document.addEventListener('pagebeforeshow', onPageBeforeShow, true);
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

function addUser(data) {
    let newUser = data.user;

    if (!users.some(user => user.id === newUser.id)) {
        users.push(newUser);
        updatePopup();
    } else {
        console.warn(`User (id:${user.id}) already exists`);
    }
}

function removeUser(data) {
    let removeUserId = data.userId;
    if (users.some(user => user.id === removeUserId)) {
        users = users.filter(user => user.id !== removeUserId);
        updatePopup();
    } else {
        console.warn(`User (id:${user.id}) not exists`);
    }
}

function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.id == d2dservice.SERVER) {
        if (msg.type === "adduser") {
            addUser(msg.data);
        } else if (msg.type === "removeuser") {
            removeUser(msg.data);
        }
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

function updatePopupList(popupElement, data) {
    let listview = popupElement.querySelector(".ui-listview");

    if (listview) {
        // clear list
        listview.innerHTML = "";
        // fill list
        let df = document.createDocumentFragment();
        data.forEach(user => {
            let div = document.createElement("div");

            div.innerHTML = getlistItemHTML(user);
            df.append(div.firstChild);
        });

        listview.appendChild(df);
        // update listview
        tau.engine.createWidgets(listview);
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

function updateUsersFromPopup() {
    // update users
    let popup = document.getElementById("share-users-popup"),
        checkboxes = popup.querySelectorAll("input[type='checkbox'].user-share");

    // set shared user for selected checkbox
    checkboxes.forEach(checkbox => {
        let user = users.filter(user => user.id === parseInt(checkbox.getAttribute("data-user-id"), 10))[0];
        if (user) {
            user.shared = checkbox.checked;
        }
    });
}

function onUserShareButtonClick() {
    updateUsersFromPopup();

    // data to send
    let data = users.map(user => {
        return {
            id: user.id,
            shared: user.shared
        }
    });
    // denug
    console.log("send", "userShared", data);

    // send to TV
    d2dservice.sendMessage("userShared", data);
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
