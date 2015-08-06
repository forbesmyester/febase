"use strict";

// var StylesheetFactory = require('react-style');
var React = require('react');
var ReactRouter = require('react-router');

var HomeView = require('./View/Home.jsx'),
    SplashView = require('./View/Splash.jsx'),
    AltLeftNav = require('./View/AltLeftNav.jsx');

var alt = require('./alt.js');

// TODO: Remove when can.
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    AppBar = mui.AppBar,
    LeftNav = mui.LeftNav,
    MenuItem = mui.MenuItem;

// var stylesheet = StylesheetFactory.create({
//     header: {
//         backgroundColor: 'grey'
//     },
//     field_set: {
//         width: '500px',
//         margin: 'auto'
//     },
//     field_label: {
//         display: 'inline-block',
//         width: '100px'
//     },
//     field_onlyvalue: {
//         display: 'inline-block',
//         'margin-left': '100px',
//         width: ' calc(100% - 100px)'
//     },
//     field_value: {
//         display: 'inline-block',
//         width: 'calc(100% - 100px)'
//     }
// });

var altLeftNavActions = alt.getActions('AltLeftNav');

altLeftNavActions.setMenuItems([
    { route: 'get-started', text: 'Get Started' },
    { route: 'customization', text: 'Customization' },
    { route: 'components', text: 'Components' },
    { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
    {
        type: MenuItem.Types.LINK,
        payload: 'https://github.com/callemall/material-ui',
        text: 'GitHub'
    },
    {
        text: 'Disabled',
        disabled: true
    },
    {
        type: MenuItem.Types.LINK,
        payload: 'https://www.google.com',
        text: 'Disabled Link',
        disabled: true
    }
]);

var Template = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    showLeftNav: function(event) {
        event.preventDefault();
        altLeftNavActions.setOpen(true);
    },

    render: function() {
        var r = (
            <div>
                <AltLeftNav />
                <AppBar title='An app with users' onLeftIconButtonTouchTap={ this.showLeftNav }/>
                <ReactRouter.RouteHandler />
            </div>
        );
        return r;
    }
});


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


