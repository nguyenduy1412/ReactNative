import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
const data = [
    {
        id: 1,
        name: "Tất cả"
    },
    {
        id: 2,
        name: "Sách mới"
    },
    {
        id: 3,
        name: "Đang sale"
    },
    {
        id: 4,
        name: "Bán chạy"
    },
]
const SortCate = () => {
    const [active, setActive] = useState("Tất cả")
    console.log(active)
    return (

        <View style={styles.cate}>
            {data.map((item, index) => {
                
                return (
                    <TouchableOpacity onPress={()=> setActive(item.name)} key={index} style={[styles.btn,active === item.name && { backgroundColor:'white' }]}>
                        <Text style={[styles.name,active===item.name && {color:'#00ABE0'}]}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
            }
        </View>
    )
}

export default SortCate

const styles = StyleSheet.create({
    cate: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 35,
        marginHorizontal: 15,
        alignItems: 'center',
        marginBottom:10
    },
    name:{
        fontWeight: 'bold',
        fontSize:15,
        
    },
    btn:{
        borderRadius: 35,
        paddingVertical: 8,
        paddingHorizontal: 10,
        
    }
})