"use strict";

var alt = require('../alt'),
    AltLeftNavAction = require('../Action/AltLeftNav');

class AltLeftNavStore {

    constructor() {
        this.menuItems = [];
        this.open = false;
        this.bindListeners({
            setOpen: AltLeftNavAction.SET_OPEN,
            setMenuItems: AltLeftNavAction.SET_MENU_ITEMS
        });
    }

    setMenuItems(mis) { this.menuItems = mis; }

    setOpen(o) {
        this.open = o;
    }

}

module.exports = alt.createStore(AltLeftNavStore, 'AltLeftNav');
