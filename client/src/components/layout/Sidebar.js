import React, { Component } from "react";
import { Link } from "react-router-dom";
import home from "./icons/home.svg";
import pages from "./icons/pages.svg";
import web from "./icons/web.svg";
import { connect } from "react-redux";

class Sidebar extends Component {
  render() {
    const { auth: { user } } = this.props;

    return (
      <div>
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav" style={{ marginTop: "-20px" }}>
            <li className="nav-item mt-5">
              <div className="sidebar-menu-title">
                <img src={home} alt="" className="sidebar-icon-title" />{" "}
                <span>Dashboard</span>
              </div>
              <ul className="nav submenu-wrapper">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    <span className="menu-title">Home</span>
                  </Link>
                </li>
              </ul>
            </li>

            {user.role === "admin" ? (
              <React.Fragment>
                <li className="nav-item">
                  <div className="sidebar-menu-title">
                    <img src={web} alt="" className="sidebar-icon-title" />{" "}
                    <span> Users</span>
                  </div>
                  <ul className="nav submenu-wrapper">
                    <li className="nav-item">
                      <Link className="nav-link" to="/users/all">
                        <span className="menu-title">All Users</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/users/deleted">
                        <span className="menu-title">Deleted Users</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </React.Fragment>
            ) : null}

            <li className="nav-item">
              <div className="sidebar-menu-title">
                <img src={pages} alt="" className="sidebar-icon-title" />{" "}
                <span> Tickets</span>
              </div>
              <ul className="nav submenu-wrapper">
                <li className="nav-item">
                  <Link to="/ticket/create">
                    <span className="menu-title nav-link">Create Ticket</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ticket/all">
                    <span className="menu-title nav-link">All Tickets</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ticket/active">
                    <span className="menu-title nav-link">Active Tickets</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ticket/closed">
                    <span className="menu-title nav-link">Closed Tickets</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ticket/search">
                    <span className="menu-title nav-link">Search Ticket</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Sidebar);
