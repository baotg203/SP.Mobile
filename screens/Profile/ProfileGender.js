import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ImageBackground,
    Pressable,
    Image
} from "react-native";

//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication";

//hooks
import { useState, useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";

//Redux actions
import {updateGender} from "../../redux/reducers/userReducer";





export function ProfileGender({navigation}){
    const genders=[
        {
            id: 1,
            value: 'Nam',
            buttonStyle: {borderWidth: 3, borderColor: '#00BFFF'},
            textStyle: '#00BFFF',
            Picture: require('../../assets/MaleGender.png')
        },
        {
            id: 2,
            value: 'Khác',
            buttonStyle: {borderWidth: 3, borderColor: '#FFD700'},
            textStyle: '#FFD700',
            Picture: require('../../assets/LGBTGender.png')
        },
        {
            id: 3,
            value: 'Nữ',
            buttonStyle: {borderWidth: 3, borderColor: '#F54556'},
            textStyle: '#F54556',
            Picture: require('../../assets/FemaleGender.png')
        }
    ]
    //Set gender
    const [gender, setGender]=useState('')
    //Set button styles
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    //Set clicked button
    const [clickedButton, setClickedButton]=useState(-1)
    const dispatch=useDispatch()
    function onNextPress(){
        dispatch({type: updateGender, payload: gender})
        navigation.navigate('Interests')
    }
    function checkClickedButton(item, id){
        if(item.id===id){
            return item.buttonStyle
        }
        else{
            return {borderWidth: 0, borderColor: ''}
        }
    }
    function checkClickedText(item, id){
        if(item.id===id){
            return item.buttonStyle.borderColor
        }
        else{
            return 'black'
        }
    }
    function GenderPress(item, id){
        if(item.id===id){
            setClickedButton(-1)
            setGender('')
        }
        else{
            setClickedButton(item.id)
            setGender(item.value)
        }
    }
    useEffect(()=>{
        if(gender!=='')
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
    },[gender])
    return(
    <View style={{flex: 1}}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
        <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <View style={{position: 'absolute', marginTop: windowHeight*0.25, marginLeft: windowWidth*0.075, width: windowWidth*0.85}}>
        <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
            Giới tính của bạn là gì ?
        </Text>
        </View>
        <View style={{position: 'absolute', marginTop: windowHeight*0.4, marginLeft: windowWidth*0.075, width: windowWidth*0.85, alignItems: 'center', justifyContent: 'center'}}>
            {genders.map((item, index)=>(
                <Pressable key={index} style={[{
                width: windowWidth*0.5, 
                height: windowHeight*0.065, 
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#DCDCDC', 
                borderRadius: 50, 
                margin: windowHeight*0.01}, checkClickedButton(item, clickedButton)]} 
                onPress={()=>GenderPress(item, clickedButton)}
                >
                <Image source={item.Picture} style={{width: 30, height: 30, marginLeft: 20}}/>
                <View style={{marginLeft: windowWidth*0.035, width: windowWidth*0.2, alignItems: 'center'}}>
                <Text style={[{fontSize: 20, fontWeight: 'bold'}, 
                {color: checkClickedText(item, clickedButton)}
                ]}>
                     {item.value}
                </Text>
                </View>
                </Pressable>
            ))}
        </View>
        <TouchableOpacity style={[styles.nextButton, {backgroundColor: buttonColor, marginTop: windowHeight*0.7}]} onPress={onNextPress} disabled={enableButton}>
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

