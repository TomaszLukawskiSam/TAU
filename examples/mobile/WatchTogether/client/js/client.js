var d2dservice = new D2DServiceClient();
var textData;
var textArea;
var user;
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
            <input class="checkboxes" name="checkbox-share-${user.id}" type="checkbox" ${user.shared ? "checked" : ""}/>
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
    updatePopup();
}

function onPageBeforeShow(event) {
    if (event.target.id === 'chat-page') {
        onChatPageBeforeShow();
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

function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.id == d2dservice.SERVER) {
        if (msg.type === "adduser") {
            let newUser = msg.data.user;
            if (!users.some(user => user.id === newUser.id)) {
                users.push(newUser);
                updatePopup();
            } else {
                console.warn(`User (id:${user.id}) already exists`);
            }
        } else if (msg.type === "removeuser") {
            let removeUserId = msg.data.userId;
            if (users.some(user => user.id === removeUserId)) {
                users = users.filter(user => user.id !== removeUserId);
                updatePopup();
            } else {
                console.warn(`User (id:${user.id}) not exists`);
            }
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
