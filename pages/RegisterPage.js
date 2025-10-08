import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import styles from "../style";

export default function RegisterPage({ navigation }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        password: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };




    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registration Page</Text>

            <TextInput placeholder="First Name" style={styles.TextInput} 
            value={formData.first_name} onChangeText={(value) => handleChange('first_name', value)} />

            <TextInput placeholder="Last Name" style={styles.TextInput} 
            value={formData.last_name} onChangeText={(value) => handleChange('last_name', value)} />

            <TextInput placeholder="Gender" style={styles.TextInput} 
            value={formData.gender} onChangeText={(value) => handleChange('gender', value)} />

            <TextInput placeholder="Email" style={styles.TextInput} 
            value={formData.email} onChangeText={(value) => handleChange('email', value)} />

            <TextInput placeholder="Password" style={styles.TextInput} secureTextEntry={true} 
            value={formData.password} onChangeText={(value) => handleChange('password', value)} />

            <Button title="Review and Submit" onPress={() => navigation.navigate("Review", { formData })} />
        </View>
    );
}