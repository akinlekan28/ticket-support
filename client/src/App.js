import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div>
            <ToastContainer autoClose={4000} />
            <p>Hello world</p>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
