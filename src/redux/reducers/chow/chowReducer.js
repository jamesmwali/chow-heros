import {GET_CHOWS} from '../../actions/actionTypes';

export default function(state = {}, action) {

  switch (action.type) {
    case GET_CHOWS:
      return action.payload;

    default:
      return state;
  }

}