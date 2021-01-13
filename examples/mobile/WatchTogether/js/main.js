var d2dservice = new D2DServiceLocal();
var container;
var localConnection;
var remoteConnection;
var localChannel;
var remoteChannel;
var videoGrid;
var localVideo;
var remoteVideo = {};
var pc = {};
var dataChannel = {};
var socketIds = new Set();
var videoElement;

function init() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Main JS!');
    container = document.getElementById("messageBox");
    videoGrid = document.getElementById('video-grid');
    localVideo = document.getElementById('local-video');
    videoElement = document.getElementById("videoControl");

    const logMessage = (message) => {
        console.log(message);
    };

    const showMessage = (message) => {
        if (message === "playVideo") {
            videoElement.play();
        } else if (message === "pauseVideo") {
            videoElement.pause();
        }
        var divElement = document.createElement("div");
        divElement.style.padding = "5px 0";
        divElement.style.color = "#bfc4cc";
        divElement.appendChild(document.createTextNode(message));
        container.appendChild(divElement);
    }

    // Open Camera To Capture Audio and Video
    navigator.mediaDevices
        .getUserMedia({ video: { width: 240, height: 320 }, audio: false })
        .then((stream) => {
            // Show My Video
            videoGrid.style.display = 'grid';
            videoGrid.style.marginTop = '75px';
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
        if (msg.type == "inputTextData") {
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
        } else if (msg.type == "playVideo") {
            var videoElement = document.getElementById("videoControl");
            videoElement.play();
            for (let id of socketIds) {
                if (dataChannel[id]) {
                    dataChannel[id].send("playVideo");
                }
            }
        } else if (msg.type == "pauseVideo") {
            var videoElement = document.getElementById("videoControl");
            videoElement.pause();
            for (let id of socketIds) {
                if (dataChannel[id]) {
                    dataChannel[id].send("pauseVideo");
                }
            }
        } else {
            console.log('Not matched Message...');
        }
    }
}

function play() {
    var videoElement = document.getElementById("videoControl");
    videoElement.play();
}

function pause() {
    var videoElement = document.getElementById("videoControl");
    videoElement.pause();
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