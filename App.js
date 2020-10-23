import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./src/pages/Login";
import Profile from "./src/pages/Profile";
import aboutUs from "./src/pages/AboutUs";
import EditProfile from "./src/pages/EditProfile";
import Signup from "./src/pages/Signup";
import Matchnow from "./src/pages/Matchnow";
import Matches from "./src/pages/Matches";
// import Navbar from "./components/Navbar";
import Footer from "./src/components/Footer";
import ScrollToTop from "./src/components/ScrollTop";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Text from "./components/MyText"
// import { profile } from "console";
// import  {UserProvider}  from "./src/utils/UserContext";
// import {SafeAreaProvider} from "react-native-safe-area-context";
// import "./App.css";
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import './node_modules/react-native/react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import {NavigationContainer} from "./node_modules/react-native";
// import { createStackNavigator } from "./node_modules/react-native";
// import { createStackNavigator } from '@react-navigation/stack';
// import "./node_modules/react-native-gesture-handler";
import MainStackNavigator from "./src/Navigation/MainStackNavigator";
import { createStackNavigator } from '@react-navigation/stack';
// import Navbar from './src/components/Navbar';
// import  {AsyncLocalStorage}  from '@react-native-community/async-storage';
// import Router from "./src/Navigation/TabBar";
import TabBar from './src/Navigation/TabBar';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
//   const [user, setUser] = useState({});
//   console.log ("user", user);
//   const [newUserData, setNewUserData] = useState({});
//   console.log ("newUserData", newUserData);
//   const [newUserName, setNewUserName] = useState("");
//   console.log ("newUserName", newUserName);
//   const [allUsersNames, setAllUsersNames] = useState([]);
//   console.log ("allUsersNames", allUsersNames);
//   const [userForMatchesPage , setUserForMatchesPage] = useState([])
//   console.log("userForMatchesPage" , userForMatchesPage);
//   const [currentUserIp , setCurrentUserIp] = useState("")
//   console.log("currentUserIp" , currentUserIp);

//   const syncGet = async () => {
//     try{
//     const raw = await AsyncLocalStorage.getItem('user');
//     setUser(JSON.parse(raw))
//     console.log(raw)
//     }catch (error) {
//     throw error;
//   }
// }
//   useEffect( () => {
//     syncGet()
//   }, [] )

//     const syncSet = async () => {
//       try{
//         await AsyncLocalStorage.setItem('user', JSON.stringify(user));
//         console.log(user , "helllllooooooooooo")
//       }
//     catch (error) {
//       throw error;
//     }
//   }

//   useEffect( () => {
//     syncSet()
//   }, [] )
// console.log(AsyncLocalStorage)

//   useEffect( () => {
//     // async function fetchIp() {
//        {fetch('https://api.ipify.org?format=jsonp?callback=?', {
//         method: 'GET',
//         headers: {},
//        })
//       .then(res => {
//         return res.text()
//       }).then(ip => { setCurrentUserIp(ip)
//         console.log('ip', ip);
//         return ip;
//       })
//     }
//   },[]
//   )

//   const getData = (data , props) => {
//     setUser ( user => { return user = data})
//   }

//   const getNewUserData = (data) => {
//     setNewUserData ( newUserData => { return newUserData = data})
//   }

//   const getNewUserName = (data) => {
//     setNewUserName ( newUserName => {return newUserName = data})
//   }

//   const getAllUsersNames = (data) => {
//     setAllUsersNames (allUsersNames=> {return allUsersNames=data})
//   }

//   const getAllMatchesForMatchesPage = (data) => {
//     setUserForMatchesPage (userForMatchesPage=>{return userForMatchesPage = data})
//   }
//   const getCurrentUserIpAddressForContext = (data) => {
//     setCurrentUserIp(currentUserIp=>{return currentUserIp = data})
//   }

  // const Stack = createStackNavigator;

  return (
    // <UserProvider value = {{
    //   user,
    //   newUserData,
    //   newUserName,
    //   allUsersNames,
    //   userForMatchesPage,
    //   currentUserIp,

    //   getNewUserData,
    //   getData,
    //   getNewUserName,
    //   getAllUsersNames,
    //   getAllMatchesForMatchesPage,
    //   getCurrentUserIpAddressForContext
    // }}>
    <View style={{minHeight:"100%"}}>
      <MainStackNavigator >
       <StatusBar style="auto" />
    {/* //  </UserProvider> */}
    </MainStackNavigator>
    {/* <TabBar /> */}
    </View>

  );
  
}