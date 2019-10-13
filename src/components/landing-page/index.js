import React, {Component} from 'react';
import './style.scss';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);



  }

  render() {

    return (
        <div className="landing-page-container">

          <div className="page-container">

            <div className="page">

              <div className="page-content">
                <div className="page-header">
                  who are you
                </div>

                <div className="page-text">
                  Please select one of the following
                </div>

              </div>

              <div className="landing-page-navigation">

                <div className="hero-container">
                  <Link to={`/hero`} className="hero"/>
                </div>

                <div className="none-hero-container">
                  <Link to={`/civilian`} className="civilian"/>
                </div>
              </div>

            </div>

          </div>

        </div>
    )
  }

}


export default withRouter(LandingPage);