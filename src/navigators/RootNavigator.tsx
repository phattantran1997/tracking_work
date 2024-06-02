import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useThemeContext from '../theme/useThemeContext';

import SettingsScreen from '../screens/Setting/Settings';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../../assets/logo.png';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Image } from 'react-native';
import HomeTabNavigator from '../screens/ScreenStaff/StackNavigatorStaff';
import ProductDetail from '../screens/ScreenManager/products/ProductDetail';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import HomeManager from '../screens/ScreenManager/StackNavigatorManager';
const Stack = createNativeStackNavigator();
function LogoTitle() {
    return (
        <Image
            style={{ width: 40, height: 40, borderRadius: 25 }}
            source={logo}
        />
    );
}
export default function RootNavigator() {
    const { colors } = useThemeContext();

    return (
        <GestureHandlerRootView style={{flex:1}}>
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.backgrounds.soft },
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeTabNavigator}
                options={({ navigation }) => ({
                    headerTitle: (props) => <LogoTitle {...props} />,
                    headerLeft: ()=> null,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Settings')}
                            style={{ marginRight: 15 }}
                        >
                            <Ionicons name="settings-outline" size={24} color="#00cc00" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="HomeManager"
                component={HomeManager}
                options={({ navigation }) => ({
                    headerTitle: (props) => <LogoTitle {...props} />,
                    headerLeft: ()=> null,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Settings')}
                            style={{ marginRight: 15 }}
                        >
                            <Ionicons name="settings-outline" size={24} color="#00cc00" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
        </GestureHandlerRootView>
    );
}