"use strict";

var alt = require('../alt');
var LoadAction = require('../Action/Load.js');
var R = require('ramda');

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
        console.log("i1", userId);
        setTimeout(function() {
        console.log("i2");
            this.me = { userId: userId, firstname: "Bob", lastname: "Smith" };
            this.loading = false;
            this.emitChange();
        console.log("i3");
        }.bind(this), 1000);

    }
}

module.exports = alt.createStore(HomeStore, 'HomeStore');
