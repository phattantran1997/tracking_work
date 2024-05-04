import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useThemeContext from '../theme/useThemeContext';
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTabNavigator from '../screens/homepage/HomeTabNavigator';
import SettingsScreen from '../screens/Settings';
import logo from '../../assets/logo.png';

import { Image } from 'react-native';
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
        </Stack.Navigator>
    );
}