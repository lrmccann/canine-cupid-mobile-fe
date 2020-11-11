import * as firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import "firebase/database";
// import * as admin from "firebase-admin";

// export default {

    const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    projectId: "canine-cupid-img-storage",
    apiKey: "AIzaSyD_o0bE2HYusxP7qTW_8vTEx0XPtxNyIrQ",
    authDomain: "canine-cupid-img-storage.firebaseapp.com",
    databaseURL: "canine-cupid-img-storage.firebaseio.com",
    storageBucket: "canine-cupid-img-storage.appspot.com",
    messagingSenderId: "677791653458",
    appId: "1:677791653458:ios:5912c4594c374449f7498b",
}
    export const InitializeApp = () => {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
            const db = firebase.firestore()
            // firebase.firestore().settings(settings)
            return db
        }
    }
        InitializeApp()

const Firebase ={
// auth
    loginWithEmail: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signupWithEmail: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    signOut: () => {
        return firebase.auth().signOut()
    },
    checkUserAuth: user => {
        return firebase.auth().onAuthStateChanged(user)
    },
      // firestore
    createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  }
}
export default Firebase;
    

// if(!firebase.apps.length) {
    // firebase.initializeApp(firebaseConfig)
    // const db = firebase.firestore()
    // console.log(firebase.analytics)
//   }

// }

// firebase.initializeApp(firebaseConfig);

// var admin = require("firebase-admin");

// var serviceAccount = require("./canine-cupid-img-storage-firebase-adminsdk-izyoi-ba1ad0c6f9.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://canine-cupid-img-storage.firebaseio.com"
// }); 