import  AsyncStorage  from '@react-native-community/async-storage';
import axios from "axios";
import { useEffect } from 'react';
    
function getToken () {
    // let token
    const raw = JSON.parse(AsyncStorage.getItem('user'))
    if (raw) {
    // token = raw.sessionToken
    token = raw.STORAGE_KEY
    console.log( "this is token" , token)
    } else {
    token = ""
    }
    return token
}

// function setToken () {
//     let token
//     const raw = JSON.parse(AsyncLocalStorage.getItem('user'))
//     if (raw) {
//     token = raw.sessionToken
//     } else {
//     token = ""
//     }
//     return token
// }

export default {
    // Create a User/ Saves a User to the database
    saveUser: async function(userData) {
        console.log("API.saveUser was called", userData)
        return await axios.post(
            "https://canine-cupid-mobile.herokuapp.com/users", userData
            // users come back with 503 error when matched with ccmobile
            // ccusers comes back with 404 error when matched with ccmobile 
            // ccmobile comes back with 404 error when matched with ccmobile

            // users comes back with 503 when matched with ccusers
            // ccusers comes back with 404 error when matched with ccusers
            // ccmobile comes back with 404 error when matched with ccusers

            //users comes back with 503 with users
            //ccusers 404.....
            //ccmobile 404
        );
    },
    
    // Checking user credential to log in
    checkUser: async function(userData) {
        console.log("API.getUser was called", userData)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/users/"+userData.userName+"/"+userData.password
        );
    },

    getUserByName: async function(userData){
        console.log("API.getUserById was called", userData)
        const token = getToken()
        console.log("token",token)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/user/"+userData, 
            { headers: {'session-token': token}}
        );
    },    

    updateUser: async function(userData,userDataName) {
        console.log("API.updateUser was called", userDataName)
        const token = getToken()
        return await axios.put(
            "https://canine-cupid-mobile.herokuapp.com/user/"+userDataName, userData,
            { headers: {'session-token': token}}
        );
    },
    // getting All Names as an array
    getAllUsers: async function(sessionToken){
        console.log("API.getAllUsers was called", sessionToken)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/users", 
            { headers: {'session-token': sessionToken}}
        );
    },

    getMatchesYesByName: async function(userData) {
        console.log("API.getMatchesYesByName was called", userData)
        const token = getToken()
        // console.log("token",token)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/usersallyesmatches/"+userData,
            { headers: {'session-token': token}}
        );
    },

    getMatchesNoByName: async function(userData) {
        console.log("API.getMatchesNoByName was called", userData)
        const token = getToken()
        // console.log("token",token)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/usersallnomatches/"+userData,
            { headers: {'session-token': token}}
        );
    },

    setUsersYesMatches: async function(userData1,userData2) {
        console.log("API.setUsersYesMatches was called", userData1, userData2)
        // const token = getToken()
        // console.log("token",token)
        return await axios.put(
            "https://canine-cupid-mobile.herokuapp.com/usersyesmatches/"+userData1+"/"+userData2
            //, { headers: {'session-token': token}}
        );
    },

    setUsersNoMatches: async function(userData1,userData2) {
        console.log("API.setUsersNoMatches was called", userData1, userData2)
        // const token = getToken()
        // console.log("token",token)
        return await axios.put(
            "https://canine-cupid-mobile.herokuapp.com/usersnomatches/"+userData1+"/"+userData2
            //, { headers: {'session-token': token}}
        );
    }

};
