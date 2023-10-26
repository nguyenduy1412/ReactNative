import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
const SignUp = () => {
  const ip="192.168.0.100";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp =() => {
    let formData={
      fullName: fullName,
      userName:username,
      passWord:password,
    }
    axios.post(`http://${ip}:8080/api/user/signup`,formData)
    .then((respone)=>
      {
        
        if(respone.status===200){
          
          Alert.alert("Thông báo", "Đăng ký thành công!");
          navigation.navigate('Login');
        }
        else{
          Alert.alert("Thông báo", "Đăng ký thất bại!");
          
        }
      }
      
    )
    .catch((err)=>Alert.alert("Thông báo", "Đăng ký thất bại!"))
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
              <Image source={require('../../assets/signup.png')} style={{width:200,height:200}} ></Image>
          </View>
      </SafeAreaView>
      <View style={styles.content}>
        <View style={styles.form} >
          <Text style={styles.lable}>Họ Tên</Text>
          <TextInput 
              style={styles.input}
              placeholder="Nhập họ tên"
              value={fullName} 
              onChangeText={setFullName} 
            />
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
            
            <TouchableOpacity style={styles.btnLogin} onPress={handleSignUp}>
                <Text style={styles.txtLogin}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
         
         
         <View style={{justifyContent:'center',flexDirection:'row',marginTop:20}}>
            <Text>Bạn đã có tài khoản?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <Text style={{fontWeight:'bold' ,color:'#FFD700'}}> Đăng nhập</Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
    
  )
}

export default SignUp

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