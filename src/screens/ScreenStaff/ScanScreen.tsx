import React,{ useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";
import { CameraView ,useCameraPermissions} from 'expo-camera';
import axios from 'axios';
import { NGROK_SERVER } from '../../services/ConstantUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BodyText from '../../components/BodyText';

export default function ScanScreen() {
    const [hasPermission, setHasPermission] = useState<any>(null);
    const [scanned, setScanned] = useState(true);
    const isFocused = useIsFocused();
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);
  
    const handleBarCodeScanned = async ({ type, data }: any) => {
      if (scanned) {
        setScanned(false);
        if (data) {
          Vibration.vibrate();
          try {
            // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

            const token = await AsyncStorage.getItem('accessToken');
            const headers = {
                Authorization: `${token}`
            };
            data = JSON.parse(data);

            const requestData ={
              ProductID: data.ID,
              JobNo : data.JobNo,
              OperatorID: await AsyncStorage.getItem('userLogin'),
              JobTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              JobDay: new Date().toISOString().slice(0, 10).split('-').reverse().join('/'),
      
            }
            console.log(requestData);
            const response = await axios.post(NGROK_SERVER + '/api/JobTimings/createOne', requestData, { headers });
            if (response.data.errCode === 200) {
              Alert.alert('Creation success');
            } else {
                Alert.alert('Product creation failed');
                return;
            }
        } catch (error) {
            console.error(error);
        }
        }
        setTimeout(() => {
          setScanned(true);
        }, 5000);
      }
    };
  
    const renderCamera = () => {
      return (
        <View style={styles.cameraContainer}>
          <CameraView onBarcodeScanned={handleBarCodeScanned} style={styles.camera} >
      </CameraView>
        </View>
      );
    };
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <BodyText>Camera permission not granted</BodyText>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <BodyText style={[styles.title]}>Scan a barcode to start your job.!</BodyText>
        {isFocused ? renderCamera() : null}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 40,
    },
    cameraContainer: {
      width: "80%",
      aspectRatio: 1,
      overflow: "hidden",
      borderRadius: 10,
      marginBottom: 40,
    },
    camera: {
      flex: 1,
    },
    button: {
      backgroundColor: "blue",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  

