import React, { Component } from "react";
import { connect } from "react-redux";
import { getprofile } from '../../actions/authActions';
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

class Profile extends Component {
    componentDidMount(){
        this.props.getprofile(this.props.match.params.id);
    }
  render() {
      let renderProfile;

      if(Object.keys(this.props.auth.profile).length > 0){
        const { auth: { profile : { profile } } } = this.props

        renderProfile = (
          <div className="mt-5 card card-body">
            <h3 className="text-center">{profile.name}</h3>
            <h5 className="text-center mt-4">{profile.email}</h5>
            <h5 className="text-center mt-4">
              <span className="badge badge-primary text-white">
                {profile.role}
              </span>
            </h5>
            <h5 className="text-center mt-4">
              {profile.isDelete === 0 ? (
                <span className="badge badge-success text-white">
                  User is Active
                </span>
              ) : (
                <span className="badge badge-danger text-white">
                  User has been Deleted
                </span>
              )}
            </h5>
            <h5 className="text-center mt-4">{new Date(profile.createdAt).toISOString().slice(0, 10)}</h5>
          </div>
        );
      }
      
    return (
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
                {renderProfile}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getprofile })(Profile);
