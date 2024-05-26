import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import BodyText from '../../components/BodyText';
import Heading from '../../components/Heading';
import useThemeContext from '../../theme/useThemeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NGROK_SERVER } from '../../services/ConstantFile';

const HistoryScreen = () => {
  const { colors } = useThemeContext();
  const [jobTimings, setJobTimings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchJobTimings = async () => {
    try {
      const userLogin = await AsyncStorage.getItem('userLogin');
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${NGROK_SERVER}/api/JobTimings/getByOperatorID?operatorID=${userLogin}`, {
        headers: {
          Authorization: token,
        },
      });
      setJobTimings(response.data);
    } catch (error) {
      console.error('Error fetching job timings:', error);
    }
  };
  useEffect(() => {
    fetchJobTimings();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchJobTimings().then(() => setRefreshing(false));
}, [fetchJobTimings]);

  const getBackgroundColor = (status) => {
    switch (status) {
      case 'Done':
        return '#d4edda';
      case 'Doing':
        return '#fff3cd';
      default:
        return '#f0f0f0';
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.jobTimingContainer, { backgroundColor: getBackgroundColor(item.Status) }]}>
      <BodyText style={styles.jobTimingText}>Job No: {item.JobNo}</BodyText>
      <BodyText style={styles.jobTimingText}>Product ID: {item.ProductID}</BodyText>
      <BodyText style={styles.jobTimingText}>Operator ID: {item.OperatorID}</BodyText>
      <BodyText style={styles.jobTimingText}>Job Time: {item.JobTime}</BodyText>
      <BodyText style={styles.jobTimingText}>Job Day: {item.JobDay}</BodyText>
      <BodyText style={styles.jobTimingText}>Duration: {item.Duration}</BodyText>
      <BodyText style={styles.jobTimingText}>Status: {item.Status}</BodyText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.backgrounds.default }]}>
      <Heading style={[styles.heading]}>Job Timings History</Heading>
      <FlatList
        data={jobTimings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  flatListContent: {
    flexGrow: 1,
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
  jobTimingText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
});

export default HistoryScreen;
