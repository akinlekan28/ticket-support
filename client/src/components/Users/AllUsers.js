import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/authActions'
import UsersTable from './UsersTable';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';

class AllUsers extends Component {

    componentDidMount(){
        this.props.getUsers()
    }

    render() {

        let userContainer;

        if(Object.keys(this.props.auth.users).length > 0){
            const {auth: { users } } = this.props

            const activeUsers = users.filter(user => user.isDelete === 0)
            
            userContainer = (
              <UsersTable
                users={activeUsers}
                tableTitle="Active"
                role={this.props.auth.user.role}
                deleted={false}
                userId={this.props.auth.user.id}
              />
            );
        } else {
            userContainer = <h3 className="text-center mt-3">No users at the moment</h3>
        }
        
        return (
          <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
              <Sidebar />
              <div className="content-wrapper">{userContainer}</div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {getUsers})(AllUsers)
