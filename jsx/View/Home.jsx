"use strict";
var React = require('react'),
    HomeStore = require('../Store/Home.js'),
    HomeAction = require('../Action/Load.js');

var HomeView = React.createClass({

    propTypes: {
        params: React.PropTypes.shape({
            userId: React.PropTypes.string.isRequired
        })
    },

    getInitialState() {
        return HomeStore.getState();
    },

    componentDidMount() {
        HomeStore.listen(this.onChange);
        return HomeAction.initialLoad(this.props.params.userId);
    },

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        if (this.state.loading) { return (<div>LOADING</div>); }
        if (this.state.error) { return (<div>ERROR</div>); }
        return (
            <ul>
                { JSON.stringify(this.state) }
            </ul>
        );
    }
});

module.exports = HomeView;
