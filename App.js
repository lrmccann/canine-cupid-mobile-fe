import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { UserProvider } from "./src/utils/UserContext";
// import "./App.css";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import './node_modules/react-native/react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import {NavigationContainer} from "./node_modules/react-native";
// import { createStackNavigator } from "./node_modules/react-native";
// import { createStackNavigator } from '@react-navigation/stack';
// import "./node_modules/react-native-gesture-handler";
import MainStackNavigator from "./src/Navigation/MainStackNavigator";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
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
  // useEffect(
  //   ()=>{const raw = localStorage.getItem('user')
  //       setUser(JSON.parse(raw))
  //   }, [] )

  // useEffect(
  //   ()=>{localStorage.setItem('user', JSON.stringify(user));
  // }, [user])

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
  const getData = (data) => {
    setUser (user=>{return user = data})
  }

  const getNewUserData = (data) => {
    setNewUserData (newUserData=>{return newUserData = data})
  }

  const getNewUserName = (data) => {
    setNewUserName (newUserName=>{return newUserName = data})
  }

  const getAllUsersNames = (data) => {
    setAllUsersNames (allUsersNames=>{return allUsersNames=data})
  }

  const getAllMatchesForMatchesPage = (data) => {
    setUserForMatchesPage (userForMatchesPage=>{return userForMatchesPage = data})
  }
  const getCurrentUserIpAddressForContext = (data) => {
    setCurrentUserIp(currentUserIp=>{return currentUserIp = data})
  }

  const Stack = createStackNavigator;

  return (
    <MainStackNavigator>
  {/* //   <NavigationContainer> */}
    <UserProvider value = {{
      user,
      newUserData,
      newUserName,
      allUsersNames,
      userForMatchesPage,
      currentUserIp,

      getData,
      getNewUserData,
      getNewUserName,
      getAllUsersNames,
      getAllMatchesForMatchesPage,
      getCurrentUserIpAddressForContext
    }}>
  {/* //           <Router>
  //     <Navbar sticky="top"/>
  //     <Text>
  //        <Wrapper> 
  //        <Stack.Navigator>
  //          <Stack.Navigator>
  //            <Stack.Screen name="Login" component={Login} />
  //            <Stack.Screen name="Signup" component={Signup} />
  //            <Stack.Screen name="aboutUs" component={aboutUs} />
  //          </Stack.Navigator>
  //         <Route exact activeClassName path="/" component={Login} />
  //         <Route exact activeClassName  path="/login" component={Login} />
  //         <Route exact activeClassName path="/aboutus" component={aboutUs} />
  //         <Route exact activeClassName  path="/signup" component={Signup} />
  //         <ScrollToTop>
  //           <Switch>
  //         <Route exact activeClassName  path="/profile" component={Profile} />

  //           </Switch>
  //         </ScrollToTop>
  //         <Route exact activeClassName  path="/editprofile" component={EditProfile} />
  //         <Route exact activeClassName  path="/matchnow" component={Matchnow} />
  //         <Route exact activeClassName  path="/matches" component={Matches} />       
  //       <Contacts />
  //     <Footer />
  //     </Text>
  //   </Router> */}
  {/* //   <View style={styles.container}> */}
  {/* //     <Text>Open up App.js to start working on your app!</Text> */}
  {/* //     </Stack.Navigator> */}
       <StatusBar style="auto" />
     {/* </View> */}
     </UserProvider>
  {/* //   </NavigationContainer> */}
  </MainStackNavigator>
  );
  
}

const styles = StyleSheet.create({
  body: {
    // /* background-image: url("dogsworld.jpg");  */
    // background-image: url("./images/dog-world-2.png"),
    // backgroundColor: "rgb(232, 86, 86)" ,
    /* background-color:rgb(232, 86, 86); */
    // background-blend-mode: hard-light,
    // backgroundRepeat: "repeat"
  },
});


