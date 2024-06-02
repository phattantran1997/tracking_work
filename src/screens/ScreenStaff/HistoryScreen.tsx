import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TextInput, Text, Alert } from 'react-native';
import BodyText from '../../components/BodyText';
import Heading from '../../components/Heading';
import useThemeContext from '../../theme/useThemeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NGROK_SERVER } from '../../services/ConstantUtil';

const HistoryScreen = () => {
  const { colors } = useThemeContext();
  const [jobTimings, setJobTimings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchJobTimings = async () => {
    try {
      const userLogin = await AsyncStorage.getItem('userLogin');
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${NGROK_SERVER}/api/JobTimings/getByOperatorID?operatorID=${userLogin}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response);
      setJobTimings(response.data);
    } catch (error) {
      if (error.response) {
        // Handle HTTP errors
        console.error('Error fetching job timings:', error.response.status, error.response.data);
        if (error.response.status === 404) {
          Alert.alert("Error", "No job timings found for the specified operator.");
        } else {
          Alert.alert("Error", `An error occurred: ${error.response.status}`);
        }
        setJobTimings([]); // Clear job timings as the data is not available
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error fetching job timings: No response received:', error.request);
        Alert.alert("Error", "No response from server. Check your network connection.");
        setJobTimings([]);
      } else {
        console.error('Error:', error.message);
        Alert.alert("Error", "Error setting up your request.");
        setJobTimings([]);
      }
    }
  };

  useEffect(() => {
    fetchJobTimings();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchJobTimings();
    setRefreshing(false);
  }, [fetchJobTimings]);

  const getBackgroundColor = (status) => {
    switch (status) {
      case 'Done':
        return '#d4edda';
      case 'Doing':
        return '#fff3cd';
      default:c
        return '#f0f0f0';
    }
  }

  const filteredTimings = jobTimings.filter(item =>
    item.JobNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ProductID.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.OperatorID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.backgrounds.default }]}>
      <Heading style={styles.heading}>Job Timings History</Heading>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Job No, Product ID, or Operator ID, Status"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTimings}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.noDataText}>No job timings available</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.jobTimingContainer, { backgroundColor: getBackgroundColor(item.Status) }]}>
            <BodyText style={styles.jobTimingText}>Job No: {item.JobNo}</BodyText>
            <BodyText style={styles.jobTimingText}>Product ID: {item.ProductID}</BodyText>
            <BodyText style={styles.jobTimingText}>Operator ID: {item.OperatorID}</BodyText>
            <BodyText style={styles.jobTimingText}>Job Time: {item.JobTime}</BodyText>
            <BodyText style={styles.jobTimingText}>Job Day: {item.JobDay}</BodyText>
            <BodyText style={styles.jobTimingText}>Duration: {item.Duration}</BodyText>
            <BodyText style={styles.jobTimingText}>Status: {item.Status}</BodyText>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    borderRadius: 8,
  },
  flatListContent: {
    flexGrow: 1, // Ensures the FlatList content container expands
    paddingBottom: 16,
  },
  jobTimingContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  noDataText: {
    fontSize: 18,
    color: '#555',
  },
  jobTimingText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
});

export default HistoryScreen;
