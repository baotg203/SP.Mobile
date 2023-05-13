//Components
import { 
    View,
    Text,
    Image,
    Pressable,
    TouchableOpacity,
    ScrollView
 } from "react-native"

//Custom components
import { Logo } from "../../components/Logo"
import { Card } from "../../components/Card"



//React native deck swiper
import Swiper from "react-native-deck-swiper"


//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication"


//Redux
import { useDispatch, useSelector } from "react-redux"



//Redux actions
import { updateMatched } from "../../redux/reducers/userReducer"



//Database actions
import { GetUsers, UpdateUserMatched } from "../../DatabaseActions"
import { collection, onSnapshot, query, where } from "firebase/firestore"



//hooks
import { useState, useEffect } from "react"
import { database } from "../../fireBaseConfig"





export function Main(){
    let Info=useSelector(state=>state.userInfo)
    //
    const dispatch=useDispatch()
    //
    const [Targets, setTargets]=useState([])
    //
    const [matchedVisible, setMatchedVisible]=useState(false)
    //
    const [users, setUsers]=useState([])
    //Number of interests selected
    const [sum, setSum]=useState(0)
    //Set button styles
    const [buttonColor, setButtonColor]=useState('#DCDCDC')
    const [textButtonColor, setTextButtonColor]=useState('#A9A9A9')
    const [enableButton, setEnableButton]=useState(true)
    useEffect(()=>{
        let unsub;
        async function fetchCards(){
            if(Info.Gender==='Nam'){
            unsub=onSnapshot(query(collection(database, 'Users'), where('Gender', '==', 'Nữ')),(snapShot)=>{
                setUsers(
                    snapShot.docs.map((doc)=>({
                        Interests: doc.data().Interests,
                        ...doc.data()
            }))
                )
            })
        }
        else if(Info.Gender==='Nữ'){
             unsub=onSnapshot(query(collection(database, 'Users'), where('Gender', '==', 'Nam')),(snapShot)=>{
                setUsers(
                    snapShot.docs.map((doc)=>({
                        Interests: doc.data().Interests,
                        ...doc.data()
            }))
                )
            })
        }
        else{
            unsub=onSnapshot(query(collection(database, 'Users'), where('Gender', '==', 'Khác')),(snapShot)=>{
                setUsers(
                    snapShot.docs.filter(doc=>doc.data().Username!==Info.Username).map((doc)=>({
                        Interests: doc.data().Interests,
                        ...doc.data()
            }))
                )
            })
        }
        }
        fetchCards()
        return unsub
    },[Info.Gender])
    useEffect(()=>{
        if(Targets.length===0||!(Targets.length===1)){
            setButtonColor('#DCDCDC')
            setTextButtonColor('#A9A9A9')
            setEnableButton(true)
        }
        else{
            setButtonColor('#FF5864')
            setTextButtonColor('white')
            setEnableButton(false)
        }
        console.log(Targets)
    },[Targets])
    function hobbyButtonStyle(item){
        if(Targets.length!=0){
        for(let i=0;i<Targets.length;i++){
            if(item.Username===Targets[i].Username){
                return 'red'
            }
        }
        return '#909090'
        }
        else{
            return '#909090'
        }
    }
    function onHobbyPress(item){
        if(Targets.length===0){
            setTargets(old=>[...old, item])
            setSum(sum=>sum+1)
            return
        }
        else{
            for(let i=0;i<Targets.length;i++){
                if(item.Username===Targets[i].Username){
                    const tmp=[...Targets]
                    tmp.splice(i, 1)
                    setTargets(tmp)
                    setSum(sum=>sum-1)
                    return
                }
            }
            setTargets(old=>[...old, item])
            setSum(sum=>sum+1)
            return
        }
    }
    function SelectPress(){
        dispatch({type: updateMatched, payload: Targets[0]})
        UpdateUserMatched(Info, Targets[0])
        UpdateUserMatched(Targets[0], Info)
        alert('Chúc mừng bạn đã chọn được nửa kia')
    }
    return(
    <View style={{flex: 1}}>
        <ScrollView>
        <View style={{height: windowHeight*1.15}}>
        <Logo/>
        <View style={{marginTop: windowHeight*0.15, alignItems: 'center'}}>
            <Text style={{fontSize: 27, textAlign: 'center', fontWeight: 'bold'}}>
                Hãy chọn cho mình 1 cái tên mà bạn muốn tìm hiểu 
            </Text>
        </View>
        <View style={{marginTop: windowHeight*0.02, alignItems: 'flex-end'}}>
            <Text style={{fontSize: 17, paddingRight: 15}}>
                {sum} trong tối đa 1
            </Text>
        </View>
        <View>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: windowWidth*0.975, marginLeft: windowWidth*0.035, marginTop: windowHeight*0.03, gap: 10}}>
        {users.map((item, index)=>(
            <Pressable key={index} style={{
                height: windowHeight*0.05,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: hobbyButtonStyle(item),
                borderWidth: 1
                }} 
                onPress={()=>onHobbyPress(item)}
            >
                <Text style={{fontSize: 15, padding: 10}}>
                    {item.Name}
                </Text>
            </Pressable>
        ))}
        </View>
        <View style={{width: windowWidth, alignItems: 'center',marginTop: windowHeight*0.05}}>
        <TouchableOpacity style={{
            width: windowWidth*0.75, 
            height: windowHeight*0.065, 
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: buttonColor,
            elevation: 7
        }}
        disabled={enableButton}
        onPress={SelectPress}
        >
        <Text style={{fontSize: 20, fontWeight: 'bold', color: textButtonColor}}>
            Chọn
        </Text>
        </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
    </View>
    )
}