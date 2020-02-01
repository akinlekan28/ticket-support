import React, { Component } from "react";
import { connect } from "react-redux";
import {closeTicket} from '../../actions/ticketActions';
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";

class TicketTable extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 1,
      recordPerPage: "10"
    };

    this.paginate = this.paginate.bind(this);
    this.closeTicket = this.closeTicket.bind(this);
  }

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber
    });
  }
  closeTicket(ticketId){
      const ticketData = {
          id: ticketId,
          role: this.props.role
      }

      this.props.closeTicket(ticketData).then(res => {
          toast.success(res.payload.message)
      }).catch(err => console.log(err))
  }

  render() {
    const { tickets, role } = this.props;
    const { currentPage, recordPerPage } = this.state;
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentTickets = tickets.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">All Ticket</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date Added</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTickets.map(ticket => (
                    <tr key={ticket.tag}>
                      <td>{ticket.tag}</td>
                      <td>{ticket.title}</td>
                      <td>{ticket.description}</td>
                      <td>
                        {new Date(ticket.createdAt).toISOString().slice(0, 10)}
                      </td>
                      <td>
                        {ticket.status === 0 ? (
                          <span className="badge badge-success text-white">
                            Open
                          </span>
                        ) : (
                          <span className="badge badge-danger text-white">
                            Closed
                          </span>
                        )}
                      </td>
                      <td>
                        <Link to={"/ticket/view/" + ticket.id}>
                          <i className="fa fa-eye"></i>
                        </Link>{" "}
                        &nbsp;&nbsp;
                        {role === "admin" && ticket.status === 0 ? (
                          <span
                            className="badge badge-danger text-white"
                            onClick={() => this.closeTicket(ticket.id)}
                          >
                            Close <i className="fa fa-exclamation-triangle"></i>
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {tickets.length < recordPerPage ? (
                ""
              ) : (
                <Pagination
                  recordPerPage={recordPerPage}
                  totalRecords={tickets}
                  paginate={this.paginate}
                  currentPage={currentPage}
                  currentLevel={currentTickets}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({});

export default connect(null, { closeTicket })(TicketTable);
