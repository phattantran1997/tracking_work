import React,{ useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text, Vibration, View } from "react-native";

export default function ScanScreen() {
    const [hasPermission, setHasPermission] = useState<any>(null);
    const [scanned, setScanned] = useState(true);
    const isFocused = useIsFocused();
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }: any) => {
      if (scanned) {
        setScanned(false);
        if (data) {
          Vibration.vibrate();
          alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        }
        setTimeout(() => {
          setScanned(true);
        }, 2000);
      }
    };
  
    const renderCamera = () => {
      return (
        <View style={styles.cameraContainer}>
          <Camera onBarCodeScanned={handleBarCodeScanned} style={styles.camera} />
        </View>
      );
    };
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text>Camera permission not granted</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Scan a barcode to start your job.!</Text>
        {/* <Text style={styles.paragraph}>Scan a barcode to start your job.</Text> */}
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
      fontSize: 24,
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
  

