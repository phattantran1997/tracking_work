import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, RefreshControl } from 'react-native';
import axios from 'axios';
import { NGROK_SERVER } from '../../services/ConstantUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchProducts();  // Call the same function used to fetch products initially
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
    setRefreshing(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${NGROK_SERVER}/api/products/getAll`, {
        headers: {
          Authorization: `${accessToken}`,
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  
  const handleSearch = (text) => {
    setSearchText(text);
  };
  const filterProducts = () => {
    if (searchText.trim() === '') {
      return products;
    }

    return products.filter((product) =>
      product.Name.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productText}>Name: {item.Name}</Text>
      <Text style={styles.productText}>Job No: {item.JobNo}</Text>
      <Text style={styles.productText}>Description: {item.Description}</Text>
      <Text style={styles.productText}>Type: {item.Type}</Text>
      <Text style={styles.productText}>Area: {item.Area}</Text>
      <Text style={styles.productText}>Dimensions: {item.WidthDim} x {item.DepthDim} x {item.LengthDim}</Text>
      <Text style={styles.productText}>Weight: {item.Weight}</Text>
      <Text style={styles.productText}>Notes: {item.Notes}</Text>
      <QRCode value={item.QRCode} size={200} />
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filterProducts()}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  productContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
