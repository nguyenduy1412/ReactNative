import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryList from './screens/Category';
import BottomTab from './screens/BottomTab';
import BookDetail from './screens/comporent/BookDetail';
import Order from './screens/Order';
import ListBook from './screens/comporent/ListBook';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>     
      <Stack.Navigator initialRouteName='BookDetail'>
      <Stack.Screen name="Home" component={BottomTab} options={{headerShown: false, }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cart" component={CategoryList} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Book" component={ListBook} />
      <Stack.Screen name="BookDetail" component={BookDetail} options={{headerShown: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})