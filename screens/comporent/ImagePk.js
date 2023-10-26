import { StyleSheet, Text, View,PermissionsAndroid } from 'react-native'
import React from 'react'
import { Button } from 'react-native';

const ImagePk = () => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const result = await launchCamera({mediaType:'photo',cameraType:'front'})
        setImg(result.assets[0].uri);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={{marginTop:50}}>
      <Text>ImagePk</Text>
      <Button title='Chọn ảnh địt cụ mày' onPress={()=>requestCameraPermission}></Button>
    </View>
  )
}

export default ImagePk

const styles = StyleSheet.create({})