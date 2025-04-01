import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, Image } from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";


const cuisines = [
  { id: 1, name: "Italian", icon: "pizza-slice", lib: FontAwesome5 },
  { id: 2, name: "Chinese", icon: "rice-bowl", lib: MaterialIcons },
  { id: 3, name: "Mexican", icon: "taco", lib: FontAwesome5 },
  { id: 4, name: "Indian", icon: "restaurant", lib: Ionicons },
  { id: 5, name: "Japanese", icon: "sushi", lib: MaterialIcons },
  { id: 6, name: "French", icon: "wine-glass-alt", lib: FontAwesome5 },
  { id: 7, name: "Mediterranean", icon: "utensils", lib: FontAwesome5 },
  { id: 8, name: "Thai", icon: "noodles", lib: MaterialIcons },
  { id: 9, name: "American", icon: "hamburger", lib: FontAwesome5 },
  { id: 10, name: "Korean", icon: "grill", lib: MaterialIcons },
  { id: 11, name: "Vietnamese", icon: "bowl-rice", lib: MaterialIcons },
  { id: 12, name: "Spanish", icon: "paella", lib: MaterialIcons },
];

const mockRestaurants = [
  { id: '1', name: 'Kimberley Steakhouse', location: 'Kimberley Mall', cuisine: 'Steakhouse', slots: ['12:00 PM', '1:00 PM', '2:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '2', name: 'The Big Hole Bistro', location: 'Big Hole Museum Area', cuisine: 'South African', slots: ['6:00 PM', '7:00 PM', '8:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '3', name: 'Savanna Delight', location: 'North Cape Mall', cuisine: 'Fusion', slots: ['11:30 AM', '1:30 PM', '3:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '4', name: 'Kimberley Curry House', location: 'Hadison Park', cuisine: 'Indian', slots: ['12:00 PM', '1:00 PM', '2:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '5', name: 'The Terrace Café', location: 'Flamingo Casino', cuisine: 'Continental', slots: ['6:00 PM', '7:30 PM', '9:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '6', name: 'Riverside Grill', location: 'Riverton Road', cuisine: 'Barbecue', slots: ['5:00 PM', '6:30 PM', '8:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '7', name: 'The Velvet Lounge', location: 'Civic Centre', cuisine: 'French', slots: ['1:00 PM', '3:00 PM', '7:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '8', name: 'Boer & Brit', location: 'Old Town Kimberley', cuisine: 'Traditional South African', slots: ['12:00 PM', '2:00 PM', '4:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '9', name: 'Ocean Breeze', location: 'Kimberley Waterfront', cuisine: 'Seafood', slots: ['12:30 PM', '1:30 PM', '7:30 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '10', name: 'Diamond City Pizza', location: 'Diamond Pavilion Mall', cuisine: 'Italian', slots: ['11:00 AM', '1:00 PM', '3:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '11', name: 'Sunset Diner', location: 'West End', cuisine: 'American', slots: ['5:00 PM', '6:00 PM', '7:30 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '12', name: 'Spicy Karoo', location: 'Beaconsfield', cuisine: 'Mexican', slots: ['12:00 PM', '2:30 PM', '5:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '13', name: 'Taste of Asia', location: 'New Park Shopping Centre', cuisine: 'Chinese', slots: ['11:00 AM', '1:30 PM', '6:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '14', name: 'Karoo Flavors', location: 'Greenpoint', cuisine: 'South African', slots: ['12:00 PM', '3:00 PM', '7:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '15', name: 'The Sushi Spot', location: 'Kimberley Mall', cuisine: 'Japanese', slots: ['1:00 PM', '4:00 PM', '6:30 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '16', name: 'Café Kimberley', location: 'Du Toitspan Road', cuisine: 'Café', slots: ['8:00 AM', '10:00 AM', '2:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '17', name: 'The Braai Hub', location: 'Riverton', cuisine: 'Barbecue', slots: ['12:00 PM', '2:00 PM', '6:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '18', name: 'Heritage Diner', location: 'Heritage Square', cuisine: 'South African', slots: ['12:00 PM', '3:30 PM', '7:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '19', name: 'Bella’s Gelato & Pizza', location: 'Diamond Pavilion Mall', cuisine: 'Italian', slots: ['11:00 AM', '2:00 PM', '6:30 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '20', name: 'Pho & Beyond', location: 'Beaconsfield', cuisine: 'Vietnamese', slots: ['12:00 PM', '3:00 PM', '6:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '21', name: 'Desert Spice', location: 'Hadison Park', cuisine: 'Moroccan', slots: ['1:00 PM', '4:00 PM', '7:30 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '22', name: 'Kimberley Tacos', location: 'Monument Heights', cuisine: 'Mexican', slots: ['12:00 PM', '3:00 PM', '8:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '23', name: 'Big Hole Brewpub', location: 'Big Hole Museum Area', cuisine: 'Pub Food', slots: ['1:00 PM', '4:00 PM', '9:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '24', name: 'Urban Plates', location: 'Flamingo Casino', cuisine: 'Healthy', slots: ['11:30 AM', '2:00 PM', '6:30 PM'], image: require('../assets/images/restaurant-in.jpeg') },
  { id: '25', name: 'Golden Olive', location: 'North Cape Mall', cuisine: 'Mediterranean', slots: ['12:00 PM', '3:00 PM', '8:00 PM'], image: require('../assets/images/restaurant-in.jpeg') },
];

const Cuisine = ({ navigation }) => {
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCuisineSelect = (cuisineName) => {
    const filteredRestaurants = mockRestaurants.filter(
      (restaurant) => restaurant.cuisine.toLowerCase() === cuisineName.toLowerCase()
    );
    setSelectedCuisine({ name: cuisineName, restaurants: filteredRestaurants });
    setModalVisible(true);
  };

  const handleRestaurantSelect = (restaurant) => {
    setModalVisible(false);
    navigation.navigate('Booking', { restaurant });
  };

  const renderCuisine = ({ item }) => {
    const IconComponent = item.lib;

    return (
      <TouchableOpacity style={styles.cuisineItem} onPress={() => handleCuisineSelect(item.name)}>
        <IconComponent name={item.icon} size={30} color="#4A90E2" />
        <Text style={styles.cuisineText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Cuisines</Text>
      <FlatList
        data={cuisines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCuisine}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
      {selectedCuisine && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCuisine.name} Restaurants</Text>
              {selectedCuisine.restaurants.length > 0 ? (
                selectedCuisine.restaurants.map((restaurant) => (
                  <TouchableOpacity
                    key={restaurant.id}
                    style={styles.restaurantItem}
                    onPress={() => handleRestaurantSelect(restaurant)}
                  >
                    {restaurant.image && (
                      <Image
                        source={restaurant.image}
                        style={styles.restaurantImage}
                        resizeMode="cover"
                      />
                    )}
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
                    <Text style={styles.restaurantCuisine}>Cuisine: {restaurant.cuisine}</Text>
                    <Text style={styles.restaurantSlots}>
                      Slots: {restaurant.slots.join(", ")}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noResults}>No restaurants found for this cuisine.</Text>
              )}
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F8F9FA",
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 20,
      textAlign: "center",
    },
    list: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    cuisineItem: {
      alignItems: "center",
      margin: 15,
      backgroundColor: "#FFFFFF",
      padding: 10,
      borderRadius: 10,
      width: 100,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    cuisineText: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: "600",
      color: "#4A4A4A",
      textAlign: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderRadius: 10,
      width: "90%",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
    },
    restaurantItem: {
      backgroundColor: "#f1f1f1",
      padding: 10,
      borderRadius: 8,
      marginVertical: 5,
      width: "100%",
      alignItems: "center",
    },
    restaurantImage: {
      width: "100%",
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    },
    restaurantName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    restaurantLocation: {
      fontSize: 14,
      color: "#777",
    },
    restaurantCuisine: {
      fontSize: 14,
      color: "#555",
    },
    restaurantSlots: {
      fontSize: 14,
      color: "#666",
    },
    noResults: {
      fontSize: 16,
      color: "#888",
      marginVertical: 10,
    },
  });
  
  export default Cuisine;
