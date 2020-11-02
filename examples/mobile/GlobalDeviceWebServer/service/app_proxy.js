var express = require('express');
const AppRouter = require('./app_router');
var appRouters = [];
var path = null;
var currentD2DAppId = null;

const indexGet = (req, res) => {
    var baseRoute = 'app';
    var appRouter = appRouters.filter(function (router) {
        return router.path === path;
    })[0];

    if (appRouter) {
        const myApp = '/' + appRouter.name;
        const myRoute = baseRoute.concat(myApp);
        res.redirect(myRoute);
        appProxy.use(myApp, appRouter.router);    
    }
}

const launchApp = (appId, port, callback) => {
    const appControl = new tizen.ApplicationControl(
        "http://tizen.org/appcontrol/operation/default", null, null, null,
        [new tizen.ApplicationControlData(
            "http://tizen.org/appcontrol/data/launch_port", [port]
        )]
    );

    tizen.application.launchAppControl(appControl, appId, callback, null);
}

module.exports = function(app, port) {
    var appProxy = express.Router();

    appProxy.use('/app', express.json());

    appProxy.post('/', (req, res) => {
        path = req.body.appPkgID ? req.body.appPkgID : path;
        var appId = req.body.appAppID;
        var name = appId.split(".")[1];
        var appRouter = appRouters.filter((router) => {
            return router.path === path;
        })[0];

        if (!appRouter) {
            appRouters.push({
                path: path,
                name: name,
                router: new AppRouter(app, path)
            });
        }

        function onRunningAppsContext(contexts) {
            var context = contexts.filter(function (context) {
                return context.appId = appId;
            })[0];

            if (context && currentD2DAppId === appId) {
                res.send({port:port});
            } else {
                launchApp(appId, port, function() {
                    res.send({port:port});
                });
    
                currentD2DAppId = appId;
            }
        }
       
        tizen.application.getAppsContext(onRunningAppsContext);
    });

    appProxy.get('/', indexGet);

    return appProxy;
}

