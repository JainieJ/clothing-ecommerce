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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.error(err);
    }
  }
  return userRef;
};

//code for storing shop data in firestore database

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  console.log(objectsToAdd);
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    //creates a new place for the document in the collection and assigns a unique ID
    const newDocRef = collectionRef.doc();
    //assigns obj to the newly created place and bacthes the set calls, since set can only be called once at a time
    batch.set(newDocRef, obj);
  });
  //actually calls batch, and this call returns a promise
  return await batch.commit();
};

//code for retrieving data from firestore

export const convertCollectionsSnapShotToMap = collections => {
  //collections parameter already represents a snapshot
  const transformedCollections = collections.docs.map(doc => {
    //to get data stored in the doc we need to call doc.data()
    const { items, title } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollections.reduce((acc, curr) => {
    acc[curr.title.toLowerCase()] = curr;
    return acc;
  }, {});
};
