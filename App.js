import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LoginScreen from './screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import BookDetail from './screens/comporent/BookDetail';

import ListBook from './screens/comporent/ListBook';
import BottomTab from './screens/comporent/BottomTab';

import TabBottom from './screens/comporent/TabBottom';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>     
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={BottomTab} options={{headerShown: false, }}  />
      <Stack.Screen name="Login" component={LoginScreen} />
   
 
      <Stack.Screen name="Book" component={ListBook} />
      <Stack.Screen name="BookDetail" component={BookDetail} options={{headerShown: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})