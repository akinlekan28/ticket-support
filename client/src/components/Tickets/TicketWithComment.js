import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { SolidBtn, SpinnerBtn } from "../common/Button";
import { getTicketWithComment, addComment } from "../../actions/ticketActions";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { toast } from "react-toastify";

class TicketWithComment extends Component {
  constructor() {
    super();

    this.state = {
      commentText: "",
      errors: {},
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getTicketWithComment(this.props.match.params.id);
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
    let commentData = {
      commentText: this.state.commentText,
      ticketId: this.props.match.params.id
    };

    this.props
      .addComment(commentData)
      .then(res => {
          if(res && res.payload.status === true){
              toast.success("Comment successfully added")
          }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { errors, loading } = this.state;
    let ticketContainer;
    let commentContainer;

    if (Object.keys(this.props.tickets.ticketWithComments).length > 0) {
      const { ticketWithComments: { ticket } } = this.props.tickets;

      ticketContainer = (
        <React.Fragment>
          <div className="row card mt-1 mb-3">
            <div className="col-md-12 card-body">
              <h3 className="text-center">{ticket.tag}</h3>
              <div className="mt-5 ticket-container">
                <p>
                  <strong>Title:</strong> {ticket.title}
                </p>
                <p>
                  <strong>Description:</strong> {ticket.description}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {ticket.status === 0 ? (
                    <span className="badge badge-success text-white">Open</span>
                  ) : (
                    <span className="badge badge-danger text-white">Close</span>
                  )}
                </p>
                <p>
                  <strong>Date Added:</strong>{" "}
                  {new Date(ticket.createdAt).toISOString().slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );

      commentContainer =
        Object.keys(ticket.comments).length > 0 ? (
          <div className="row card card-body mt-3">
            <h4 className="text-center">Comments</h4>
            {ticket.comments.map(comment => (
              <div key={comment.id} className="mb-3">
                <p>
                  <strong>Comment: </strong>
                  {comment.commentText}
                </p>
                <p>
                  <strong>Date Added: </strong>
                  {new Date(comment.createdAt).toISOString().slice(0, 10)}
                </p>
                <hr />
              </div>
            ))}
          </div>
        ) : null;
    }

    return (
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              {ticketContainer}
              <div className="row card">
                <div className="col-md-5 card-body mx-auto">
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      name="commentText"
                      label="Comment"
                      value={this.state.commentText}
                      placeholder="Enter Comment"
                      onChange={this.onChange}
                      error={errors.message}
                    />
                    {loading ? <SpinnerBtn /> : <SolidBtn name="Submit" />}
                  </form>
                </div>
              </div>
              {commentContainer}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  errors: state.errors
});

export default connect(mapStateToProps, { getTicketWithComment, addComment })(
  TicketWithComment
);
