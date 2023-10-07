import { StyleSheet, Text, View, Image } from 'react-native'
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
      <ScrollView horizontal >
      {categoryList.map((item) => (
                <View key={item.id} style={styles.itemCate}>
                <View style={styles.item}>
                    <Image style={styles.imgItem} source={{uri: 'http://'+ip+':8080/uploads/'+item.img}} />
                </View>
                <Text style={styles.cateName}>{item.categoryName}</Text>
                </View>
            ))} 
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
    fontSize: 20
  },
  category: {
    backgroundColor: 'white',
    // flexDirection:'row',
    // justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,

  },
  itemCate: {
    width: 80,
    marginRight: 20,
    marginBottom: 10
  },
  cateName: {
    width: '100%',
    textAlign: 'center'
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
    height: 80
  },
})