var StylesheetFactory = require('react-style');
var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');

var stylesheet = StylesheetFactory.create({
    header: { 'background-color': 'grey' },
    field: {
        set: {
            width: '500px',
            margin: 'auto'
        },
        label: {
            display: 'inline-block',
            width: '100px'
        },
        onlyvalue: {
            display: 'inline-block',
            'margin-left': '100px',
            width: ' calc(100% - 100px)'
        },
        value: {
            display: 'inline-block',
            width: 'calc(100% - 100px)'
        }
    }
});

var Actions = Reflux.createActions({
    increment: { children: ["incrementCompleted", "incrementFailed"] }
});

var incStore = Reflux.createStore({
    listenables: [Actions],
    getInitialState: function() {
        this.val = 0;
        return this._represent(this.val);
    },
    _represent: function(val, loading, error) {
        return {
            value: val,
            loading: (loading ? true : false),
            error: (error ? true : false)
        };
    },
    incrementCompleted: function (v) { this.trigger(this._represent(v)); },
    incrementFailed: function(e) { this.trigger(this._represent(-1, false, true)); },
    increment: function() {

        this.trigger(this._represent(this.val, true));
        setTimeout(function() {
            this.val = this.val + 1;
            if (this.val == 5) {
                return this.incrementFailed(this.val);
            }
            this.incrementCompleted(this.val);
        }.bind(this), 1000);

    }
})

var DisplayBob = React.createClass({
    mixins: [Reflux.connect(incStore, "incrementing")],
    render: function() {
        var els = [<span>{this.state.incrementing.value}</span>];
        if (this.state.incrementing.error) {
            els.unshift(<span>Error</span>);
        }

        return (<div styles={[stylesheet.field.set]}><div styles={[stylesheet.field.onlyvalue]}>{els}</div></div>);
    }
});

var ButtonBob = React.createClass({
    mixins: [Reflux.connect(incStore, "incrementing")],
    render: function() {
        var txt = 'Bob';
        if (this.state.incrementing.loading) {
            txt = '* ' + txt;
        }
        return (
            <div styles={[stylesheet.field.set]}>
                <span styles={[stylesheet.field.label]}>ClickInput: </span>
                <span styles={[stylesheet.field.value]}>
                    <button onClick={function() { Actions.increment()} }>{ txt }</button>
                </span>
            </div>
        );
    }
});

var Template = React.createClass({
    render: function() {
        return (
            <div>
                <h1 styles={[stylesheet.header]}>Template</h1>
                <ReactRouter.RouteHandler />
            </div>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (<ReactRouter.Link to="/counter">Go click it now!</ReactRouter.Link>);
    }
});

var Counter = React.createClass({
    render: function() {
        return (
            <div>
                <ButtonBob />
                <DisplayBob />
                <ReactRouter.Link to="/">back</ReactRouter.Link>
            </div>
        );
    }
});

var NotFound = React.createClass({
    render: function() { return (<span>NOT FOUND!!</span>); }
});

var routes = (
    <ReactRouter.Route handler={Template} path="/">
        <ReactRouter.DefaultRoute handler={Home} />
        <ReactRouter.Route path="/" name="home" handler={Home} />
        <ReactRouter.Route path="/counter" name="counter" handler={Counter} />
        <ReactRouter.NotFoundRoute handler={NotFound} />
    </ReactRouter.Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.getElementById('root'));
});

