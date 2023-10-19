import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from './Search'
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Button, IconButton, MD3Colors } from 'react-native-paper'
import { useState } from 'react'

const { width, height } = Dimensions.get('screen')
const BookDetail = ({route,navigation}) => {
    const { bookItem,ip } = route.params;
    console.log(bookItem)
    console.log(ip)
    const [count,setCount]=useState(0)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    
                    icon="arrow-left"
                    mode="contained"
                    color="#00ABE0"
                    size={20}
                    onPress={() => navigation.navigate('Home')}
                />
                <Search  ></Search>
            </View>
            
            <ScrollView>
                <View>
                    <View style={styles.anh}>
                        <Image style={styles.anhbook} source={{uri: 'http://'+ip+':8080/uploads/'+bookItem.image}} resizeMode="contain" />
                        <View style={styles.bag}>
                            <SimpleLineIcons name="handbag" style={styles.iconbag}></SimpleLineIcons>
                        </View>
                        <View style={styles.quantity}>
                            <Text style={{ color:'white',fontWeight:'bold'}}>{count}</Text>
                        </View>
                    </View>
                    <View style={styles.noidung}>
                        <View style={styles.pricebook}>
                            <Text style={styles.priceSale}>{bookItem.priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                            {bookItem.sale === 0 ? null : (
                            <View style={{flexDirection:'row'}}>
                               <Text style={styles.price}>{bookItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                <Text style={styles.sale}>-{bookItem.sale}%</Text>
                            </View>
                            )}
                        </View>
                        <Text style={styles.bookName}>{bookItem.image}</Text>
                        <Text style={styles.author}>{bookItem.author}</Text>
                        <View style={styles.start}>
                            <Text> <Icon name="star" size={15} color="#FFCE3D" /></Text>
                            <Text> <Icon name="star" size={15} color="#FFCE3D" /></Text>
                            <Text> <Icon name="star" size={15} color="#FFCE3D" /></Text>
                            <Text> <Icon name="star" size={15} color="#FFCE3D" /></Text>
                            <Text> <Icon name="star" size={15} color="#FFCE3D" /></Text>
                            <Text style={styles.number}>5</Text>
                        </View>
                        <View>
                            <Text style={styles.detail}>Chi tiết</Text>
                            <Text>Nhà xuất bản: {bookItem.publicsher}</Text>
                            <Text>Năm xuất bản: {bookItem.publicationYear}</Text>
                            <Text>Thể loại: {bookItem.category.categoryName}</Text>
                            <Text style={styles.detail} >Mô tả</Text>
                            <Text>{bookItem.description}</Text>
                        </View>
                        <View style={styles.divanh}>
                            <Image style={styles.imgBook} source={{uri: 'http://192.168.0.103:8080/uploads/'+bookItem.image}}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
            <View style={styles.shopping}>
            <Button style={styles.btn} icon="cart-outline" mode="contained" buttonColor="#00ABE0" onPress={() => navigation.navigate('Order')}>
                Thêm vào giỏ hàng
            </Button>
            <Button style={styles.btn} icon="shopping" mode="contained" buttonColor="#00ABE0" onPress={() => navigation.navigate('Home')}>
                Mua ngay
            </Button>
            </View>
            
        </View>
    )
}

export default BookDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    anh: {
        margin:0,
        padding:0,
        alignItems: 'center',
        backgroundColor:'#FAFAFA',
        paddingVertical:5
    },

    anhbook: {
        height:350,
        width:'80%'
    },
    noidung:{
        paddingHorizontal:15
    },
    pricebook:{
        paddingVertical:20,
        flexDirection:'row'
    },
    priceSale:{
        fontSize:23,
        fontWeight:'bold',
        paddingRight:15
    },
    price:{
        fontSize:18,
        textDecorationLine: 'line-through',
        paddingRight:15,
        
    },
    sale:{
        color:'red'
    },
    bookName:{
        fontSize:25,
        fontWeight:'bold',

    },
    author:{
        fontSize:16,
        color:'green'
    },
    start:{
       flexDirection:'row' ,
       paddingVertical:10
    },
    number:{
        fontWeight:'bold',
        marginLeft:10
    },
    detail:{
        fontSize:17,
        fontWeight:'bold'
    },
    shopping:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:20
    },
    btn:{
        height:50,
        alignItems:'center',
        justifyContent: 'center'
    },
    bag:{
        height:60,
        width:60,
        backgroundColor:'#00ABE0',
        position:'absolute',
        top:10,
        right:10,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    iconbag:{
        fontSize:30,
        color:'white'
    },
    quantity:{
        width:30,
        height:30,
        backgroundColor:'red',
        borderRadius:15,
        position:'absolute',
        top:10,
        right:10,
        justifyContent:'center',
        alignItems:'center',
    },

})