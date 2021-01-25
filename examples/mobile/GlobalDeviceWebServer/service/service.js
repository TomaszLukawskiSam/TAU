var express = require('express');
var http = require('http');
var path = require("path");
var EventEmitter = require('events');
var WebSocket = require('ws');
var clientRouter = express.Router();

var httpserver, evtEmit, d2dService;
var apps, dataApps = [];
var serverAppId = '';
var relayServer = require('./relay-server.js');
var globalAppPath = '/opt/usr/globalapps';
var urlParam;
const TIZEN_WEB_APP_SHARED_RESOURCES = 'shared/res/';
const WEBCLIP_DIRECTORY = 'webclip';
const WEBCLIP_MANIFEST = 'manifest.json';

class D2DServiceLocal {
  constructor() {
      this.initialize();
  }
  initialize() {
      const pkgId = "2FUI52kIJP";
      const SERVER = -1;
      const clients = [];
      const scale = 2.5;

      this.TO_ALL = 100; // Assume that only 100 clients can be connected to a web socket server
      this.websocket = new WebSocket("ws://localhost:9000/" + pkgId);

      this.websocket.onmessage = function(evt) {
        console.log("D2DServiceLocal.webscocket.onmessage: ", webapis);
        var msg = JSON.parse(evt.data);
        if (msg.id == SERVER) {
          if (msg.type == "new_client") {
            clients.push(msg.data);
            webapis.mde.initVirtualEventGenerator(0);
            webapis.mde.initVirtualEventGenerator(1);
          }
        } else {
          if (msg.type == "keypress") {
            webapis.mde.generateVirtualKeyEvent(msg.data.keycode, 2);
          } else if (msg.type == "click") {
            webapis.mde.generateVirtualMouseButtonEvent(1, 2);
          } else if (msg.type == "touchmove") {
            if (parseInt(msg.data.x * scale) != 0 && parseInt(msg.data.y * scale) != 0) {
              webapis.mde.generateVirtualMouseMoveEvent(parseInt(msg.data.x * scale), parseInt(msg.data.y * scale), 1);
            }
          }
        }
      };
      this.websocket.onclose = function(evt) {
        webapis.mde.deInitVirtualEventGenerator(0);
        webapis.mde.deInitVirtualEventGenerator(1);
      };
  }

  doSend(type, data, whom = this.TO_ALL) {
      var packet = {type: type, data: data, id: whom};
      this.websocket.send(JSON.stringify(packet));
  }

  sendMessage(what, data, whom = this.TO_ALL) {
    console.log("D2DServiceLocal.sendMessage: ", what, data);
    this.doSend(what, data, whom);
  }

}

function addD2Ddata(appPkgID, appAppID, appName, iconPath) {
  var metaDataArray = tizen.application.getAppMetaData(appAppID),
    app = null;

  metaDataArray = metaDataArray.filter(function (metaData) {
    return metaData.key === "d2dservice" && metaData.value === "enable";
  });
  metaDataArray.forEach(function () {
    let appPath = path.join(globalAppPath, appPkgID, TIZEN_WEB_APP_SHARED_RESOURCES);

    //let iconCopyPath = path.join(appsrwDir, '../../../data/client/images', iconName);
    //tizen.filesystem.copyFile(iconPath, iconCopyPath, true);

    app = {
      d2dApp: {
        appPkgID: appPkgID,
        appAppID: appAppID,
        appName: appName,
        iconPath: iconPath
      },
      path: path.join(appPath)
    }

    dataApps.push(app);
  });

  return app;
}

function removeD2Ddata(packageId) {
  for (var j = 0; j < dataApps.length; j++) {
    if (packageId && !packageId.indexOf(dataApps[j].d2dApp.appPkgID)) {
      //var iconFile = require('path').join(appsrwDir, '../../../data/client/images', dataApps[j].d2dApp.iconName);
      //tizen.filesystem.deleteFile(iconFile);
      dataApps.splice(j,1);
    }
  }
}

function setData() {
  var i;

  for (i = 0; i < apps.length; i++) {
    addD2Ddata(apps[i].packageId, apps[i].id, apps[i].name, apps[i].iconPath);
  }
}

function getAppList() {
  if (tizen.application) {
    try {
      tizen.application.getAppsInfo(function(applications) {
        apps = applications;
        setData();
        getWebclipsManifest();
      });
    } catch (err) {
      return false;
    }
    return true;
  }
  return false;
}

function getWebclipsManifestByApp(app) {
  var fileHandle;
  var filePath = path.join(app.path, WEBCLIP_DIRECTORY, WEBCLIP_MANIFEST);
  var data;

  try {
    fileHandle = tizen.filesystem.openFile(filePath, "r");
  } catch (err) {
    console.log('[GlobalWebServer] tizen.filesystem.openFile (error): ', filePath, err);
  }

  if (fileHandle) {
    try {
      data = fileHandle.readString();
      data = data.replace(/\n/g, "");
      data = JSON.parse(data);
      app.webclip = {};
      app.webclip.manifest = data;
    } catch (err) {
      console.log('[GlobalWebServer] fileHandle.readString (error): ', err);
      app.webclip = null;
    }
    fileHandle.close();
  }
}

function getWebclipsManifest() {
  dataApps.forEach(
    getWebclipsManifestByApp
  );
}

