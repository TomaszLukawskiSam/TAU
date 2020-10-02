var express = require('express');
var http = require('http');
var path = require("path");
var EventEmitter = require('events');

var httpserver, evtEmit, appsrwDir;
var apps, dataApps = [];
var relayServer = require('./relay-server.js');

function addD2Ddata(appPkgID, appAppID, appName, iconPath) {
  var metaDataArray = tizen.application.getAppMetaData(appAppID);
  for (var j = 0; j < metaDataArray.length; j++) {
    if(metaDataArray[j].key === "d2dservice" && metaDataArray[j].value === "enable" ) {
      var iconName = iconPath.substring(iconPath.lastIndexOf('/')+1);
      var iconCopyPath = require('path').join(appsrwDir, '../../../data/client/images', iconName);
      tizen.filesystem.copyFile(iconPath, iconCopyPath, true);
      dataApps.push({
        d2dApp: {
          appPkgID: appPkgID,
          appAppID: appAppID,
          appName: appName,
          iconName: iconName,
        }
      });
    }
  }
}

function removeD2Ddata(packageId) {
  for (var j = 0; j < dataApps.length; j++) {
    if (packageId && !packageId.indexOf(dataApps[j].d2dApp.appPkgID)) {
      var iconFile = require('path').join(appsrwDir, '../../../data/client/images', dataApps[j].d2dApp.iconName);
      tizen.filesystem.deleteFile(iconFile);
      dataApps.splice(j,1);
    }
  }
}

function setData() {
  var i;
  dataApps.length = 0;
  for (i = 0; i < apps.length; i++) {
    addD2Ddata(apps[i].packageId, apps[i].id, apps[i].name, apps[i].iconPath);
  }
}

function getAppList() {
  var i;
  if (tizen.application) {
    try {
      tizen.application.getAppsInfo(function(applications) {
        apps = applications;
        setData();
      });
    } catch (err) {
      return false;
    }
    return true;
  }
  return false;
}

function setPackageInfoEventListener() {
  var packageEventCallback = {
    oninstalled: function(packageInfo) {
      console.log("The package " + packageInfo.name + " is installed");
      addD2Ddata(packageInfo.id, packageInfo.appIds[0], packageInfo.name, packageInfo.iconPath);
      evtEmit.emit("updateapplist", "message", dataApps);
    },
    onupdated: function(packageInfo) {
      console.log("The package " + packageInfo.name + " is updated");
    },
    onuninstalled: function(packageId) {
      console.log("The package " + packageId + " is uninstalled");
      removeD2Ddata(packageId);
      evtEmit.emit("updateapplist", "message", dataApps);
    }
  };
  tizen.package.setPackageInfoEventListener(packageEventCallback);
}

function unsetPackageInfoEventListener() {
  tizen.package.unsetPackageInfoEventListener();
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
    console.log('Server is listening on port ' + g.port);
  });
  evtEmit = new EventEmitter();
  app.use(express.json());
  app.use('/app', appProxy(app, g.port));
  
  var optDir = require('path').join(__dirname, '../client');
  var appPath = __dirname.substring(__dirname.indexOf('/',10)+1);
  appsrwDir = require('path').join('/home/owner/apps_rw/', appPath);
  g.baseDir = require('path').join(appsrwDir, '../../../data/client');
  tizen.filesystem.createDirectory(g.baseDir, true);
  tizen.filesystem.copyDirectory(optDir,g.baseDir,true);

  app.use(express.static(g.baseDir));

  app.get(/^\/(|enter-name\.html|index\.html)$/, (req, res) => {
    res.redirect('client.html');
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
