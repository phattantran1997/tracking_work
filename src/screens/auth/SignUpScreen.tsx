import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NGROK_SERVER } from '../../services/ConstantUtil';
import icon from '../../../assets/logo.png'

export default function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords don't match");
            return;
        }
        if (!username || !name || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        try {
            const response = await axios.post(`${NGROK_SERVER}/auth/register`, {
                username,
                password,
                name,
                role: "staff"
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Signed up successfully');
                navigation.navigate('Login');
            } else {
                throw new Error('Unexpected error occurred');
            }
        } catch (error) {
            Alert.alert('Sign Up Error', error.response?.data?.message || error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.icon} />
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Full Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back to Login</Text>
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
    icon: {
        width: 200,
        height: 200,
        marginBottom: 50,
        borderRadius: 100,
      },
});