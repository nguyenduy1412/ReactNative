import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import BookDetail from './BookDetail'
import { Drawer } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen')
import { useNavigation } from "@react-navigation/native";
const ListBook = ({ip}) => {
  //console.log(navigation)
  const navigation = useNavigation();
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        // Gọi API và cập nhật danh sách sinh viên
        axios
          .get(`http://${ip}:8080/api/book`)
          .then((response) => {
            setBookList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
  return (
  <View style={styles.book}>
      <Text style={styles.title}>Sản phẩm</Text>
      <View style={styles.container}>
       <FlatList
       scrollEnabled={false}
       numColumns={2}
       columnWrapperStyle={styles.row}
        data={bookList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        
            <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('BookDetail',{ bookItem: item,ip:ip}); }} >
              {item.sale === 0 ? null : (
               <View style={styles.sale}>
                   <Text style={{color:'#fff'}}>-{item.sale}%</Text>
               </View>
                )}
               <View style={styles.divanh}>
                  <Image style={styles.imgBook} source={{uri: 'http://'+ip+':8080/uploads/'+item.image}}/>
               </View>
               
               <View style={styles.dess}>
                   <Text style={styles.bookName}>{item.bookName.length > 15 ? item.bookName.substring(0, 15) + "...": item.bookName}</Text>
                    <Text style={styles.author}>{item.author}</Text>
                    <View style={styles.divprice}>
                      <Text> <AntDesign name="star" size={15} color="blue" /> 4.0</Text>
                      <Text style={styles.priceSale}>{item.priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
               </View> 
          </TouchableOpacity>
        )}
        />
      </View>
    </View>
  )
}

export default ListBook

const styles = StyleSheet.create({
    row:{
      flex:1,
      justifyContent:'space-between'
    },
    book:{
      backgroundColor:'white',
      // flexDirection:'row',
      // justifyContent: 'space-between',
    
      paddingHorizontal:15,
      
  },
    title:{
        color:'#1876F2',
        fontWeight:'bold',
        marginBottom:10,
        fontSize:20
    },
    row:{
        flex:1,
        justifyContent:'space-between'
    },
    item:{
        width:'47%',
        marginBottom:15,
      
    },
    divanh:{
      overflow:'hidden',
      borderWidth: 1,
      borderRadius:20,
    },
    imgBook:{
      width:'100%',
      height:250,
      borderRadius:20,
      
    },
    dess:{
        backgroundColor:'white',
        paddingVertical:8

    },
    bookName:{
        color:'black',
        fontSize:17,
        fontWeight:'bold',
     
    },
    author:{
        

    },
    divprice:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    priceSale:{
      fontSize:17,
      fontWeight:'bold'
    },
    sale:{
        backgroundColor:'rgb(255,0,0)',
        width:50,
        height:25,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:10,
        zIndex:1000,
        right:10
    }
})