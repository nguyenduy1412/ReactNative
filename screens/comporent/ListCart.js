import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar } from "react-native";

import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const ListCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    setCartItems([
      { id: 1, title: "Book 1", price: 10.99, image: require('../../assets/nguyennhatanh1.jpg'), quantity: 1, selected: false },
      { id: 2, title: "Book 2", price: 15.99, image: require('../../assets/nguyennhatanh1.jpg'), quantity: 2, selected: false },
      { id: 3, title: "Book 3", price: 9.99, image: require('../../assets/nguyennhatanh1.jpg'), quantity: 1, selected: false },
    ]);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.selected ? item.price * item.quantity : 0), 0);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleSelectItem = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity
          onPress={()=>{navigation.goBack()}}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemBorder}>
              <Image source={require('../../assets/nguyennhatanh1.jpg')} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                <View style={styles.quantityButtons}>
                  <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
                    <FontAwesome name="minus-circle" size={24} color="red" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
                    <FontAwesome name="plus-circle" size={24} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              
                <Image source={require('../../assets/delete.png')} style={{width:40,height:40}} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>Total: ${calculateTotalPrice().toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={()=>{navigation.navigate('Checkout')}}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
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
    cartIconContainer: {
      padding: 0, 
    },
    cartItem: {
      marginBottom: 16,
      
    },
    itemBorder: {
      borderWidth: 1,
      borderColor: "#ddd",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 15,
      borderRadius: 20,
      backgroundColor:'white'
    },
    checkCircle: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius:15
    },
    itemDetails: {
      flex: 1,
      marginLeft: 12,
      alignItems: "center",
    },
    itemTitle: {
      fontSize: 14,
      padding: 5,
    },
    itemPrice: {
      fontSize: 14,
    },
    quantityButtons: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 5,
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 5,
      borderRadius: 10,
    },
    quantityText: {
      fontSize: 14,
      marginHorizontal: 10,
    },
    totalPriceContainer: {
      backgroundColor: "#f2f2f2",
      padding: 16,
    },
    totalPriceText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    checkoutButton: {
      backgroundColor: "teal",
      alignItems: "center",
      padding: 14,
      margin: 10,
      borderRadius: 10,
      elevation: 2,
    },
    checkoutButtonText: {
      color: "white",
      fontSize: 16,
    },
});

export default ListCart;
