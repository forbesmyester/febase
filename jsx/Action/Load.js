var alt = require('../alt');

class LoadActions {
    initialLoad(data) {
        this.dispatch(data);
    }
}

module.exports = alt.createActions(LoadActions);
