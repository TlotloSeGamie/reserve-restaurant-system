import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConfirmBooking = ({ route, navigation }) => {
  const { restaurant, selectedSlot, date } = route.params;

  const handleConfirmBooking = () => {
    Alert.alert(
      "Booking Confirmation",
      "To secure your reservation, a booking payment is required.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: () => navigation.navigate('Payment', { restaurant, selectedSlot, date }) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <Image source={restaurant.image} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.header}>Confirm Your Booking</Text>

        <View style={styles.infoRow}>
          <Ionicons name="restaurant-outline" size={20} color="#007BFF" />
          <Text style={styles.detailText}>Restaurant: {restaurant.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#007BFF" />
          <Text style={styles.detailText}>Location: {restaurant.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="restaurant-outline" size={20} color="#007BFF" />
          <Text style={styles.detailText}>Cuisine: {restaurant.cuisine}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#007BFF" />
          <Text style={styles.detailText}>Selected Slot: {selectedSlot}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#007BFF" />
          <Text style={styles.detailText}>Date: {date.toDateString()}</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 15,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 50,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 15,
    marginTop: 40,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ConfirmBooking;
