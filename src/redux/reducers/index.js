import {combineReducers} from 'redux';
import chowsReducer from './chow/chowReducer';
import usersReducer from './user/userReducer';
import loadingReducer from '../reducers/loading-status/loadingReducer'


const rootReducer = combineReducers({
  chows: chowsReducer,
  user: usersReducer,
  loading: loadingReducer
});

export default rootReducer;