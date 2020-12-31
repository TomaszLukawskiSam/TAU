"use strict";
var WebSocketServer = require('ws').Server;
const serviceWsClientIp = "1";
const TO_ALL = 100;
let wsClients = [];
let serviceWs = [];

var RelayServer = function(httpserver, options) {
    var wsServer = new WebSocketServer({ server : httpserver });

    wsServer.on('connection', function(ws, req) {
        console.log("relay-service: connection", ws, req);
        // In case of local client, remoteAddress will be ::1
        // In case of remote client, remoteAddress will be ::ffff:ipaddress
        // e.g.) ::ffff:192.168.0.21
        const rawIp = req.socket.remoteAddress;
        const ip = rawIp.slice(rawIp.lastIndexOf(":") + 1);
        const pkgId = req.url.slice(1); // get the substring after '/' from req.url

        if (serviceWs[pkgId] === undefined) {
            serviceWs[pkgId] = null;
        }
        if (wsClients[pkgId] === undefined) {
            wsClients[pkgId] = [];
        }
        if (ip === serviceWsClientIp || ip === '127.0.0.1') {
            console.log("connected from local");
            serviceWs[pkgId] = ws;
            if (!wsClients[pkgId].length) {
                console.log("connected : no client-clients");
            }
            console.log("relay-service: ws", ws);
            ws.on('message', function(msg) {
                console.log("msg[" + msg + "]");
                const res_msg = 'Success to send : ' + msg;

                let myPkgId = null;
                for (let key in serviceWs) {
                    if (serviceWs[key] === ws) {
                        myPkgId = key;
                        break;
                    }
                }

                let id = JSON.parse(msg).id;
                if (id == -1) {
                    // Do what need to handle in relay server only
                    return;
                }
                if (!wsClients[myPkgId].length)
                    return;
                if (id == TO_ALL) {
                    for (let client of wsClients[myPkgId])
                        client.send(msg);
                } else {
                    if (id < wsClients[myPkgId].length)
                        wsClients[myPkgId][id].send(msg);
                }
            });
        } else {
            console.log("connected from", ip);
            if (wsClients[pkgId].indexOf(ws) == -1) {
                wsClients[pkgId].push(ws);
                let index = wsClients[pkgId].length - 1;
                let res = JSON.stringify({type: "id", data: index, id: -1});
                ws.send(res);
                if (serviceWs[pkgId] === null)
                    console.log("connected : no server-client")
                else {
                    serviceWs[pkgId].send(JSON.stringify({type: "new_client", data: index, id: -1}));
                }
            }
            ws.on('message', function(msg) {
                console.log("msg[" + msg + "]");
                const res_msg = 'Success to send : ' + msg;

                let myPkgId = null;
                for (let key in wsClients) {
                    if (wsClients[key].indexOf(ws) != -1) {
                        myPkgId = key;
                        break;
                    }
                }

                if (serviceWs[myPkgId])
                    serviceWs[myPkgId].send(msg);
            });
            ws.on('close', function(msg) {
                let myPkgId = null;
                for (let key in wsClients) {
                    if (wsClients[key].indexOf(ws) != -1) {
                        myPkgId = key;
                        break;
                    }
                }

                let index = wsClients[myPkgId].indexOf(ws);
                wsClients[myPkgId].splice(index, 1);
                serviceWs[myPkgId].send(JSON.stringify({type: "client_disconnect", data: {totalcount: wsClients[myPkgId].length, id: index}, id: -1}));
            });
        }
    });
};

module.exports = RelayServer;
