import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutScreen from './AboutScreen';
import HistoryScreen from './HistoryScreen';
import ScanScreen from './ScanScreen';
import InputScreen from './InputScreen';
import HomeListProducts from './HomeListProducts';

import useThemeContext from '../../theme/useThemeContext';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const { colors } = useThemeContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Input') {
            iconName = focused ? 'create' : 'create-outline';
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
        tabBarStyle: {
          backgroundColor:  colors.backgrounds.soft,
        },
        tabBarLabelStyle: {
          color: colors.text,
        },
      })}
    >

      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="List" component={HomeListProducts} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Input" component={InputScreen} />

    </Tab.Navigator>
  );
};

export default HomeTabNavigator;