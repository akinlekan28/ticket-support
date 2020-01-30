import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import menu from "./icons/menu.svg";
import profile from "./icons/profile.png";
import { Link } from "react-router-dom";

class Header extends Component {
  onHandleClick(e) {
    e.preventDefault();

    this.props.logoutUser();
  }
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex align-items-center justify-content-between">
            <p className="navbar-brand brand-logo">Ticket System</p>
            <p className="navbar-brand brand-logo-mini">Ticket System</p>
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-toggle="minimize"
            >
              <img src={menu} alt="" className="" />
            </button>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile dropdown">
                <Link
                  to="javascript:"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="profileDropdown-navbar"
                >
                  <img src={profile} alt="profile" />
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown flat-dropdown"
                  aria-labelledby="profileDropdown-navbar"
                >
                  <div className="flat-dropdown-header">
                    <div className="d-flex">
                      <img
                        src={profile}
                        alt="profile"
                        className="profile-icon mr-2"
                      />
                      <div>
                        <span className="profile-name font-weight-bold">
                          {user.name}
                        </span>
                        <p className="profile-designation">{user.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="profile-dropdown-body">
                    <ul className="list-profile-items">
                      <li className="profile-item">
                        <Link
                          to="javascript:"
                          className="profile-dropdown-link"
                        >
                          <div className="d-flex align-items-center">
                            <i className="mdi mdi-power text-dark"></i>
                            <div onClick={this.onHandleClick.bind(this)}>
                              <h5 className="item-title mt-0">Logout</h5>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <img src={menu} alt="" className="" />
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);
