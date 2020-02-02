import React, { Component } from "react";
import { connect } from "react-redux";
import { softDeleteUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";

class UsersTable extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 1,
      recordPerPage: "10"
    };

    this.paginate = this.paginate.bind(this);
    this.deleteUserDetails = this.deleteUserDetails.bind(this);
  }

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber
    });
  }
  deleteUserDetails(userId) {
    const userData = {
      id: userId,
      role: this.props.role
    };

    this.props
      .softDeleteUser(userData)
      .then(res => {
        toast.success(res.payload.message);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { users, deleted, userId, tableTitle } = this.props;
    const { currentPage, recordPerPage } = this.state;

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentUsers = users.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">All {tableTitle} Users</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Date Registered</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        {new Date(user.createdAt).toISOString().slice(0, 10)}
                      </td>
                      <td>{user.role}</td>
                      <td>
                        {user.isDelete === 0 ? (
                          <span className="badge badge-success text-white">
                            Active
                          </span>
                        ) : (
                          <span className="badge badge-danger text-white">
                            Deleted
                          </span>
                        )}
                      </td>
                      <td>
                        <Link to={"/user/view/" + user.id}>
                          <i className="fa fa-eye"></i>
                        </Link>{" "}
                        &nbsp;&nbsp;
                        {deleted || userId === user.id ? null : (
                          <span
                            className="badge badge-danger text-white"
                            onClick={() => this.deleteUserDetails(user.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length < recordPerPage ? (
                ""
              ) : (
                <Pagination
                  recordPerPage={recordPerPage}
                  totalRecords={users}
                  paginate={this.paginate}
                  currentPage={currentPage}
                  currentLevel={currentUsers}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { softDeleteUser })(UsersTable);
