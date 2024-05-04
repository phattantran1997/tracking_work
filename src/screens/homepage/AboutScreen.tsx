import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import useThemeContext from '../../theme/useThemeContext';
import BodyText from '../../components/BodyText';
import Heading from '../../components/Heading';
import theme from '../../theme/theme';

const AboutScreen = () => {
    const isFocused = useIsFocused();
    const { colors } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: colors.backgrounds.default }]}>
            <Heading style={styles.heading}>Welcome to the app!</Heading>
            <BodyText style={styles.text}>
                {isFocused ? 'HomeTab is focused' : 'HomeTab is not focused'}
            </BodyText>
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
    heading: {
        marginBottom: theme.gaps.g12,
    },
});

export default AboutScreen;