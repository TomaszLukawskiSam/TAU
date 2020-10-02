var express = require('express');
const AppRouter = require('./app_router');
var appRouters = [];
var path = null;
var currentD2DAppId = null;

module.exports = function(app, port) {
    var appProxy = express.Router();
    
    appProxy.use('/app', express.json());
    appProxy.post('/', (req, res) => { 
        path = req.body.appPkgID ? req.body.appPkgID : path;
        var appId = req.body.appAppID;
        var name = appId.split(".")[1];
        var addNew = true;

        for (var i = 0; (i < appRouters.length) && (path !== null); i++) {
            if (appRouters[i].path == path) {
                addNew = false;
                break;
            }
        }
        if (addNew) {
            appRouters.push({
                path: path,
                name: name,
                router: new AppRouter(app, path)
            });
        }

        function onRunningAppsContext(contexts) {
            var isRunning = false;
            for (var i = 0; i < contexts.length; i++) {
                if (appId === contexts[i].appId) {
                    isRunning = true;
                    break;
                }
            }

            if (isRunning && currentD2DAppId === appId) {
                res.send({port:port});
            } else {
                var appControl = new tizen.ApplicationControl(
                    "http://tizen.org/appcontrol/operation/default", null, null, null,
                    [new tizen.ApplicationControlData(
                        "http://tizen.org/appcontrol/data/launch_port", [port]
                    )]
                );

                tizen.application.launchAppControl(appControl, appId, function() {
                    res.send({port:port});
                });

                currentD2DAppId = appId;
            }
        }

        tizen.application.getAppsContext(onRunningAppsContext);
    });

    appProxy.get('/', (req, res) => {
        var baseRoute = 'app';
        var myIndex = -1;
        for (var i = 0; i < appRouters.length; i++) {
            if (appRouters[i].path == path) {
                myIndex = i;
                break;
            }
        }
        var myApp = '/' + appRouters[myIndex].name;
        var myRoute = baseRoute.concat(myApp);
        res.redirect(myRoute);
        appProxy.use(myApp, appRouters[myIndex].router);
    });

    return appProxy;
}
