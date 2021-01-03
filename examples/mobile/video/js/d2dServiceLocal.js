class D2DServiceLocal {
    constructor() {
        this.initialize();
    }
    initialize() {
        this.wsBase = "ws://localhost:";
        this.defaultPort = "9000";
        this.pkgId = "OZBS6gG8Jl";
        this.port = null;
        this.TO_ALL = 100; // Assume that only 100 clients can be connected to a web socket server
        this.websocket = null;
        this.url = null;
        this.SERVER = -1;

        this.clients = [];
        // extract a port number from query and apply it on wsUri
        this.url = document.location.href;
        this.qs = this.url.substring(this.url.indexOf('?') + 1).split('&');
        for (var i = 0, result = {}; i < this.qs.length; i++) {
            this.qs[i] = this.qs[i].split('=');
            result[this.qs[i][0]] = decodeURIComponent(this.qs[i][1]);
        }
        this.port = result.port;
        this.wsUri = this.wsBase.concat((this.port) ? this.port : this.defaultPort, "/", this.pkgId);
        this.websocket = new WebSocket(this.wsUri);
        this.websocket.onmessage = function(evt) {
            var msg = JSON.parse(evt.data);
            console.log("[Video] D2DServiceLocal.webscocket.onmessage: ", msg);
            if (msg.id === this.SERVER && msg.type === "new_client") {
                this.clients.push(msg.data);
            }
            onMessage(evt);
        };
    }

    doSend(type, data, whom = this.TO_ALL) {
        var packet = {type: type, data: data, id: whom};
        this.websocket.send(JSON.stringify(packet));
    }

    sendMessage(what, data, whom = this.TO_ALL) {
        this.doSend(what, data, whom);
    }
}
