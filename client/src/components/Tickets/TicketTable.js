import React, { Component } from "react";
import { connect } from "react-redux";
import {closeTicket} from '../../actions/ticketActions';
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";
import axios from 'axios';

class TicketTable extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 1,
      recordPerPage: "10"
    };

    this.paginate = this.paginate.bind(this);
    this.closeTicket = this.closeTicket.bind(this);
    this.downloadReport = this.downloadReport.bind(this)
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

  downloadReport(e){
    e.preventDefault();
    
    axios.get('/api/v1/ticket/report', {
      responseType: 'blob'
    })
    .then(res => {
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link)
      link.click()
    })
    .catch(err => console.log(err))
  }

  render() {
    const { tickets, role, tableTitle } = this.props;
    const { currentPage, recordPerPage } = this.state;
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentTickets = tickets.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">All {tableTitle} Ticket</h4>
            {role === 'admin' ? <button type="button" className="btn btn-success text-white" onClick={this.downloadReport}>Download Report</button> : null}
            
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
                          <span className="badge badge-secondary text-white">
                            <i className="fa fa-eye"></i>
                          </span>
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

export default connect(null, { closeTicket })(TicketTable);
