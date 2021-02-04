var d2dservice = new D2DServiceLocal();
var container;
var localConnection;
var remoteConnection;
var localChannel;
var remoteChannel;
var faceContainer;
var videoGrid;
var localVideo;
var remoteVideo = {};
var pc = {};
var dataChannel = {};
var socketIds = new Set();
var videoElement;
var loginName;
var loginId;
var roomName;
var broadCaster;
var requestFullPath;
var jsonObj = new Object();
var jsonArray = new Array();
var roomPage = document.getElementById("haveRoomPage");
var defaultPage = document.getElementById("defaultPage");

function separateParam(url) {
    var roomSep = url.substring(0, url.indexOf("&", 0));                        /* /?roomId=`123` */
    var broadCasterSep = url.substr(url.indexOf("&", 0) + 1);                   /* broadcaster=`true` */
    roomName = roomSep.substr(roomSep.lastIndexOf("=") + 1);                    /* 123 */
    broadCaster = broadCasterSep.substr(broadCasterSep.lastIndexOf("=") + 1);   /* true */
}

function getRoomId() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log('[WT] getRoomId : ' + xhr.responseText);
                defaultPage.style.visibility = 'hidden';
                roomPage.style.visibility = 'visible';

                if (xhr.responseText != '/') {
                    separateParam(xhr.responseText);
                } else {
                    roomName = '/';
                }
                console.log('[WT] getRoomId : ' + roomName);
                init();
            } else {
                console.error('[WT] getRoomId Error : ' + xhr.responseText);
            }
        }
    };
    defaultPage.style.visibility = 'hidden';
    roomPage.style.visibility = 'visible';
    xhr.open('GET', 'http://localhost:9000/getRoomId');
    xhr.send();
}

