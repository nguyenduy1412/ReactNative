
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetail from './screens/comporent/BookDetail';

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

import Checkout from './screens/comporent/Checkout';


import axios from 'axios';

import AccountUpdateScreen from './screens/comporent/AccountUpdateScreen';
import Rating from './screens/comporent/Rating';
import Wating from './screens/comporent/Wating';

import Search from './screens/comporent/Search';
import UpdatePass from './screens/comporent/UpdatePass';
import Checkout2 from './screens/comporent/Checkout2';
import ListFavourite from './screens/comporent/ListFavourite';
import DetailOrder from './screens/comporent/DetailOrder';
import ForgotPass from './screens/comporent/ForgotPass';
import MaOtp from './screens/comporent/MaOtp';
import PassNew from './screens/comporent/PassNew';




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerApp = ({route}) => {
  const {id,ip} = route.params;
  // const ip="192.168.0.103"
  // const id="1"
  
  const currentDate = new Date();

  const time=currentDate.getMinutes() +"-"+currentDate.getSeconds()
  const [userData, setUserData] = useState('');
  // const [screenEnterCount, setScreenEnterCount] = useState(0);
  const status=4;
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://${ip}:8080/api/user/${id}`)
        .then((response) => {
          setUserData(response.data);

        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    // Gọi fetchData ngay lúc đầu
    fetchData();

    // Sử dụng setInterval để gọi lại fetchData sau mỗi giây
    const intervalId = setInterval(fetchData, 1000); // 1000ms = 1 giây

    // Hủy bỏ interval khi component unmounts
    return () => clearInterval(intervalId);
  }, [ip, id]);

  return (

    <Drawer.Navigator
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>
              <TouchableOpacity style={styles.drawleft} onPress={() => { navigation.navigate('Account',{ id: id,ip:ip} ) }} >
                <Image style={styles.imgCover}  source={{ uri: 'http://' + ip + ':8080/uploads/' + userData.imgCover  }}></Image>
                <View style={styles.borderAvata}>
                  <Image style={styles.imgDraw} source={{ uri: 'http://' + ip + ':8080/uploads/' + userData.img  }} />
                </View>
                <Text style={styles.nameDraw}>{userData.fullName}</Text>
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
          drawerLabel: "Trang chủ",
          title: "Trang chủ",
          drawerIcon: () => (
            <Image source={require('./assets/home.png')} style={[styles.icons]} />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
          // headerTitle: CustomHeader,
          headerShown: false
        }}
        initialParams={{ id, ip }}
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
        initialParams={{ id, ip }}
        component={ListCart}
      />
      <Drawer.Screen
        name="Favourite"
        options={{
          drawerLabel: "Yêu thích",
          title: "Yêu thích",
          drawerIcon: () => (
            <Image source={require('./assets/wish-list.png')} style={[styles.icons]} />
          ),
          drawerLabelStyle: {
            fontSize: 18,
            // Điều chỉnh kích thước chữ ở đây
          },
         
          headerShown: false
        }}
        initialParams={{ id, ip }}
        component={ListFavourite}
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
        initialParams={{ id, ip,status }}
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
      <Stack.Navigator initialRouteName='Onbroad' screenOptions={{headerShown:false}}>
        <Stack.Screen name="DrawerApp" component={DrawerApp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />

        <Stack.Screen name="Onbroad" component={Onbroading} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateAccount" component={AccountUpdateScreen} options={{ headerShown: false }} />     
   
        <Stack.Screen name="PassNew" component={PassNew} />
        <Stack.Screen name="MaOtp" component={MaOtp} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} options={{ headerShown: false }} />
        <Stack.Screen name="DetailOrder" component={DetailOrder} />
        <Stack.Screen name="Wating" component={Wating} />
        <Stack.Screen name="Rating" component={Rating} />
        <Stack.Screen name="ListOrder" component={ListOrder} />
     
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Checkout2" component={Checkout2} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="UpdatePass" component={UpdatePass} />
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
  borderAvata:{
    height: 130,
    width: 130,
    borderRadius: 200,
    marginTop:-90,
    borderWidth:4,
    borderColor:'white',
    overflow:'hidden'
  },
  imgCover:{
    width:'100%',
    height:230
  },
  imgDraw: {
    width:'100%',
    height:'100%'
  },
  nameDraw: {
    fontSize: 22,
    marginTop: 10,
    fontWeight:'bold'
  },
  icons: {
    width: 40,
    height: 40,
  },
})