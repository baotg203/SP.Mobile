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
import { updateUser } from '../redux/reducers/userReducer'
import { validateUser } from '../redux/reducers/validateReducer'
import { validateProfile } from '../redux/reducers/profileReducer'




//Database actions
import { DeleterUser, DeleteUserAvatar } from '../DatabaseActions'



export function DeleteModal({deleteVisible, setDeleteVisible}){
    let Info=useSelector(state=>state.userInfo)
    const dispatch=useDispatch()
    function DeletePress(){
        DeleteUserAvatar(Info)
        DeleterUser(Info)
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
    }
    return(
    <Modal 
    animationIn={'slideInUp'}
    animationOut={'slideOutDown'}
    isVisible={deleteVisible}
    statusBarTranslucent={true}
    backdropTransitionOutTiming={0}
    onBackButtonPress={()=>{
        setDeleteVisible(false)
    }}
    style={{margin:0}}
    customBackdrop={<Pressable style={{height: windowHeight*1.5,backgroundColor: 'black', opacity: 0.7, alignItems: 'center'}} 
    onPress={()=>{
        setDeleteVisible(false)
    }}
    />}
    >
        <View style={{width: windowWidth,alignItems: 'center', marginTop: windowHeight*0.65}}>
            <View style={{width: windowWidth*0.975,height:windowHeight*0.25, backgroundColor: 'white', borderRadius: 20, alignItems: 'center'}}>
                <View style={{width: windowWidth*0.975, marginTop: windowHeight*0.0175}}>
                    <Text style={{paddingLeft: 15, paddingRight: 15, textAlign: 'center', fontSize: 17}}>
                        Bạn có chắc rằng bạn muốn xóa tài khoản không ? Lưu ý rằng sau khi xóa tài khoản, tất cả thông tin của bạn trên ứng dụng này sẽ mất và lần tiếp theo bạn sử dụng tài khoản, bạn sẽ phải tạo tài khoản mới
                    </Text>
                </View>
                <Pressable style={{
                width: windowWidth*0.975,
                height: windowHeight*0.055, 
                alignItems: 'center',
                justifyContent: 'center', 
                marginTop: windowHeight*0.055, 
                borderBottomLeftRadius: 20, 
                borderBottomRightRadius: 20, 
                borderTopWidth: 1, 
                borderTopColor: '#585858',
                }}
                onPress={DeletePress}
                >
                    <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
                        Xóa tài khoản
                    </Text>
                </Pressable>
            </View>
            <TouchableOpacity style={{width: windowWidth*0.975,height: windowHeight*0.0675, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: windowHeight*0.02, borderRadius: 20}}
            onPress={()=>setDeleteVisible(false)}
            >
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                    Hủy
                </Text>
            </TouchableOpacity>
        </View>
    </Modal>
    )
}