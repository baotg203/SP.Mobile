import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
    ScrollView
} from 'react-native'

//react native modal
import Modal from 'react-native-modal'



//hooks
import { useState, useEffect } from 'react'



//Interests datas
import { Hobbies } from '../data/Hobbies'



//Redux
import { useDispatch, useSelector } from 'react-redux'



//Redux actions
import { updateInterests } from '../redux/reducers/userReducer'


//Database actions
import { UpdateUserInterests } from '../DatabaseActions'



//Get screen's height and width
import { windowHeight, windowWidth } from '../screens/Authentication/Authentication'


export function InterestsModal({interestsVisible, setInterestsVisible}){
    //Dispatch
    const dispatch=useDispatch()
    //Selector
    let Info=useSelector(state=>state.userInfo)
    //User's interests
    const [Interests, setInterests]=useState([])
    //Number of interests selected
    const [sum, setSum]=useState(0)
    //Enable finish button
    const [enableButton, setEnableButton]=useState(false)
    function hobbyButtonStyle(item){
        if(Interests.length!=0){
        for(let i=0;i<Interests.length;i++){
            if(item.id===Interests[i].id){
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
        if(Interests.length===0){
            setInterests(old=>[...old, item])
            setSum(sum=>sum+1)
            return
        }
        else{
            for(let i=0;i<Interests.length;i++){
                if(item.id===Interests[i].id){
                    const tmp=[...Interests]
                    tmp.splice(i, 1)
                    setInterests(tmp)
                    setSum(sum=>sum-1)
                    return
                }
            }
            setInterests(old=>[...old, item])
            setSum(sum=>sum+1)
            return
        }
    }
    function FinishPress(){
        UpdateUserInterests(Info, Interests)
        dispatch({type: updateInterests, payload: Interests})
        setInterestsVisible(false)
        setInterests([])
        setSum(0)
    }
    useEffect(()=>{
        if(Interests.length===0||!(Interests.length>=3&&Interests.length<=5)){
            setEnableButton(false)
        }
        else{
            setEnableButton(true)
        }
    },[Interests])
    return(
        <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        isVisible={interestsVisible}
        statusBarTranslucent={true}
        backdropTransitionOutTiming={0}
        onBackdropPress={()=>{
            setInterestsVisible(false)
        }}
        onBackButtonPress={()=>{
            setInterestsVisible(false)
        }}
        style={{margin:0}}
        customBackdrop={<Pressable style={{height: windowHeight*1.5,backgroundColor: 'black', opacity: 0.7, alignItems: 'center'}}
        onPress={()=>{
            setInterestsVisible(false)
        }}
    />}
        >
            <ScrollView>
            <View style={{height: windowHeight*1.175}}>
            <View style={{backgroundColor: 'white', width: windowWidth, height: windowHeight*1.8}}>
                <View style={{marginTop: windowHeight*0.085, width: windowWidth, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity style={{marginLeft: windowWidth*0.05}} 
                onPress={()=>{
                    setInterestsVisible(false)
                    setInterests([])
                    setSum(0)
                }}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    Hủy
                </Text>
                </TouchableOpacity>
                {enableButton?
                (<TouchableOpacity style={{marginRight: windowWidth*0.05}}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#FF5864'}} onPress={FinishPress}>
                    Xong
                </Text>
                </TouchableOpacity>):(null)
                }
                </View>
                <View style={{width: windowWidth,marginTop: windowHeight*0.02,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}}>
                    <Text style={{marginLeft: windowWidth*0.05, fontSize: 27, fontWeight: 'bold'}}>
                        Sở Thích
                    </Text>
                    <Text style={{marginRight: windowWidth*0.025, fontSize: 17}}>
                        {sum} trong tổng số 5
                    </Text>
                </View>
                <View style={{width: windowWidth, height: windowHeight*0.05,marginTop: windowHeight*0.04, flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                {Hobbies.map((item, index)=>(
                <Pressable key={index} style={{ 
                height: windowHeight*0.05,
                borderRadius: 50,
                borderColor: hobbyButtonStyle(item),
                borderWidth: 1.5
                }} 
                onPress={()=>onHobbyPress(item)}
                >
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black', padding: 10}}>
                     {item.Hobby}
                </Text>
            </Pressable>
            ))}
                </View>
                <View>
                </View>
            </View>
            </View>
            </ScrollView>
        </Modal>
    )
}