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
    const {userLoading, notesLoading} = this.props;



    // ? if we haven't tried to load the user, load user
    if (userLoading === undefined || userLoading === null) {
      this.props.getUser();
    }

    // ? if we haven't tried to load the notes, load notes

    if (notesLoading === undefined || notesLoading === null ) {
      this.props.getNotes();
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    // ? wait for user to get Authenticated anf then load the notes.

    if (nextProps.notesLoading === -1 && nextProps.user !== null) {
      this.props.getNotes();
    }

  }

  render() {

    const {userLoading, notesLoading} = this.props;

    if ((!userLoading && !notesLoading) || this.props.user === null) {
      return (<div>{this.props.children}</div>);
    } else {
      return (
          <div className="overlay">
            <Loader loaded={this.state.loaded} color="#f93"/>
            <h2 style={{marginTop:100}}>Loading....</h2>
          </div>
      );
    }
  }

}

function mapStateToProps(state) {

  return {
    user: state.user,
    userLoading: state.loading.user,
    notesLoading: state.loading.notes,
  };

}

export default withRouter(
    connect(mapStateToProps, {getUser, getNotes: getChows})(LoadingComponent));