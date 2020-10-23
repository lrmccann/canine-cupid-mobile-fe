// import React, { useState, useEffect } from "react";
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator, createSwitchNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createAppContainer } from "react-navigation"
// import { UserProvider } from "../utils/UserContext";
// import { Text, StyleSheet } from "react-native";
// import TabBar from "./TabBar";
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

// console.log(routes.routes)

// const BottomTabNav = createBottomTabNavigator(
//     {
//     Login : {
//         screen : LoginScreen,
//         navigationOptions: {
//                         // tabBarIcon: ({ tintColor }) => <Icon name="###" color={tintColor} />
//                         TabBarLabel: "A",
//                         // currentTabIndex: 1
//         }
//     },
//     ProfileScreen: {
//         screen: ProfileScreen,
//         navigationOptions: {
//             // tabBarIcon: ({ tintColor }) => <Icon name="###" color={tintColor} />
//             TabBarLabel: "B",
//             // currentTabIndex: 1
//         }
//     },
//     MatchNowScreen: {
//         screen: MatchNowScreen,
//         navigationOptions: {
//             // tabBarIcon: ({ tintColor }) => <Icon name="###" color={tintColor} />
//             TabBarLabel: "C",
//             // currentTabIndex: 1
//         }
//     },
//     EditProfileScreen: {
//         screen: EditProfileScreen,
//         navigationOptions: {
//             // tabBarIcon: ({ tintColor }) => <Icon name="###" color={tintColor} />
//             TabBarLabel: "D",
//             // currentTabIndex: 1
//         }
//     },
//     MatchesScreen: {
//         screen: MatchesScreen,
//         navigationOptions: {
//             // tabBarIcon: ({ tintColor }) => <Icon name="###" color={tintColor} />
//             TabBarLabel: "E",
//             // currentTabIndex: 1
//         }
//     },    AboutUsScreen: {
//         screen: AboutUsScreen,
//         navigationOptions: {
//             // tabBarIcon: ({ tintColor }) => <Icon name="###" color={tintColor} />
//             TabBarLabel: "F",
//             // currentTabIndex: 1
//         }
//     },    SignupScreen: {
//         screen: SignupScreen,
//         navigationOptions: {
//             // tabBarIcon: ({ tintColor }) => <Icon name="###" color={tintColor} />
//             TabBarLabel: "G",
//             // currentTabIndex: 1
//         }
//     },
// },
//     {
//         tabBarComponent: TabBar,
//         swipeEnabled: true,
//         tabBarOptions: {
//             activeTintColor: "#01597d",
//             inactiveTintColor: "#ffffff",
//         }
//     }
// )
// export default createAppContainer(BottomTabNav)


// const BottomTabNav = createBottomTabNavigator()
// const Tabs = ({
//     TabBarComponent,
//     initialRouteName,
//     routes
// }) => (
//     <Tabs.Navigator
//     initialRouteName={initialRouteName}
//     TabBar ={props => {
//         return <TabBarComponent {...props} />
//     }}
//     ></Tabs.Navigator>
// )