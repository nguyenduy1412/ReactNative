import React, { useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';


import { Button } from 'react-native-paper';
import Search from './Search';
import ListBanner from './ListBanner';
import ListCategory from './ListCategory';
import ListBook from './ListBook';
import HomeScreen from '../HomeScreen';

// import Swiper from 'react-native-swiper';

const TabBottom = ({navigation}) => {
   
    const ip="192.168.0.103";
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <View style={styles.container}>  
            <ScrollView>
                <HomeScreen></HomeScreen>
            </ScrollView>
      </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1,

    },
});

export default TabBottom;