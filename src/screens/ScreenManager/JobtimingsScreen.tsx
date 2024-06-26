import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';
import { NGROK_SERVER } from '../../services/ConstantUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BodyText from '../../components/BodyText';
import Icon from 'react-native-vector-icons/Ionicons';

const JobTimingsComponent = () => {
  const [jobTimings, setJobTimings] = useState([]);
  const [groupedJobTimings, setGroupedJobTimings] = useState([]);
  const [collapsedState, setCollapsedState] = useState({});
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job timings:', error);
        setLoading(false);
      }
    };

    fetchJobTimings();
  }, []);

  const groupJobTimingsByOperator = (data) => {
    const grouped = data.reduce((acc, item) => {
      const { OperatorID } = item;
      if (!acc[OperatorID]) {
        acc[OperatorID] = { operator: OperatorID, data: [] };
      }
      acc[OperatorID].data.push(item);
      return acc;
    }, {});

    const groupedArray = Object.values(grouped);
    setGroupedJobTimings(groupedArray);

    const initialCollapsedState = {};
    groupedArray.forEach((group) => {
      initialCollapsedState[group.operator] = true;
    });
    setCollapsedState(initialCollapsedState);
  };

  const toggleCollapse = (operatorId) => {
    setCollapsedState((prevState) => ({
      ...prevState,
      [operatorId]: !prevState[operatorId],
    }));
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

  const renderSectionHeader = ({ section: { operator } }) => (
    <View key={operator} style={styles.collapsibleContainer}>
      <TouchableOpacity
        style={styles.collapsibleHeader}
        onPress={() => toggleCollapse(operator)}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Operator ID: {operator}</Text>
          <Icon name={collapsedState[operator] ? "chevron-down" : "chevron-up"} size={20} color="#333" />
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsedState[operator]}>
        {groupedJobTimings
          .find((group) => group.operator === operator)
          .data.map((item) => (
            <View key={item.id}>{renderJobTimingItem({ item })}</View>
          ))}
      </Collapsible>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (!jobTimings.length) {
    return <Text style={styles.noDataText}>No job timings available</Text>;
  }

  return (
    <SectionList
      sections={groupedJobTimings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={() => null}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  collapsibleContainer: {
    marginVertical: 10,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collapsibleHeader: {
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#555',
  },
});

export default JobTimingsComponent;