//Components
import { 
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native"






import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
//Home
import { HomeTabs } from './screens/Home/HomeTabs';
//Authentication
import {Authentication} from './screens/Authentication/Authentication'
import { SignIn } from './screens/Authentication/SignIn';
import { SignUp } from './screens/Authentication/SignUp';
//Profile
import { ProfileStart } from "./screens/Profile/ProfileStart"
import { ProfileName } from './screens/Profile/ProfileName';
import { ProfileBirth } from './screens/Profile/ProfileBirth'
import { ProfileGender } from './screens/Profile/ProfileGender';
import { ProfileInterests } from './screens/Profile/ProfileInterests';
import { ProfileBio } from './screens/Profile/ProfileBio';
import { ProfileAvatar } from './screens/Profile/ProfileAvatar';
import { ProfileEnd } from './screens/Profile/ProfileEnd';
//Main
import { Main } from './screens/Home/Main';
import { Chat } from './screens/Home/Chat';
import { Settings } from './screens/Home/Settings';


//Redux
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';


//hooks
import { useEffect, useState } from 'react';

//Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Stack
const Stack = createNativeStackNavigator();

//Tabs
const Tabs=createBottomTabNavigator()

export default function App() {
   return (
    <Provider store={store}>
      <NavigationContainer>
      <TinderClone/>
      </NavigationContainer>
    </Provider>
  )
}
export function TinderClone(){
  let Info=useSelector(state=>state.userInfo)
  let UserSaved=useSelector(state=>state.userValidated)
  let Profile=useSelector(state=>state.profileValidated)
  if(UserSaved.validated===true&&Profile.validatedProfile===true){
  return(
    <HomeTabs/>
  )}
  else{
    return(
    <Stack.Navigator initialRouteName='Authentication' screenOptions={{headerShown: false}}>
    <Stack.Screen name="Authentication" component={Authentication}/>
    <Stack.Screen name="SignUp" component={SignUp}/>
    <Stack.Screen name="SignIn" component={SignIn}/>
    <Stack.Screen name='Start' component={ProfileStart}/>
    <Stack.Screen name='Name' component={ProfileName}/>
    <Stack.Screen name='Birth' component={ProfileBirth}/>
    <Stack.Screen name='Gender' component={ProfileGender}/>
    <Stack.Screen name='Interests' component={ProfileInterests}/>
    <Stack.Screen name='Bio' component={ProfileBio}/>
    <Stack.Screen name='Avatar' component={ProfileAvatar}/>
    <Stack.Screen name='End' component={ProfileEnd}/>
    </Stack.Navigator>
  )
    }
}
