import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../../utils/asyncStorage'
import { StatusBar } from 'react-native';
const {width, height} = Dimensions.get('window');
const Onbroading = () => {
    const navigation = useNavigation();

    const handleDone = ()=>{
        navigation.navigate('Start');
        setItem('onboarded', '1');
    }

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
        
    }
  return (
    <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'}></StatusBar>
      <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            // bottomBarHighlight={false}
            DoneButtonComponent={doneButton}
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#a7f3d0',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../../assets/animations/boost.json')} autoPlay loop />
                        </View>
                    ),
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor: '#fef3c7',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../../assets/animations/work.json')} autoPlay loop />
                        </View>
                    ),
                    title: '',
                    subtitle: '',
                },
                {
                    backgroundColor: '#76CDF5',
                    image: (
                        <View style={styles.lottie}>
                            
                            <Lottie source={require('../../assets/animations/achieve.json')} autoPlay loop />
                        </View>
                    ),
                    title: '',
                    subtitle: '',
                },
            ]}
        />
    </View>
  )
}

export default Onbroading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie:{
        width: width*0.9,
        height: width
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})