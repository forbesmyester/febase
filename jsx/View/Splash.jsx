"use strict";

var React = require('react');
var SplashStore = require('../Store/Splash.js');
var SplashAction = require('../Action/Load.js');

var mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    LinearProgress = mui.LinearProgress;

var Navigation = require('react-router').Navigation;

var SplashView = {

    mixins: [Navigation],

    getInitialState: function() {
        return SplashStore.getState();
    },

    componentDidMount: function() {
        SplashStore.listen(this.onChange);
        SplashAction.initialLoad();
    },

    componentWillUnmount: function() {
        SplashStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    continueToSiac: function(event) {
        event.preventDefault();
        this.transitionTo(this.getUrl());
    },

    getUrl: function() {
        return "/user/" + this.state.userId;
    },

    render: function() {
        if (this.state.loading) {
            return ( <LinearProgress mode="indeterminate" /> );
        }
        if (this.state.error) {
            // TODO: Need to allow user to reset device here.
            return (<div>ERROR</div>);
        }
        return (
            <RaisedButton href={ this.getUrl() } linkButton={ true } onClick={ this.continueToSiac } label="Continue to SIAC" />
        );
    }
};

module.exports = React.createClass(SplashView);
