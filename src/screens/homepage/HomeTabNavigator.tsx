import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutScreen from './AboutScreen';
import HistoryScreen from './HistoryScreen';
import ScanScreen from './ScanScreen';
import SettingScreen from './SettingScreen';
import HomeListProducts from './HomeListProducts';
import { View,Text } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomHeader = () => {
  return (
    <View style={{marginTop:70, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: 'lightblue' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tracking Work</Text>
      <Ionicons name="person-circle-outline" size={24} color="black" />
    </View>
  );
};
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <CustomHeader />,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'scan-circle' : 'scan-circle-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          }else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >

      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="List" component={HomeListProducts} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />

    </Tab.Navigator>
  );
};

export default HomeTabNavigator;