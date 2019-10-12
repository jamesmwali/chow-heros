import React, {Component} from 'react';
import {withRouter, HashRouter,Route} from 'react-router-dom';
import LandingPage from '../containers/landing-page';

class MainRouter extends Component {



  render() {

    return (
        <HashRouter>
          <Route exact path="/" render={() => <LandingPage {...this.props} />} />

        </HashRouter>
    )
  }
}

export default MainRouter;