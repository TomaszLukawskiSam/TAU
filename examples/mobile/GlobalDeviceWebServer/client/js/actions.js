const serverPort = 9000;
const serverURL = window.location.protocol + '//' + window.location.hostname;

class Actions {
    /**
     * Launch App on TV
     * This method creates function for onclick listener
     * @param {string} appPkgID
     * @param {string} appAppID
     * @param {Function} callback
     * @returns {Function}
     */
    launchAppOnTV(appPkgID, appAppID, callback) {
        const xhr = new XMLHttpRequest();

        var self = this;
        var retFunc = function() {
            var data = {
                appPkgID: appPkgID,
                appAppID: appAppID
            };
            self.sendDataToApp(appAppID, data, callback);
        };
        return retFunc;
    };

    /**
     * Send data to host
     * @param {string} appID
     * @param {Object} data
     * @param {Function} callback
     */
    sendDataToApp(appID, data, callback) {
        const xhr = new XMLHttpRequest();

        data.appAppID = appID;
        data.appPkgID = appID.replace(/\..+$/, "");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    var response = JSON.parse(xhr.responseText);
                    if (typeof callback === "function") {
                        callback(response);
                    }
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('POST', serverURL + ':' + serverPort + '/app');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    };
}

export default Actions;

