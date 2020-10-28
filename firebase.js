import * as firebase from "firebase";
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

    export default function RunFireBase () {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
            const db = firebase.firestore()
            // firebase.firestore().settings(settings)
        }
    }


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