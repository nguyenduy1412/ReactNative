import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/Fontisto";
import { StatusBar } from "expo-status-bar";
import { Button } from 'react-native-paper'
const ip='192.168.0.101';
const LoginScreen = ({ navigation }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:8080/api/user?username=${username}&&password=${password}`
      );
      console.log('Alo',response.data);
      if (response.data) {
        // Đăng nhập thành công
        Alert.alert("Thông báo", "Đăng nhập thành công!");
        navigation.navigate("Home");
      } else {
        // Đăng nhập thất bại
        Alert.alert("Thông báo", "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"}></StatusBar>
      <View>
        <View style={styles.title}>
          <Text style={styles.login}>Login</Text>
          <Text>By signing in you are agreeing</Text>
          <Text>our </Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Sau này t làm chuyển trang")}
          >
            <Text style={{ color: "#1876F2" }}>Term and privacy police</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.group}>
          <Icon name="email" style={styles.icon} />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.ip}
          ></TextInput>
        </View>
        <View style={styles.group}>
          <Icon name="locked" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.ip}
          ></TextInput>
        </View>
        <View style={styles.group1}>
          <View style={{ flexDirection: "row" }}>
            <Checkbox value={isCheck} onValueChange={setIsCheck} />
            <Text>Ghi nhớ pass</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => Alert.alert("Sau này t làm chuyển trang")}
            >
              <Text style={{ color: "#1876F2" }}>Quên mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          {/* <Button title="Login" onPress={handleLogin} style={{fontWeight:'bold',color:'#fff'}} /> */}
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Login</Text>
        </TouchableOpacity>
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
        {/* <Space wrap>
          <Button color="primary" fill="solid">
            Solid
          </Button>
          <Button color="primary" fill="outline">
            Outline
          </Button>
          <Button color="primary" fill="none">
            None
          </Button>
        </Space> */}
      </View>
      <View>
        <Image source={require("../assets/Subtract.png")}></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  login: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  title: {
    marginTop: 60,
    alignItems: "center",
  },
  form: {
    marginTop: 60,
    paddingHorizontal: 30,
  },
  group: {
    marginTop: 15,
  },
  ip: {
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    height: 50,
    borderColor: "gray",
    paddingLeft: 35,
  },
  icon: {
    fontSize: 25,
    position: "absolute",
    top: 10,
    zIndex: 100,
  },
  group1: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  btn: {
    marginTop: 30,
    backgroundColor: "#1bcdff",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 20,
  },
});

export default LoginScreen;
