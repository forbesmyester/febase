var alt = require('../alt');
var LoadAction = require('../Action/Load.js');

class SplashStore {
    constructor() {
        this.userId = -1;
        this.errorMsg = null;
        this.loading = true;

        this.bindListeners({
            initialLoad: LoadAction.INITIAL_LOAD
        });
    }

    initialLoad(aboutMe) {
        this.userId = 111;
            this.emitChange();
        setTimeout(function() {
            this.userId = 10;
            this.loading = false;
            this.emitChange();
        }.bind(this),1000);

    }
}

module.exports = alt.createStore(SplashStore, 'SplashStore');

