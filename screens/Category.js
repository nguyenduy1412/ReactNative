// StudentList.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button,StyleSheet } from "react-native";
import axios from "axios";
const ip='192.168.136.95';
function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng mục mỗi trang
  const renderListItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <Text>{item.id}</Text>
      </View>
    );
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    
    console.log("CurentPage", currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const paginatedData = classLists.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  useEffect(() => {
    // Gọi API và cập nhật danh sách sinh viên
    axios
      .get(`http://${ip}:8080/api/category/`)
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View>
       <View style={styles.container}>
       <FlatList
        data={categoryList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.id}</Text>
            <Text>Tên danh mục : {item.categoryName}</Text>
            <Text>Trạng thái : {item.categoryStatus}</Text>
            {/* Hiển thị các thông tin khác của lớp học */}
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <Button title="Previous Page" onPress={handlePrevPage}  />
        
        <Button title="Next Page" onPress={handleNextPage}  />
      </View>
    </View>
    </View>

  );
  
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingTop: 100,
  },
  listItem: {
    backgroundColor: "#23A9FC",
    borderWidth: 1,
    borderColor: "#23A9FC",
    padding: 25,
  },
});
export default CategoryList;
