import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class AuthenticatedComponent extends Component {

  // ? Making sure the loading is done then if no user
  // ? Then push to the login page

  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }


  componentWillUpdate() {
    const {userLoading, user} = this.props;

    if (userLoading && user === null) {
      this.props.history.push('/login')
    }

  }

  render() {
    const {user, userLoading, children} = this.props;
    console.log(userLoading === false && user);

    return userLoading === false && user ? <div>{children}</div> : null;
  }

}

function mapStateToProps(state) {

  return {
    user: state.user,
    userLoading: state.loading.user,
  };

}

export default withRouter(
    connect(mapStateToProps)(AuthenticatedComponent));