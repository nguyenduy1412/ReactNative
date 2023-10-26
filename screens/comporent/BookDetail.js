import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { Button } from 'react-native-paper'
const BookDetail = ({ route, navigation }) => {
    const { bookItem, ip } = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
            <Image style={styles.anh} source={{ uri: 'http://' + ip + ':8080/uploads/' + bookItem.image }}></Image>
            {/* //Button */}

            <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }}>
                
                <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cart}>
                <AntDesign name="heart" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.space}>

            </View>
            {/* Nội dung */}
            <ScrollView style={styles.tiltle}>
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
                    <Text style={styles.bookName}>{bookItem.bookName}</Text>
                    <Text style={styles.author}>{bookItem.author}</Text>
                    <View style={styles.start}>
                   
                        <Text> <AntDesign name="star" size={15} color="#FFCE3D" /></Text>
                        <Text> <AntDesign name="star" size={15} color="#FFCE3D" /></Text>
                        <Text> <AntDesign name="star" size={15} color="#FFCE3D" /></Text>
                        <Text> <AntDesign name="star" size={15} color="#FFCE3D" /></Text>
                        <Text> <AntDesign name="star" size={15} color="#FFCE3D" /></Text>
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

                </View>

            </ScrollView>
            <View style={styles.shopping}>
                <TouchableOpacity style={styles.btn}>
                    <Entypo name="shopping-cart" size={24} color="white" />
                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnShopping}>
                    <Entypo name="shopping-bag" size={24} color="white" />
                    <Text style={{color:'white',fontSize:20}}>   Mua ngay</Text>
                </TouchableOpacity>
               
            </View>
        </View>
    )
}

export default BookDetail

const styles = StyleSheet.create({
    anh: {
        width: 'auto',
        height: 420,
        backgroundColor: 'blue'
    },

    back: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 13,
        borderRadius: 50,
        margin: 20,
        marginTop:40,
        position: 'absolute',

    },
    cart: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 13,
        borderRadius: 50,
        margin: 20,
        right: 0,
        position: 'absolute',
        marginTop:40,
    },
    tiltle: {
        backgroundColor: 'white',
    },
    noidung: {
        paddingHorizontal: 15,
       
    },
    space:{
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -45,
        height:50
    },
    pricebook: {
        paddingBottom:15,
        flexDirection: 'row'
    },
    priceSale: {
        fontSize: 23,
        fontWeight: 'bold',
        paddingRight: 15,
        color: "#00ABE0"
    },
    price: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        paddingRight: 15,

    },
    sale: {
        color: 'red'
    },
    bookName: {
        fontSize: 25,
        fontWeight: 'bold',

    },
    author: {
        fontSize: 16,
        color: 'green'
    },
    start: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    number: {
        fontWeight: 'bold',
        marginLeft: 10
    },
    detail: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    shopping: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    btn: {
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#00ABE0',
        width:80,
        borderRadius:20
    },
    btnShopping:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red',
        padding:10,
        width:280,
        borderRadius:20
    }
})