import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import { Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('screen')
const ListOrder = () => {
  const [isVisible, setIsVisible] = useState({});
  const navigation = useNavigation();
  const toggleView = (orderId) => {
    const updatedVisible = { ...isVisible };
    updatedVisible[orderId] = !updatedVisible[orderId];
    setIsVisible(updatedVisible);
    console.log(isVisible)
  };
  const [orderStatus, setOrderStatus] = useState("Tất cả");
  const tabs = [
    { id: 1, title: "Tất cả",img: require('../../assets/bill.png') },
    { id: 2, title: "Chờ xác nhận",img: require('../../assets/waiting.png')},
    { id: 3, title: "Chờ lấy hàng",img: require('../../assets/booking.png') },
    { id: 4, title: "Đang giao",img: require('../../assets/tracking.png') },
    { id: 5, title: "Đánh giá",img: require('../../assets/rating.png') },
  ];
  const orderData = {
    orderNumber: "DH12345",
    customerName: "Nguyễn Văn A",
    totalAmount: 150.0,
  };
  const products = [
    { id: 1, name: "Sản phẩm 1", quantity: 2, price: 20, image: require('../../assets/nguyennhatanh1.jpg') },
    { id: 2, name: "Sản phẩm 2", quantity: 3, price: 15, image: require('../../assets/nguyennhatanh1.jpg') },
    { id: 3, name: "Sản phẩm 3", quantity: 1, price: 30, image: require('../../assets/nguyennhatanh1.jpg') },
    { id: 4, name: "Sản phẩm 3", quantity: 1, price: 30, image: require('../../assets/nguyennhatanh1.jpg') },
  ];
  const order=[
    {id:1,name:"Order"},
    {id:2,name:"Order"},
    {id:3,name:"Order"},
    {id:4,name:"Order"},
  ]
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity
          onPress={()=>{navigation.goBack()}}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theo dõi đơn hàng</Text>
      </View>
      <ScrollView style={{ padding: 16, marginBottom: 30 }}>
        <View style={styles.tabs}>
          {tabs.map((item, index) => {

            return (
              <TouchableOpacity
                style={[styles.tab, orderStatus === item.title && styles.activeTab]}
                onPress={() => setOrderStatus(item.title)} key={index}
              >
                <View style={{ alignItems: 'center' }}>
                  <Image source={item.img} style={styles.icon}></Image>
                  <Text style={[styles.tabText, orderStatus === item.title && { color: 'white' }]}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })
          }


        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          {order.map((order, index) => (
          <View style={styles.sectionContent} key={order.id}>
            <View style={styles.infoItem}>
              <FontAwesome name="shopping-cart" size={24} color="teal" />
              <Text style={styles.infoText}>Số đơn hàng: {orderData.orderNumber}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="person" size={24} color="teal" />
              <Text style={styles.infoText}>Khách hàng: {orderData.customerName}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome5 name="money-check" size={20} color="teal" />
              <Text style={styles.infoText}>Tổng tiền: ${orderData.totalAmount.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} key={order.id} onPress={() => toggleView(order.id)}>
              <Text style={styles.sectionTitle}>Xem thêm</Text>
              <MaterialIcons name="expand-more" size={24} color="teal" />
            </TouchableOpacity>
            {isVisible[order.id] && (
               <View >
               {products.map((product) => (
                 <View key={product.id} style={styles.productItem}>
                   <Image source={product.image} style={styles.productImage} />
                   <View style={{marginLeft:20}}>
                     <Text style={styles.productName}>{product.name}</Text>
                     <Text style={styles.productQuantity}>Số lượng: {product.quantity}</Text>
                     <Text style={styles.productPrice}>Giá: ${product.price.toFixed(2)}</Text>
                   </View>
                   
                 </View>
               ))}
               </View>
            )}
            
          </View>
          ))}
        </View>

       

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: "teal",
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
  icon: {
    width: 30,
    height: 30,
  },
  tabs: {
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 20
  },
  tab: {
    width: (width - 30) / 5,
    borderRadius: 5,
    paddingVertical: 20
  },
  tabText: {
    fontSize: 10,
    paddingTop: 10
  },
  activeTab: {
    backgroundColor: "#339966",

  },
  section: {

    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "teal",
    margin: 10,
    
  },
  sectionContent: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderWidth: 1,
    borderColor: "teal",
    borderRadius: 5,
    elevation: 2,
    marginBottom:20
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  productItem: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "teal",
    borderRadius: 5,
    elevation: 2,
    flexDirection:'row',
    alignItems:'center',
   
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
   
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical:5
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
});

export default ListOrder;
