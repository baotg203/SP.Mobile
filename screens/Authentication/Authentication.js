import {
    View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    Dimensions,  
    TouchableOpacity
} from "react-native";

//hooks
import { useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

//Get window's height and width
export const windowHeight=Dimensions.get('window').height
export const windowWidth=Dimensions.get('window').width

export function Authentication({navigation}){
    function onSignInPress(){
        navigation.navigate('SignIn')
    }
    function onSignUpPress(){
        navigation.navigate('SignUp')
    }
   return(
    <View style={{flex: 1}}>
        <ImageBackground source={require('./../../assets/TinderBG.png')} style={styles.background}>
            <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPress}>
            <Text style={styles.buttonTitle}>Tạo tài khoản mới</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signInButton} onPress={onSignInPress}>
            <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>Đăng nhập</Text>
            </TouchableOpacity>
        </ImageBackground>
    </View>
   )
}
const styles=StyleSheet.create({
    background: {
        resizeMode: 'cover',
        flex: 1
    },
    signUpButton: {
        position: 'absolute',
        marginHorizontal: 25,
        marginTop: windowHeight*0.775,
        backgroundColor: 'white',
        height: 60,
        width: windowWidth*0.85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    signInButton: {
        position: 'absolute',
        marginHorizontal: 25,
        marginTop: windowHeight*0.875,
        height: 60,
        width: windowWidth*0.85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white'
    },
    buttonTitle: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold'
    }
})