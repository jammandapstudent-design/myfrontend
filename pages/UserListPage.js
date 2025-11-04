// ...existing code...
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import styles from '../style';

export default function UserListPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://192.168.30.114:8000/registration/api/users/')
            .then((response) => {
                console.log('users response:', response.data);
                const data = response.data;
                if (Array.isArray(data)) {
                    setUsers(data);
                } else if (data && Array.isArray(data.results)) {
                    setUsers(data.results);
                } else {
                    console.warn('Unexpected users response shape, setting empty list');
                    setUsers([]);
                }
            })
            .catch((error) => {
                console.error('users fetch error:', error.response?.data || error.message);
                setUsers([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this user?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        axios.delete(`http://192.168.30.114:8000/registration/api/users/${id}/`)
                            .then(() => {
                                setUsers(prev => prev.filter(u => u.id !== id));
                                Alert.alert("Success", "User deleted successfully");
                            })
                            .catch((err) => {
                                console.error(err);
                                Alert.alert("Error", "Failed to delete user");
                            });
                    }
                }
            ]
        );
    };

    const handleEdit = (item) => {
        Alert.alert("Edit", `Edit not implemented for ${item.first_name || ''} ${item.last_name || ''}`);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2b17a5" />
                <Text>Loading users...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users List</Text>
            <FlatList
                data={users}
                keyExtractor={(item, index) => (item && item.id ? String(item.id) : String(index))}
                ListEmptyComponent={() => <Text>No users found</Text>}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 12, width: '90%' }}>
                        <Text>{(item.last_name || '') + ' ' + (item.first_name || '')}</Text>
                        <Text>Password: {item.password}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Gender: {item.gender}</Text>
                        <Text>-----------------------------</Text>
                        <Button title="Edit" onPress={() => handleEdit(item)} />
                        <Button title="Delete" color="#d9534f" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}
// ...existing code...