import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Heading from '../../components/Heading';
import axios from 'axios';
import { NGROK_SERVER } from '../../services/ConstantUtil';
import useThemeContext from '../../theme/useThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const ManualInputScreen = () => {
    const [productID, setProductID] = useState('');
    const [jobNo, setJobNo] = useState('');
    const [operatorID, setOperatorID] = useState('');
    const [jobTime, setJobTime] = useState(new Date());
    const [jobDay, setJobDay] = useState(new Date());
    const [showJobTimePicker, setShowJobTimePicker] = useState(false);
    const [showJobDayPicker, setShowJobDayPicker] = useState(false);
    const { colors } = useThemeContext();

    useEffect(() => {
        const fetchOperatorID = async () => {
            const storedOperatorID = await AsyncStorage.getItem('userLogin');
            setOperatorID(storedOperatorID || '');
        };

        fetchOperatorID();
    }, []);

    const onJobTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || jobTime;
        setShowJobTimePicker(Platform.OS === 'ios');
        setJobTime(currentDate);
    };

    const onJobDayChange = (event, selectedDate) => {
        const currentDate = selectedDate || jobDay;
        setShowJobDayPicker(Platform.OS === 'ios');
        setJobDay(currentDate);
    };

    const handleSubmit = async () => {
        try {
            const requestData ={
                ProductID: productID,
                JobNo : jobNo,
                OperatorID: operatorID,
                JobTime: jobTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                JobDay: jobDay.toLocaleDateString('en-GB'), // Using 'en-GB' for dd/MM/yyyy format
        
              }
              console.log(requestData);            
              const token = await AsyncStorage.getItem('accessToken');
            const headers = {
                Authorization: `${token}`
            };

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
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.backgrounds.default }]}>
            <Heading style={[styles.heading]}>Manual Input</Heading>
            <ScrollView  automaticallyAdjustKeyboardInsets={true}>

                <View style={{ flex: 1, justifyContent: "center" }}>

                    <TextInput
                        style={styles.input}
                        value={productID}
                        onChangeText={setProductID}
                        placeholder="Product ID"
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        value={jobNo}
                        onChangeText={setJobNo}
                        placeholder="Job No"
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        value={operatorID}
                        editable={false}
                        placeholder="Operator ID"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.input} onPress={() => setShowJobTimePicker(true)}>
                        <Text style={styles.pickerText}>{jobTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showJobTimePicker && (
                        <DateTimePicker
                            value={jobTime}
                            mode="time"
                            display="default"
                            onChange={onJobTimeChange}
                        />
                    )}
                    <TouchableOpacity style={styles.input} onPress={() => setShowJobDayPicker(true)}>
                        <Text style={styles.pickerText}>{jobDay.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showJobDayPicker && (
                        <DateTimePicker
                            value={jobDay}
                            mode="date"
                            display="default"
                            onChange={onJobDayChange}
                        />
                    )}
                    <TouchableOpacity style={styles.generateButton} onPress={handleSubmit}>
                        <Text style={styles.generateButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        backgroundColor: '#fff',
      },
    input: {
        height: 60,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "white",
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    pickerText: {
        color: '#888',
        paddingVertical: 15,
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
    heading: {
        marginBottom:16,
    }
});

export default ManualInputScreen;

