import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from "react-native";
import DatePicker from "react-native-date-picker";

const Reservations = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [reservations, setReservations] = useState([
    { id: "1", name: "Deluxe Suite", time: "7:00 PM", status: "Confirmed" },
    { id: "2", name: "Ocean View Room", time: "5:30 PM", status: "Pending" },
    { id: "3", name: "VIP Lounge", time: "9:00 PM", status: "Confirmed" },
  ]);

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

      <TouchableOpacity style={styles.dateButton} onPress={() => setOpen(true)}>
        <Text style={styles.dateText}>Select Date</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => setOpen(false)}
      />

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
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
  dateButton: {
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
