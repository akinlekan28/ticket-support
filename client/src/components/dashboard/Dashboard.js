import React, { Component } from "react";
import { connect } from "react-redux";
import { getTickets, getComments } from "../../actions/ticketActions";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import CountCard from "./cards/CountCard";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getTickets();
    this.props.getComments();
  }
  render() {
    const {
      auth: { user }
    } = this.props;

    let activeTicketContainer;
    let closedTicketContainer;
    let ticketCommentContainer;

    if (
      Object.keys(this.props.tickets.tickets).length > 1 &&
      Object.keys(this.props.tickets.comments).length > 1
    ) {
      const { tickets, comments } = this.props.tickets;

      const userActiveTicket = tickets.filter(
        ownTicket => ownTicket.userId === user.id
      );

      const userInActiveTicket = tickets.filter(
        ownTicket => ownTicket.userId === user.id && ownTicket.status !== 0
      );

      const ticketComments = comments.filter(
        comment => comment.ticketId === userActiveTicket[0].id
      );

      activeTicketContainer = (
        <CountCard cardTitle="Active Tickets" count={userActiveTicket.length} />
      );

      closedTicketContainer = (
        <CountCard
          cardTitle="Closed Tickets"
          count={userInActiveTicket.length}
        />
      );

      ticketCommentContainer = (
        <CountCard cardTitle="Comments" count={ticketComments.length} />
      );
    }

    return (
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                {activeTicketContainer}
                {closedTicketContainer}
                {ticketCommentContainer}
                {/* {user.role === "admin" ? (
                      <React.Fragment>
                        <CountCard cardTitle="Active Users" count={20} />
                        <CountCard cardTitle="Deleted Users" count={20} />
                      </React.Fragment>
                    ) : null} */}
              </div>
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

export default connect(mapStateToProps, { getTickets, getComments })(Dashboard);
