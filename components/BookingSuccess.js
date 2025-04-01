import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingSuccess = ({ route, navigation }) => {
  const params = route.params || {};
  const restaurant = params.restaurant || { name: "N/A", location: "N/A", cuisine: "N/A", image: null };
  const selectedSlot = params.selectedSlot || "N/A";
  const date = params.date ? new Date(params.date) : new Date();

  useEffect(() => {
    const saveBooking = async () => {
      try {
        const userDetails = await AsyncStorage.getItem("userDetails");
        if (!userDetails) return;

        const { email } = JSON.parse(userDetails);
        const existingBookings = await AsyncStorage.getItem(`bookings_${email}`);
        const bookings = existingBookings ? JSON.parse(existingBookings) : [];

        const newBooking = {
          restaurant,
          selectedSlot,
          date: date.toISOString(),
        };

        bookings.push(newBooking);
        await AsyncStorage.setItem(`bookings_${email}`, JSON.stringify(bookings));
      } catch (error) {
        console.error("Error saving booking:", error);
      }
    };

    saveBooking();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#28a745" />
      </View>

      <Text style={styles.successText}>Booking Confirmed!</Text>

      <View style={styles.card}>
        {restaurant.image && <Image source={restaurant.image} style={styles.image} />}
        <View style={styles.details}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#007BFF" />
            <Text style={styles.infoText}>Location: {restaurant.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="restaurant-outline" size={18} color="#007BFF" />
            <Text style={styles.infoText}>Cuisine: {restaurant.cuisine}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color="#007BFF" />
            <Text style={styles.infoText}>Date: {date.toDateString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color="#007BFF" />
            <Text style={styles.infoText}>Time Slot: {selectedSlot}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.messageText}>
        Your table has been successfully reserved. Enjoy your meal!
      </Text>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  iconContainer: {
    backgroundColor: "#e9f7ef",
    padding: 20,
    borderRadius: 50,
    marginBottom: 15,
  },
  successText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  image: { width: "100%", height: 140, borderRadius: 10, marginBottom: 10 },
  details: { alignItems: "center" },
  restaurantName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  infoText: { fontSize: 16, color: "#7f8c8d", marginLeft: 8 },
  messageText: {
    fontSize: 16,
    color: "#34495e",
    marginTop: 20,
    textAlign: "center",
    lineHeight: 24,
  },
  homeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  homeButtonText: { fontSize: 18, color: "#ffffff", fontWeight: "600" },
});

export default BookingSuccess;
