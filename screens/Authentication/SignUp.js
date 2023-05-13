//Components
import { 
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ImageBackground
} from "react-native"

//hooks
import { useEffect, useState } from "react"

//Database actions
import { AddUser, GetAllUser } from "../../DatabaseActions"

//Redux 
import { useDispatch } from "react-redux"

//Redux actions
import { validateUser } from "../../redux/reducers/validateReducer"
import { updateUserName } from "../../redux/reducers/userReducer"


//Get window's height and width
import { windowHeight, windowWidth } from "./Authentication"

export function SignUp({navigation}){
    //Username, Password State
    const [userName, setUserName]=useState('')
    const [pass, setPass]=useState('')
    //Signup button's UI behavior
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    //Dispatch
    const dispatch=useDispatch()
    //regex
    const regex=/[\s]|[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/u
    //Signup button press
    async function onAcceptPress(){
        const Users=await GetAllUser()
        if(Users.length===0){
            AddUser(userName, pass)
            alert('Tạo tài khoản thành công !')
            dispatch({type: updateUserName, payload: userName})
            navigation.navigate('Start')
            setUserName('')
            setPass('')
        }
        else{
        for(let i=0;i<Users.length;i++){
            let element=Users[i]
            if(element.Username===userName){
                alert('User đã tồn tại')
                break;
            }
            else{
                if(i===Users.length-1){
                    AddUser(userName, pass)
                    alert('Tạo tài khoản thành công !')
                    dispatch({type: updateUserName, payload: userName})
                    navigation.navigate('Start')
                    setUserName('')
                    setPass('')
                    break;
                }
            }
        }
    }
    }
    //Enable signup button when the inputs are filled
    useEffect(()=>{
        if(userName!==''&&pass!==''){
            if(userName.match(regex)||pass.match(regex)){
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
    },[userName, pass])
    return(
        <View style={{flex: 1}}>
            <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
            <ImageBackground source={require('./../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
            <TextInput autoCapitalize="none" placeholder="Username" value={userName} onChangeText={setUserName} style={styles.userName}/>
            <TextInput autoCapitalize="none" placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry={true} style={styles.passWord}/>
            <TouchableOpacity style={[styles.acceptButton, {backgroundColor: buttonColor}]} onPress={onAcceptPress} disabled={enableButton}>
                <Text style={{color: textButtonColor, fontSize: 17, fontWeight: 'bold'}}>
                    Tạo tài khoản
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    userName:{
        position: 'absolute',
        width: windowWidth*0.8,
        height: 75,
        borderBottomWidth: 1.5,
        borderBottomColor: 'black',
        marginTop: windowHeight*0.3,
        marginLeft: windowWidth*0.1,
        fontSize: 25,
        color: 'black'
    },
    passWord: {
        position: 'absolute',
        width: windowWidth*0.8,
        height: 75,
        borderBottomWidth: 1.5,
        borderBottomColor: 'black',
        marginTop: windowHeight*0.4,
        marginLeft: windowWidth*0.1,
        fontSize: 25,
    },
    acceptButton: {
        height: 60,
        width: windowWidth*0.85,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: windowHeight*0.6,
        marginLeft: windowWidth*0.075,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 7
    },
    backButton: {
        position: 'absolute',
        height: 30,
        width: 30,
        marginTop: 70,
        marginLeft: 10
    },
})