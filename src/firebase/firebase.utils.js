import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBrrDzq6HA1xhB64pxy3FgkOBggYdXWxA",
  authDomain: "clothing-db-843d2.firebaseapp.com",
  databaseURL: "https://clothing-db-843d2.firebaseio.com",
  projectId: "clothing-db-843d2",
  storageBucket: "",
  messagingSenderId: "738385302128",
  appId: "1:738385302128:web:7a440a1c364835c2"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGoogle = () => {
  firebase.auth().signInWithPopup(provider);
};

export default firebase;
