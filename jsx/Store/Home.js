"use strict";

var alt = require('../alt');
var LoadAction = require('../Action/Load.js'),
    R = require('require-parts')('ramda', 'src', ['forEach', 'toPairs']);

class HomeStore {

    constructor() {
        this.errorMsg = null;
        this.loading = true;
        this.bindListeners({
            initialLoad: LoadAction.INITIAL_LOAD
        });
    }

    updateObj(ob) {
        R.forEach(
            ([k, v]) => this[k] = v,
            R.toPairs(ob)
        );
    }

    initialLoad(userId) {
        setTimeout(function() {
            this.me = { userId: userId, firstname: "Bob", lastname: "Smith" };
            this.loading = false;
            this.emitChange();
        }.bind(this), 1000);

    }
}

module.exports = alt.createStore(HomeStore, 'HomeStore');
