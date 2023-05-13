import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
    TextInput
} from 'react-native'


//react native modal
import Modal from 'react-native-modal'




//hooks
import {useState, useEffect} from 'react'



//Redux
import { useDispatch, useSelector } from 'react-redux'



//Redux actions
import { updateBio } from '../redux/reducers/userReducer'



//Database actions
import { UpdateUserBio } from '../DatabaseActions'




//Get screen's height and width
import { windowHeight, windowWidth } from '../screens/Authentication/Authentication'



export function BioModal({bioVisible, setBioVisible}){
    //Set user's bio
    const [bio, setBio]=useState('')
    //Next button style
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    //Use Selector
    let Info=useSelector(state=>state.userInfo)
    //Use Dispatch
    const dispatch=useDispatch()
    //Regex
    const regex=/^[\s]/
    //Use Effect
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
    //On next press
    function onNextPress(){
        UpdateUserBio(Info, bio)
        dispatch({type: updateBio, payload: bio})
        setBioVisible(false)
        setBio('')
    }
    return(
    <Modal
    animationIn={'slideInUp'}
    animationOut={'slideOutDown'}
    isVisible={bioVisible}
    onBackdropPress={()=>{
        setBioVisible(false)
    }}
    statusBarTranslucent={true}
    backdropTransitionOutTiming={0}
    onBackButtonPress={()=>{
        setBioVisible(false)
    }}
    style={{margin:0}}
    customBackdrop={<Pressable style={{height: windowHeight*1.5,backgroundColor: 'black', opacity: 0.7, alignItems: 'center'}}
    onPress={()=>{
        setBioVisible(false)
    }}
    />}
    >
        <View style={{backgroundColor: 'white', width: windowWidth, height: windowHeight*0.7, marginTop: windowHeight*0.375, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <View style={{width: windowWidth*0.975, marginTop: windowHeight*0.01, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=>{setBioVisible(false)}}>
                    <Image source={require('../assets/Close.png')} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            <View style={{width: windowWidth, alignItems: 'center'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    Giới thiệu bản thân
                </Text>
            </View>
            <View style={{width: windowWidth, alignItems: 'center', marginTop: windowHeight*0.06}}>
            <TextInput autoCapitalize="none" multiline={true} maxLength={300} placeholder="Giới thiệu bản thân..." value={bio} onChangeText={setBio} style={{
                height: windowHeight*0.4,
                width: windowWidth*0.85,
                borderBottomColor: 'black',
                borderBottomWidth: 1.5,
                borderTopColor: 'black',
                borderTopWidth: 1.5,
                fontSize: 25,
                backgroundColor: '#DCDCDC',
                textAlignVertical: 'top'
            }}/>
            </View>
            <View style={{width: windowWidth, alignItems: 'center', marginTop: windowHeight*0.05}}>
            <TouchableOpacity style={{
                height: windowHeight*0.07,
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
            onPress={onNextPress} 
            disabled={enableButton}>
            <Text style={{color: textButtonColor, fontSize: 17, fontWeight: 'bold'}}>
                Xong
            </Text>
            </TouchableOpacity>
            </View>
        </View>
    </Modal>
    )
}