import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { SolidBtn, SpinnerBtn } from "../common/Button";
import { getTicketByTag } from "../../actions/ticketActions";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

class SearchTicket extends Component {
  constructor() {
    super();

    this.state = {
      tag: "",
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
    this.setState({ loading: true });
    this.props.getTicketByTag(this.state.tag);
    this.setState({ loading: false });
  }

  render() {
    const { errors, loading } = this.state;
    let ticketContainer;

    if (Object.keys(this.props.tickets.ticket).length > 0) {
      const { ticket } = this.props.tickets;

      console.log(ticket);

      ticketContainer = (
        <React.Fragment>
          <div className="row card mt-5">
            <div className="col-md-12 card-body">
              <h3 className="text-center">{ticket.tag}</h3>
              <div className="mt-5 ticket-container">
                <p>
                  <strong>Title:</strong> {ticket.title}
                </p>
                <p>
                  <strong>Description:</strong> {ticket.description}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {ticket.status === 0 ? (
                    <span className="badge badge-success text-white">Open</span>
                  ) : (
                    <span className="badge badge-danger text-white">Close</span>
                  )}
                </p>
                <p>
                  <strong>Date Added:</strong>{" "}
                  {new Date(ticket.createdAt).toISOString().slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row card">
                <div className="col-md-7 card-body mx-auto">
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      name="tag"
                      label="Tag"
                      value={this.state.tag}
                      onChange={this.onChange}
                      error={errors.message}
                    />
                    {loading ? <SpinnerBtn /> : <SolidBtn name="Submit" />}
                  </form>
                </div>
              </div>
              {ticketContainer}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  errors: state.errors
});

export default connect(mapStateToProps, { getTicketByTag })(SearchTicket);
