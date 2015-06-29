var alt = require('../alt');
console.log(alt);

class LoadActions {
    initialLoad(data) {
        this.dispatch(data);
    }
}

module.exports = alt.createActions(LoadActions);
