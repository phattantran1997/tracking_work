import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated, FlatList, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import useThemeContext from '../../theme/useThemeContext';
import BodyText from '../../components/BodyText';
import Heading from '../../components/Heading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import licenses from '/Users/lv/Documents/QUT/IFN666/Assignment3/TrackingWork/licenses.json'

const AboutScreen = () => {
    const isFocused = useIsFocused();
    const { colors } = useThemeContext();
    const [userLogin, setUserLogin] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      const getUserLogin = async () => {
        try {
          const login = await AsyncStorage.getItem('userLogin');
          setUserLogin(login);
        } catch (error) {
          console.error('Error retrieving user login:', error);
        }
      };
  
      getUserLogin();
    }, []);
  
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);
  
    const renderLicenseItem = ({ item }) => (
      <View style={styles.licenseContainer}>
        <Text style={styles.licenseText}>
          <Text style={styles.licenseName}>{item.name}:</Text> {item.licenses}
        </Text>
      </View>
    );
  
    const licenseData = Object.keys(licenses).map(key => ({
      name: key,
      licenses: licenses[key].licenses
    }));
  
    return (
      <Animated.View style={[styles.container, { backgroundColor: colors.backgrounds.default, opacity: fadeAnim }]}>
        <Heading style={styles.heading}>Welcome {userLogin} to the app!</Heading>
        <BodyText style={styles.text}>
          {isFocused ? 'HomeTab is focused' : 'HomeTab is not focused'}
        </BodyText>
        <BodyText style={styles.descriptionText}>
          This app helps workers scan their productivity to check their working time.
        </BodyText>
        <Heading style={styles.heading}>Open Source Licenses</Heading>
        <FlatList
          data={licenseData}
          renderItem={renderLicenseItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </Animated.View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 16,
      textAlign: 'center',
    },
    text: {
      fontSize: 18,
      color: '#555',
      textAlign: 'center',
      marginBottom: 16,
    },
    descriptionText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 24,
    },
    flatListContent: {
      paddingBottom: 16,
    },
    licenseContainer: {
      backgroundColor: '#f0f0f0',
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      elevation: 3, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: { width: 0, height: 2 }, // For iOS shadow
      shadowOpacity: 0.2, // For iOS shadow
      shadowRadius: 4, // For iOS shadow
    },
    licenseText: {
      fontSize: 14,
      color: '#555',
    },
    licenseName: {
      fontWeight: 'bold',
    },
  });
  
  export default AboutScreen;
