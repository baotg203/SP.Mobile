import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
} from "react-native";

//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication";

//hooks
import { useState, useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";

//Redux actions
import {updateBirth} from "../../redux/reducers/userReducer";





export function ProfileBirth({navigation}){
    const [birth, setBirth]=useState('')
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    const dispatch=useDispatch()
    const regex=/[\s]+/
    const currentYear=new Date().getFullYear()
    function onNextPress(){
        dispatch({type: updateBirth, payload: birth})
        navigation.navigate('Gender')
    }
    useEffect(()=>{
        if(birth!=='')
        {
            if(birth.match(regex)){
                setButtonColor('#DCDCDC')
                setTextButtonColor('#A9A9A9')
                setEnableButton(true)
            }
            else{
                if(birth>=1900&&birth<=currentYear){
                    setButtonColor('#FF5864')
                    setTextButtonColor('white')
                    setEnableButton(false)
                }
                else{
                    setButtonColor('#DCDCDC')
                    setTextButtonColor('#A9A9A9')
                    setEnableButton(true)
                }
            }
        }
        else{
            setButtonColor('#DCDCDC')
            setTextButtonColor('#A9A9A9')
            setEnableButton(true)
        }
    },[birth])
    return(
    <View style={{flex: 1}}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
        <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <View style={{position: 'absolute', marginTop: windowHeight*0.25, marginLeft: windowWidth*0.1, width: windowWidth*0.85}}>
        <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
            Bạn sinh năm bao nhiêu ? 
        </Text>
        </View>
        <TextInput autoCapitalize="none" value={birth} onChangeText={setBirth} keyboardType="numeric" style={[styles.textInput, {marginTop: windowHeight*0.4, width: windowWidth*0.35, textAlign: 'center', marginLeft: windowWidth*0.31}]}/>
        <TouchableOpacity style={[styles.nextButton, {backgroundColor: buttonColor, marginTop: windowHeight*0.6}]} onPress={onNextPress} disabled={enableButton}>
            <Text style={{color: textButtonColor, fontSize: 17, fontWeight: 'bold'}}>
                Tiếp theo
            </Text>
        </TouchableOpacity>
    </View>
    )
}

const styles=StyleSheet.create({
    nextButton:{
        postion:'absolute',
        height: 60,
        width: windowWidth*0.85,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: windowWidth*0.075,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 7,
    },
    textInput: {
        position: 'absolute',
        height: 80,
        width: windowWidth*0.85,
        marginLeft: windowWidth*0.075,
        borderBottomColor: 'black',
        borderBottomWidth: 1.5,
        fontSize: 25
    },
    backButton: {
        position: 'absolute',
        height: 30,
        width: 30,
        marginTop: windowHeight*0.1,
        marginLeft: windowWidth*0.025
    },
})
