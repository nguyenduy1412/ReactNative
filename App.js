import 'react-native-gesture-handler';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetail from './screens/comporent/BookDetail';
import ListBook from './screens/comporent/ListBook';
import { AntDesign } from '@expo/vector-icons';
import ListCart from './screens/comporent/ListCart';
import Onbroading from './screens/comporent/Onbroading';
import HomeScreen from './screens/HomeScreen';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import ListOrder from './screens/comporent/ListOrder';
import Account from './screens/comporent/Account';
import { useNavigation } from "@react-navigation/native";
import StartScreen from './screens/comporent/StartScreen';
import Login from './screens/comporent/Login';
import SignUp from './screens/comporent/SignUp';
import Logout from './screens/comporent/Logout';
import { Button } from 'react-native';
import Checkout from './screens/comporent/Checkout';
import ImagePicker from './screens/comporent/ImagePk';



const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const DrawerApp = () => {
  const navigation = useNavigation();
  return (

    <Drawer.Navigator
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>
              <TouchableOpacity style={styles.drawleft} onPress={() => { navigation.navigate('Account') }} >
                <Image style={styles.imgCover}  source={require('./assets/banner1.jpg')}></Image>
                <Image style={styles.imgDraw} source={require('./assets/avata.jpg')} />
                <Text style={styles.nameDraw}>Nguyễn Ngọc Duy</Text>
              </TouchableOpacity>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }
      }
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: () => (
            <Image source={require('./assets/home.png')} style={[styles.icons]} />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Cart"
        options={{
          drawerLabel: "Giỏ hàng",
          title: "Giỏ hàng",
          drawerIcon: () => (
            <Image source={require('./assets/cart.png')} style={[styles.icons]} />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          headerShown: false
        }}
        component={ListCart}
      />
      <Drawer.Screen
        name="Order"
        options={{
          drawerLabel: "Đơn hàng",
          title: "Đơn hàng",
          drawerIcon: () => (
            <Image source={require('./assets/order.png')} style={[styles.icons]} />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          headerShown: false
        }}
        component={ListOrder}
      />
      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: "Đăng xuất",
          title: "Logut",
          drawerIcon: () => (
            <Image source={require('./assets/logout.png')} style={[styles.icons]} />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          headerShown: false
        }}
        component={Logout}
      />
   
    </Drawer.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Image' screenOptions={{headerShown:false}}>
        <Stack.Screen name="DrawerApp" component={DrawerApp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={ListCart} />
        <Stack.Screen name="Onbroad" component={Onbroading} options={{ headerShown: false }} />
        
        <Stack.Screen name="Order" component={ListOrder} />
        <Stack.Screen name="Image" component={ImagePicker} />
        <Stack.Screen name="Checkout" component={Checkout} />
       
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  imguser: {
    width: 40,
    height: 40,
  },
  anh: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  drawleft: {

    paddingBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white'
  },
  imgCover:{
    width:'100%',
    height:200
  },
  imgDraw: {
    height: 130,
    width: 130,
    borderRadius: 60,
    marginTop:-70,
    borderWidth:4,
    borderColor:'white'
  },
  nameDraw: {
    fontSize: 22,
    marginTop: 20
  },
  icons: {
    width: 40,
    height: 40,
  },
})