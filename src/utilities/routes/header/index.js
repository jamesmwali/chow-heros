import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, logout} from '../../../redux/actions/user/userActions';


// ? Create Navigation

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {

    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">

              <button type="button" className="navbar-toggle"
                      data-toggle="collapse"
                      data-target="#myNavBar">

              </button>
              <Link className="navbar-brand" to="/">CHOW HERO 2019</Link>
            </div>

            <div className="collapse navbar-collapse" id="myNavBar">
              <ul className="nav navbar-nav navbar-right">
                {this.props.user === null ?
                    ( <li>
                      <Link to="/login">Login
                      </Link>
                    </li> )
                    :
                    ( <li>
                      <Link to="/logout" onClick={()=> {
                        this.props.logout();
                        window.location.replace("/logout");

                      }}>
                        Logout
                      </Link>
                    </li> )
                }
              </ul>
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