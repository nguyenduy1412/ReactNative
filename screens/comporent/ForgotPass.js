import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
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
import CustomAlert from './CustomAlert'
const {width,height} =Dimensions.get('screen')
const ForgotPass = ({ route }) => {
  const { ip} = route.params;
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [alertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();
  const onError =()=>{
    setAlertVisible(false);
  }
  const search = () => {

    let check = true;
    let regexEmail = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    if (!regexEmail.test(email)) {
      setErrorEmail("Email không đúng định dạng")
      check = false
    }
    else {
      check = true
      setErrorEmail("");
    }
    if (check) {
      setAlertVisible(true)
      axios.get(`http://${ip}:8080/api/email/forgotPass/${email}`)
        .then((respone) => {
          if (respone.status === 200) {
           
            navigation.navigate("MaOtp", { email: email, ip: ip })
            setAlertVisible(false)
          }
        }
        )
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
            setErrorEmail(err.response.data)
          }
        })
      
    }
  }
  return (
    <View style={styles.container}>
      {/* <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar> */}
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
          <Text style={styles.lable}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={setEmail}
          />
          {
            errorEmail === "" ? null : (
              <Text style={styles.error}>{errorEmail}</Text>
            )
          }

          <TouchableOpacity style={styles.btnLogin} onPress={search} >
            <Text style={styles.txtLogin}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomAlert 
            visible={alertVisible}
            message={"Xin chờ"}
            onPage={onError}
            img={require('../../assets/sonic.webp')}
            color={COLORS.sky}
        />
    </View>
  )
}

export default ForgotPass

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
  error: {
    color: 'red',
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    padding: 45,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop:-45
  },
  form: {

  },
  lable: {
    marginLeft: 12,
    marginBottom: 12,
    fontSize: 15
  },
  input: {
    padding: 16,
    backgroundColor: '#EEEEEE',

    borderRadius: 16,

  },
  btnLogin: {
    borderRadius: 20,
    backgroundColor: COLORS.sky,
    padding: 20,
    marginTop: 15
  },
  txtLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color:'white'
  },
  lienket: {
    width: 40,
    height: 40
  },
  show: {
    position: 'absolute',
    top: 17,
    right: 25
  }
})