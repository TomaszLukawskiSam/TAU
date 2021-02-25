var d2dservice = new D2DServiceClient();
var textData;
var textArea;
// require need to get user name.
var user = 'cookie';
var wt_mode;
var roomid = 0;
var users = [];

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

function onBroadCastButtonClick() {
    var broadcast = document.getElementsByName('radio-group'),
        broadcast_value;

    for (var i = 0; i < broadcast.length; i++) {
        if (broadcast[i].checked) {
            broadcast_value = broadcast[i].value;
        }
    }

    var divElement = document.createElement("div");
    textArea = document.getElementById("messageBox");
    divElement.style.padding = "5px 0";
    divElement.appendChild(document.createTextNode("Invited Link : http://mydevice.ga/?roomId=" + roomid.value + "&broadcaster=" + broadcast_value));
    textArea.appendChild(divElement);
    connectUser();
}

function onChatPageBeforeShow() {
    var shareButton = document.getElementById('user-share-button'),
        broadcastButton = document.getElementById('user-brodcast-button');
    updatePopup();
    shareButton.addEventListener('click', onUserShareButtonClick);
    broadcastButton.addEventListener('click', onBroadCastButtonClick);
}

function onPageBeforeShow(event) {
    if (event.target.id === 'chat-page') {
        if (wt_mode === 'host') {
            hostControlButtons(true);
        } else {
            hostControlButtons(false);
        }
        onChatPageBeforeShow();
    }
}

function hostControlButtons(enabled) {
    var hostControl = document.querySelector(".host-control");

    if (enabled) {
        hostControl.style.visibility = 'visible';
    } else {
        hostControl.style.visibility = 'hidden';
    }
}

function init() {
    console.log('Client Chatting App Init...');
    wt_mode = 'host';
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

function requestUserData() {
    d2dservice.sendMessage("requestUserData");
}

function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.id == d2dservice.SERVER) {
    } else {
        if (msg.type === "sendClientMessage") {
            var divElement = document.createElement("div");
            textArea = document.getElementById("messageBox");
            divElement.style.padding = "5px 0";
            divElement.appendChild(document.createTextNode(msg.data.index));
            textArea.appendChild(divElement);
        } else if (msg.type === "connectUser") {
            users = [];
            msg.data.forEach(user => users.push(user));
            updatePopup();
        } else if (msg.type === "accountUserData") {
            user = msg.data;
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

function connectUser() {
    d2dservice.sendMessage("joinedlist");
}

function login() {
    var loginButton = document.getElementById("loginButton"),
        userId = document.getElementById("userId"),
        loggedUser = document.getElementById("loggedUser");

    user = userId.value;
    loginButton.classList.add('app-hidden');
    loggedUser.innerHTML = user;
    loggedUser.classList.remove('app-hidden');
    d2dservice.sendMessage("loginUserData", user);
    wt_mode = 'host';
}

function guestLogin() {
    var userId = document.getElementById("userId");

    user = userId.value;
    d2dservice.sendMessage("loginUserData", user);
    d2dservice.sendMessage("switchLoginToChat");
    wt_mode = 'guest';
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

    let data = users.map(user => {
        return {
            id: user.id,
            shared: user.shared
        }
    });

    d2dservice.sendMessage("userShared", data);
}

function switchRoomToChat() {
    roomid = document.getElementById("roomid");
    d2dservice.sendMessage("switchRoomToChat", roomid.value);
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
