import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userDetails = await AsyncStorage.getItem("userDetails");
        if (!userDetails) return;

        const { email } = JSON.parse(userDetails);
        const storedReservations = await AsyncStorage.getItem(`bookings_${email}`);

        if (storedReservations) {
          setReservations(JSON.parse(storedReservations));
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "#4CAF50";
      case "Pending":
        return "#FFC107";
      case "Cancelled":
        return "#F44336";
      default:
        return "#000";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Reservations</Text>

      <FlatList
        data={reservations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Animated.View style={[styles.card, { borderLeftColor: getStatusColor(item.status || "Confirmed") }]}>
            <Text style={styles.roomName}>{item.restaurant.name}</Text>
            <Text style={styles.time}>{new Date(item.date).toDateString()} - {item.selectedSlot}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status || "Confirmed") }]}>
              {item.status || "Confirmed"}
            </Text>
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  time: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Reservations;
