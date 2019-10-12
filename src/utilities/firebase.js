import * as firebase from 'firebase';
import environment from '../environment-variables';

/* Your web app's Firebase configuration*/

var firebaseConfig = {
  apiKey: `${environment.apiKey}`,
  authDomain: `${environment.authDomain}`,
  databaseURL: `${environment.databaseURL}`,
  projectId: `${environment.projectId}`,
  storageBucket: '',
  messagingSenderId: `${environment.messagingSenderId}`,
  appId: `${environment.appId}`,
};
// ? Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database().ref('/users');

// ? Firebase Authentication creation.

// ? Auth instance
export const auth = firebase.auth();

// * Google instance
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// * Twitter instance
export const twitterProvider = new firebase.auth.TwitterAuthProvider();







