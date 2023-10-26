import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, { useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native';

import HomeScreen from '../HomeScreen';


import ListCart from './ListCart';
import ListOrder from './ListOrder';
import Account from './Account';
const BottomTab = () => {
  
  const [selectedTab, setSelectedTab] = useState('Home');
  
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      {selectedTab === 'Home' && <HomeScreen  />}
      {selectedTab === 'Account' && <Account />}
      {selectedTab === 'Cart' && <ListCart />}
      {selectedTab === 'Order' && <ListOrder />}
      <View style={{height:70}}>

      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Home');
          }}>
          <Image
            source={require('../../assets/home.png')}
            style={[
              styles.icons,
              
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Cart');
          }}>
          <Image
            source={require('../../assets/cart.png')}
            style={[
              styles.icons,
              
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Order');
          }}>
          <Image
            source={require('../../assets/order.png')}
            style={[
              styles.icons,
              
            ]}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Account');
          }}>
          <Image
            source={require('../../assets/account.png')}
            style={[
              styles.icons,
             
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
      },
      bottomView: {
        borderWidth: 1,
        borderColor:'#00ABE0',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 5,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        
      },
      icons: {
        width: 40,
        height: 40,
      },
      
})