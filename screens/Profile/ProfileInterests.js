import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ImageBackground,
    Pressable,
    ScrollView
} from "react-native";

//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication";

//hooks
import { useState, useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";

//Redux actions
import {updateInterests} from "../../redux/reducers/userReducer";

//Data 
import { Hobbies } from "../../data/Hobbies";






export function ProfileInterests({navigation}){
    const [Interests, setInterests]=useState([])
    //Next button style 
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    const dispatch=useDispatch()
    function onNextPress(){
        dispatch({type: updateInterests, payload: Interests})
        navigation.navigate('Bio')
    }
    function onHobbyPress(item){
        if(Interests.length===0){
            setInterests(old=>[...old, item])
            return
        }
        else{
            for(let i=0;i<Interests.length;i++){
                if(item.id===Interests[i].id){
                    const tmp=[...Interests]
                    tmp.splice(i, 1)
                    setInterests(tmp)
                    return
                }
            }
            setInterests(old=>[...old, item])
            return
        }
    }
    function hobbyButtonStyle(item){
        if(Interests.length!=0){
        for(let i=0;i<Interests.length;i++){
            if(item.id===Interests[i].id){
                return '#FF5864'
            }
        }
        return '#DCDCDC'
        }
        else{
            return '#DCDCDC'
        }
    }
    function hobbyTextStyle(item){
        if(Interests.length!=0){
            for(let i=0;i<Interests.length;i++){
                if(item.id===Interests[i].id){
                    return 'white'
                }
            }
            return 'black'
            }
            else{
                return 'black'
        }
    }
    useEffect(()=>{
        if(Interests.length===0||!(Interests.length>=3&&Interests.length<=5)){
            setButtonColor('#DCDCDC')
            setTextButtonColor('#A9A9A9')
            setEnableButton(true)
        }
        else{
            setButtonColor('#FF5864')
            setTextButtonColor('white')
            setEnableButton(false)
        }
    },[Interests])
    return(
    <View style={{flex: 1}}>
        <ScrollView>
        <View style={{height: windowHeight*1.4}}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
        <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <View style={{marginTop: windowHeight*0.2, marginLeft: windowWidth*0.075, width: windowWidth*0.85}}>
        <Text style={{fontSize: 35,fontWeight: 'bold', textAlign: 'center'}}>
            Sở thích của bạn là gì ?
        </Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: windowWidth*0.975, marginLeft: windowWidth*0.035, marginTop: windowHeight*0.03, gap: 10}}>
        {Hobbies.map((item, index)=>(
            <Pressable key={index} style={{
                height: windowHeight*0.05,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: hobbyButtonStyle(item),
                }} 
                onPress={()=>onHobbyPress(item)}
            >
                <Text style={{fontSize: 15, fontWeight: 'bold', color: hobbyTextStyle(item), padding: 10}}>
                     {item.Hobby}
                </Text>
            </Pressable>
        ))}
        </View>
        <TouchableOpacity style={[styles.nextButton, {backgroundColor: buttonColor, marginTop: windowHeight*0.05}]} onPress={onNextPress} disabled={enableButton}>
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