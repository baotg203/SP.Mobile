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
import { validateUser } from '../redux/reducers/validateReducer'
import { validateProfile } from '../redux/reducers/profileReducer'
import { updateUser } from '../redux/reducers/userReducer'




//Database actions
import { UpdateUserGender } from '../DatabaseActions'



export function LogoutModal({logOutVisible, setLogOutVisible}){
    const dispatch=useDispatch()
    //Logout press
    function LogOutPress(){
        dispatch({type: validateUser, payload: false})
        dispatch({type: validateProfile, payload: false})
        dispatch({type: updateUser, payload: {
        Username: '',
        Name: '',
        Birth: 0,
        Gender: '',
        Interests: [],
        Bio: '',
        Avatar: '',
        Location: '',
        Matched: []
    }})
        alert('Bạn đã đăng xuất !')
    }
    return(
        <Modal 
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        isVisible={logOutVisible}
        statusBarTranslucent={true}
        backdropTransitionOutTiming={0}
        onBackButtonPress={()=>{
            setLogOutVisible(false)
        }}
        style={{margin:0}}
        customBackdrop={<Pressable style={{height: windowHeight*1.5,backgroundColor: 'black', opacity: 0.7, alignItems: 'center'}} 
        onPress={()=>{
            setLogOutVisible(false)
        }}
        />}
        >
            <View style={{width: windowWidth, alignItems: 'center'}}>
                <View style={{width: windowWidth*0.75, height: windowHeight*0.25, backgroundColor: 'white', borderRadius: 35}}>
                    <View style={{width: windowWidth*0.7, alignItems: 'flex-end', marginTop: windowHeight*0.01}}>
                        <TouchableOpacity onPress={()=>{setLogOutVisible(false)}}>
                            <Image source={require('../assets/Close.png')} style={{width: 20, height: 20}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: windowWidth*0.75, alignItems: 'center', marginTop: windowHeight*0.035}}>
                        <Text style={{fontSize: 20}}>
                            Bạn có chắc muốn đăng xuất ?
                        </Text>
                    </View>
                    <View style={{width: windowWidth*0.75, marginTop: windowHeight*0.085}}>
                        <View style={{flexDirection: 'row'}}>
                        <Pressable style={{flex: 1, alignItems: 'center', borderRightWidth: 1, borderRightColor: 'grey'}} onPress={LogOutPress}>
                            <Text style={{fontSize: 20, color: 'red'}}>
                                Đăng xuất
                            </Text>
                        </Pressable>
                        <Pressable style={{flex: 1, alignItems: 'center'}} onPress={()=>setLogOutVisible(false)}>
                            <Text style={{fontSize: 20}}>
                                Hủy
                            </Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}