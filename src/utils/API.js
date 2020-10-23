import  AsyncStorage  from '@react-native-community/async-storage';
import axios from "axios";
import React, { useState, useEffect , useContext } from "react";

import { Button, Text, TextInput, View, ViewComponent, StyleSheet, TouchableHighlight, Image , Alert } from "react-native";


// console.log(STORAGE_KEY)


async function getToken () {
    const raw = await AsyncStorage.getItem('STORAGE_KEY')
    // Alert.alert(raw)
    // if (raw) {
    // let hello = JSON.parse(raw)
    // let token = hello.sessionToken
    // console.log(token , "please be the right way")
    // return token
    // const newRaw = AsyncStorage.setItem('newToken' , token)
    // let idk = await AsyncStorage.getItem('newToken')
    // console.log(idk , "allllll keys")
     return raw
    // } else {
    // let token = ""
    // console.log(raw, "this is raw")
    // console.log(token , "parsed data from raw")
    // }
    // return token
}
    

export default {
    // Create a User/ Saves a User to the database
    saveUser: async function(userData) {
        console.log("API.saveUser was called", userData)
        return await axios.post(
            "https://canine-cupid-mobile.herokuapp.com/users", userData
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
        const token = await getToken()
        console.log("token",token)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/user/"+userData, 
            { headers: {'session-token': token}}
        );
    },    

    updateUser: async function(userData,userDataName) {
        console.log("API.updateUser was called", userDataName)
        const token = await getToken()
        return await axios.put(
            "https://canine-cupid-mobile.herokuapp.com/user/"+userDataName, userData,
            { headers: {'session-token': token}}
        );
    },
    // getting All Names as an array
    getAllUsers: async function(sessionToken){
        console.log("API.getAllUsers was called", sessionToken)
        const token = await getToken()
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/users", 
            { headers: {'session-token': token}}
        );
    },

    getMatchesYesByName: async function(userData ) {
        // let idk =  AsyncStorage.getItem('STORAGE_KEY')
        console.log("API.getMatchesYesByName was called", userData)
        const token = await  getToken()
        // console.log(token)
        // console.log(idk)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/usersallyesmatches/"+userData,
            { headers: {'session-token': token}}
        )
    },

    getMatchesNoByName: async function(userData) {
        console.log("API.getMatchesNoByName was called", userData)
        const token = await getToken()
        console.log("token",token)
        return await axios.get(
            "https://canine-cupid-mobile.herokuapp.com/usersallnomatches/"+userData,
            { headers: {'session-token': token}}
        );
    },

    setUsersYesMatches: async function(userData1,userData2 ) {
        console.log("API.setUsersYesMatches was called", userData1, userData2)
        const token = await getToken()
        console.log("token",token)
        return await axios.put(
            "https://canine-cupid-mobile.herokuapp.com/usersyesmatches/"+userData1+"/"+userData2
            , { headers: {'session-token': token}}
        );
    },

    setUsersNoMatches: async function(userData1,userData2 ) {
        console.log("API.setUsersNoMatches was called", userData1, userData2)
        const token = await getToken()
        console.log("token",token)
        return await axios.put(
            "https://canine-cupid-mobile.herokuapp.com/usersnomatches/"+userData1+"/"+userData2
            , { headers: {'session-token': token}}
        );
    }

};
