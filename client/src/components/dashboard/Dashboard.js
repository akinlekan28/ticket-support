import React, { Component } from "react";
import { connect } from "react-redux";
import { getTickets, getComments } from "../../actions/ticketActions";
import { getUsers } from "../../actions/authActions";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import CountCard from "./cards/CountCard";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getTickets();
    this.props.getComments();
    this.props.getUsers();
  }
  render() {
    const {
      auth: { user }
    } = this.props;

    let activeTicketContainer;
    let closedTicketContainer;
    let ticketCommentContainer;
    let activeUsersContainer;
    let deletedUsersContainer;
    let adminUsersContainer;
    let activeTicketContainerAdmin;
    let closedTicketContainerAdmin;
    let ticketCommentContainerAdmin;

    if (
      Object.keys(this.props.tickets.tickets).length > 1 &&
      Object.keys(this.props.tickets.comments).length > 1
    ) {
      const { tickets, comments } = this.props.tickets;
      const { users } = this.props.auth;

      const userActiveTicket = tickets.filter(
        ownTicket => ownTicket.userId === user.id
      );

      const userInActiveTicket = tickets.filter(
        ownTicket => ownTicket.userId === user.id && ownTicket.status !== 0
      );

      const ticketComments = comments.filter(comment =>
        userActiveTicket.length > 0
          ? comment.ticketId === userActiveTicket[0].id
          : null
      );

      const activeUsers = users.filter(
        activeUserDetails => activeUserDetails.isDelete === 0
      );

      const deletedUsers = users.filter(
        activeUserDetails => activeUserDetails.isDelete === 1
      );

      const adminUsers = users.filter(
        adminUserDetails => adminUserDetails.role === "admin"
      );

      const allInactive = tickets.filter(item => item.status !== 0);

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

      activeUsersContainer = (
        <CountCard cardTitle="Active Users" count={activeUsers.length} />
      );
      deletedUsersContainer = (
        <CountCard cardTitle="Deleted Users" count={deletedUsers.length} />
      );
      adminUsersContainer = (
        <CountCard cardTitle="Amin Users" count={adminUsers.length} />
      );
      activeTicketContainerAdmin = (
        <CountCard cardTitle="Active Tickets" count={tickets.length} />
      );
      closedTicketContainerAdmin = (
        <CountCard cardTitle="Closed Tickets" count={allInactive.length} />
      );
      ticketCommentContainerAdmin = (
        <CountCard cardTitle="Comments" count={comments.length} />
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
                {user.role === "admin" ? (
                  <React.Fragment>
                    {activeTicketContainerAdmin}
                    {closedTicketContainerAdmin}
                    {ticketCommentContainerAdmin}
                    {activeUsersContainer}
                    {deletedUsersContainer}
                    {adminUsersContainer}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {activeTicketContainer}
                    {closedTicketContainer}
                    {ticketCommentContainer}
                  </React.Fragment>
                )}
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

export default connect(mapStateToProps, { getTickets, getComments, getUsers })(
  Dashboard
);
