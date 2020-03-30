var React = require('react');
var ReactDOM = require('react-dom');

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
                <li className="pet-item media" key={index}>
                    <div className="pet-info media-body">
                        <div className="pet-head">
                            <span className="pet-name">{this.state.myAppointmets[index].petName}</span>
                            <span className="apt-date pull-right">{this.state.myAppointmets[index].aptDate}</span>
                        </div>
                        <div className="owner-name">
                            <span className="label-item">Owner:</span>
                            {this.state.myAppointmets[index].ownerName}
                        </div>
                        <div className="apt-notes">{this.state.myAppointmets[index].aptNotes}
                        </div>
                    </div>
                </li>
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