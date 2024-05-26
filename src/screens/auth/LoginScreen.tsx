import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useThemeContext from '../../theme/useThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NGROK_SERVER } from '../../services/ConstantFile';
import icon from '../../../assets/logo.png'
export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { colors } = useThemeContext();

  useEffect(() => {
    const validateToken = async () => {
      const user = await checkAccessToken();
      if (user.role ==='staff') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }else if(user.role ==='manager'){
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeManager' }],
        });
      }else{
        
      }
    };
    validateToken();
  }, [navigation]);

  const checkAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) return false;

      const response = await axios.get(`${NGROK_SERVER}/auth/check-token`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error checking access token', error);
      return false;
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${NGROK_SERVER}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.errCode === 200) {
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        await AsyncStorage.setItem('userLogin', username);
        const targetRoute = data.data.role === 'staff' ? 'Home' : 'HomeManager';
        navigation.reset({
          index: 0,
          routes: [{ name: targetRoute }],
        });
      } else {
        Alert.alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        placeholderTextColor={colors.text}
        autoCapitalize="none" 
      />
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor={colors.text}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 50,
    borderRadius: 100,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#329bfc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
  },
});
