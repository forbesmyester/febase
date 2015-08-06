var mui = require('material-ui'),
    AltLeftNavAction = require('../Action/AltLeftNav'),
    AltLeftNavStore = require('../Store/AltLeftNav'),
    React = require('react'),
    LeftNav = mui.LeftNav;


module.exports = React.createClass({

    getInitialState() {
        return AltLeftNavStore.getState();
    },

    componentDidMount() {
        AltLeftNavStore.listen(this.onChange);
    },

    componentWillUnmount() {
        AltLeftNavStore.unlisten(this.onChange);
    },

    onChange(state) {
        var currentOpen = this.state.open;
        this.setState(state);
        if (currentOpen != state.open) {
            this.refs.leftNav.toggle();
        }
    },

    onNavOpen() {
        this.state.open = true;
        AltLeftNavAction.setOpen(this.state.open);
    },

    onNavClose() {
        this.state.open = false;
        AltLeftNavAction.setOpen(this.state.open);
    },

    render() {
        return (
            <LeftNav
                ref="leftNav"
                docked={ false }
                onNavOpen={ this.onNavOpen }
                onNavClose={ this.onNavClose }
                menuItems={ this.state.menuItems } />
        );
    }

});
