import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView
} from "react-native";

//Image Picked
import * as ImagePicker from 'expo-image-picker';

//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication";

//hooks
import { useState, useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";

//Redux actions
import {updateAvatar} from "../../redux/reducers/userReducer";









export function ProfileAvatar({navigation}){
    //set avatar to display
    const [avatar, setAvatar]=useState('')
    //set avatar to pass to redux
    const [passAvatar, setPassAvatar]=useState('')
    //set next button style
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    //Dispatch
    const dispatch=useDispatch()
    //
    useEffect(()=>{
        if(avatar!=='')
        {
            setButtonColor('#FF5864')
            setTextButtonColor('white')
            setEnableButton(false)
        }
        else{
            setButtonColor('#DCDCDC')
            setTextButtonColor('#A9A9A9')
            setEnableButton(true)
        }
    },[avatar])
    //
    function onNextPress(){
        dispatch({type: updateAvatar, payload: avatar})
        navigation.navigate('End')
    }
    async function ChooseImage(){
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                allowsEditing: true,
                quality: 1,
              });
          
              if (!result.canceled) {
                const tmp=result.assets[0].uri
                setAvatar(tmp)
                setPassAvatar(tmp.substring(tmp.lastIndexOf('/')+1))
              } 
              else
              {
                alert('Bạn đã hủy hành động !');
              }
    }
    return(
        <View style={{flex: 1}}>
            <ScrollView>
            <View style={{height: windowHeight*1.4}}>
            <View style={{position: 'absolute', flexDirection: 'row', alignItems: 'center', height: windowHeight*0.1,width: windowWidth, marginTop: windowHeight*0.075,}}>
            <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
            <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
            </View>
            <View style={{position: 'absolute', marginTop: windowHeight*0.175, marginLeft: windowWidth*0.075, width: windowWidth*0.85}}>
            <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
                Hãy chọn ảnh đại diện đẹp nhất của bạn ! 
            </Text>
            </View>
            <View style={{position: 'absolute', width: windowWidth, height: windowHeight*0.75, marginTop: windowHeight*0.3, alignItems: 'center'}}>
            <View style={{backgroundColor: '#DCDCDC', width: windowWidth*0.975, height: windowHeight*0.75, borderRadius: 25}}>
                <Image source={avatar===''?null:{uri: avatar}} style={{width: windowWidth*0.975, height: windowHeight*0.75, borderRadius: 25}}></Image>
            </View>
            </View>
            <TouchableOpacity style={[styles.nextButton, {backgroundColor: '#00BFFF', marginTop: windowHeight*1.075, position: 'absolute'}]} onPress={ChooseImage}>
                <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
                    Chọn ảnh
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.nextButton, {backgroundColor: buttonColor, marginTop: windowHeight*1.25}]} onPress={onNextPress} disabled={enableButton}>
                <Text style={{color: textButtonColor, fontSize: 17, fontWeight: 'bold'}}>
                    Tiếp theo
                </Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
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
