import React, {Component} from 'react';
import {connect} from 'react-redux';
import {googleLogin, twitterLogin} from '../../redux/actions/user/userActions';
import {withRouter} from 'react-router-dom';
import './style.scss'

class Login extends Component {

  componentWillUpdate() {
    const {user, userLoading} = this.props;

    console.log('-->', !userLoading && user !== null);

    if (!userLoading && user !== null) {
      this.props.history.push('/landing-page');
      window.location.replace("/landing-page");
    }
  }

  componentWillMount() {
    console.log("--- will mount");
    const {user, userLoading} = this.props;

    console.log('-->', !userLoading && user !== null);

    if (!userLoading && user !== null) {
      this.props.history.push('/landing-page');
      window.location.replace("/landing-page");
    }
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.user !== null) {
      this.props.history.push('/landing-page');

    }
  }

  render() {

    return (
        <div className="login-container">

          <div className="left-panel">

            <div className="left-container">

              <div className="page-logo">
                <div className="logo">
                  ChowHero
                </div>

              </div>
              <div className="welcome-container">


                <div className="welcome">
                  Welcome back pave the way!
                </div>

                <div className="w-body">
                  Time to continue sharing with ChowHero.
                </div>

              </div>

            </div>

          </div>

          <div className="right-panel">

            <div className="sign-up-container">

              <div className="sign-up-header">
                Sign in with your favorite <strong>social media</strong>
              </div>

              <div className="button-container">
                <button   onClick={this.props.googleLogin}>
                  Sign in with Google
                </button>

                <button onClick={this.props.twitterLogin}>
                  Sign in with Twitter
                </button>
              </div>

            </div>
          </div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(
    connect(mapStateToProps, {googleLogin, twitterLogin})(Login));