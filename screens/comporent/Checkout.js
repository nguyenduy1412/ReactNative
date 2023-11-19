import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { View, Text, ScrollView, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "./CustomAlert";
import { COLORS } from "../../contants";

const Checkout = ({ route }) => {

  const navigation = useNavigation();
  const currentDate = new Date();
  const time = currentDate.getMinutes() + "-" + currentDate.getSeconds()
  const { id, ip } = route.params;
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "",note: "" });
  const onPage = () =>{
    navigation.navigate('Order',{ id: id,ip:ip,status:0,reset:time});
    setAlertVisible(false);
  }
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorFullName,setErrorFullName]=useState("")
  const [errorPhone,setErrorPhone]=useState("")
  const [errorAddress,setErrorAddress]=useState("")
 
  useEffect(() => {  
      axios.get(`http://${ip}:8080/api/cart/listItem/${id}`)
      .then((response) => {
        
        setCartItems(response.data);
        console.log(response.data)
        console.log('data',cartItems)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      axios.get(`http://${ip}:8080/api/cart/${id}`)
      .then((response) => {   
        setTotal(response.data.total); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  const checkOut =() => {
    let check=true;
    let regexPhone=/((09|03|07|08|05)+([0-9]{8})\b)/g;

    let formData={
      fullName:customerInfo.name,
      addressShip:customerInfo.address,
      phone:customerInfo.phone,
      note:customerInfo.note
    }
    if(!regexPhone.test(formData.phone)){
      check=false;
      setErrorPhone("Số điện thoại không đúng định dạng")
    }
    else{
      setErrorPhone("");
    }
    if(formData.addressShip.trim().length ===0){
      setErrorAddress("Địa chỉ không được để trống")
      check=false
    }else{
      setErrorAddress("")
    }
    if(formData.fullName.trim().length ===0){
      setErrorFullName("Tên người nhận không được để trống")
      check=false
    }else{
      setErrorFullName("")
    }
    if(check){
      axios.post(`http://${ip}:8080/api/order/checkout/${id}`,formData)
      .then((respone)=>
        {
          if(respone.status===200){     
            setAlertVisible(true); 
          }
        }
      )
      .catch((err)=>Alert.alert("Thông báo", "Lỗi!"))
    }
    
  };
  // Calculate the total price of the order


  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theo dõi đơn hàng</Text>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <ScrollView contentContainerStyle={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.productBorder}>
                <Image source={{uri: 'http://'+ip+':8080/uploads/'+item.book.image}} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.book.bookName}</Text>
                  <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
                  <Text style={styles.itemPrice}>{(item.book.priceSale * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.customerInfoContainer}>
          <Text style={styles.customerInfoTitle}>Thông tin khách hàng:</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên người nhận"
            value={customerInfo.name}
            onChangeText={(text) => setCustomerInfo({ ...customerInfo, name: text })}
          />
          {errorFullName === "" ? null :
              (
                  <Text style={styles.error}>{errorFullName}</Text>
              )
          }
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={customerInfo.phone}
            onChangeText={(text) => setCustomerInfo({ ...customerInfo, phone: text })}
          />
          {errorPhone === "" ? null :
              (
                  <Text style={styles.error}>{errorPhone}</Text>
              )
          }
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            value={customerInfo.address}
            onChangeText={(text) => setCustomerInfo({ ...customerInfo, address: text })}
          />
          {errorAddress === "" ? null :
              (
                  <Text style={styles.error}>{errorAddress}</Text>
              )
          }
        </View>

        <View style={styles.orderNoteContainer}>
          <Text style={styles.orderNoteTitle}>Ghi chú:</Text>
          <TextInput
            style={styles.input}
            placeholder="Thêm ghi chú"
            multiline
            numberOfLines={4}
            value={customerInfo.note}
            onChangeText={(text) => setCustomerInfo({ ...customerInfo, note: text })}
          />
        </View>

        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Tổng: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={checkOut}>
          <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        message="Cảm ơn bạn đã đặt hàng!"
        onPage={onPage}
        img={require('../../assets/thank.gif')}
        color={"#FFCB00"}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContent: {
    padding: 16,
  },
  header: {
    backgroundColor: COLORS.blue,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  error: {
    color: 'red',
    paddingLeft: 10,
    paddingTop: 5
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    padding: 8,
  },
  cartItemsContainer: {
    marginBottom: 16,
   
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productBorder: {
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius:10
  },
  itemDetails: {
    flex: 1,
    marginLeft: 70,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#777",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customerInfoContainer: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  customerInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginTop: 8,
    padding: 8,
  },
  orderNoteContainer: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderNoteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.blue,
    marginBottom: 8,
  },
  totalPriceContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: COLORS.blue,
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    marginBottom:30
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
   
  },
});

export default Checkout;
