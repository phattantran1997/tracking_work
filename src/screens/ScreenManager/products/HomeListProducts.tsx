import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, Pressable, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NGROK_SERVER } from '../../../services/ConstantUtil';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from '../../../components/Heading';

const HomeListProducts = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${NGROK_SERVER}/api/products/getAll`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        setData(response.data);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, [fetchData]);

    const handleDelete = async (itemId) => {

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const headers = {
                Authorization: `${token}`
            };

            let response = await axios.delete(`${NGROK_SERVER}/api/products/deleteOne/`, { headers, data: { id: itemId },});
            if (response.data.errCode === 200) {
                Alert.alert('Product deleted successfully');
            } else {
                Alert.alert('Product deleted failed');
                return;
            }
            // Update the data state after successful deletion
            const updatedData = data.filter((item) => item.id !== itemId);
            setData(updatedData);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    const renderItem = ({ item }) => (
        <Swipeable
            renderRightActions={() => (
                <View className="flex-row">
                    <Pressable
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item.id)}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </Pressable>
                </View>

            )}
            friction={1}
            overshootFriction={10}

        >
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('ProductDetail', { item })}
            >
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.Name}</Text>
                    <View style={styles.jobNoteContainer}>
                        <Text style={styles.itemText}>Jobno: {item.JobNo} - </Text>
                        <Text style={styles.itemText}>Note: {item.Notes}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
    return (
      
        <SafeAreaView style={styles.container}>
            <Heading style={[styles.heading]}>List all Products</Heading>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        marginTop: 16,
    },
    flatListContainer: {
        paddingVertical: 16,
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    itemDetails: {
        flexDirection: 'column', // Change to column to stack elements vertically
        alignItems: 'flex-start'
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 16,
        color: '#D7A89E',
    },
    itemText: {
        fontSize: 16,
        marginRight: 8,
        color: '#000000',
    },
    jobNoteContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: '100%',
        paddingHorizontal: 16,
        marginRight:10
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeListProducts;