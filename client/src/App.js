import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/common/PrivateRoute";

import Dashboard from "./components/dashboard/Dashboard";
import CreateTicket from "./components/Tickets/CreateTicket";
import AllTickets from "./components/Tickets/AllTickets";
import ActiveTickets from "./components/Tickets/ActiveTickets";
import ClosedTickets from "./components/Tickets/ClosedTickets";
import SearchTicket from "./components/Tickets/SearchTicket";
import AllUsers from "./components/Users/AllUsers";
import DeletedUsers from "./components/Users/DeletedUsers";
import Profile from "./components/Users/Profile";
import TicketWithComment from "./components/Tickets/TicketWithComment";

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <ToastContainer autoClose={4000} />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/ticket/create" component={CreateTicket} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/ticket/all" component={AllTickets} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/ticket/closed" component={ClosedTickets} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/ticket/active" component={ActiveTickets} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/ticket/search" component={SearchTicket} />
            </Switch>
             <Switch>
              <PrivateRoute exact path="/users/all" component={AllUsers} />
            </Switch>
             <Switch>
              <PrivateRoute exact path="/users/deleted" component={DeletedUsers} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/user/view/:id" component={Profile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/ticket/view/:id" component={TicketWithComment} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
