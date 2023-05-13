import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ImageBackground,
    TextInput,
} from "react-native";

//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication";

//hooks
import { useState, useEffect } from "react";

//Redux
import { useDispatch} from "react-redux";

//Redux actions
import {updateBio} from "../../redux/reducers/userReducer";





export function ProfileBio({navigation}){
    //
    const [bio, setBio]=useState('')
    //Next button style
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    //
    const regex=/^[\s]/
    //
    const dispatch=useDispatch()
    useEffect(()=>{
        if(bio!==''){
            if(bio.match(regex)){
                setButtonColor('#DCDCDC')
                setTextButtonColor('#A9A9A9')
                setEnableButton(true)
            }
            else{
            setButtonColor('#FF5864')
            setTextButtonColor('white')
            setEnableButton(false)
            }
        }
        else{
            setButtonColor('#DCDCDC')
            setTextButtonColor('#A9A9A9')
            setEnableButton(true)
        }
    },[bio])
    function onNextPress(){
        dispatch({type: updateBio, payload: bio})
        navigation.navigate('Avatar')
    }
    function onCancelPress(){
        navigation.navigate('Avatar')
    }
    return(
    <View style={{flex: 1}}>
        <View style={{position: 'absolute', flexDirection: 'row', alignItems: 'center', height: windowHeight*0.1,width: windowWidth, marginTop: windowHeight*0.075,}}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
        <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 40, width: 70, marginLeft: windowWidth*0.7, alignItems: 'center', justifyContent: 'center'}} onPress={onCancelPress}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#A9A9A9'}}>
            Bỏ qua
        </Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', marginTop: windowHeight*0.2, marginLeft: windowWidth*0.075, width: windowWidth*0.85}}>
        <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
            Hãy nói cho mọi người nghe thêm về bạn ! 
        </Text>
        </View>
        <TextInput autoCapitalize="none" multiline={true} maxLength={300} placeholder="Giới thiệu bản thân..." value={bio} onChangeText={setBio} style={[styles.textInput, {marginTop: windowHeight*0.4}]}/>
        <TouchableOpacity style={[styles.nextButton, {backgroundColor: buttonColor, marginTop: windowHeight*0.95}]} onPress={onNextPress} disabled={enableButton}>
            <Text style={{color: textButtonColor, fontSize: 17, fontWeight: 'bold'}}>
                Tiếp theo
            </Text>
        </TouchableOpacity>
    </View>
    )
}

const styles=StyleSheet.create({
    nextButton:{
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
        height: windowHeight*0.4,
        width: windowWidth*0.85,
        marginLeft: windowWidth*0.075,
        borderBottomColor: 'black',
        borderBottomWidth: 1.5,
        borderTopColor: 'black',
        borderTopWidth: 1.5,
        fontSize: 25,
        backgroundColor: '#DCDCDC',
        textAlignVertical: 'top'
    },
    backButton: {
        height: 30,
        width: 30,
    },
})