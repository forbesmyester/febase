"use strict";

var StylesheetFactory = require('react-style');
var React = require('react');
var ReactRouter = require('react-router');
var HomeView = require('./View/Home.jsx');
var SplashView = require('./View/Splash.jsx');

// TODO: Remove when can.
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    AppBar = mui.AppBar;

var stylesheet = StylesheetFactory.create({
    header: {
        backgroundColor: 'grey'
    },
    field_set: {
        width: '500px',
        margin: 'auto'
    },
    field_label: {
        display: 'inline-block',
        width: '100px'
    },
    field_onlyvalue: {
        display: 'inline-block',
        'margin-left': '100px',
        width: ' calc(100% - 100px)'
    },
    field_value: {
        display: 'inline-block',
        width: 'calc(100% - 100px)'
    }
});

var Template = React.createClass({

    displayName: "Template",

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    render: function() {
        return (
            <div>
                <AppBar title='An app with users' showMenuIconButton={ false } />
                <ReactRouter.RouteHandler />
            </div>
        );
    }
});


        // <ReactRouter.Route path="/" name="home" handler={Home} />
        // <ReactRouter.Route path="/counter" name="counter" handler={Counter} />
        // <ReactRouter.NotFoundRoute handler={NotFound} />
var routes = (
    <ReactRouter.Route handler={Template} path="/">
        <ReactRouter.DefaultRoute handler={SplashView} />
        <ReactRouter.Route
            handler={HomeView}
            name="/user/:userId"
            path="/user/:userId" />
    </ReactRouter.Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Handler) {
    /* global document */
    React.render(<Handler/>, document.getElementById('root'));
});

