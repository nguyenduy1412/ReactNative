import { Button, ScrollView, StyleSheet, Text, View,useWindowDimensions  } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';


import axios from 'axios'
import { Alert } from 'react-native'
import { COLORS } from '../../contants'

import { useNavigation } from "@react-navigation/native";
import { useState } from 'react'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import HTML from 'react-native-render-html';
const BookDetail = ({ route }) => {
    const windowWidth = useWindowDimensions().width;
    const navigation = useNavigation();
    const { bookItem, ip, id } = route.params;
    const [active, setActive] = useState(false);
    const currentDate = new Date(); 
    const time=currentDate.getMinutes() +"-"+currentDate.getSeconds();
    console.log(time)
   
    useEffect(() => {
        
        axios.get(`http://${ip}:8080/api/favourite/checkFavourite?userId=${id}&&bookId=${bookItem.id}`)
        .then((response) => {
            console.log("hú"+response.data)
            if(response.data.id !== undefined){
                console.log("ua")
                setActive(true)
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [time]);
  
    const formatDate = (reviewDate) => {
        const formattedDate = moment(reviewDate).format('DD/MM/YYYY');
        return formattedDate;
    };
    const showToast=(mess,type)=>{
        Toast.show({
          type:type, 
          text1:"Thông báo",
          text2:mess,
          autoHide:true,
          visibilityTime:2000
        })
      }
    const checkout = () => {
        navigation.navigate('Checkout2', { id: id, ip: ip, bookItem: bookItem })
    }
    const toggerFavorite = () => {
        
        // nếu tim màu đỏ thì nhấn lần nữa sẽ đổi màu trắng và xóa sản phẩm khỏi mục yêu thích
        if (active === true) {
            
            axios.delete(`http://${ip}:8080/api/favourite/delete?userId=${id}&&bookId=${bookItem.id}`)
                .then((respone) => {
                    if (respone.status === 200) {
                      console.log("Xóa")
                      setActive(false)
                    }
                    else {
                       
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
        else {
            let formData = {
                userId: id,
                bookId: bookItem.id,
            }
            axios.post(`http://${ip}:8080/api/favourite/add`, formData)
                .then((respone) => {
                    if (respone.status === 200) {
                        console.log("Them")
                        setActive(true)
                    }
                    else {
                        Alert.alert("Thông báo", "Thêm thất bại!");
                    }
                }
                )
                .catch((err) => Alert.alert("Thông báo", "Lỗi!"))
        }
    }
    const addToCart = async () => {
        let formData = {
            userId: id,
            bookId: bookItem.id,
        }
        showToast("Xóa thành công","success")
        axios.post(`http://${ip}:8080/api/cartItem/add`, formData)
            .then((respone) => {
                if (respone.status === 200) {
                    console.log("alo")
                    showToast("Thêm thành công","success")
                }
                else {
                    showToast("Thêm thất bại","error")
                }
            }

            )
            .catch((err) => showToast("Lỗi","error"))
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
            <Image style={styles.anh} source={{ uri: 'http://' + ip + ':8080/uploads/' + bookItem.image }}></Image>
            {/* //Button */}

            <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }}>

                <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cart} onPress={toggerFavorite}>
                <AntDesign name="heart" size={30} color={active ? "red" : "white"} />
            </TouchableOpacity>
            <View style={styles.space}>

            </View>
            {/* Nội dung */}
            <ScrollView style={styles.tiltle}>
                <View style={styles.noidung}>
                    <View style={styles.pricebook}>
                        <Text style={styles.priceSale}>{bookItem.priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                        {bookItem.sale === 0 ? null : (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.price}>{bookItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                <Text style={styles.sale}>-{bookItem.sale}%</Text>
                            </View>
                        )}

                    </View>
                    <Text style={styles.bookName}>{bookItem.bookName}</Text>
                    <Text style={styles.author}>{bookItem.author.nameAuthor}</Text>
                    <View style={styles.start}>

                        <Text style={styles.number}>{bookItem.star}</Text>
                        <Text> <FontAwesome name="star" size={15} color="#FFCE3D" /></Text>
                     
                    </View>
                    <View>
                        <Text style={styles.detail}>Chi tiết</Text>
                        <Text>Nhà xuất bản: {bookItem.publicsher.namePublicsher}</Text>
                        <Text>Năm xuất bản: {bookItem.publicationYear}</Text>
                        <Text>Thể loại: {bookItem.category.categoryName}</Text>
                        <Text style={styles.detail} >Mô tả</Text>
                        <HTML source={{ html: bookItem.description }} contentWidth={windowWidth} />
                        
                    </View>
                    <View>
                        <Text style={styles.detail} >Đánh giá sản phẩm</Text>
                        {bookItem.reviews.map((item, index) => {
                            return (
                                <View style={styles.review} key={index}>
                                    <View style={{ flex: 8 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image style={{ width: 30, height: 30, borderRadius: 50 }} source={{ uri: `http://${ip}:8080/uploads/${item.user.img}` }} />
                                                <View style={{ paddingLeft: 10 }}>
                                                    <Text>{item.user.userName}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {Array(item.star)
                                                            .fill(null)
                                                            .map((_, index) => (
                                                                <FontAwesome key={index} name="star" size={15} color="#FFCE3D" />
                                                            ))}

                                                    </View>
                                                </View>
                                            </View>
                                            <Text >{formatDate(item.reviewDate)}</Text>
                                        </View>
                                        <Text>{item.rating}</Text>
                                    </View>

                                    <View style={{ flex: 2, paddingHorizontal: 15 }}>
                                        <Image style={{ width: 80, height: 80, borderRadius: 15 }} source={{ uri: `http://${ip}:8080/uploads/${item.img}` }} />
                                    </View>
                                </View>
                            )
                        })
                        }

                    </View>
                </View>

            </ScrollView>
            <View style={styles.shopping}>

                <TouchableOpacity style={styles.btnCart} onPress={addToCart}>
                    <Image style={styles.iconCart} source={require('../../assets/addcart.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnShopping} onPress={checkout}>
                    <Image style={styles.bag} source={require('../../assets/bag.gif')} />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>  Mua ngay</Text>
                </TouchableOpacity>

            </View>
            
            <Toast /> 
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
        padding: 10,
        borderRadius: 50,
        margin: 20,
        marginTop: 40,
        position: 'absolute',

    },
    cart: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 10,
        borderRadius: 50,
        margin: 20,
        right: 0,
        position: 'absolute',
        marginTop: 40,
    },
    tiltle: {
        backgroundColor: 'white',
    },
    noidung: {
        paddingHorizontal: 15,

    },
    space: {
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -45,
        height: 50
    },
    pricebook: {
        paddingBottom: 15,
        flexDirection: 'row'
    },
    priceSale: {
        fontSize: 23,
        fontWeight: 'bold',
        paddingRight: 15,
        color: COLORS.blue
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
    btnCart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.sky,
        padding: 5,
        width: '25%',
        borderRadius: 25
    },
    iconCart: {
        width: 35,
        height: 35
    },
    btnShopping: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gold,
        padding: 5,
        width: '70%',
        borderRadius: 25
    },
    review: {
        backgroundColor: COLORS.gray,
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginVertical: 10,
    },
    bag: {
        width: 40,
        height: 40
    }
})