function init() {
    console.log('[WT] Main JS!');
    container = document.getElementById("messageBox");
    videoGrid = document.getElementById('video-grid');
    localVideo = document.getElementById('local-video');
    videoElement = document.getElementById("videoControl");
    faceContainer = document.getElementById("faceContainer");

    const logMessage = (message) => {
        console.log(message);
    };

    const showMessage = (message) => {
        // var jsonStr = JSON.stringify(message);
        // console.log('jsonStr : ' + jsonStr);
        if (message === "playVideo") {
            videoElement.play();
        } else if (message === "pauseVideo") {
            videoElement.pause();
        } else if (message.includes('name') && message.includes('id') && message.includes('shared')) {
            jsonArray.push(message);
        }
        // else if (message.type === "disconnectUser") {
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> message.id : ' + message.id);
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Before jsonArray : ' + JSON.stringify(jsonArray));
        //     console.log('jsonArray length : ' + jsonArray.length);
        //     for (var i = 0; i < jsonArray.length; i++) {
        //         if (jsonArray[i].id === message.id) {
        //             console.log('########################## jsonArray remove index : ' + i + ' / ' + jsonArray[i].id);
        //             jsonArray.splice(i, 1);
        //             break;
        //         }
        //     }
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Result jsonArray : ' + JSON.stringify(jsonArray));
        //     var oddEven = (jsonArray.length % 2) ? "Odd" : "Even";
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> oddEven : ' + oddEven);
        //     if (jsonArray.length >= 2 && !(jsonArray.length % 2)) {
        //         console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> jsonArray is Even !!');
        //         var faceAreaHeight = document.getElementById("faceContainer").clientHeight;
        //         var videoAreaHeight = document.getElementById("video-grid").clientHeight;
        //         if (videoAreaHeight < faceAreaHeight) {
        //             faceAreaHeight = faceAreaHeight - 212;
        //             faceContainer.style.height = faceAreaHeight + 'px';
        //         }
        //     }
        // } 
        else {
            var divElement = document.createElement("div");
            divElement.style.padding = "5px 0";
            divElement.style.color = "#bfc4cc";
            divElement.appendChild(document.createTextNode(message));
            container.appendChild(divElement);
            d2dservice.sendMessage("sendClientMessage", message);
        }
    }

    // Open Camera To Capture Audio and Video
    navigator.mediaDevices
        .getUserMedia({ video: { width: 400, height: 270 }, audio: false })
        .then((stream) => {
            // Show My Video
            videoGrid.style.display = 'grid';
            videoGrid.style.marginTop = '20px';
            localVideo.style.paddingLeft = '6px';
            localVideo.style.paddingRight = '6px';
            localVideo.style.border = '1px solid #566576';
            localVideo.srcObject = stream;

            // Start a Peer Connection to Transmit Stream
            initConnection(stream);
        })
        .catch((error) => console.log(error));

    const initConnection = (stream) => {
        const socket = io('http://192.168.50.35:3000');

        // Start a RTCPeerConnection to each client
        socket.on('all-users', (user) => {
            console.log('Connect ids : ' + user);
            loginId = user;
        })

        socket.on('other-users', (otherUsers) => {
            console.log('other-users : ' + JSON.stringify(otherUsers));
            // Ignore when not exists other users connected
            if (!otherUsers || !otherUsers.length) return;

            for (let i = 0; i < otherUsers.length; i++) {
                const socketId = otherUsers[i];
                if (socketIds.has(socketId)) continue;
                socketIds.add(socketId);

                // Ininit peer connection
                pc[socketId] = new RTCPeerConnection();

                // Add all tracks from stream to peer connection
                stream
                    .getTracks()
                    .forEach((track) => pc[socketId].addTrack(track, stream));

                // Send Candidtates to establish a channel communication to send stream and data
                pc[socketId].onicecandidate = ({ candidate }) => {
                    candidate && socket.emit('candidate', socketId, candidate);
                };

                // Receive stream from remote client and add to remote video area
                pc[socketId].ontrack = ({ streams: [stream] }) => {
                    console.log('ontrack ' + socketId);
                    if (!remoteVideo[socketId]) {
                        console.log('ontrack() crete video ' + socketId);
                        remoteVideo[socketId] = document.createElement('video');
                        remoteVideo[socketId].autoplay = true;
                        videoGrid.appendChild(remoteVideo[socketId]);
                    }
                    remoteVideo[socketId].style.paddingLeft = '6px';
                    remoteVideo[socketId].style.paddingRight = '6px';
                    remoteVideo[socketId].style.border = '1px solid #566576';
                    remoteVideo[socketId].srcObject = stream;

                    var faceAreaHeight = document.getElementById("faceContainer").clientHeight;
                    var videoAreaHeight = document.getElementById("video-grid").clientHeight;
                    if (videoAreaHeight > faceAreaHeight) {
                        faceAreaHeight = faceAreaHeight + 212;
                        faceContainer.style.height = faceAreaHeight + 'px';
                    }
                };

                // Start the channel to chat
                dataChannel[socketId] = pc[socketId].createDataChannel('chat_channel');

                // Function Called When Receive Message in Channel
                dataChannel[socketId].onmessage = (event) =>
                    showMessage(`${event.data}`);
                // Function Called When Channel is Opened
                dataChannel[socketId].onopen = (event) =>
                    logMessage(`channel opened: ${event.type}`);
                // Function Called When Channel is Closed
                dataChannel[socketId].onclose = (event) =>
                    logMessage(`Channel closed: ${event.type}`);

                // Create Offer, Set Local Description and Send Offer to other users connected
                pc[socketId]
                    .createOffer()
                    .then((offer) => pc[socketId].setLocalDescription(offer))
                    .then(() => {
                        socket.emit('offer', socketId, pc[socketId].localDescription);
                    });
            }
        });

        // Receive Offer From Other Client
        socket.on('offer', (socketId, description) => {
            console.log('offer ' + socketId);
            socketIds.add(socketId);
            if (pc[socketId]) {
                console.log(
                    'already have pc.. connectionState : ' + pc[socketId].connectionState
                );
                return;
            }

            // Ininit peer connection
            pc[socketId] = new RTCPeerConnection();

            // Add all tracks from stream to peer connection
            stream
                .getTracks()
                .forEach((track) => pc[socketId].addTrack(track, stream));

            // Send Candidtates to establish a channel communication to send stream and data
            pc[socketId].onicecandidate = ({ candidate }) => {
                candidate && socket.emit('candidate', socketId, candidate);
            };

            // Receive stream from remote client and add to remote video area
            pc[socketId].ontrack = ({ streams: [stream] }) => {
                console.log('ontrack ' + socketId);
                if (!remoteVideo[socketId]) {
                    console.log('ontrack() crete video ' + socketId);
                    remoteVideo[socketId] = document.createElement('video');
                    remoteVideo[socketId].autoplay = true;
                    videoGrid.appendChild(remoteVideo[socketId]);
                }
                remoteVideo[socketId].style.paddingLeft = '6px';
                remoteVideo[socketId].style.paddingRight = '6px';
                remoteVideo[socketId].style.border = '1px solid #566576';
                remoteVideo[socketId].srcObject = stream;

                var faceAreaHeight = document.getElementById("faceContainer").clientHeight;
                var videoAreaHeight = document.getElementById("video-grid").clientHeight;
                if (videoAreaHeight > faceAreaHeight) {
                    faceAreaHeight = faceAreaHeight + 212;
                    faceContainer.style.height = faceAreaHeight + 'px';
                }
            };

            // Chanel Received
            pc[socketId].ondatachannel = ({ channel }) => {
                // Store Channel
                dataChannel[socketId] = channel;

                // Function Called When Receive Message in Channel
                dataChannel[socketId].onmessage = (event) =>
                    showMessage(`${event.data}`);
                // Function Called When Channel is Opened
                dataChannel[socketId].onopen = (event) =>
                    logMessage(`channel opened: ${event.type}`);
                // Function Called When Channel is Closed
                dataChannel[socketId].onclose = (event) =>
                    logMessage(`Channel closed: ${event.type}`);
            };

            // Set Local And Remote description and create answer
            pc[socketId]
                .setRemoteDescription(description)
                .then(() => pc[socketId].createAnswer())
                .then((answer) => pc[socketId].setLocalDescription(answer))
                .then(() => {
                    socket.emit('answer', socketId, pc[socketId].localDescription);
                });
        });

        // Receive Answer to establish peer connection
        socket.on('answer', (socketId, description) => {
            console.log('answer ' + socketId);
            pc[socketId].setRemoteDescription(description);
        });

        // Receive candidates and add to peer connection
        socket.on('candidate', (socketId, candidate) => {
            console.log('candidate ' + socketId);
            pc[socketId].addIceCandidate(new RTCIceCandidate(candidate));
        });

        socket.on('close-user', (socketId) => {
            console.log('close-user ' + socketId);
            // var jsonObject = new Object();
            // jsonObject.type = 'disconnectUser';
            // jsonObject.id = socketId;
            // for (let id of socketIds) {
            //     if (dataChannel[id]) {
            //         dataChannel[id].send(JSON.stringify(jsonObject));
            //     }
            // }
            if (remoteVideo[socketId]) {
                videoGrid.removeChild(remoteVideo[socketId]);
            }
            delete remoteVideo[socketId];
            delete pc[socketId];
            delete dataChannel[socketId];
            socketIds.delete(socketId);
        });
    };
}

