import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState(new Date()); 
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
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
        <Text style={styles.name}>{restaurant.name}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#007BFF" />
          <Text style={styles.location}>Location: {restaurant.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="restaurant-outline" size={20} color="#007BFF" />
          <Text style={styles.cuisine}>Cuisine: {restaurant.cuisine}</Text>
        </View>

        <Text style={styles.slotLabel}>Available Slots:</Text>
        <View style={styles.slotContainer}>
          {restaurant.slots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.slotButton,
                selectedSlot === slot && styles.selectedSlotButton,
              ]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text
                style={[
                  styles.slotText,
                  selectedSlot === slot && styles.selectedSlotText,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.slotLabel}>Select Date:</Text>

        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.datePickerText}>
            {date.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
          />
        )}

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => {
            if (!selectedSlot) {
              alert("Please select a time slot before booking!");
              return;
            }
            navigation.navigate("Confirm-Booking", {
              restaurant,
              selectedSlot,
              date,
            });
          }}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 50,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  detailsContainer: {
    marginTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#34495e",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#7f8c8d",
    marginLeft: 10,
  },
  cuisine: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginLeft: 10,
  },
  slotLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 10,
    marginBottom: 5,
  },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  slotButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
  },
  selectedSlotButton: {
    backgroundColor: "#007BFF",
  },
  slotText: {
    fontSize: 10,
    color: "#2c3e50",
  },
  selectedSlotText: {
    color: "#ffffff",
  },
  bookButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 20,
  },
  bookButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  datePickerButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: "#2c3e50",
  },
});

export default BookingScreen;


