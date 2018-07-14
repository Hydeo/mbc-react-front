import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyA86hSzxekSblnujOHWPPYhoXs1JCirGgM",
    authDomain: "test-7d3f1.firebaseapp.com",
    databaseURL: "https://test-7d3f1.firebaseio.com",
    projectId: "test-7d3f1",
    storageBucket: "",
    messagingSenderId: "213194670495",
};

const devConfig = {
  apiKey: "AIzaSyA86hSzxekSblnujOHWPPYhoXs1JCirGgM",
    authDomain: "test-7d3f1.firebaseapp.com",
    databaseURL: "https://test-7d3f1.firebaseio.com",
    projectId: "test-7d3f1",
    storageBucket: "",
    messagingSenderId: "213194670495",
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const f = firebase;

export {
  db,
  auth,
  f
};
