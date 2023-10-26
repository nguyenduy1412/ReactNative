import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar, TextInput } from 'react-native-paper';
import { Image } from 'react-native';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DrawerActions} from '@react-navigation/drawer'
const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();
    const handleImagePress = () => {
        // Đặt selectedTab thành 'Account' khi hình ảnh được nhấn
        navigation.navigate('Cart')
        
      };
  return (
    <View style={styles.container}>
        
        <TouchableOpacity onPress={()=>{  }}>
            <Image style={styles.anh} source={require('../../assets/menu.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity  onPress={handleImagePress} > 
            <Image style={styles.anh} source={require('../../assets/cart.png')}></Image>
        </TouchableOpacity>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    search:{
        borderRadius: 40,
        width:'80%',
        backgroundColor:'white',
        height:45,
        paddingBottom:0,
        borderWidth: 1,
        borderColor:'#00ABE0',
       
    },
    container:{
        backgroundColor:'white',
        marginTop:30,
        paddingHorizontal:5,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    imguser:{
        width:40,
        height:40,
    },
    anh:{
        width:40,
        height:40,
       
    }
})