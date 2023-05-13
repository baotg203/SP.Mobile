import { 
View,
Text,
} from "react-native"


import { Logo } from "../../components/Logo"
import { ChatScreen } from "../../components/Chatscreen"


export function Chat(){
return(
<View style={{flex: 1}}>
    <Logo/>
    <ChatScreen/>
</View>
)
}