import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const StartScreen = () => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={{flex:1,backgroundColor: '#877dfa'}}>
          <View style={styles.container}>
            <View>
                <Text style={styles.textWelcome}>Let's Get Started!</Text>
            </View>
              <View style={styles.anh} >
                  <Image source={require("../../assets/welcome.png")} style={{width: 350, height: 350}} />
              </View>
              <View style={{marginBottom:16}}>
                  <TouchableOpacity
                      onPress={()=> navigation.navigate('SignUp')}
                     style={styles.btnSignup}>
                          <Text style={styles.textSignup}>
                              Đăng ký
                          </Text>
                  </TouchableOpacity>
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                      <Text style={{color:'white',fontWeight: '600'}}>Bạn đã có tài khoản?</Text>
                      <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                          <Text style={styles.textLogin}> Đăng nhập</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </SafeAreaView>
    )
}

export default StartScreen

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'space-around', 
    },
    textWelcome:{
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 32, 
        textAlign: 'center'
    },
   
    anh:{
        flexDirection:'row',
        justifyContent:'center'
    },
    btnSignup:{
        paddingVertical: 12, 
        backgroundColor: '#FFD700', 
        marginHorizontal: 28, 
        borderRadius: 16 
    },
    textSignup:{
        fontSize: 20, 
        fontWeight: 'bold',  
        textAlign: 'center', 
        color: '#718096'
    },
    textLogin:{
        fontWeight:'600', 
        color: '#FFD700'
    }
})