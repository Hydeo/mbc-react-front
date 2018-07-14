import { auth, f } from './firebase';


// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignInWithGoogleAuthProvider = ()=>
  auth.signInWithPopup(new f.auth.GoogleAuthProvider());

export const doSignInWithFacebookAuthProvider = ()=>
  auth.signInWithPopup(new f.auth.FacebookAuthProvider());


// Sign out
export const doSignOut = () =>
  auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
