import React, { useState, useEffect, useContext } from "react";
// import Map from "../map";
// import UserContext from "../../utils/UserContext";
// import { View , Image, TextInput, Text , StyleSheet , Button, Alert , Modal } from 'react-native';
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import API from "../../utils/API";
import { NavigationContainer, useNavigation } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';

import Matches from '../pages/Matches';
import Matchnow from '../pages/Matchnow';
import Profile from '../pages/Profile';
import UsersDetails from "../pages/UsersDetails"
import EditProfile from '../pages/EditProfile';

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator();

export default function BottomTabBar () {
    return (
    <NavigationContainer>   
        <Tab.Navigator initialRouteName="profile" screenOptions = {({})}>
    <Tab.Screen
    name="profile"
    component={Profile}
    />
    <Tab.Screen
    name="editProfile"
    component={EditProfile}
    />
    <Tab.Screen
    name="matchNow"
    component={Matchnow}
    />
    <Tab.Screen
    name="matches"
    component={Matches}
    />
    <Tab.Screen
    name="usersDetails"
    component={UsersDetails}
    />
        </Tab.Navigator>
    </NavigationContainer>
    )

}