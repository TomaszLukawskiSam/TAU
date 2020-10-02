var express = require('express');

class AppRouter {
    constructor(app, path) {
        var appRouter = express.Router();
        appRouter.use(express.static(__dirname + '/../../../../' + path + '/res/wgt/client'));

        appRouter.get('/', (req, res) => {
            res.redirect('client.html');
        });
        return appRouter;
    }
}

module.exports = AppRouter;
