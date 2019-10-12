import {CHOW_STATUS, USER_STATUS} from '../../actions/actionTypes';


export default function(state = {}, action) {

  switch (action.type) {

    case CHOW_STATUS:
      return {...state, chows: action.payload};

    case USER_STATUS:

      return {...state, user: action.payload};

    default:
      return state;

  }

}