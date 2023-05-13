import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable
} from 'react-native'


//react native modal
import Modal from 'react-native-modal'


//hooks
import { useState, useEffect } from 'react'


//Get screen's height and width
import { windowHeight, windowWidth } from '../screens/Authentication/Authentication'



//Redux
import { useDispatch, useSelector } from 'react-redux'



//Redux actions
import { updateGender } from '../redux/reducers/userReducer'




//Database actions
import { UpdateUserGender } from '../DatabaseActions'


export function GenderModal({genderVisible, setGenderVisible}){
    let Info=useSelector(state=>state.userInfo)
    const dispatch=useDispatch()
    const genders=[
        {
            id: 1,
            value: 'Nam',
            buttonStyle: {borderWidth: 3, borderColor: '#00BFFF'},
            textStyle: '#00BFFF',
            Picture: require('../assets/MaleGender.png')
        },
        {
            id: 2,
            value: 'Khác',
            buttonStyle: {borderWidth: 3, borderColor: '#FFD700'},
            textStyle: '#FFD700',
            Picture: require('../assets/LGBTGender.png')
        },
        {
            id: 3,
            value: 'Nữ',
            buttonStyle: {borderWidth: 3, borderColor: '#F54556'},
            textStyle: '#F54556',
            Picture: require('../assets/FemaleGender.png')
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
    function FinishPress(){
        UpdateUserGender(Info, gender)
        setGenderVisible(false)
        dispatch({type: updateGender, payload: gender})
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
        <Modal 
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        isVisible={genderVisible}
        statusBarTranslucent={true}
        backdropTransitionOutTiming={0}
        onBackButtonPress={()=>{
            setGenderVisible(false)
        }}
        style={{margin:0}}
        customBackdrop={<Pressable style={{height: windowHeight*1.5,backgroundColor: 'black', opacity: 0.7, alignItems: 'center'}} 
        onPress={()=>{
            setGenderVisible(false)
        }}
        />}
        >
            <View style={{backgroundColor: 'white', width: windowWidth, height: windowHeight*0.35, marginTop: windowHeight*0.76, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center'}}>
            <View style={{width: windowWidth*0.9, height: windowHeight*0.03,marginTop: windowHeight*0.005, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=>{setGenderVisible(false)}}>
                    <Image source={require('../assets/Close.png')} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            <View style={{width: windowWidth, height: windowHeight*0.05, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Giới tính của tôi
                </Text>
            </View>
            <View style={{width: windowWidth, height: windowHeight*0.05, flexDirection: 'row', justifyContent: 'space-between', marginTop: windowHeight*0.05}}>
            {genders.map((item, index)=>(
                <Pressable key={index} style={[{
                width: windowWidth*0.3, 
                height: windowHeight*0.05, 
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#DCDCDC', 
                borderRadius: 50, 
            }, 
                checkClickedButton(item, clickedButton)]} 
                onPress={()=>GenderPress(item, clickedButton)}
                >
                <Image source={item.Picture} style={{width: 25, height: 25, marginLeft: 10}}/>
                <View style={{width: windowWidth*0.15, alignItems: 'center'}}>
                <Text style={[{fontSize: 20, fontWeight: 'bold'}, 
                {color: checkClickedText(item, clickedButton)}
                ]}>
                     {item.value}
                </Text>
                </View>
                </Pressable>
            ))}
            </View>
            <View style={{width: windowWidth, height: windowHeight*0.055, marginTop: windowHeight*0.05, alignItems: 'center'}}>
            <TouchableOpacity style={{
            height: windowHeight*0.055,
            width: windowWidth*0.85,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            shadowColor: 'black',
            elevation: 7,
            backgroundColor: buttonColor
        }} 
            onPress={FinishPress} 
            disabled={enableButton}
            >
            <Text style={{color: textButtonColor, fontSize: 17, fontWeight: 'bold'}}>
                Xong
            </Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    )
}

