import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ImageBackground
} from "react-native";

//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication";

//hooks
import { useState, useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";


//Redux actions
import { validateUser } from "../../redux/reducers/validateReducer";
import { validateProfile } from "../../redux/reducers/profileReducer";

//Database actions
import {UpdateUserProfile, UpdateUserAvatar} from '../../DatabaseActions'



export function ProfileEnd({navigation}){
    const Info=useSelector(state=>state.userInfo)
    const dispatch=useDispatch()
    useEffect(()=>{
        console.log(Info)
    },[])
    async function onNextPress(){
        const AvatarSuccess=await UpdateUserAvatar(Info, Info.Avatar)
        const ProfileSuccess=await UpdateUserProfile(Info, true)
        if(AvatarSuccess===true&&ProfileSuccess===true){
            dispatch({type: validateUser, payload: true})
            dispatch({type: validateProfile, payload: true})
            alert('Cập nhật thông tin thành công !')
        }
        else{
            alert('Lỗi ! Cập nhật thông tin thất bại !')
        }
    }
    return(
        <View style={{flex: 1}}>
            <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
            <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
            <View style={{position: 'absolute', marginTop: windowHeight*0.25, marginLeft: windowWidth*0.075, width: windowWidth*0.85}}>
            <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
                Đã xong ! 
            </Text>
            <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center', marginTop: 70}}>
                Chúc bạn sớm tìm được nửa kia của mình :3
            </Text>
            </View>
            <TouchableOpacity style={[styles.nextButton, {backgroundColor: '#FF5864', marginTop: windowHeight*0.8}]} onPress={onNextPress}>
                <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
                    Được rồi đi thôi
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
