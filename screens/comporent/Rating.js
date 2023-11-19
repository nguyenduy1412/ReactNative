import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { LogBox } from 'react-native';
import { useState } from 'react';
import CustomAlert from './CustomAlert';
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../../contants';
LogBox.ignoreLogs(['Key "cancelled" in the image picker result']);
const Rating = ({route}) => {
    const { userId, ip ,detail} = route.params;
    console.log(userId,ip,detail.book.id,detail.id)
    const [img,setImg]=useState();
    const [color,setColor]=useState("");
    const navigation = useNavigation();
    const [message,setMessage]=useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    // const { ip, bookId,detailId,userId } = route.params;
    
    const [rating, setRating] = useState("");
  
    const [star, setStar] = useState(0);
    const handleStarPress = (starValue) => {
        // Xử lý khi người dùng nhấn vào một ngôi sao 
        setStar(starValue);
    };
    const onSuccess = () =>{
        navigation.navigate("Order",{ id: userId,ip:ip,status:4});
        setAlertVisible(false);
      }
    const [nameFile,setNameFile]=useState(null);
    const [image, setImage] = useState();
    const pickImage1 = async () => {
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          // aspect: [4, 3],
          quality: 1,
        });
        //lấy đuôi file
        if (!result.canceled) {
          const fileExtension = result.assets[0].uri.split('.').pop();
        const currentDate = new Date(); // Tạo một đối tượng Date đại diện cho ngày giờ hiện tại
        const day = currentDate.getDate(); // Lấy ngày
        const month = currentDate.getMonth() + 1; // Lấy tháng (lưu ý tháng bắt đầu từ 0)
        const year = currentDate.getFullYear(); // Lấy năm
        const hours = currentDate.getHours(); // Lấy giờ
        const minutes = currentDate.getMinutes(); // Lấy phút
        const seconds = currentDate.getSeconds(); // Lấy giây
        // Chuyển đổi ngày tháng năm giờ phút giây thành chuỗi
        const imgName = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.${fileExtension}`;
        setNameFile(imgName);
          setImage(result.assets[0].uri)
          console.log("Image",image)
          console.log("r",result.assets[0].uri)
        //   const apiUrl = `http://${ip}:8080/api/user/uploadAvata/${id}`;
        //   uploadImage(result.assets[0].uri,imgName,apiUrl);
        }
        else{
            setImage(null)
        }
    };
    const uploadImage = async (uri,imgName,apiUrl) => {
        
        const formData = new FormData();
        formData.append('file', {
            uri,
            name: imgName,
            type: 'image/*',
        });
 
        axios.post(apiUrl, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log('Image uploaded successfully');
        })
        .catch((error) => {
            console.error('Error uploading image: ', error);
        });
    };
    const handReview =() => {
        if(nameFile !==null){
            const apiUrl = `http://${ip}:8080/api/review/upload`;
            uploadImage(image,nameFile,apiUrl);
        }
        let formData={
          bookId: detail.book.id,
          userId:userId,
          orderDetailId:detail.id,
          star:star,
          rating:rating,
          img:nameFile
        }
        axios.post(`http://${ip}:8080/api/review/add-review`,formData)
        .then((respone)=>
          {
            
            if(respone.status===200){
                setColor(COLORS.primary)
                setImg(require('../../assets/danhgia.gif'))
                setMessage("Đánh giá thành công")
                setAlertVisible(true);
            }
            else{
              Alert.alert("Thông báo", "Đăng ký thất bại!");
              
            }
          }
          
        )
        .catch((err)=>Alert.alert("Thông báo", "Đăng ký thất bại!"))
      };
    return (
        <View style={{backgroundColor:'white',flex:1}}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={styles.backButton}
                >
                    <FontAwesome name="arrow-left" size={18} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đánh giá sản phẩm</Text>
            </View>
            <ScrollView style={styles.content}>
                <Text style={{fontSize:18,color:COLORS.primary,fontWeight:'bold',marginBottom:10}}>Chất lượng sản phẩm</Text>
                <View style={styles.productItem}>
                    <View style={styles.borderImage}>
                        <Image source={{uri: 'http://'+ip+':8080/uploads/'+detail.book.image}} style={styles.productImage} />
                    </View>

                    <View style={{ width: '70%', paddingLeft: 20 }}>
                        <Text style={styles.productName}>{detail.book.bookName}</Text>
                        <Text style={styles.productQuantity}>Số lượng: {detail.quantity}</Text>
                        <Text style={styles.productPrice}>Giá: {detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>

                </View>
                <View style={styles.star}>
                {[1, 2, 3, 4, 5].map((starValue) => (
                <TouchableOpacity key={starValue} onPress={() => handleStarPress(starValue)}>
                <FontAwesome
                    name={starValue <= star ? 'star' : 'star-o'} // Sử dụng 'star' hoặc 'star-o' tùy thuộc vào xem người dùng đã chọn hay chưa
                    size={30}
                    color={starValue <= star ? 'gold' : 'gray'}
                />
                </TouchableOpacity>
            ))}
                 <Text>{star}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.upload} onPress={pickImage1} >
                        <View style={styles.border}>
                            <Image style={styles.iconUpload} source={require('../../assets/camera.png')}></Image>
                        </View>
                        { image ==null ? null : (
                            <View>
                                <Image style={styles.imgUpload} source={{uri : image}}></Image>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.input}>
                    <TextInput style={{fontSize:18}}  
                    placeholder='Nhập nội dung' 
                    multiline={true} 
                    value={rating}
                    onChangeText={setRating}
                    />
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:20}}>
                    <TouchableOpacity style={styles.btnRate} onPress={handReview}>
                        <Text style={{color:'white'}}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
            <CustomAlert 
            visible={alertVisible}
            message={message}
            onPage={onSuccess}
            img={img}
            color={color}
        />
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.blue,
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "white",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    backButton: {
        padding: 8,
    },
    content: {
        paddingHorizontal: 20,
        marginTop:20,
       
    },
    productItem: {
        // backgroundColor: "#f2f2f2",
       
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: COLORS.blue,
        borderRadius: 5,
        // elevation: 2,
        flexDirection:'row',
        alignItems:'center',
        width:'100%'
      },
      borderImage:{
        width: 80,
        height: 100,
        borderRadius: 5,
        overflow:'hidden'
      },
      productImage: {
       width:'100%',
       height:'100%'
      },
      productName: {
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical:5,
        
      },
      productQuantity: {
        fontSize: 14,
        paddingVertical:5
      },
      productPrice: {
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical:5
      },
      star:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:20,
        paddingHorizontal:30,
        borderWidth:1,
        borderRadius:10,
        marginVertical:20,
        borderColor: COLORS.blue,
      },
      upload:{
        backgroundColor:'white',
      
        flexDirection:'row'
      },
      border:{
        width:80,
        height:80,
        borderWidth:1,
        padding:10,
        borderRadius:10,
        marginRight:30,
        borderColor: COLORS.blue,
      },
      iconUpload:{
        width:'100%',
        height:'100%',
      },
      imgUpload:{
        width:80,
        height:80,
        borderRadius:10
      },
      input:{
        height:200,
        borderRadius:10,
        borderWidth:1,
        padding:20,
        marginTop:30,
        borderColor: COLORS.blue,
      },
      btnRate:{
        backgroundColor:COLORS.blue,
        padding:15,
        borderRadius:10,
        
      }
})