import React, { Component } from "react";
import { connect } from "react-redux";
import { getTickets } from "../../actions/ticketActions";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import TicketTable from "./TicketTable";

class AllTickets extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const {
      auth: { user }
    } = this.props;

    let renderTable;

    let tickets;
    if (Object.keys(this.props.tickets.tickets).length > 0) {
      if (user.role === "admin") {
        tickets = this.props.tickets.tickets;
      } else {
        tickets = this.props.tickets.tickets.filter(
          userTicket => userTicket.userId === user.id
        );
      }
      renderTable = <TicketTable tickets={tickets} role={user.role} />
    }
    return (
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
                {renderTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  tickets: state.tickets
});

export default connect(mapStateToProps, { getTickets })(AllTickets);
