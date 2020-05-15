import React, {useState, useEffect} from 'react';

import AuthenticationStack from './src/navigators/AuthStack';
import AppStack from './src/navigators/AppStack';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setUser} from './src/actions/actions';

const firebaseConfig = {
  apiKey: 'AIzaSyAkKPkhtdh9tP5k4ePaTVfqVBXHRYnuK5E',
  authDomain: 'chatapp-760ae.firebaseapp.com',
  databaseURL: 'https://chatapp-760ae.firebaseio.com',
  projectId: 'chatapp-760ae',
  storageBucket: 'chatapp-760ae.appspot.com',
  messagingSenderId: '402477935161',
  appId: '1:402477935161:web:be6ed6322c9d2f14623be8',
  measurementId: 'G-E9SS98QFQL',
};

try {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const App = ({dispatch, user}) => {
  const [authenticated, setAuthenticated] = useState(user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('In App', user);
        setAuthenticated(user);
        dispatch(setUser(user));
      } else {
        console.log('in App failed');
        setAuthenticated(user);
        dispatch(setUser(null));
      }
    });
  }, []);

  if (!authenticated) {
    return <AuthenticationStack />;
  } else {
    return <AppStack />;
  }
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
