var React = require('react');
var HomeStore = require('../Store/Home.js');
var HomeAction = require('../Action/Load.js');
var assert = require('assert');

var HomeView = React.createClass({
    getInitialState() {
        return HomeStore.getState();
    },

    componentDidMount() {
        HomeStore.listen(this.onChange);
        assert(this.props.params.hasOwnProperty('userId'));
        assert(this.props.hasOwnProperty('params'))
        return HomeAction.initialLoad(this.props.params.userId);
    },

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        if (this.state.loading) { return (<div>LOADING</div>) }
        if (this.state.error) { return (<div>ERROR</div>) }
        return (
            <ul>
                { JSON.stringify(this.state) }
            </ul>
        );
    }
});

module.exports = HomeView;
