import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import BodyText from '../../../components/BodyText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { NGROK_SERVER } from '../../../services/ConstantUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = ({ route }) => {
  const { item } = route.params;
  const [name, setName] = useState(item.Name);
  const [jobNo, setJobNo] = useState(item.JobNo);
  const [type, setType] = useState(item.Type);
  const [description, setDescription] = useState(item.Description);
  const [area, setArea] = useState(item.Area.toString());
  const [widthDim, setWidthDim] = useState(item.WidthDim.toString());
  const [depthDim, setDepthDim] = useState(item.DepthDim.toString());
  const [lengthDim, setLengthDim] = useState(item.LengthDim.toString());
  const [weight, setWeight] = useState(item.Weight.toString());

  const handleEdit = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const headers = { Authorization: `${token}` };
      const response = await axios.put(`${NGROK_SERVER}/api/products/editOne`, {
        id: item.id,
        Name: name,
        JobNo: jobNo,
        Type: type,
        Description: description,
        Area: parseFloat(area),
        WidthDim: parseFloat(widthDim),
        DepthDim: parseFloat(depthDim),
        LengthDim: parseFloat(lengthDim),
        Weight: parseFloat(weight),
      }, { headers });

      if (response.status === 200) {
        Alert.alert('Success', 'Product edited successfully');
      } else {
        Alert.alert('Error', 'Failed to edit product');
      }
    } catch (error) {
      console.error('Error editing product:', error);
      Alert.alert('Error', 'An error occurred while editing the product');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          {item.QRCode && <QRCode value={JSON.stringify({ ID: item.id, Name: item.Name, JobNo: item.JobNo })} size={200} />}
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <TextInput
              style={styles.title}
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
              <Icon name="save" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <BodyText style={styles.label}>JobNo:</BodyText>
            <TextInput
              style={styles.value}
              value={jobNo}
              onChangeText={setJobNo}
            />
          </View>
          <View style={styles.row}>
            <BodyText style={styles.label}>Type:</BodyText>
            <TextInput
              style={styles.value}
              value={type.toString()}
              onChangeText={setType}
            />
          </View>
          <View style={styles.row}>
            <BodyText style={styles.label}>Description:</BodyText>
            <TextInput
              style={styles.value}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
          <View style={styles.row}>
            <BodyText style={styles.label}>Area:</BodyText>
            <TextInput
              style={styles.value}
              value={area}
              onChangeText={setArea}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.row}>
            <BodyText style={styles.label}>Dimensions:</BodyText>
            <TextInput
              style={styles.dimensionInput}
              value={widthDim}
              onChangeText={setWidthDim}
              keyboardType="numeric"
              placeholder="Width"
            />
            <TextInput
              style={styles.dimensionInput}
              value={depthDim}
              onChangeText={setDepthDim}
              keyboardType="numeric"
              placeholder="Depth"
            />
            <TextInput
              style={styles.dimensionInput}
              value={lengthDim}
              onChangeText={setLengthDim}
              keyboardType="numeric"
              placeholder="Length"
            />
          </View>
          <View style={styles.row}>
            <BodyText style={styles.label}>Weight:</BodyText>
            <TextInput
              style={styles.value}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 2,
  },
  editButton: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 2,
  },
  dimensionInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 2,
    marginHorizontal: 5,
  },
});

export default ProductDetail;