function setPackageInfoEventListener() {
  var packageEventCallback = {
    oninstalled: function(packageInfo) {
      console.log("[GlobalWebServer] The package " + packageInfo.name + " is installed");
      let app = addD2Ddata(packageInfo.id, packageInfo.appIds[0], packageInfo.name, packageInfo.iconPath);
      getWebclipsManifestByApp(app);
      evtEmit.emit("updateapplist", "message", dataApps);
    },
    onupdated: function(packageInfo) {
      console.log("[GlobalWebServer] The package " + packageInfo.name + " is updated");
    },
    onuninstalled: function(packageId) {
      console.log("[GlobalWebServer] The package " + packageId + " is uninstalled");
      removeD2Ddata(packageId);
      evtEmit.emit("updateapplist", "message", dataApps);
    }
  };
  tizen.package.setPackageInfoEventListener(packageEventCallback);
}

function unsetPackageInfoEventListener() {
  tizen.package.unsetPackageInfoEventListener();
}

function getWebClipsList() {
  var result = [];
  var webclips = [];

  dataApps.forEach(function (app) {
    webclips = [];
    if (app.webclip && app.webclip.manifest) {
      webclips.push({
        url: path.join('webclip', app.webclip.manifest.name),
        isSelected: true
      });
    }
    result.push({
      appID: app.d2dApp.appAppID,
      pkgID: app.d2dApp.appPkgID,
      isInstalled: true,
      isActive: false,
      webClipsList: webclips
    });
  });

  return result;
}

var HTTPserverStart = function() {
  var g = {
    port: 9000,
    baseDir: __dirname,
  };

  var app = express();
  var appProxy = require('./app_proxy');

  httpserver = http.createServer(app);
  httpserver.listen(g.port, function() {
    console.log('[GlobalWebServer] Server is listening on port ' + g.port);
  });
  evtEmit = new EventEmitter();
  app.use(express.json());

  d2dService = new D2DServiceLocal();
  console.log("[GlobalWebServer] d2dService define: ", d2dService);

  app.use('/app', appProxy(app, g.port, d2dService));

  //g.baseDir = '/opt/usr/globalapps';
  console.log("[GlobalWebServer] __dirname: ", __dirname);

  if (webapis.cachedProperty !== undefined) {
    globalAppPath = '/opt/usr/apps'
    console.log("[GlobalWebServer] TV Profile");
  }

  var tizenApp = tizen.application.getCurrentApplication();
  console.log("[GlobalWebServer] ID, packageId: ", tizenApp.appInfo.id, tizenApp.appInfo.packageId);
  serverAppId = tizenApp.appInfo.id.split('.')[0];
  g.baseDir = __dirname.split(serverAppId)[0];
  console.log("[GlobalWebServer] g.baseDir: ", g.baseDir);

  clientRouter.get('/webclip/*', function (req, res) {
    let file = req.originalUrl.replace('/client/webclip/', '').replace(/\?.+$/, '');

    let webclipName = '';
    let appId;

    let match = file.match(/^[^\/]+/);
    if (match) {
      webclipName = match[0];
    }
    console.log("[GlobalWebServer] webclip name: ", webclipName);

    // find appId by webclip name
    let app = dataApps.filter(function (app) {
      return !!app.webclip && app.webclip.manifest.name === webclipName;
    })[0];
    if (app) {
      appId = app.d2dApp.appPkgID;;
    }

    let options = {
      root: path.join(globalAppPath, appId, TIZEN_WEB_APP_SHARED_RESOURCES, WEBCLIP_DIRECTORY)
    };

    // remove weblip name from path
    file = file.replace(webclipName + '/', '');
    res.sendFile(file, options, function (err) {
      if (err) {
        console.log("[GlobalWebServer] err: ", err);
        res.send("err", err);
      } else {
        console.log("[GlobalWebServer] res.sendFile() done: ", file);
      }
    });
  });

  clientRouter.get('/updateWebclip', function (req, res) {
    console.log("[GlobalWebServer] get(/updateWebclip)");
    var apps = getWebClipsList();
    var result = {
      type: "full",
      data: {
        apps: apps
      }
    }
    res.send(result);
  });

  clientRouter.get('/*', function (req, res) {
    let file = req.originalUrl.replace('/client/', '').replace(/\?.+$/, '');
    let fullPath = require('path').join(g.baseDir, 'QKatUa7aon', '/res/wgt/client', file);
    console.log("[GlobalWebServer] fullPath: ", fullPath);
    res.sendFile(fullPath);
  });

  app.use('/client', clientRouter);

  app.get('/d2dicon/*', (req, res) => {
    let fullPath = req.originalUrl.replace("d2dicon", globalAppPath);
    res.sendFile(fullPath);
  });

  app.get('/appList', (req, res) => {
    res.send(dataApps);
  });

  app.get('/updateAppList', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    evtEmit.on("updateapplist", (event, data) => {
      res.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
    });
  });

  app.get('/', function (req, res) {
    urlParam = req.originalUrl;
    // In case of invited url,the device home url has the "roomid" as to http://xxx.xxx.xxx.xxx:9000/?roomid=aaa
    if ( urlParam.indexOf('/?roomid') != -1) {
      res.redirect("/client/invited.html");	
    } else {
      res.redirect("/client/client.html");
    }
  });

  // receive data or cmd to app on device
  app.post('/app', (req, res) => {
    res.send({
      result: "ok"
    });
  });

  app.post('/url', (req, res) => {
    webapis.mde.launchBrowserFromUrl(req.body.url);
  });

  new relayServer(httpserver);
};

module.exports.onStart = function() {
  getAppList();
  HTTPserverStart();
  setPackageInfoEventListener();
  console.log("onStart is called in service1");
};
module.exports.onStop = function() {
  if (httpserver) {
    httpserver.close();
    console.log('Server Terminated');
  }
  unsetPackageInfoEventListener();
  evtEmit.off("updateapplist");
  console.log("onStop is called in service1");
};
