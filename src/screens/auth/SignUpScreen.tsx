import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NGROK_SERVER } from '../../services/ConstantFile';
import icon from '../../../assets/logo.png'

export default function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match");
            return;
        }

        try {
            const response = await axios.post(`${NGROK_SERVER}/auth/register`, {
                username,
                password,
                name,
                role: "Staff"
            });

            if (response.data.success) {
                Alert.alert('Signed up successfully');
                navigation.goBack(); // Navigate back to LoginScreen
            } else {
                Alert.alert('Sign up failed');
            }
        } catch (error) {
            console.error(error);
        }

        navigation.navigate('Login');

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