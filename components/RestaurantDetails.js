import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarComponent from './CalenderCmponent';
import SlotItem from './SlotItem';
// import ChooseTableComponent from './ChooseTable'; // Import the new component

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleReservation = () => {
    if (selectedDate && selectedSlot) {
      alert(`Reservation confirmed at ${restaurant.name} on ${selectedDate} at ${selectedSlot}`);
      navigation.goBack();
    } else {
      alert('Please select a date and time slot.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text>{restaurant.location} - {restaurant.cuisine}</Text>

      <Text style={styles.sectionTitle}>Select a Date:</Text>
      <CalendarComponent selectedDate={selectedDate} onDayPress={(day) => setSelectedDate(day.dateString)} />

      <Text style={styles.sectionTitle}>Available Slots:</Text>
      <FlatList
        data={restaurant.slots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SlotItem
            slot={item}
            isSelected={selectedSlot === item}
            onPress={() => setSelectedSlot(item)}
          />
        )}
        horizontal
      />

      <Text style={styles.sectionTitle}>Choose a Table:</Text>  {/* Adding section title for tables */}
      {/* <ChooseTableComponent 
        freeTables={restaurant.tables} // Assuming `tables` is a list of available tables
        reservation={selectedSlot}
        onChosen={() => {}}
      /> */}

      <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
        <Text style={styles.reserveButtonText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  reserveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  reserveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RestaurantDetails;
