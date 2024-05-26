import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';
import { NGROK_SERVER } from '../../services/ConstantFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const JobTimingsComponent = () => {
  const [jobTimings, setJobTimings] = useState([]);
  const [groupedJobTimings, setGroupedJobTimings] = useState({});

  useEffect(() => {
    const fetchJobTimings = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(`${NGROK_SERVER}/api/JobTimings/getAll`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        setJobTimings(response.data);
        groupJobTimingsByOperator(response.data);
      } catch (error) {
        console.error('Error fetching job timings:', error);
      }
    };

    fetchJobTimings();
  }, []);

  const groupJobTimingsByOperator = (data) => {
    const grouped = data.reduce((acc, item) => {
      const { OperatorID } = item;
      if (!acc[OperatorID]) {
        acc[OperatorID] = [];
      }
      acc[OperatorID].push(item);
      return acc;
    }, {});
    setGroupedJobTimings(grouped);
  };
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
  const renderJobTimingItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: getBackgroundColor(item.Status) }]}>
      <Text>{`JobNo: ${item.JobNo}`}</Text>
      <Text>{`Job Time: ${item.JobTime}`}</Text>
      <Text>{`Job Day: ${item.JobDay}`}</Text>
      <Text>{`Duration: ${item.Duration}`}</Text>
      <Text>{`Status: ${item.Status}`}</Text>
    </View>
  );

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <View style={styles.container}>
        {Object.keys(groupedJobTimings).map((operatorId) => (
          <Collapsible key={operatorId} collapsed={false} style={styles.collapsibleContainer}>
            <View style={styles.collapsibleHeader}>
              <Text style={styles.headerText}>Operator ID: {operatorId}</Text>
            </View>
            <ScrollView horizontal={false}>
              <FlatList
                data={groupedJobTimings[operatorId]}
                renderItem={renderJobTimingItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </ScrollView>
          </Collapsible>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%'
  },
  collapsibleContainer: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  collapsibleHeader: {
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default JobTimingsComponent;