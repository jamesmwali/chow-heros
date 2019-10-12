import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers';
import {applyMiddleware, createStore} from 'redux'; // ? Create a redux store;
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login';
import LoadingComponent from './components/loader';
import AuthenticatedComponent from './components/authenticated';
import ChowDetail from './components/chow-detail';
import ChowHeader from './utilities/routes/header/index';

// * Redux store imports

// ? Create a redux store
// ! Store requires reducers -> actions
// * applyMiddleware requires thunk

// ! Step 1 - Create store variable
const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

// ! Step 2 - provide the store reducers to react

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <LoadingComponent>
          <div className="App">
            <Switch>

              <Route path="/login" render={() =>
                  <Login/>
              } exact={true}/>

              <AuthenticatedComponent>
                <ChowHeader/>

                <Route path="/chow/:id" render={() =>
                    <ChowDetail/>
                } exact={true}/>

                <Route path="/" render={() =>
                    <App/>
                } exact={true}/>
              </AuthenticatedComponent>


            </Switch>
          </div>
        </LoadingComponent>

      </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
