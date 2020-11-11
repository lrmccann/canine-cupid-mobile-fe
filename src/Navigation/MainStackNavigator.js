import React, { useState, useEffect } from "react";
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  AsyncStorage  from '@react-native-community/async-storage';
import { UserProvider } from "../utils/UserContext";
import { StyleSheet} from "react-native";
// Routes for Pages
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AboutUs from '../pages/AboutUs';
import EditProfile from '../pages/EditProfile';
import Matches from '../pages/Matches';
import Matchnow from '../pages/Matchnow';
import Profile from '../pages/Profile';
import UsersDetails from "../pages/UsersDetails"


const Stack = createStackNavigator()

export default function MainStackNavigator() {
  const [currentUser , setCurrentUser] = useState()
  console.log("current user" , currentUser)
  const [userPhotoLink , setUserPhotoLink] = useState("")
  console.log("user photo link" , userPhotoLink)
  const [ petPhotoLink , setPetPhotoLink] = useState("")
  console.log("pet photo url" , petPhotoLink)
  const [updatedUserData , setUpdatedUserData] = useState({})
  console.log("updated user info" , updatedUserData)
  const [getAllUsernames , setGetAllUsernames] = useState([])
  console.log("all usernames" , getAllUsernames)
  const [getNextUserOption , setGetNextUserOption] = useState("")
  console.log("new user for match now" , getNextUserOption)
  const [getUsersForMatchesPage , setGetUsersForMatchesPage] = useState([])
  console.log("all users for matches page" , getUsersForMatchesPage)
  const [usersIpAddress , setUsersIpAddress] = useState("")
  console.log("current IP address" , usersIpAddress)
  const [isSignedIn , setSignedIn] = useState(false)
  const [getSelectedUser , setSelectedUser] = useState()

//     const STORAGE_KEY = user.sessionToken
//     const syncSet = async () => {
//       try{
//         // console.log(STORAGE_KEY)
//         await AsyncStorage.setItem('STORAGE_KEY' , STORAGE_KEY);
//       }
//     catch (error) {
//       throw error;
//     }
//   }

//   useEffect( () => {
//     syncSet()
//   }, [] )
//   // console.log(STORAGE_KEY , "i am sync storage")

// const syncGet = async () => {
//   if (user === undefined) {
//     // return (<View><Text>Loading</Text></View>)
//   // } 
//   // if( user !== undefined){
//     try{
//       // const raw = await AsyncStorage.getItem(user)
//       const raw = await AsyncStorage.getItem('user')
//       let hello = JSON.parse(raw)
//       setUser(hello)
//       }catch (error) {
//       throw error;
//     }
//   }
// }
// useEffect( () => {
//   syncGet()
// }, [] )


  // useEffect( () => {
  //   // async function fetchIp() {
  //      {fetch('https://api.ipify.org?format=jsonp?callback=?', {
  //       method: 'GET',
  //       headers: {},
  //      })
  //     .then(res => {
  //       setUsersIpAddress(res.text)
  //     })

      
      // .then(ip => { setUsersIpAddress(ip)
      //   console.log('ip', ip);
      //   return ip;
      // })


  //   }
  // },[]
  // )

  // const storeData = async (value) => {
  //   try{
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem
  //   }
  // }

  const getDataAfterLogin = (data) => {
    setCurrentUser(currentUser => {return currentUser = data})
  }
  const userPhotoUrlLink = (data) => {
    setUserPhotoLink(userPhotoLink => {return userPhotoLink = data})
  }
  const petPhotoUrlLink = (data) => {
    setPetPhotoLink(petPhotoLink => {return petPhotoLink = data})
  }
  const editedUserInfo = (data) => {
    setUpdatedUserData(updatedUserData => {return updatedUserData = data})
  }
  const getAllUsersInDb = (data) => {
    setGetAllUsernames ( getAllUsernames => {return getAllUsernames = data})
  }
  const loadNewUser = (data) => {
    setGetNextUserOption (getNextUserOption => {return getNextUserOption = data})
  }
  const setSelectedUserForUDPage = (data) => {
    setSelectedUser(getSelectedUser => {return getSelectedUser =data})
  }
  const getAllUsersForMatchesPage = (data) =>{
    setGetUsersForMatchesPage (getUsersForMatchesPage => {return getUsersForMatchesPage = data})
  }
  const getIpAddress = (data) => {
    setUsersIpAddress (usersIpAddress => {return usersIpAddress = data})
  }
  const authorizedUserToken = (data) => {
    setSignedIn (isSignedIn => {return isSignedIn = data})
  }

  return (
    <UserProvider value = {{
      currentUser,
      userPhotoLink,
      petPhotoLink,
      updatedUserData,
      getAllUsernames,
      getNextUserOption,
      getUsersForMatchesPage,
      usersIpAddress,
      isSignedIn,
      getSelectedUser,

      setSelectedUserForUDPage,
      getDataAfterLogin,
      userPhotoUrlLink,
      petPhotoUrlLink,
      editedUserInfo,
      getAllUsersInDb,
      loadNewUser,
      getAllUsersForMatchesPage,
      getIpAddress,
      authorizedUserToken
    }}>
    <NavigationContainer style={styles.navheader} >
      <Stack.Navigator initialRouteName="Login" style={styles.header}>
        {isSignedIn ? (
          <>
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
      <Stack.Screen 
        name="usersDetails" 
        component={UsersDetails}
        options={{
          headerStyle : {
            backgroundColor : "rgb(232, 86, 86)"
          },
          headerTitleStyle : {
            fontSize : 22,
            marginBottom : 10,
            // marginRight : 320,
            color : "white"
          }
          // headerShown:false
        }} />
          </>
        ) : (
          <>
          <Stack.Screen
          name='aboutUs'
           component={AboutUs}
           options={{
           headerStyle : {
             backgroundColor : "rgb(232, 86, 86)"
           },
           headerTitleStyle : {
             fontSize : 22,
             marginBottom : 10,
             marginRight : 320,
             color : "white"
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
            </>
            )}
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
