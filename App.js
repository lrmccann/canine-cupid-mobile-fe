import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

  // if(!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig)
  // }

  return (
    <View style={{minHeight:"100%"}}>
      <MainStackNavigator >
       <StatusBar style="auto" />
    {/* //  </UserProvider> */}
    </MainStackNavigator>
    {/* <TabBar /> */}
    </View>

  );
  
}