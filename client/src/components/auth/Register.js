import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../actions/authActions";
import { SpinnerBtn, SolidBtn } from "../common/Button";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props
      .registerUser(userData)
      .then(res => {
        if (res.type === "GET_SUCCESS") {
          return (
            toast.success("User successfully registered, proceed to login!") &&
            this.setState({
              loading: false,
              name: "",
              email: "",
              password: "",
              password2: ""
            })
          );
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  }
  render() {
    const { errors, loading } = this.state;

    return (
      <div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                    <h4>Hello! let's get started</h4>
                    <h6 className="font-weight-light text-danger">
                      All fields are required.
                    </h6>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        label="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name}
                      />
                      <TextFieldGroup
                        label="Email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                      <TextFieldGroup
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      />
                      <TextFieldGroup
                        label="Confirm Password"
                        type="password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        error={errors.password2}
                      />
                      <div className="mt-3">
                        {loading ? (
                          <SpinnerBtn />
                        ) : (
                          <SolidBtn name="Register" />
                        )}
                      </div>
                      <div className="text-center mt-4 font-weight-light">
                        Already have an account? <Link to="/">Login</Link>
                      </div>
                    </form>
                  </div>
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
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
