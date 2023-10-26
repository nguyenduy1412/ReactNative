import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import axios from "axios";
import { Alert } from 'react-native';
const Login = () => {
  const ip="192.168.0.100";
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //const navigation = useNavigation();
  const handleLogin = async () => {
    console.log('Alo')
    try {
      const response = await axios.get(
        `http://${ip}:8080/api/user?username=${username}&&password=${password}`
      );
      console.log('Alo',response.data);
      if (response.data) {
        // Đăng nhập thành công
        Alert.alert("Thông báo", "Đăng nhập thành công!");
        navigation.navigate("DrawerApp");
      } else {
        // Đăng nhập thất bại
        Alert.alert("Thông báo", "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{marginBottom:20}} >
          <View style={styles.back} >
              <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.btnBack} >
                  <AntDesign name="arrowleft" size={30} color="black" />
              </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Image source={require('../../assets/login.png')} style={{width:200,height:200}} ></Image>
          </View>
      </SafeAreaView>
      <View style={styles.content}>
        <View style={styles.form} >
          <Text style={styles.lable}>Tên đăng nhập</Text>
          <TextInput 
              style={styles.input}
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChangeText={setUsername}
            />
          <Text style={styles.lable}>Mật khẩu</Text>
          <View>
            <TextInput 
                style={styles.input}
                placeholder="Nhập mật khẩu"
                secureTextEntry={showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={styles.show}>
                {showPassword === true ? 
                    (<Entypo  name="eye" size={25} color="black" />) : 
                    (<Entypo  name="eye-with-line" size={25} color="black" />)
                }
              </TouchableOpacity>
          </View>
          
            <TouchableOpacity style={{justifyContent:'flex-end',flexDirection:'row',marginBottom:10}}>
              <Text>Quên mật khẩu?</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} >
                <Text style={styles.txtLogin}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
         <Text style={{padding:10,fontSize:20,fontWeight:'bold',textAlign:'center'}}>
            Or
         </Text>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={{padding:16, backgroundColor:'#EEEEEE',borderRadius:30}}>
              <Image style={styles.lienket} source={require('../../assets/google.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:16, backgroundColor:'#EEEEEE',borderRadius:30}}>
              <Image style={styles.lienket} source={require('../../assets/apple.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:16, backgroundColor:'#EEEEEE',borderRadius:30}}>
              <Image style={styles.lienket} source={require('../../assets/facebook.png')}></Image>
            </TouchableOpacity>
         </View>
         <View style={{justifyContent:'center',flexDirection:'row',marginTop:20}}>
            <Text>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
              <Text style={{fontWeight:'bold' ,color:'#FFD700'}}> Đăng ký</Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
    
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
   
    paddingTop:30,
    backgroundColor:'#877dfa',
    flex:1,
  },
  back:{
    flexDirection:'row',
    justifyContent:'flex-start',
    paddingLeft:20
  },
  btnBack:{
    backgroundColor:'#FFD700',
    padding:5,
    borderTopRightRadius:16,
    borderBottomLeftRadius:16
  },
  content:{
    flex:1,
    backgroundColor:'white',
    paddingTop:40,
    padding:45,
    borderTopLeftRadius:50,
    borderTopRightRadius:50
  },
  form:{

  },
  lable:{
    marginLeft:12,
    marginBottom:12,
    fontSize:15
  },
  input:{
    padding: 16,
    backgroundColor: '#EEEEEE',
    
    borderRadius: 16,
    marginBottom: 20,
  },
  btnLogin:{
    borderRadius:20,
    backgroundColor:'#FFD700',
    padding:20
  },
  txtLogin:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:15
  },
  lienket:{
    width:40,
    height:40
  },
  show:{
    position:'absolute',
    top:17,
    right:25
  }
})