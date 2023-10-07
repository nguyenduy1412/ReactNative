import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';
import { Image } from 'react-native';
const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.container}>
        <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
        <View style={styles.imguser}>
            <Image style={styles.anh} source={require('../../assets/anh.jpg')}></Image>
        </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    search:{
        borderRadius: 40,
        width:'80%',
        backgroundColor:'white',
        height:45,
        paddingBottom:0,
        borderWidth: 1,
        borderColor:'#00ABE0',
       
    },
    container:{
        backgroundColor:'white',
        marginTop:25,
        padding:20,
        paddingBottom:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    imguser:{
        width:40,
        height:40,
    },
    anh:{
        width:'100%',
        height:'100%',
        borderRadius:50,
    }
})