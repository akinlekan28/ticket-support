import React, { Component } from "react";
import { connect } from "react-redux";
import { SpinnerBtn, SolidBtn } from "../common/Button";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {},
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }
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
      email: this.state.email,
      password: this.state.password
    };

    this.props
      .loginUser(userData)
      .then(res => {
        if (res && res.type === "GET_ERRORS") {
          this.setState({ loading: false });
        }
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
                    <h4>Hello! login to continue</h4>
                    <form onSubmit={this.onSubmit}>
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
                      <div className="mt-3">
                        {loading ? <SpinnerBtn /> : <SolidBtn name="Login" />}
                      </div>
                      <div className="text-center mt-4 font-weight-light">
                        Need an account? <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { loginUser })(Login);
