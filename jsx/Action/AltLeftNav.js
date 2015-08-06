var alt = require('../alt');

class AltLeftNav {
    setOpen(data) {
        this.dispatch(data);
    }
    setMenuItems(data) {
        this.dispatch(data);
    }
}

module.exports = alt.createActions(AltLeftNav);
// module.exports = alt.createActions(AltLeftNavActions, 'AltLeftNav');
