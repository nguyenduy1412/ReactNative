import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from './Search'
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Button, IconButton, MD3Colors } from 'react-native-paper'

const { width, height } = Dimensions.get('screen')
const BookDetail = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    style={{marginTop:45}}
                    icon="arrow-left"
                    mode="contained"
                    color="#00ABE0"
                    size={20}
                    onPress={() => navigation.navigate('Home')}
                />
                <Search></Search>
            </View>
            
            <ScrollView>
                <View>
                    <View style={styles.anh}>
                        <Image style={styles.anhbook} source={require('../../assets/conan1.jpg')} resizeMode="contain" />
                    </View>
                    <View style={styles.noidung}>
                        <View style={styles.pricebook}>
                            <Text style={styles.priceSale}>57.000 đ</Text>
                            <Text style={styles.price}>57.000 đ</Text>
                            <Text style={styles.sale}>-5%</Text>
                        </View>
                        <Text style={styles.bookName}>Thám tử lừng danh Conan</Text>
                        <Text style={styles.author}>Aysoga</Text>
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
                            <Text>Nhà xuất bản: NXB Kim Đồng</Text>
                            <Text>Năm xuất bản: 2023</Text>
                            <Text>Thể loại: Truyện tranh</Text>
                            <Text style={styles.detail} >Mô tả  </Text>
                            <Text>Doraemon đã dùng bảo bối "máy bơm nước giả tưởng" để biến cả thành phố nơi Nobita đang ở chìm xuống đáy biển. Sau khi phải rời khỏi hành tinh Aqua, cư dân tộc người cá đã đáp xuống Trái đất và âm thầm sống dưới đáy biển. Một ngày, công chúa Sophia đã vô tình bơi lạc vào vùng biển giả tưởng của N Phát hiện ra nơi ẩn náu của tộc người cá, Buikin và bè lũ quái vật người cá xuất hiện tấn công họ. Và cuộc đại thủy chiến liên quan đến thanh gươm truyền thuyết của tộc người cá bùng nổ!!!</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.shopping}>
            <Button style={styles.btn} icon="cart-outline" mode="contained" buttonColor="#00ABE0" onPress={() => navigation.navigate('Order')}>
                Thêm vào giỏ hàng
            </Button>
            <Button style={styles.btn} icon="shopping" mode="contained" buttonColor="#00ABE0" onPress={() => navigation.navigate('Order')}>
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
        height:350
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
    }
})