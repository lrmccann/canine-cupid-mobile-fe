import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator , createSwitchNavigator } from '@react-navigation/stack'
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
import { View } from "react-native";

// import Stupid from "../pages/Stupid"



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

    const STORAGE_KEY = JSON.stringify(user)
    console.log(STORAGE_KEY , "this is storage key")
    const syncSet = async () => {
      try{
        // await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        console.log(user , "helllllooooooooooo")
      }
    catch (error) {
      throw error;
    }
  }

  useEffect( () => {
    syncSet()
  }, [] )
console.log(AsyncStorage)

const syncGet = async () => {
  if (user === undefined) {
    return (<View><Text>Loading</Text></View>)
  } if( user !== undefined){
    try{
      // const raw = await AsyncStorage.getItem(user)
      const raw = await AsyncStorage.getItem('user')
      setUser(JSON.parse(raw))
      console.log(raw)
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
  
  return (
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
    <NavigationContainer >
      <Stack.Navigator initialRouteName="home" style={styles.header}>
        <Stack.Screen
         name='aboutUs'
          component={AboutUs}
          options={{
          headerShown : false
          }} />
        <Stack.Screen
         name='home' 
         component={Login}
         options={{
         headerShown: false
         }}/>
        <Stack.Screen
         name='signup' 
         component={Signup}
         options={{
           headerShown:false
         }} />
        <Stack.Screen 
        name='profile' 
        component={Profile}
        options={{
          headerShown:false
        }} />
        <Stack.Screen 
        name='editProfile' 
        component={EditProfile}
        options={{
          headerShown:false
        }} />
        <Stack.Screen 
        name='matchNow' 
        component={Matchnow}
        options={{
          headerShown:false
        }} />
        <Stack.Screen 
        name='matches' 
        component={Matches}
        options={{
          headerShown:false
        }} />
        {/* <Stack.Screen name='matches' component={Matches} /> */}
      </Stack.Navigator>
     </NavigationContainer>
     </UserProvider>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(0 , 0 , 0)"
  }
})
