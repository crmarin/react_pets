var React = require('react');
var ReactDOM = require('react-dom');

var AptList = require('./src/AptList')

var MainInterface = React.createClass({
    getInitialState: function () {
        return {
            myAppointmets: []
        }
    },

    componentDidMount() {
        this.serverRequest = $.get('./data/data.json', function (result) {
            var tempApts = result;

            this.setState({
                myAppointmets: tempApts
            });

        }.bind(this));
    },

    componentWillUnmount() {
        this.serverRequest.abort();
    },

    render: function () {
        var filteredApts = this.state.myAppointmets;
        filteredApts = filteredApts.map(function (item, index) {
            return (
                <AptList
                    key = {index}
                    singleItem = {item} />
            )
        }.bind(this));

        return (
            <div className="interface">
                <ul className="item-list media-list">
                    {filteredApts}
                </ul>
            </div>
        )
    } //render
}); // MainInterface

ReactDOM.render(
    <MainInterface />,
    document.getElementById('petAppointments')
); //render