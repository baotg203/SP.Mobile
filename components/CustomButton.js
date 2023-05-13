import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from "react-native";


//get screen's height and width
import { windowHeight, windowWidth } from "../screens/Authentication/Authentication";






export function CustomButton({ButtonText, MarginTop, ButtonColor, ButtonEnable, TextColor, onPress}){
    return(
        <View style={{marginTop: MarginTop, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={[ButtonStyle.button, {backgroundColor: ButtonColor}]} disabled={ButtonEnable} onPress={onPress}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: TextColor}}>
                    {ButtonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const ButtonStyle=StyleSheet.create({
    button: {
        height: 60, 
        width: windowWidth*0.7, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 50
    }
})