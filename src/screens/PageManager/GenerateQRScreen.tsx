import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    FlatList,
    Share
} from "react-native";
import { Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BluetoothManager } from "tp-react-native-bluetooth-printer";
import { NGROK_SERVER } from "../../services/ConstantFile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BodyText from "../../components/BodyText";

export default function InputScreen() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [note, setNote] = useState("");
    const [qrCode, setQRCode] = useState("");
    const [jobNo, setJobNo] = useState("");
    const [filteredJobNos, setFilteredJobNos] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const getDataJobno = async (text) => {
        if (text.length === 0) {
            setFilteredJobNos([]);
            setShowDropdown(false);
            return;
        }
        const response = await axios.get(`${NGROK_SERVER}/api/products/getDataJobNo`, {
            headers: {
                Authorization: await AsyncStorage.getItem('accessToken'),
            }
        });
        const jobNoValues = response.data.map((item) => item.jobno);
        const filtered = jobNoValues.filter((listItem) => listItem.toLowerCase().includes(text.toLowerCase()));
        setFilteredJobNos(filtered);
        setShowDropdown(true);
    }




    const handleInputChange = async () => {
        if (!name || !type || !description) {
            Alert.alert("Error", "Please fill in all the input fields.");
            return;
        }
        if (jobNo === '') {
            setJobNo("JobNo" + Math.floor(Math.random() * 100) + 1);
        }
        const data = {
            Name: name,
            JobNo: jobNo,
            Notes: note,
            Type: type,
            WidthDim: parseFloat(width),
            DepthDim: parseFloat(height),
            LengthDim: parseFloat(length),
            Description: description,
            Area: parseFloat(width) * parseFloat(height) * parseFloat(length),
            Weight: parseFloat(weight),
            QRCode: `Name: ${name}, JobNo: ${jobNo}`
        };
        console.log(data);
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const headers = {
                Authorization: `${token}`
            };

            const response = await axios.post(NGROK_SERVER + '/api/products/createOne', data, { headers });
            if (response.data.errCode === 200) {
                let value= response.data.data;
                setQRCode(JSON.stringify({ID:value.id, Name : value.Name , JobNo: value.JobNo}));
                Alert.alert('Product created successfully');
            } else {
                Alert.alert('Product creation failed');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handlePrint = async () => {
        try {
            const result = await Share.share({
                message: qrCode
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };
    const handleJobNoChange = async (text) => {
        setJobNo(text);
        await getDataJobno(text);
    };
    const handleItemPress = (item) => {
        setJobNo(item);
        setFilteredJobNos([]);
        setShowDropdown(false);
    };
    return (
        <ScrollView style={styles.container} automaticallyAdjustKeyboardInsets={true}>
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
                {qrCode ? <QRCode value={qrCode} size={200} /> : <BodyText>Please provide data.</BodyText>}
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
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
                    keyboardType="decimal-pad"
                />
                <View style={styles.dropdownContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleJobNoChange}
                        value={jobNo}
                        placeholder="Job Number"
                        placeholderTextColor={"black"}
                    />

                    {showDropdown && filteredJobNos.length > 0 && (
                        <FlatList
                            data={filteredJobNos}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                                    <BodyText>{item}</BodyText>
                                </TouchableOpacity>
                            )}
                            style={styles.dropdown}
                        />
                    )}
                </View>
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
                    keyboardType='decimal-pad'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setWidth}
                    value={width}
                    placeholder="Width"
                    placeholderTextColor={"black"}
                    keyboardType='decimal-pad'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Height"
                    placeholderTextColor={"black"}
                    keyboardType='decimal-pad'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Weight"
                    placeholderTextColor={"black"}
                    keyboardType='decimal-pad'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setNote}
                    value={note}
                    placeholder="Notes"
                    placeholderTextColor={"black"}
                />
            </View>
            <TouchableOpacity style={styles.generateButton} onPress={handleInputChange}>
                <BodyText style={styles.generateButtonText}>Generate QR Code</BodyText>
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
    dropdownContainer: {
        position: 'relative',
        zIndex: 10,
    },
    dropdown: {
        position: 'absolute',
        top: 60, // Adjust based on input height
        width: '100%',
        backgroundColor: '#fff',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        maxHeight: 150,
        zIndex: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    pickerStyles: {
        width: '100%',
        backgroundColor: 'gray',
        color: 'white'
    }
});