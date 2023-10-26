import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { StackActions } from '@react-navigation/native'
  
import { useNavigation } from "@react-navigation/native";

const Logout = ({ navigation }) => {
   
    const handleLogout = () => {
        // const navigation = useNavigation();
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Login')
    }
  return (
    <View style={{marginTop:50}}>
       <Button title='Onclick' onPress={handleLogout} ></Button>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})