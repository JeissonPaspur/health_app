import {View, Text, TextInput} from "react-native";
export default function LoginScreen(){
    return (
        <view>
            <text>Login</text>
            <text>E-mail</text>
            <TextInput placeholder = "admin@gmail.com"/>

            <text>password</text>
            <TextInput placeholder = "*********"
            secureTextEntry/>
            </view>
    )
}