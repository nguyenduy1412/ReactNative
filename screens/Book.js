// StudentList.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";

function BookList() {
  const [bookList, setBookList] = useState([]);
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
      .get("http://192.168.4.95:8080/api/book")
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View>
       <View>
       <FlatList
        data={bookList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>Tên sách : {item.bookName}</Text>
            <Text>Tác giả : {item.author}</Text>
            <Text>Giá : {item.priceSale}</Text>
            <Text>Giá cũ : {item.priceSale}</Text>
            <Text>Sale : {item.sale}</Text>
            <Text>Ảnh : {item.image}</Text>
            <Text>Nhà xuất bản : {item.publicsher}</Text>
            <Text>Năm xuất bản : {item.publicationYear}</Text>
            <Text>Ngày nhập : {item.dateAdded}</Text>
            <Text>Trạng thái : {item.status}</Text>
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

export default BookList;
