// StudentList.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";

function ClassList() {
  const [classLists, setClassLists] = useState([]);
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
    // Gọi API và cập nhật danh sách lớp
    axios
      .get(`http://10.0.60.168:3000/api/class/`, {
        params:{
          _page:currentPage,
          _limit:itemsPerPage
        },
        
      })
      .then((response) => {
        // console.log(response.data);
        setClassLists(response.data.data);
        console.log("class", classLists);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]);

  return (
    <View>
       <View>
       <FlatList
        data={classLists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>Giáo viên chủ nhiệm : {item.supervising_Teacher}</Text>
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

export default ClassList;
