import { 
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
 } from "react-native"



//react native modal
import Modal from 'react-native-modal'



//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication"



//Redux
import { useDispatch, useSelector } from "react-redux"


//Redux actions
import { updateAvatar } from "../../redux/reducers/userReducer"


//Database actions
import { UpdateUserAvatar, DeleteUserAvatar } from "../../DatabaseActions"


//Image Picker
import * as ImagePicker from 'expo-image-picker'


//Component
//Logo
import { Logo } from "../../components/Logo"
//Card
import { Card } from "../../components/Card"
//Custom button
import { CustomButton } from "../../components/CustomButton"
//Modals
import { GenderModal } from "../../components/GenderModal"
import { InterestsModal } from "../../components/InterestsModal"
import { BioModal } from "../../components/BioModal"
import { LogoutModal } from "../../components/LogoutModal"
import { DeleteModal } from "../../components/DeleteModal"


//hooks
import { useEffect, useState } from "react"

export function Settings(){
    let Info=useSelector(state=>state.userInfo)
    //Use Dispatch
    const dispatch=useDispatch()
    //Avatar State
    const [avatar, setAvatar]=useState(Info.Avatar)
    //Modals Visible
    const [genderVisible, setGenderVisible]=useState(false)
    const [interestsVisible, setInterestsVisible]=useState(false)
    const [bioVisible, setBioVisible]=useState(false)
    const [logOutVisible, setLogOutVisible]=useState(false)
    const [deleteVisible, setDeleteVisible]=useState(false)
    //Gender Press
    function GenderPress(){
        setGenderVisible(true)
    }
    //Interests Press
    function InterestsPress(){
        setInterestsVisible(true)
    }
    //Bio Press
    function BioPress(){
        setBioVisible(true)
    }
    //Logout Press
    function LogoutPress(){
        setLogOutVisible(true)
    }
    //Delete Account Press
    function DeletePress(){
        setDeleteVisible(true)
    }
    async function changeAvatar(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            allowsEditing: true,
            quality: 1,
          });
      
          if (!result.canceled) {
            const tmp=result.assets[0].uri
            DeleteUserAvatar(Info)
            UpdateUserAvatar(Info, tmp)
            dispatch({type: updateAvatar, payload: tmp})
            console.log()
          } 
          else
          {
            alert('Bạn đã hủy hành động !');
          }
    }
    return(
    <View>
        <ScrollView>
        <View style={{height: windowHeight*2.075}}>
        <Logo/>
        <View style={{backgroundColor: '#D3D3D3', marginTop: windowHeight*0.15, borderTopColor: '#585858', borderTopWidth: 0.5, alignItems: 'center', height: windowHeight*1.825}}>
        <View style={{backgroundColor: 'white',marginTop: windowHeight*0.05, width: windowWidth*0.98,height: windowHeight*1.075, alignItems: 'center', borderRadius: 15, borderWidth: 0.5}}>
        <View style={{position: 'absolute', marginLeft: windowWidth*0.075,marginTop: windowHeight*0.02, width: windowWidth*0.85}}>
        <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
            Đây là những gì người khác thấy về bạn 
        </Text>
        </View>
        <Card avatar={Info.Avatar} MarginTop={windowHeight*0.15} User={Info} options={false}/>
        <CustomButton ButtonText={'Sửa ảnh đại diện'} MarginTop={windowHeight*0.05} ButtonColor={'#FF5864'} TextColor={'white'} onPress={changeAvatar}/>
        </View>
        <View style={{width: windowWidth, marginTop: windowHeight*0.02, height: windowHeight*0.05, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#505050', marginLeft: windowWidth*0.025}}>
                Thông tin cơ bản
            </Text>
        </View>
        <View style={{position: 'absolute', width: windowWidth, height: windowHeight*0.25, flex: 1, backgroundColor: 'white', borderWidth: 1.5,borderColor: '#909090', marginTop: windowHeight*1.2}}>
            <View style={{backgroundColor: 'white', width: windowWidth, flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1.5,borderColor: '#909090', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, marginLeft: windowWidth*0.05}}>
                    Tên
                </Text>
                <Text style={{fontSize: 20, marginRight: windowWidth*0.05}}>
                    {Info.Name}
                </Text>
            </View>
            <View style={{backgroundColor: 'white', width: windowWidth, flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1.5,borderColor: '#909090', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, marginLeft: windowWidth*0.05}}>
                    Năm sinh
                </Text>
                <Text style={{fontSize: 20, marginRight: windowWidth*0.05}}>
                    {Info.Birth}
                </Text>
            </View>
            <Pressable style={{backgroundColor: 'white', width: windowWidth, flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1.5,borderColor: '#909090', justifyContent: 'space-between'}} onPress={GenderPress}>
                <Text style={{fontSize: 20, marginLeft: windowWidth*0.05}}>
                    Giới tính 
                </Text>
                <View style={{width: windowWidth*0.15, height: windowHeight*0.05, marginRight: windowWidth*0.05, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20}}>
                        Sửa
                    </Text>
                    <Image source={require('../../assets/UpdateArrow.png')} style={{width: 20, height: 20}}/>
                </View>
            </Pressable>
            <Pressable style={{backgroundColor: 'white', width: windowWidth, flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1.5,borderColor: '#909090',justifyContent: 'space-between'}} onPress={InterestsPress}>
                <Text style={{fontSize: 20, marginLeft: windowWidth*0.05}}>
                    Sở thích
                </Text>
                <View style={{width: windowWidth*0.15, height: windowHeight*0.05, marginRight: windowWidth*0.05, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20}}>
                        Sửa
                    </Text>
                    <Image source={require('../../assets/UpdateArrow.png')} style={{width: 20, height: 20}}/>
                </View>
            </Pressable>
            <Pressable style={{backgroundColor: 'white', width: windowWidth, flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}} onPress={BioPress}>
                <Text style={{fontSize: 20, marginLeft: windowWidth*0.05}}>
                    Bio
                </Text>
                <View style={{width: windowWidth*0.15, height: windowHeight*0.05, marginRight: windowWidth*0.05, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20}}>
                        Sửa
                    </Text>
                    <Image source={require('../../assets/UpdateArrow.png')} style={{width: 20, height: 20}}/>
                </View>
            </Pressable>
        </View>
        <Pressable style={{position: 'absolute', backgroundColor: 'white', width: windowWidth, height: windowHeight*0.05, flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: windowHeight*1.5, borderWidth: 1.5, borderColor: '#909090'}} onPress={LogoutPress}>
                <Text style={{fontSize: 20}}>
                    Đăng xuất
                </Text>
        </Pressable>
        <Pressable style={{position: 'absolute',backgroundColor: 'white', width: windowWidth, height: windowHeight*0.05, flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: windowHeight*1.7, borderWidth: 1.5, borderColor: '#909090'}} onPress={DeletePress}>
                <Text style={{fontSize: 20, color: 'red'}}>
                    Xóa tài khoản
                </Text>
        </Pressable>
        </View>
        </View>
        </ScrollView>
        <GenderModal genderVisible={genderVisible} setGenderVisible={setGenderVisible}/>
        <InterestsModal interestsVisible={interestsVisible} setInterestsVisible={setInterestsVisible}/>
        <BioModal bioVisible={bioVisible} setBioVisible={setBioVisible}/>
        <LogoutModal logOutVisible={logOutVisible} setLogOutVisible={setLogOutVisible}/>
        <DeleteModal deleteVisible={deleteVisible} setDeleteVisible={setDeleteVisible}/>
    </View>
    )
}