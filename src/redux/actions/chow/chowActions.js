import {GET_CHOWS, CHOW_STATUS} from '../actionTypes';
import {database} from '../../../utilities/firebase';

export function getChows() {

  return (dispatch) => {
    // ? Show loading to true
    dispatch({
      type: CHOW_STATUS,
      payload: true,
    });
    database.on('value', snapshot => {
      dispatch({
        type: GET_CHOWS,
        payload: snapshot.val(),
      });
      // ? once notes are received
      dispatch({
        type: CHOW_STATUS,
        payload: false,
      });
      // ? Wait until something changes and try again.

    }, () => dispatch({type: CHOW_STATUS, payload: -1}));
  };
}

export function saveChow(note) {

  return (dispatch) => {
    database.push(note);
  };
}

export function deleteChow(id) {
  return dispatch => database.child(id).remove();
}