var React = require('react');
var HomeStore = require('../Store/Home');

var Homes = React.createClass({
    getInitialState() {
        return HomeStore.getState();
    },

    componentDidMount() {
        HomeStore.listen(this.onChange);
    },

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        return (
            <ul>{ JSON.stringify(this.state) }</ul>
        );
    }
});

module.exports = Homes;
