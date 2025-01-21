import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [users, setUsers] = useState([
    { email: "user1@example.com", password: "password123", name: "User One" },
    // Add more sample users if needed
  ]);

  const handleSubmit = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      Alert.alert("Error", "Invalid email or password");
      return;
    }

    Alert.alert("Success", `Welcome back, ${user.name}!`, [
      { text: "OK", onPress: () => navigation.navigate("Items") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.formGroup}>
        <Text style={styles.smallText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
            <Text style={styles.registerLink}>Sign Up here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2f4f4f",
    textAlign: "center",
    backgroundColor: "#d3d3d3",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  formGroup: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2f4f4f",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    color: "#2f4f4f",
  },
  loginButton: {
    backgroundColor: "#4682b4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  smallText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
  registerLink: {
    color: "#4682b4",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
