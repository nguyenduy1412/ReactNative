import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('screen')
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'react-native';
const Account = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
      <View>
        <Image style={styles.imgCover}  source={require('../../assets/banner1.jpg')}></Image>
        <TouchableOpacity style={styles.btnUploadCover}>
          <Entypo name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>
        
        <View style={styles.container}>
          <View>
            <Image style={styles.avatar}  source={require('../../assets/avata.jpg')}></Image>
            <TouchableOpacity style={styles.btnUploadAvatar}>
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.nameUser}>Nguyễn Ngọc Duy</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <TouchableOpacity style={styles.btnBack} onPress={()=>{navigation.goBack()}}>
                <AntDesign name="doubleleft" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnUpdate}>
                <FontAwesome5 name="pen" size={16} color="black" />
                <Text style={{fontWeight:'bold',fontSize:16,paddingLeft:10}}>Chỉnh sửa trang cá nhân</Text>
              </TouchableOpacity>   
          </View>

          
          <Text style={styles.detail} >Chi tiết</Text>
          <View style={styles.inform}>
            <Zocial name="email" size={25} color="#898C91" />
            <Text style={styles.text}>duy2172003@gmail.com</Text>
          </View>
          <View style={styles.inform}>
            <Ionicons name="md-location-sharp" size={25} color="#898C91" />
            <Text style={styles.text}>Nam Định</Text>
          </View>
          <View style={styles.inform}>
            <Entypo name="old-phone" size={25} color="#898C91" />
            <Text style={styles.text}>0947669387</Text>
          </View>
          <View style={styles.inform}>
            <FontAwesome5 name="transgender" size={34} color="#898C91" />
            <Text style={styles.text}>Nam</Text>
          </View>
          <View style={styles.inform}>
            <FontAwesome name="birthday-cake" size={27} color="#898C91" />
            <Text style={styles.text}>21-7-2003</Text>
          </View>
          
        </View>
       
      
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:15
  },
  imgCover:{
    width: width,
    height:300
  },
  avatar:{
    width:180,
    height:180,
    borderRadius:150,
    borderColor:'white',
    borderWidth:4,
    marginTop:-130,

  },
  nameUser:{
    fontSize:25,
    fontWeight:'bold',
    paddingVertical:15
  },
  btnUploadCover:{
    width:45,
    height:45,
    backgroundColor:'#E5E6EB',
    position:'absolute',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    bottom:10,
    right:10,
    borderWidth:4,
    borderColor:'white'
  },
  btnUploadAvatar:{
    width:45,
    height:45,
    backgroundColor:'#E5E6EB',
    position:'absolute',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    left:130,
    borderWidth:4,
    borderColor:'white'
  },
  btnBack:{
    backgroundColor:'#E5E6EB',
    padding:10,
    borderRadius:8
  },
  btnUpdate:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#E5E6EB',
    padding:10,
    borderRadius:8,
    width:'86%'
  },
  detail:{
    fontSize:20,
    fontWeight:'bold',
    paddingVertical:25,
  
  },
  inform:{
    flexDirection:'row',
    alignItems:'center',
    paddingBottom:15
  },
  text:{
    fontSize:17,
    paddingLeft:10
  }
})