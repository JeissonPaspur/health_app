import react, { useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
export default function RegisterScreen ({ onClose }:any){
    return(
        <View>
            <Text> Sign up </Text>
            <TouchableOpacity onPress={onClose}>
                 <Text>Back to login</Text>
            </TouchableOpacity>
        </View>
    );
}