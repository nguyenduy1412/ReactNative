
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { CommonActions } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import CategoryList from './Category';
import BookList from './Book';




const Tab = createBottomTabNavigator();

export default function BottomTab({navigation}) {
  const handleGoToNewScreen = () => {
    navigation.navigate("BookDetail");
  };
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
          safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (route.name === 'HomeScreen') {
                navigation.dispatch({
                  ...CommonActions.navigate('HomeScreen'),
                  target: state.key,
                });
              }
              else {
              navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color: focused ? '#00ABE0' : color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
       
        <Tab.Screen
          name="Category"
          component={CategoryList}
          options={{
            tabBarLabel: 'Giỏ hàng',
            tabBarIcon: ({ color, size }) => {
              
              return <Icon name="cart" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Book"
          component={BookList}
          options={{
            tabBarLabel: 'Đơn hàng',
            tabBarIcon: ({ color, size }) => {
              return <Icon name="calendar-text-outline" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color, size }) => {
              return <Icon name="account" size={size} color={color} />;
            },
          }}
        />
      
      </Tab.Navigator> 
      <Button onPress={() => navigation.navigate('BookDetail')} ></Button>
    </NavigationContainer>
  );
}


function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}
const NewScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the New Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});