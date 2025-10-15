import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function UserListPage({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://192.168.30.114:8000/registration/api/users/')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2b17a5" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        View all Users
      </Text>

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {item.last_name} {item.first_name}
            </Text>
            <Text>Email: {item.email}</Text>
            <Text>Gender: {item.gender}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Button title="Edit" color="#49a43e" />
              <Button title="Delete" color="#f14545" />
            </View>
          </View>
        )}
      />
    </View>
  );
}