function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.id == d2dservice.SERVER) {
    } else {
        console.log('TV_onMessage called.');
        if (msg.type === "inputTextData") {
            var data = msg.data.userValue + ' : ' + msg.data.textValue;
            var divElement = document.createElement("div");
            divElement.style.padding = "5px 0";
            divElement.style.color = "#bfc4cc";
            divElement.appendChild(document.createTextNode(data));
            container.appendChild(divElement);
            for (let id of socketIds) {
                if (dataChannel[id]) {
                    dataChannel[id].send(data);
                }
            }
        } else if (msg.type === "playVideo") {
            videoElement.play();
            for (let id of socketIds) {
                if (dataChannel[id]) {
                    dataChannel[id].send("playVideo");
                }
            }
        } else if (msg.type === "pauseVideo") {
            videoElement.pause();
            for (let id of socketIds) {
                if (dataChannel[id]) {
                    dataChannel[id].send("pauseVideo");
                }
            }
        } else if (msg.type === "loginUserData") {
            console.log('loginUserData called.');
            loginName = msg.data;
            jsonObj.name = loginName;
            jsonObj.id = loginId;
            jsonObj.shared = true;
            jsonArray.push(jsonObj);
            for (let id of socketIds) {
                if (dataChannel[id]) {
                    dataChannel[id].send(JSON.stringify(jsonObj));
                }
            }
        } else if (msg.type === "joinedlist") {
            d2dservice.sendMessage("connectUser", jsonArray);
        } else if (msg.type === "switchRoomToChat") {
            console.log('[WT] switchRoomToChat inputRoomData : ' + msg.data);
            roomPage.style.visibility = 'visible';
            defaultPage.style.visibility = 'hidden';
            // only for check
            requestFullPath = "http://serverAddress/?roomId=" + msg.data + "&broadcaster=true&userName=" + loginName;
            console.log('[WT] Host requestFullPath : ' + requestFullPath);
        } else if (msg.type === "switchLoginToChat") {
            // not exist msg.data
            console.log('[WT] switchLoginToChat');
            roomPage.style.visibility = 'visible';
            defaultPage.style.visibility = 'hidden';
            // only for check
            requestFullPath = "http://serverAddress/?roomId=" + roomName + "&broadcaster=" + broadCaster + "&userName=" + loginName;
            console.log('[WT] Guest requestFullPath : ' + requestFullPath);
        } else {
            console.log('Not matched Message...');
        }
    }
}

function play() {
    videoElement.play();
}

function pause() {
    videoElement.pause();
}

window.onload = function () {
    getRoomId();

    document.addEventListener('tizenhwkey', function (e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) { }
        }
    });
};