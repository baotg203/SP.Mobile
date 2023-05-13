//Bottom Tabs Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Stack Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";



import { NavigationContainer } from "@react-navigation/native";

//Components
import { 
    View,
    Image,
    Text
 } from "react-native";

import { windowHeight, windowWidth } from "../Authentication/Authentication";

//screens
//Main UI
import { Main } from "./Main";
import { Chat } from "./Chat";
import { Settings } from "./Settings";

//hooks
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";


//Redux actions
import { validateProfile } from "../../redux/reducers/profileReducer";

//Database actions
import { GetUser } from "../../DatabaseActions";

//Tabs
const Tabs = createBottomTabNavigator()

//Stack
const Stack=createNativeStackNavigator()

export function HomeTabs(){
    const Info=useSelector(state=>state.userInfo)
    useEffect(()=>{
        console.log(Info)
    },[])
    return(
    <Tabs.Navigator 
    screenOptions={{
        headerShown: false,
        headerTitle: '',
        tabBarShowLabel:false,
        tabBarStyle: {
            position: 'absolute',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }}
    >
        <Tabs.Screen name='Main' component={Main}
        options={{
            tabBarIcon: ({focused})=>(
                <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                }}
                >
                    <Image
                    source={require('./../../assets/TinderIcon.png')}
                    resizeMode='contain'
                    style={{width: 35, height: 35, tintColor: focused?'#FF5864':'#A9A9A9'}}
                    />
                </View>
            )
        }}
        />
        <Tabs.Screen name='Chat' component={Chat}
        options={{
            tabBarIcon: ({focused})=>(
                <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                }}
                >
                    <Image
                    source={require('./../../assets/Chat.png')}
                    resizeMode='contain'
                    style={{width: 35, height: 35, tintColor: focused?'#FF5864':'#A9A9A9'}}
                    />
                </View>
            )
        }}
        />
        <Tabs.Screen name='Settings' component={Settings}
        options={{
            tabBarIcon: ({focused})=>(
                <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                }}
                >
                    <Image
                    source={require('./../../assets/User.png')}
                    resizeMode='contain'
                    style={{width: 35, height: 35, tintColor: focused?'#FF5864':'#A9A9A9'}}
                    />
                </View>
            )
        }}
        />
    </Tabs.Navigator>
    )
}