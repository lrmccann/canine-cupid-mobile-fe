import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator , createSwitchNavigator } from '@react-navigation/stack'

import Login from '../pages/Login';
import AboutUs from '../pages/AboutUs';
import EditProfile from '../pages/EditProfile';
import Matches from '../pages/Matches';
import Matchnow from '../pages/Matchnow';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
// import Stupid from "../pages/Stupid"



const Stack = createStackNavigator()
const Switch = createSwitchNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name='aboutUs' component={AboutUs} />
        <Stack.Screen name='home' component={Login} />
        <Stack.Screen name='signup' component={Signup} />
        <Switch>
        <Stack.Screen name='profile' component={Profile} />
        <Stack.Screen name='editProfile' component={EditProfile} />
        <Stack.Screen name='matchNow' component={Matchnow} />
        <Stack.Screen name='matches' component={Matches} />
        </Switch>
        {/* <Stack.Screen name='matches' component={Matches} /> */}
      </Stack.Navigator>
     </NavigationContainer>
  )
}

export default MainStackNavigator
