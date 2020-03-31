var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash')

var AptList = require('./src/AptList')
var AddAppoinment = require('./src/AddAppoinment')
var SearchAppoinments = require('./src/SearchAppoinments')

var MainInterface = React.createClass({
    getInitialState: function () {
        return {
            aptBodyVisible: false,
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

    deleteMessage(item) {
        var allApts = this.state.myAppointmets;
        for( var i = 0; i < allApts.length; i++){
            if ( allApts[i] === item) {
                allApts.splice(i, 1);
            }
        }

        this.setState({
            myAppointmets: allApts
        });
    },

    toogleAddDisplay() {
        var tempVisibilyty = !this.state.aptBodyVisible;

        this.setState({
            aptBodyVisible: tempVisibilyty
        });
    },

    addItem(tempApts){
        var allApts = this.state.myAppointmets;
        allApts.push(tempApts);

        this.setState({
            myAppointmets: allApts
        });
    },

    render: function () {
        var filteredApts = this.state.myAppointmets;
        filteredApts = filteredApts.map(function (item, index) {
            return (
                <AptList
                    key={index}
                    singleItem={item}
                    whichItem={item}
                    onDelete={this.deleteMessage} />
            )
        }.bind(this));

        var formAppoinment = <AddAppoinment
            bodyVisible = {this.state.aptBodyVisible}
            handleToggle = {this.toogleAddDisplay}
            addApt = {this.addItem} />

        var searchAppoinment = <SearchAppoinments />

        return (
            <div className="interface">
                {formAppoinment}
                {searchAppoinment}
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