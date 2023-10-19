import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { Image } from 'react-native';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();
    const handleImagePress = () => {
        // Đặt selectedTab thành 'Account' khi hình ảnh được nhấn
        navigation.navigate('Home',{ selected: 'Account'})
        
      };
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"}></StatusBar>
        <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
        <TouchableOpacity style={styles.imguser} onPress={handleImagePress} > 
            <Image style={styles.anh} source={require('../../assets/banner1.jpg')}></Image>
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
       
        paddingHorizontal:20,
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
        width:'100%',
        height:'100%',
        borderRadius:50,
    }
})