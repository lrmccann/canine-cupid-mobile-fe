// import  AsyncStorage  from '@react-native-community/async-storage';
import axios from "axios";
// import React, { useState, useEffect , useContext } from "react";
// import { Button, Text, TextInput, View, ViewComponent, StyleSheet, TouchableHighlight, Image , Alert } from "react-native";




export default {
    // Create Firebase User
    createUser : async function (userData) {
        console.log("User created" , userData)
        return await axios.post (
            "http://localhost:5001/canine-cupid-img-storage/us-central1/app/createNewUser" , userData
        );
    },
    // Check user id token / create user id token
    sessionLogin : async function (idToken) {
        console.log("User ID token" , idToken)
        return await axios.post (
            "http://localhost:5001/canine-cupid-img-storage/us-central1/app/sessionLogin" , idToken
        )
    },
    // Sign In User
    signInWithEmail : async function(email , password){
        console.log(email)
        console.log(password)
        // email = email.email
        // password = password.password
        return await axios.get(
            `http://localhost:5001/canine-cupid-img-storage/us-central1/app/userLoginMethod/` + email + "/" + password
        );
    },
    // update user information 
    updateUserInfo : async function (userData , userDataName) {
        console.log("updated user info" , userData , userDataName)
        const token = getToken()
        return await axios.put(
            "http://localhost:5001/canine-cupid-img-storage/us-central1/app/updateUserInfo/" + userDataName , userData,
            {headers : {'session-token' : token}}
        )
    },
    // get all users for matches page
    retrieveAllUsers : async function () {
        console.log("All users retrieved")
        const token = await getToken()
        return await axios.get(
            "http://localhost:5001/canine-cupid-img-storage/us-central1/app/retrieveAllUsers",
            {headers : {'session-token' : token}}
        );
    },
    getMatchesYesByName : async function (userName) {
        console.log("API.getMatchesYesByName" , userName)
        // const token = await getToken()
        console.log(userName)
        return await axios.get(
            `http://localhost:5001/canine-cupid-img-storage/us-central1/app/getMatchesYesByName/${userName}`
            // {headers : {'session-token' : token}}
        );
    },
    moreLoginStuff : async function (item) {
        console.log(item , "api.morestuff called")
        return await axios.get(
            `http://localhost:5001/canine-cupid-img-storage/us-central1/app/moreFirebaseStuff/`+ item
        )
    },
    getUserForMatchesModal : async function (value) {
        console.log("api.getusersformatchesmodal : " , value )
        return await axios.get(
            `http://localhost:5001/canine-cupid-img-storage/us-central1/app/getUserForMatchesModal/${value}`
        )
    },
    // returnObjectsInYesArray : async function (myKey) {
    //     console.log(myKey.myKey, "what is my key...")
    //     myKey = myKey.myKey
    //     return await axios.get(
    //         `http://localhost:5001/canine-cupid-img-storage/us-central1/app/returnObjectsInYesArray/${myKey}`
    //     )
    // },
    getMatchesNoByName : async function () {
        console.log("API.getMatchesNoByName", userData)
        const token = await getToken()
        return await axios.put(
            "http://localhost:5001/canine-cupid-img-storage/us-central1/app/getMatchesNoByName/" + userData,
            {headers : {'session-token' : token}}
        );
    },

    setUserYesMatches : async function (userData1 , userData2) {
        console.log("API.setMatchesYesByName", userData1 , userData2)
        const token = await getToken()
        return await axios.put(
            "http://localhost:5001/canine-cupid-img-storage/us-central1/app/setUsersYesMatches/" + userData1 + "/" + userData2,
            {headers : {'session-token' : token}}
        )
    },

    setUserNoMatches : async function (userData1 , userData2) {
        console.log("API.setMatchesNoByName", userData1 , userData2)
        const token = await getToken()
        return await axios.put(
            "http://localhost:5001/canine-cupid-img-storage/us-central1/app/setUsersNoMatches/" + userData1 + "/" + userData2,
            {headers : {'session-token' : token}}
        )
    }
}

// async function getToken () {
//     const raw = await AsyncStorage.getItem('STORAGE_KEY')
//      return raw
// }
    

// export default {
//     // Create a User/ Saves a User to the database
//     saveUser: async function(userData) {
//         console.log("API.saveUser was called", userData)
//         return await axios.post(
//             "https://canine-cupid-mobile.herokuapp.com/users", userData
//         );
//     },
    
//     // Checking user credential to log in
//     checkUser: async function(userData) {
//         console.log("API.getUser was called", userData)
//         return await axios.get(
//             "https://canine-cupid-mobile.herokuapp.com/users/"+userData.userName+"/"+userData.password
//         );
//     },

//     getUserByName: async function(userData){
//         console.log("API.getUserById was called", userData)
//         const token = await getToken()
//         console.log("token",token)
//         return await axios.get(
//             "https://canine-cupid-mobile.herokuapp.com/user/"+userData, 
//             { headers: {'session-token': token}}
//         );
//     },    

//     updateUser: async function(userData,userDataName) {
//         console.log("API.updateUser was called", userDataName)
//         const token = await getToken()
//         return await axios.put(
//             "https://canine-cupid-mobile.herokuapp.com/user/"+userDataName, userData,
//             { headers: {'session-token': token}}
//         );
//     },
//     // getting All Names as an array
//     getAllUsers: async function(sessionToken){
//         console.log("API.getAllUsers was called", sessionToken)
//         const token = await getToken()
//         return await axios.get(
//             "https://canine-cupid-mobile.herokuapp.com/users", 
//             { headers: {'session-token': token}}
//         );
//     },

//     getMatchesYesByName: async function(userData ) {
//         console.log("API.getMatchesYesByName was called", userData)
//         const token = await  getToken()
//         return await axios.get(
//             "https://canine-cupid-mobile.herokuapp.com/usersallyesmatches/"+userData,
//             { headers: {'session-token': token}}
//         )
//     },

//     getMatchesNoByName: async function(userData) {
//         console.log("API.getMatchesNoByName was called", userData)
//         const token = await getToken()
//         console.log("token",token)
//         return await axios.get(
//             "https://canine-cupid-mobile.herokuapp.com/usersallnomatches/"+userData,
//             { headers: {'session-token': token}}
//         );
//     },

//     setUsersYesMatches: async function(userData1,userData2 ) {
//         console.log("API.setUsersYesMatches was called", userData1, userData2)
//         const token = await getToken()
//         console.log("token",token)
//         return await axios.put(
//             "https://canine-cupid-mobile.herokuapp.com/usersyesmatches/"+userData1+"/"+userData2
//             , { headers: {'session-token': token}}
//         );
//     },

//     setUsersNoMatches: async function(userData1,userData2 ) {
//         console.log("API.setUsersNoMatches was called", userData1, userData2)
//         const token = await getToken()
//         console.log("token",token)
//         return await axios.put(
//             "https://canine-cupid-mobile.herokuapp.com/usersnomatches/"+userData1+"/"+userData2
//             , { headers: {'session-token': token}}
//         );
//     }

// };

// import React, { useState, useEffect , useContext } from "react";
// import { Button, Text, TextInput, View, ViewComponent, StyleSheet, TouchableHighlight, Image , Alert } from "react-native";
// import * as firebase from "firebase";
// import UserContext from "./UserContext";

// const [sessionToken , getSessionToken] = useState("");

// const getToken = async () => {
//     const [currentUser] = useContext(UserContext);
    
//     const db = firebase.firestore().collection('users')
//     await db.where('')


// }

// export default {
    
// }