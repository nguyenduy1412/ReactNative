import React, { useState } from "react";
import { StatusBar } from "react-native";
import { View, Text, ScrollView, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

// Example cart items (you should replace this with your own data)
const exampleCartItems = [
  { id: 1, title: "Book 1", price: 10.99, quantity: 2, image: "https://example.com/book1.jpg" },
  { id: 2, title: "Book 2", price: 15.99, quantity: 1, image: "https://example.com/book2.jpg" },
  { id: 3, title: "Book 3", price: 9.99, quantity: 3, image: "https://example.com/book3.jpg" },
];

const Checkout = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });
  const [orderNote, setOrderNote] = useState("");

  // Calculate the total price of the order
  const calculateTotalPrice = () => {
    return exampleCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theo dõi đơn hàng</Text>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <ScrollView contentContainerStyle={styles.cartItemsContainer}>
          {exampleCartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.productBorder}>
                <Image source={require('../../assets/nguyennhatanh1.jpg')} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
                  <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
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
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={customerInfo.phone}
            onChangeText={(text) => setCustomerInfo({ ...customerInfo, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            value={customerInfo.address}
            onChangeText={(text) => setCustomerInfo({ ...customerInfo, address: text })}
          />
        </View>

        <View style={styles.orderNoteContainer}>
          <Text style={styles.orderNoteTitle}>Ghi chú:</Text>
          <TextInput
            style={styles.input}
            placeholder="Thêm ghi chú"
            multiline
            numberOfLines={4}
            value={orderNote}
            onChangeText={(text) => setOrderNote(text)}
          />
        </View>

        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Tổng: ${calculateTotalPrice().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
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
    color: "teal",
    marginBottom: 8,
  },
  input: {
    height: 40,
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
    color: "teal",
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
    backgroundColor: "teal",
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
