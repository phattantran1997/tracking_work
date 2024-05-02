import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const AboutScreen = () => {
    const isFocused = useIsFocused();

    return (
        <View style={styles.container}>
            <Text>{isFocused ? 'HomeTab is focused' : 'HomeTab is not focused'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default AboutScreen;