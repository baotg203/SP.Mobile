import { 
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
 } from "react-native"


import { windowHeight, windowWidth } from "../screens/Authentication/Authentication"



export function Card({avatar, MarginTop, User, options}){
    const currentYear=new Date().getFullYear()
    const Age=currentYear-User.Birth
    const Hobbies=User.Interests
    return(
    <View style={[CardStyle.CardContainer, {marginTop: MarginTop}]}>
        <View style={CardStyle.CardContent}>
            <Image source={avatar===''?null:{uri: avatar}} style={CardStyle.CardImage}/>
        <View style={CardStyle.InfoContainer}>
            <View style={CardStyle.NameContainer}>
            <Text style={{fontSize: 25, fontWeight: '900', color: 'white', paddingLeft: 10, paddingRight: 15}}>
                {User.Name}
            </Text>
            <Text style={{fontSize: 25, color: 'white'}}>
                {Age}
            </Text>
            </View>
            <View style={{paddingBottom: 5}}>
                <Text style={{fontSize: 25, color: 'white', paddingLeft: 10}}>
                    {User.Gender}
                </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 7, paddingBottom: 10}}>
            {Hobbies.map((item, index)=>(
                <View key={index} style={{ 
                height: windowHeight*0.04,
                borderRadius: 50,
                backgroundColor: 'grey',
                opacity: 0.9,
                alignItems: 'center',
                justifyContent: 'center'
                }} 
                >
                <Text style={{fontSize: 13.5, fontWeight: 'bold', color: 'white', paddingHorizontal: 10}}>
                     {item.Hobby}
                </Text>
            </View>
            ))}
            </View>
            {options&&
            <View style={{width: windowWidth*0.965,alignItems: 'center'}}>
                <View style={{width: windowWidth*0.45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Pressable style={{backgroundColor: 'red', height: windowHeight*0.06,width: windowWidth*0.125, alignItems: 'center', justifyContent: 'center', borderRadius: 50}}>
                    <Image source={require('../assets/Pass.png')} style={{height: 25, width: 25}}/>
                </Pressable>
                <Pressable style={{backgroundColor: 'red', height: windowHeight*0.06,width: windowWidth*0.125, alignItems: 'center', justifyContent: 'center', borderRadius: 50}}>
                    <Image source={require('../assets/Smash.png')} style={{height: 25, width: 25}}/>
                </Pressable>
                </View>
            </View>
            }
        </View>
        </View>
    </View>
    )
}

const CardStyle=StyleSheet.create({
    CardContainer: {
        width: windowWidth, 
        height: windowHeight*0.775, 
        alignItems: 'center'
    },
    CardContent: {
        backgroundColor: '#DCDCDC', 
        width: windowWidth*0.965, 
        height: windowHeight*0.775, 
        borderRadius: 25
    },
    CardImage: {
        width: windowWidth*0.965, 
        height: windowHeight*0.775, 
        borderRadius: 25
    },
    InfoContainer:{
        position: 'absolute',
        width: windowWidth*0.965, 
        height: windowHeight*0.15, 
        marginTop: windowHeight*0.51,
    },
    NameContainer:{
        flexDirection: 'row',
        paddingBottom: 5,
    }
})