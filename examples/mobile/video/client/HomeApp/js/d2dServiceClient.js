class D2DServiceClient {
    constructor() {
        this.initialize();
    }
    initialize() {
        this.id;
        this.link = document.location.href;
        this.pkgId = "OZBS6gG8Jl";
        this.wsUri = "ws://" + this.link.split("/")[2] + "/" + this.pkgId;
        this.websocket = null;
        this.SERVER = -1;
        this.websocket = new WebSocket(this.wsUri);
        this.websocket.onmessage = function(evt) {
            var msg = JSON.parse(evt.data);
            if (msg.id == this.SERVER && msg.type == "id")
                this.id = msg.data;

            if (this._onMessage) {
                this._onMessage(evt);
            }
        };
    }

    doSend(type, data) {
        var packet = {type: type, data: data, id: this.id};
        this.websocket.send(JSON.stringify(packet));
    }

    sendMessage(what, data) {
        this.doSend(what, data);
    }
}
