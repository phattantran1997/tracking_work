import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Alert
} from "react-native";
import { Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BluetoothManager } from "tp-react-native-bluetooth-printer";

export default function InputScreen() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [qrCode, setQRCode] = useState("");
    const [jobNo, setJobNo] = useState("");
    const types = [
        "Electronics",
        "Clothing",
        "Books",
        "Beauty",
        "Home",
        "Sports",
    ];

    const handleInputChange = () => {
        if (!name || !type || !description || !length || !width || !height || !weight) {
            Alert.alert("Error", "Please fill in all the input fields.");
            return;
          }
      
          const data = `Name: ${name}, Type: ${type}, Description: ${description}, Length: ${length}, Width: ${width}, Height: ${height}, Weight: ${weight}`;
          setQRCode(data);
    };

    const handlePrint = async () => {
       
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePrint}>
                    <Icon name="print" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 50,
                }}
            >
                {qrCode ? <QRCode value={qrCode} size={200} /> : <Text>Please provide data.</Text>}
            </View>
            <View style={{ flex: 1, justifyContent: "center"}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                    placeholderTextColor={"black"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setType}
                    value={type}
                    placeholder="Type"
                    placeholderTextColor={"black"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setJobNo}
                    value={jobNo}
                    placeholder="Job Number"
                    placeholderTextColor={"black"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description"
                    placeholderTextColor={"black"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setLength}
                    value={length}
                    placeholder="Length"
                    placeholderTextColor={"black"}
                    keyboardType="decimal-pad"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setWidth}
                    value={width}
                    placeholder="Width"
                    placeholderTextColor={"black"}
                    keyboardType="decimal-pad"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Height"
                    placeholderTextColor={"black"}
                    keyboardType="decimal-pad"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Weight"
                    placeholderTextColor={"black"}
                    keyboardType="decimal-pad"
                />
            </View>
            <TouchableOpacity style={styles.generateButton} onPress={handleInputChange}>
                <Text style={styles.generateButtonText}>Generate QR Code</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 50,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    input: {
        height: 60,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "white",
    },
    generateButton: {
        backgroundColor: "blue",
        padding: 16,
        marginHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    generateButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    pickerStyles: {
        width: '100%',
        backgroundColor: 'gray',
        color: 'white'
    }
});