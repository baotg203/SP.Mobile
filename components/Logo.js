import { 
    View,
    Image,
    StyleSheet
 } from "react-native"

import { windowHeight, windowWidth } from "../screens/Authentication/Authentication"



export function Logo(){
    return(
    <View style={LogoStyle.LogoContainer}>
        <Image source={require('../assets/TinderLogo.png')} style={LogoStyle.LogoImage}/>
    </View>
    )
}

const LogoStyle=StyleSheet.create({
    LogoContainer: {
        position: 'absolute',
        width: windowWidth, 
        height: windowHeight*0.05, 
        marginTop: windowHeight*0.07,
    },
    LogoImage: {
        width: windowWidth*0.3, 
        height: windowHeight*0.05,
        marginLeft: windowWidth*0.025,
    }
})

