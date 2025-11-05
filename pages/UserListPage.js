import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function UserListPage({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://192.168.30.114:8000/registration/api/users/";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const unsubscribe = navigation.addListener("focus", fetchUsers);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.text}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    const message = error?.response?.status
      ? `Server error: ${error.response.status}`
      : "Failed to load users.";
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{message}</Text>
        <Button title="Retry" onPress={fetchUsers} />
      </View>
    );
  }

  const handleDelete = (id) => {
    console.log("Delete pressed for ID:", id);
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Sending DELETE request...");
              const res = await axios.delete(`${API_URL}${id}/`);
              console.log("Delete response:", res.status);
              Alert.alert("Success", "User deleted successfully");
              fetchUsers(); // refresh
            } catch (err) {
              console.error("Delete error:", err.message);
              Alert.alert("Error", "Failed to delete user.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (user) => {
    navigation.navigate("EditUserPage", { user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>
              {item.last_name} {item.first_name}
            </Text>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Gender: {item.gender}</Text>

            <View style={styles.buttonRow}>
              <View style={styles.button}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
              </View>
              <View style={styles.button}>
                <Button
                  title="Delete"
                  color="#d9534f"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  userCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});
