import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const ListCategory = ({ip}) => {
  const [categoryList, setCategoryList] = useState([]);
 
  useEffect(() => {
    // Gọi API và cập nhật danh sách sinh viên
    axios
      .get(`http://${ip}:8080/api/category/`)
      .then((response) => {
        setCategoryList(response.data);
       
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <View style={styles.category} >
      <Text style={styles.title}>Danh mục</Text>
      <ScrollView horizontal contentContainerStyle={{paddingHorizontal:15}}
      showsHorizontalScrollIndicator={false}  >
      {categoryList.map((item,index) => {
        return(
          <TouchableOpacity key={index} style={{marginRight:20}}>
              <Image style={styles.imgItem} source={{uri: 'http://'+ip+':8080/uploads/'+item.img}} />
              <Text style={styles.cateName}>{item.categoryName}</Text>
          </TouchableOpacity>
        )
      })  
      }        
      </ScrollView>
    </View>
  )
}

export default ListCategory

const styles = StyleSheet.create({
  title: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    paddingHorizontal: 15,
  },
  category: {
    backgroundColor: 'white',
    // flexDirection:'row',
    // justifyContent: 'space-between',
    paddingVertical: 20,
   

  },
  itemCate: {
    width: 80,
    marginRight: 20,
    marginBottom: 10
  },
  cateName: {
    width: '100%',
    textAlign: 'center',
    paddingTop:10
  },
  item: {
    width: 80,
    height: 80,
    borderWidth: 1,
    // borderColor:'#000',
    borderRadius: 10,
    overflow: 'hidden',

  },
  imgItem: {
    width: 80,
    height: 80,
    borderRadius:20
  },
})