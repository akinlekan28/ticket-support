import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTickets,
  getComments,
  addTicket
} from "../../actions/ticketActions";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import CountCard from "./cards/CountCard";
import TextFieldGroup from "../common/TextFieldGroup";
import { SpinnerBtn, SolidBtn } from "../common/Button";

export class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
      errors: {},
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const ticketData = {
      title: this.state.title,
      description: this.state.description,
      userId: (this.props.auth.user.id).toString()
    };

    this.props
      .addTicket(ticketData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.props.getTickets();
    this.props.getComments();
  }
  render() {
    const {
      auth: { user }
    } = this.props;

    const { errors, loading } = this.state;

    let activeTicketContainer;
    let closedTicketContainer;
    let ticketCommentContainer;

    if (
      Object.keys(this.props.ticket.tickets).length > 1 &&
      Object.keys(this.props.ticket.comments).length > 1
    ) {
      const { tickets } = this.props.ticket.tickets;
      const { comments } = this.props.ticket.comments;

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

              <div className="row mt-5 card">
                <div className="col-md-5 col-offset-md-7 card-body">
                  <h5 className="text-danger">
                    All fields are required to submit a ticket
                  </h5>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      name="title"
                      label="Ticket title"
                      value={this.state.title}
                      onChange={this.onChange}
                      error={errors.title}
                    />
                    <TextFieldGroup
                      name="description"
                      label="Ticket Description"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                    />
                    {loading ? <SpinnerBtn /> : <SolidBtn name="Submit" />}
                  </form>
                </div>
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
  ticket: state.ticket,
  errors: state.errors
});

export default connect(mapStateToProps, { getTickets, getComments, addTicket })(
  Dashboard
);
