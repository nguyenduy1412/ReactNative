import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Màn hình trang chủ</Text>
      <Button
        title="Go to classes..."
        onPress={() => navigation.navigate('Classes')}
      /> 
      <Button
        title="Go to studnets..."
        onPress={() => navigation.navigate('Student')}
      />
       <Button
        title="Go to category..."
        onPress={() => navigation.navigate('Category')}
      />
       <Button
        title="Go to book..."
        onPress={() => navigation.navigate('Book')}
      />

    </View>
  );
}
export default Home;