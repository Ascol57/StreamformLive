const { OBSWebSocket } = require('obs-websocket-js');

module.exports = class OBS {
    constructor(OBSToken, callback = (() => { })) {
        this.OBSToken = OBSToken;
        this.connected = false;
        var interval = setInterval(() => {
            this.connect().then(() => {
                clearInterval(interval);
                interval = setInterval(() => {
                    this.getScenes().then(() => {
                        clearInterval(interval);
                        callback(this);
                        console.log('Connected to OBS');
                        this.connected = true;
                    }).catch((error) => {
                        
                    });
                }, 100);
            }).catch((error) => {
                
            });
        }, 100);
    }

    async connect() {
        this.obs = new OBSWebSocket();
        await this.obs.connect('ws://127.0.0.1:5000', this.OBSToken);
    }

    async disconnect() {
        await this.obs.disconnect();
        this.connected = false;
    }

    async getScenes() {
        return await this.obs.call('GetSceneList');
    }
}