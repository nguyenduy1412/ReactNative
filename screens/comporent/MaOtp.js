import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import axios from 'axios'
import { COLORS } from '../../contants'
import { Dimensions } from 'react-native'
const {width,height} =Dimensions.get('screen')
const MaOtp = ({route}) => {
    const [otp,setOtp]=useState('')
    const [errorOtp,setErrorOtp]=useState('')
    const {ip,email} = route.params;
    const navigation = useNavigation();
    const search =()=>{
      let check=true
      if(otp.trim().length <1){
        check=false
        setErrorOtp("Mã OTP không được để trống")
      }
      else{
        setErrorOtp("")
      }
      if(check){
        axios.get(`http://${ip}:8080/api/email/checkOtp?otp=${otp}&&email=${email}`)
        .then((respone) => {
          if (respone.status === 200) {
            navigation.navigate("PassNew", { email: email, ip: ip })
          }
        }
        )
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
            setErrorOtp(err.response.data)
          }
        })
      }
       
    }
  return (
    <View style={styles.container}>
    <View>
        <Image style={styles.img} source={require('../../assets/register.png')} />
        <View style={styles.back} >
              <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.btnBack} >
                  <AntDesign name="arrowleft" size={30} color="white" />
              </TouchableOpacity>
          </View>
      </View>
    <View style={styles.content}>
      <View style={styles.form} >
        <Text style={styles.lable}>Mã OTP</Text>
        <TextInput 
            style={styles.input}
            placeholder="Nhập mã OTP"
            value={otp}
            onChangeText={setOtp}
          />
          {
            errorOtp ===""? null: (
                <Text style={styles.error}>{errorOtp}</Text>
            )
          }
          
          <TouchableOpacity style={styles.btnLogin} onPress={search} >
              <Text style={styles.txtLogin}>Gửi</Text>
          </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

export default MaOtp

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
      },
      back:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingLeft:20,
        paddingTop:10,
        position:'absolute',
        top:30
      },
      btnBack:{
        backgroundColor:COLORS.sky,
        padding:5,
        borderTopRightRadius:16,
        borderBottomLeftRadius:16
      },
    
      img:{
        width:width,
        height:350
      },
      error:{
        color:'red',
        paddingLeft:10,
      },
      content:{
        flex:1,
        backgroundColor:'white',
        paddingTop:40,
        padding:45,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        marginTop:-45
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
      
      },
      btnLogin:{
        borderRadius:20,
        backgroundColor:COLORS.sky,
        padding:20,
        marginTop:15
      },
      txtLogin:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15,
        color:'white'
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