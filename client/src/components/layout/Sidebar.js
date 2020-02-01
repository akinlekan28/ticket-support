import React from "react";
import { Link } from "react-router-dom";
import home from "./icons/home.svg";
import pages from "./icons/pages.svg";
import web from "./icons/web.svg";

export default function Sidebar() {
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

          <li className="nav-item">
            <div className="sidebar-menu-title">
              <img src={web} alt="" className="sidebar-icon-title" />{" "}
              <span> Users</span>
            </div>
            <ul className="nav submenu-wrapper">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <span className="menu-title">All Users</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../apps/email.html">
                  <span className="menu-title">Deleted Users</span>
                </a>
              </li>
            </ul>
          </li>

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
                <span className="menu-title nav-link">Search Ticket</span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
