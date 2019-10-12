import {auth, googleProvider, twitterProvider} from '../../../utilities/firebase';
import {GET_USER, USER_STATUS} from '../actionTypes';

export function googleLogin() {
  return dispatch => auth.signInWithPopup(googleProvider);
}

export function twitterLogin(){
  return dispatch => auth.signInWithPopup(twitterProvider);
}

// ? get logged in authenticated user info

export function getUser(){


  return dispatch => {

    // ? Show loading status before showing user
    dispatch({
      type: USER_STATUS,
      payload: true,
    });

    auth.onAuthStateChanged(user => {
      dispatch({
        type: GET_USER,
        payload: user

      });

      // ? switch off loading status
      dispatch({
        type: USER_STATUS,
        payload: false,
      });
    })
  }
}

export function logout(){
  return dispatch => auth.signOut()
}