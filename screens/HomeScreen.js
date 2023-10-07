import React, { useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';
import ListBook from './comporent/ListBook';
import ListCategory from './comporent/ListCategory';
import ListBanner from './comporent/ListBanner';
import Search from './comporent/Search';
import BookDetail from './comporent/BookDetail';
import { Button } from 'react-native-paper';

// import Swiper from 'react-native-swiper';

const HomeScreen = ({navigation}) => {
   
    const ip="192.168.0.101";
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <View style={styles.container}>
            <Search ></Search>
            <ScrollView>
                <ListBanner ip={ip}></ListBanner>
                <ListCategory ip={ip} ></ListCategory>
                <ListBook ip={ip} navigation={navigation}></ListBook>
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

export default HomeScreen;