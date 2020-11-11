// import React, { useState, useEffect } from "react";
// import { BaseRouter, NavigationContainer, NavigationRouteContext } from '@react-navigation/native';
// import { createStackNavigator ,  createSwitchNavigator } from '@react-navigation/stack';
// import { createAppContainer } from "react-navigation";
// import  AsyncStorage  from '@react-native-community/async-storage';
// import { UserProvider } from "../utils/UserContext";

// import EditProfile from '../pages/EditProfile';
// import Matches from '../pages/Matches';
// import Matchnow from '../pages/Matchnow';
// import Profile from '../pages/Profile';


// const Stack = createStackNavigator()

// const AuthNavigator = createSwitchNavigator(

//     <UserProvider>
//     <NavigationContainer>
//     <Stack.Navigator initialRouteName="profile" style={styles.header}>
// <Stack.Screen 
//         name='profile' 
//         component={Profile}
//         options={{
//           headerStyle : {
//             backgroundColor : "rgb(232, 86, 86)"
//           },
//           headerTitleStyle : {            
//             fontSize : 22,
//             marginBottom : 10,
//             // marginRight: 320,
//             color: "white"

//           }
//           // headerShown:false
//         }} />
//         <Stack.Screen 
//         name='editProfile' 
//         component={EditProfile}
//         options={{
//           // headerShown:false
//         }} />
//         <Stack.Screen 
//         name='matchNow' 
//         component={Matchnow}
//         options={{
//           // headerShown:false
//           headerStyle : {
//             backgroundColor : "rgb(232, 86, 86)"
//           },
//           headerTitleStyle : {            
//             fontSize : 22,
//             marginBottom : 10,
//             // marginRight: 320,
//             color: "white"
//           }
//         }} />
//         <Stack.Screen 
//         name='matches' 
//         component={Matches}
//         options={{
//           // headerShown:false
//         }} />
// </Stack.Navigator>
// </NavigationContainer>
// </UserProvider>
// )

// export default AuthNavigator