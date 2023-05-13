//Components
import { 
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ImageBackground,
} from "react-native";

//Get screen's height and width
import { windowHeight, windowWidth } from "../Authentication/Authentication";




//Start Screen
export function ProfileStart({navigation}){
    function onNextPress(){
        navigation.navigate('Name')
    }
    function onBackPress(){
        navigation.navigate('Authentication')
    }
    return(
    <View style={{flex: 1}}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <ImageBackground source={require('../../assets/BackArrow.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <View style={{position: 'absolute', marginTop: windowHeight*0.35, marginLeft: windowWidth*0.075, width: windowWidth*0.85}}>
        <Text style={{fontSize: 35,fontWeight: 'bold'}}>
            Trước khi bắt đầu, hãy cho chúng tôi biết thêm về bạn nhé ! 
        </Text>
        </View>
        <TouchableOpacity style={[styles.nextButton, {backgroundColor: '#FF5864', marginTop: windowHeight*0.9}]} onPress={onNextPress}>
            <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
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