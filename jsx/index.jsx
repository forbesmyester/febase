var Actions = Reflux.createActions(["increment"]);

var incStore = Reflux.createStore({
	listenables: [Actions],
	getInitialState: function() {
		return this.val = 0;
	},
	increment: function() {

		this.val = this.val + 1;
		this.trigger(this.val);
	}
})

var DisplayBob = React.createClass({
	mixins: [Reflux.connect(incStore, "incrementing")],
	render: function() {
		return (<span>{this.state.incrementing}</span>);
	}
});

var ButtonBob = React.createClass({
	render: function() {
		return (<button onClick={function() { Actions.increment()} }>Bob</button>);
	}
})

// React.render(
//     <h1><DisplayBob /></h1>,
//     document.getElementById('bobCounter')
// );

// React.render(<ButtonBob/>, document.getElementById('bobButton'));

var Template = React.createClass({
    render: function() {
        return (<div><h1>Template</h1><ReactRouter.RouteHandler /></div>);
    }
});

var Home = React.createClass({
    render: function() {
        return (<ReactRouter.Link to="/counter">Go to it!</ReactRouter.Link>);
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
    React.render(<Handler/>, document.body);
});

