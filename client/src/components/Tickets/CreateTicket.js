import React, { Component } from "react";
import { connect } from "react-redux";
import { addTicket } from "../../actions/ticketActions";
import Header from "../layout/Header";
import TextFieldGroup from "../common/TextFieldGroup";
import { SolidBtn, SpinnerBtn } from "../common/Button";
import Sidebar from "../layout/Sidebar";
import { toast } from "react-toastify";

class CreateTicket extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
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

    const ticketData = {
      title: this.state.title,
      description: this.state.description,
      userId: this.props.auth.user.id.toString()
    };

    this.props
      .addTicket(ticketData)
      .then(res => {
        if (res && res.type === "ADD_TICKET") {
          toast.success("Ticket added successfully");
        }
        this.setState({ loading: false, title: "", description: "" });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  render() {
    const { errors, loading } = this.state;
    return (
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row card">
                <div className="col-md-7 card-body mx-auto">
                  <h5 className="text-danger">
                    All fields are required to submit a ticket
                  </h5>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      name="title"
                      label="Ticket title"
                      value={this.state.title}
                      onChange={this.onChange}
                      error={errors.title}
                    />
                    <TextFieldGroup
                      name="description"
                      label="Ticket Description"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                    />
                    {loading ? <SpinnerBtn /> : <SolidBtn name="Submit" />}
                  </form>
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

export default connect(mapStateToProps, { addTicket })(CreateTicket);
