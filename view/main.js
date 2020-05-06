var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./src/AptList')
var AddAppoinment = require('./src/AddAppoinment')
var SearchAppoinments = require('./src/SearchAppoinments')

var MainInterface = React.createClass({
    getInitialState: function () {
        return {
            aptBodyVisible: false,
            orderBy: 'petName',
            orderDir: 'asc',
            queryText: '',
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
        var newApts = _.without(allApts, item)

        this.setState({
            myAppointmets: newApts
        });
    },

    toogleAddDisplay() {
        var tempVisibilyty = !this.state.aptBodyVisible;

        this.setState({
            aptBodyVisible: tempVisibilyty
        });

    },

    addItem(tempApts) {
        var allApts = this.state.myAppointmets;
        allApts.push(tempApts);

        this.setState({
            myAppointmets: allApts
        });
    },

    reOrder(orderBy, orderDir) {
        this.setState({
            orderBy: orderBy,
            orderDir: orderDir,
        });
    },

    searchApts(qry) {
        this.setState({
            queryText: qry
        })
    },

    render: function () {
        var filteredApts = [];
        var orderBy = this.state.orderBy;
        var orderDir = this.state.orderDir;
        var queryText = this.state.queryText;
        var myAppointments = this.state.myAppointmets;

        myAppointments.forEach(function (item) {
            if (
                (item.petName.toLowerCase().indexOf(queryText) != -1) ||
                (item.ownerName.toLowerCase().indexOf(queryText) != -1) ||
                (item.aptDate.toLowerCase().indexOf(queryText) != -1) ||
                (item.aptNotes.toLowerCase().indexOf(queryText) != -1)
            ) {
                filteredApts.push(item);
            }
        }); //forEach

        filteredApts = _.orderBy(filteredApts, function (item) {
            return item[orderBy].toLowerCase();
        }, orderDir);//orderBy

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
            bodyVisible={this.state.aptBodyVisible}
            handleToggle={this.toogleAddDisplay}
            addApt={this.addItem} />

        var searchAppoinment = <SearchAppoinments
            orderBy={this.state.orderBy}
            orderDir={this.state.orderDir}
            onReorder={this.reOrder}
            onSearch={this.searchApts}
        />

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