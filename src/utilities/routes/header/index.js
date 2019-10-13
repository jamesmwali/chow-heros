import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, logout} from '../../../redux/actions/user/userActions';
import './style.scss'


// ? Create Navigation

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {

    return (
        <nav className="header-container">
          <div className="header-contents">

            <div className="navbar-left">
              <Link className="navbar-brand" to="/">ChowHero</Link>
            </div>

            <div className="navbar-right" id="myNavBar">
                {this.props.user === null ?
                    (
                      <Link className="link" to="/login">Login
                      </Link>
                     )
                    :
                    (
                      <Link className="link" to="/logout" onClick={()=> {
                        this.props.logout();
                        window.location.replace("/logout");

                      }}>
                        Logout
                      </Link>
                     )
                }
            </div>
          </div>

        </nav>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, {getUser, logout})(Header);