import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
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
import { updateName } from "../../redux/reducers/userReducer";




export function ProfileName({navigation}){
    const [name, setName]=useState('')
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    const dispatch=useDispatch()
    const regex=/^[a-zA-Z\sàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+$/u
    useEffect(()=>{
        if(name!==''){
            if(!name.match(regex)){
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
    },[name])
    function onNextPress(){
        dispatch({type: updateName, payload: name})
        navigation.navigate('Birth')
    }
    return(
    <View style={{flex: 1}}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
        <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <View style={{position: 'absolute', marginTop: windowHeight*0.25, marginLeft: windowWidth*0.1, width: windowWidth*0.85}}>
        <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
            Tên bạn là gì ? 
        </Text>
        </View>
        <TextInput autoCapitalize="none" placeholder="Nhập tên của bạn" value={name} onChangeText={setName} style={[styles.textInput, {marginTop: windowHeight*0.35}]}/>
        <Text style={{position: 'absolute', marginTop: windowHeight*0.475, marginLeft: windowWidth*0.075, fontSize: 15, color: 'red'}}>
            *Lưu ý: Tên của bạn sẽ được hiển thị khi người khác nhìn thấy bạn.
        </Text>
        <TouchableOpacity style={[styles.nextButton, {backgroundColor: buttonColor, marginTop: windowHeight*0.6}]} onPress={onNextPress} disabled={enableButton}>
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
