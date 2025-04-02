import { useNavigation } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, BackHandler, ImageBackground } from "react-native";
import { useEffect} from "react";


export default function LoginScreen() {
const navigation = useNavigation();

  useEffect(()=> {
    navigation.setOptions({ healderShown: false})

  }, [navigation]);
  //const [email, setEMail] = useState();
    return (
        <View style={styles.container}>
         <Text style={styles.title}>Sign in</Text>
          
          <TextInput
          style={styles.input}
           placeholder="admin@gmail.com"/>

           
          
          <TextInput
               style={styles.input}
               placeholder="**********"
               secureTextEntry />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent:"center",
  alignItems: "center",
  backgroundColor: "#f0f0f0"
},
title:{
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20
},
input:{
  width: "80%",
  marginVertical:10,
  backgroundColor: "White",
  borderRadius: 5,
  borderWidth:1,
  borderColor: "#ccc"
},
button:{
  marginTop:20,
  backgroundColor:"#007bff",
  padding: 10,
  borderRadius: 5,
  width: "80%",
  alignItems: "center"
},
buttonText:{
  color:"white",
  fontSize: 14,
  fontWeight: "bold"
}
});