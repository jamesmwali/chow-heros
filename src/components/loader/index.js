import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUser} from '../../redux/actions/user/userActions';
import {getChows} from '../../redux/actions/chow/chowActions';
import Loader from 'react-loader';
import './style.scss';

class LoadingComponent extends Component {

  state = {
    loaded: false,
  };

  UNSAFE_componentWillMount() {
    const {userLoading, chowLoading} = this.props;



    // ? if we haven't tried to load the user, load user
    if (userLoading === undefined || userLoading === null) {
      this.props.getUser();
    }

    // ? if we haven't tried to load the notes, load notes

    if (chowLoading === undefined || chowLoading === null ) {
      this.props.getChows();
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    // ? wait for user to get Authenticated anf then load the notes.

    if (nextProps.chowLoading === -1 && nextProps.user !== null) {
      this.props.getChows();
    }

  }

  render() {

    const {userLoading, chowLoading} = this.props;

    if ((!userLoading && !chowLoading) || this.props.user === null) {
      return (<div>{this.props.children}</div>);
    } else {
      return (
          <div className="overlay">
            <Loader loaded={this.state.loaded} color="#f93"/>
            <p style={{marginTop:100}}>Loading chow, please wait....</p>
          </div>
      );
    }
  }

}

function mapStateToProps(state) {

  return {
    user: state.user,
    userLoading: state.loading.user,
    chowLoading: state.loading.chows,
  };

}

export default withRouter(
    connect(mapStateToProps, {getUser, getChows})(LoadingComponent));