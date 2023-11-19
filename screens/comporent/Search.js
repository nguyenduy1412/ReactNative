import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
const Search = ({ route }) => {
    const {ip,id} = route.params;
    console.log(ip)
    const navigation = useNavigation();
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [bookList, setBookList] = useState([]);
    const [key, setKey] = useState('');
    const [api, setApi] = useState(`http://${ip}:8080/api/book/list?keyword=@m&&page=1`)
    const [leftApi, setLeftApi] = useState("")
        useEffect(() => {
            console.log(api)
            axios
                .get(api)
                .then((response) => {
                    setTotalPage(response.data.totalPages)
                    setBookList([...bookList, ...response.data.content]);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                }).finally(() => {
    
                    setLoad(false)
                });
        }, [api]);
    
    
    renderFooter = () => {
        return (
        <View>
            {load ? (
                <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                 </View>
                ):null
            }
            <View style={{height:60,backgroundColor:'white'}}>
            </View>
        </View>   
        )
      }
      handleLoadMore = () => {
        
        if (page < totalPage) {
          setPage(page + 1)
          setApi(leftApi+'page='+(page+1))
          setLoad(true)
          console.log("page", page)
        }
      }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/back.png')} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.search}>
                    <TextInput style={styles.input}
                        value={key}
                        onChangeText={setKey}
                    />
                    <TouchableOpacity onPress={() => {
                        setBookList([])
                        setPage(1)
                        setTotalPage(0)
                        setLoad(true)
                        setLeftApi(`http://${ip}:8080/api/book/list?keyword=${key}&&`)
                        setApi(`http://${ip}:8080/api/book/list?keyword=${key}&&page=1`)
                    }}>
                        <Image style={styles.iconLoupe} source={require('../../assets/loupe.png')} />
                    </TouchableOpacity>

                </TouchableOpacity>

            </View>
            <View style={{ elevation: 2, height: 2 }}></View>
            <View style={styles.book}>
                <FlatList
                    scrollEnabled={true}
                    numColumns={2}
                    initialNumToRender={2}
                    columnWrapperStyle={styles.row}
                    data={bookList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

                        <TouchableOpacity style={styles.itemBook} onPress={() => { navigation.navigate('BookDetail', { bookItem: item, ip: ip, id: id }); }} >
                            {item.sale === 0 ? null : (
                                <View style={styles.sale}>
                                    <Text style={{ color: '#fff' }}>-{item.sale}%</Text>
                                </View>
                            )}
                            <View style={styles.divanh}>
                                <Image style={styles.imgBook} source={{ uri: 'http://' + ip + ':8080/uploads/' + item.image }} />
                                <View style={styles.noidung}>
                                    <View style={styles.dess}>
                                        <Text style={styles.bookName}>{item.bookName.length > 10 ? item.bookName.substring(0, 10) + "..." : item.bookName}</Text>
                                        <Text style={styles.author}>{item.author.nameAuthor}</Text>
                                        <View style={styles.divprice}>
                                            <Text style={{ color: 'white' }}> <AntDesign name="star" size={15} color="white" /> 4.0</Text>
                                            <Text style={styles.priceSale}>{item.priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                />
                
            </View>
            
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex:1
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    input: {

        width: '75%',
        paddingLeft: 10
    },
    search: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(10,158,217,1)',

        height: 42,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    iconLoupe: {
        width: 30,
        height: 30,
        marginTop: 5,
        marginRight: 8
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',

    },
    book: {
        backgroundColor: 'white',
        
        // backgroundColor:'#EEEEEE',
        marginTop: 5,
        paddingHorizontal: 20,
     
    },
    titleBook: {
        color: '#1876F2',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20
    },
    row: {
        flex: 1,
        justifyContent: 'space-between'
    },
    itemBook: {
        width: '48%',
        marginBottom: 15,
    },
    divanh: {
        overflow: 'hidden',
        borderRadius: 20,
    },
    imgBook: {
        width: '100%',
        height: 250,
        // borderRadius: 20,

    },
    noidung: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        // backgroundColor:'rgba(0,0,0,0.3)',
        paddingHorizontal: 10,
        paddingBottom: 10,
        // borderRadius:20
    },
    dess: {
    },
    bookName: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        paddingVertical: 3
    },
    author: {
        color: 'white',

    },
    divprice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    priceSale: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    sale: {
        backgroundColor: 'rgb(255,0,0)',
        width: 50,
        height: 25,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        zIndex: 1000,
        right: 10
    }
})