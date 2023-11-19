import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import axios from "axios";
import { Alert } from 'react-native';
import CustomAlert from './CustomAlert';

const PassNew = ({route}) => {
    const {ip,email} = route.params;
    const navigation = useNavigation();
    
  
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");
    const [kt,setKt]=useState(true);
    const [img, setImg] = useState();
    const [color, setColor] = useState("");
    const [errorPass, setErrorPass] = useState("")
    const [errorRPass, setErrorRPass] = useState("")
    const [message, setMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(true)
    const [showRPassword, setShowRPassword] = useState(true)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowRPassword = () => {
        setShowRPassword(!showRPassword);
    };
    const onSuccess = () => {
        navigation.navigate("Login");
        setAlertVisible(false);
    }
    const onError = () => {
        setAlertVisible(false);
    }
    //const navigation = useNavigation();
    const doiPass = async () => {
        let check = true;
        if (password.trim().length < 6) {
            check = false;
            setErrorPass("Mật khẩu có ít nhất 6 kí tự")
        }
        else {
            setErrorPass("")
        }
        if (rpassword.trim().length < 6) {
            check = false;
            setErrorRPass("Mật khẩu có ít nhất 6 kí tự")
        }
        else{
            if (password !== rpassword) {
                check = false;
                setErrorRPass("Mật khẩu không khớp")
            } else {
                setErrorRPass("")
            }
        }
        if(check){
            axios.put(`http://${ip}:8080/api/email/updatePass?email=${email}&&passnew=${password}`)
            .then((respone) => {
              if (respone.status === 200) {
                setKt(true)
                setColor("#1877f2")
                setImg(require('../../assets/updatePass.webp'))
                setMessage("Đổi mật khẩu thành công")
                setAlertVisible(true);
              }
            }
            )
            .catch((err) => {
              if (err.response) {
                setMessage("Đổi mật khẩu thất bại")
                setImg(require('../../assets/loginFail.webp'))
                setColor("red")
                setAlertVisible(true);
                setKt(false)
              }
            })
        }
      
    };
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
                    <Text style={styles.lable}>Nhập mật khẩu mới</Text>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={toggleShowPassword} style={styles.show}>
                            {showPassword === true ?
                                (<Entypo name="eye" size={25} color="black" />) :
                                (<Entypo name="eye-with-line" size={25} color="black" />)
                            }
                        </TouchableOpacity>
                        {
                            errorPass === "" ? null : (
                                <Text style={styles.error}>{errorPass}</Text>
                            )
                        }

                    </View>
                    {/* <Text style={styles.lable}>Nhập lại mật khẩu</Text> */}
                    <Text style={styles.lable}>Nhập lại mật khẩu</Text>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={showRPassword}
                            value={rpassword}
                            onChangeText={setRPassword}
                        />
                        <TouchableOpacity onPress={toggleShowRPassword} style={styles.show}>
                            {showRPassword === true ?
                                (<Entypo name="eye" size={25} color="black" />) :
                                (<Entypo name="eye-with-line" size={25} color="black" />)
                            }
                        </TouchableOpacity>
                        {
                            errorRPass === "" ? null : (
                                <Text style={styles.error}>{errorRPass}</Text>
                            )
                        }

                    </View>


                    <TouchableOpacity style={styles.btnLogin} onPress={doiPass} >
                        <Text style={styles.txtLogin}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>


                <CustomAlert
                    visible={alertVisible}
                    message={message}
                    onPage={kt ?onSuccess : onError}
                    img={img}
                    color={color}
                />
            </View>
        </View>

    )
}

export default PassNew

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
    error: {
        color: 'red',
        paddingLeft: 10,
    },
    btnLogin: {
        borderRadius: 20,
        backgroundColor: '#FFD700',
        padding: 20
    },
    borderInput: {
        marginBottom: 10,
        paddingBottom: 10
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