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
const ForgotPass = ({ route }) => {
  const { ip} = route.params;
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const navigation = useNavigation();
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
      axios.get(`http://${ip}:8080/api/email/forgotPass/${email}`)
        .then((respone) => {
          if (respone.status === 200) {
            navigation.navigate("MaOtp", { email: email, ip: ip })
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
      <SafeAreaView style={{ marginBottom: 20 }} >
        <View style={styles.back} >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack} >
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={require('../../assets/login.png')} style={{ width: 200, height: 200 }} ></Image>
        </View>
      </SafeAreaView>
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
    </View>
  )
}

export default ForgotPass

const styles = StyleSheet.create({
  container: {

    paddingTop: 30,
    backgroundColor: '#877dfa',
    flex: 1,
  },
  back: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingTop: 10
  },
  btnBack: {
    backgroundColor: '#FFD700',
    padding: 5,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16
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
    borderTopRightRadius: 50
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
    backgroundColor: '#FFD700',
    padding: 20,
    marginTop: 15
  },
  txtLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
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