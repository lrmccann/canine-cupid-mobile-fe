import React, { useState, useEffect } from "react";
import { BaseRouter, NavigationContainer, NavigationRouteContext } from '@react-navigation/native';
import { createStackNavigator ,  createSwitchNavigator } from '@react-navigation/stack';
import { createAppContainer } from "react-navigation";
import  AsyncStorage  from '@react-native-community/async-storage';
import { UserProvider } from "../utils/UserContext";
import { Text , StyleSheet } from "react-native";



import Login from '../pages/Login';
import AboutUs from '../pages/AboutUs';
import EditProfile from '../pages/EditProfile';
import Matches from '../pages/Matches';
import Matchnow from '../pages/Matchnow';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
// import routes from "../../app.json";
// import {
//     AboutUsScreen,
//     EditProfileScreen,
//     LoginScreen,
//     MatchesScreen,
//     MatchNowScreen,
//     ProfileScreen,
//     SignupScreen
// } from "../screens/index";

// console.log(routes.routes[0].component)



const Stack = createStackNavigator()
// const Switch = createSwitchNavigator()

export default function MainStackNavigator() {
  const [user, setUser] = useState({});
  console.log ("user", user);
  const [newUserData, setNewUserData] = useState({});
  console.log ("newUserData", newUserData);
  const [newUserName, setNewUserName] = useState("");
  console.log ("newUserName", newUserName);
  const [allUsersNames, setAllUsersNames] = useState([]);
  console.log ("allUsersNames", allUsersNames);
  const [userForMatchesPage , setUserForMatchesPage] = useState([])
  console.log("userForMatchesPage" , userForMatchesPage);
  const [currentUserIp , setCurrentUserIp] = useState("")
  console.log("currentUserIp" , currentUserIp);


    const STORAGE_KEY = user.sessionToken
    const syncSet = async () => {
      try{
        console.log(STORAGE_KEY)
        await AsyncStorage.setItem('STORAGE_KEY' , STORAGE_KEY);
      }
    catch (error) {
      throw error;
    }
  }

  useEffect( () => {
    syncSet()
  }, [] )
  console.log(STORAGE_KEY , "i am sync storage")

const syncGet = async () => {
  if (user === undefined) {
    // return (<View><Text>Loading</Text></View>)
  // } 
  // if( user !== undefined){
    try{
      // const raw = await AsyncStorage.getItem(user)
      const raw = await AsyncStorage.getItem('user')
      let hello = JSON.parse(raw)
      setUser(hello)
      }catch (error) {
      throw error;
    }
  }
}
useEffect( () => {
  syncGet()
}, [] )

  useEffect( () => {
    // async function fetchIp() {
       {fetch('https://api.ipify.org?format=jsonp?callback=?', {
        method: 'GET',
        headers: {},
       })
      .then(res => {
        return res.text()
      }).then(ip => { setCurrentUserIp(ip)
        console.log('ip', ip);
        return ip;
      })
    }
  },[]
  )

  // const storeData = async (value) => {
  //   try{
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem
  //   }
  // }

  const getData = (data ) => {
    setUser ( user => { return user = data})
  }

  const getNewUserData = (data) => {
    setNewUserData ( newUserData => { return newUserData = data})
  }

  const getNewUserName = (data) => {
    setNewUserName ( newUserName => {return newUserName = data})
  }

  const getAllUsersNames = (data) => {
    setAllUsersNames (allUsersNames=> {return allUsersNames=data})
  }

  const getAllMatchesForMatchesPage = (data) => {
    setUserForMatchesPage (userForMatchesPage=>{return userForMatchesPage = data})
  }
  const getCurrentUserIpAddressForContext = (data) => {
    setCurrentUserIp(currentUserIp=>{return currentUserIp = data})
  }
  // console.log(NavigationRouteContext , "base route")        // here we want to log the routes / screen keys to use in our bottom tab
  // navigator once we figure that out
  return (
    // <View>
    <UserProvider value = {{
      user,
      newUserData,
      newUserName,
      allUsersNames,
      userForMatchesPage,
      currentUserIp,

      getNewUserData,
      getData,
      getNewUserName,
      getAllUsersNames,
      getAllMatchesForMatchesPage,
      getCurrentUserIpAddressForContext
    }}>
    <NavigationContainer style={styles.navheader} >
      <Stack.Navigator initialRouteName="Login" style={styles.header}>
        <Stack.Screen
         name='aboutUs'
          component={AboutUs}
          options={{
          headerStyle : {
            backgroundColor : "rgb(232, 86, 86)"
          }
          }} />
        <Stack.Screen
         name='Login' 
         component={Login}
         options={{
           headerStyle : {
             backgroundColor : "rgb(232, 86, 86)"
           },
           headerTitleStyle : {
             fontSize : 22,
             marginBottom : 10,
             marginRight: 320,
             color: "white"
           }
        //  headerShown: false
         }}/>
        <Stack.Screen
         name='signup' 
         component={Signup}
         options={{
           headerStyle : {
             backgroundColor : "rgb(232, 86, 86)"
           },
           headerTitleStyle : {
            fontSize : 22,
            marginBottom : 10,
            // marginRight: 320,
            color: "white"
          }

          //  headerShown:false
         }} />
        <Stack.Screen 
        name='profile' 
        component={Profile}
        options={{
          headerStyle : {
            backgroundColor : "rgb(232, 86, 86)"
          },
          headerTitleStyle : {            
            fontSize : 22,
            marginBottom : 10,
            // marginRight: 320,
            color: "white"

          }
          // headerShown:false
        }} />
        <Stack.Screen 
        name='editProfile' 
        component={EditProfile}
        options={{
          // headerShown:false
        }} />
        <Stack.Screen 
        name='matchNow' 
        component={Matchnow}
        options={{
          // headerShown:false
          headerStyle : {
            backgroundColor : "rgb(232, 86, 86)"
          },
          headerTitleStyle : {            
            fontSize : 22,
            marginBottom : 10,
            // marginRight: 320,
            color: "white"
          }
        }} />
        <Stack.Screen 
        name='matches' 
        component={Matches}
        options={{
          // headerShown:false
        }} />
      </Stack.Navigator>
     </NavigationContainer>
     </UserProvider>
  )
}

const styles = StyleSheet.create({
  navheader : {
    backgroundColor : "rgb(232, 86, 86)"
  },
    header: {
    backgroundColor: "rgb(0 , 0 , 0)"
  },
  bottomNav: {
    height: 100,
    backgroundColor: "black",
    width :"100%"

  }

 })
