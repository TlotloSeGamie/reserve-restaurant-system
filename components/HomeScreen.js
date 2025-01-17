import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import SearchBar from './SeachBar';
import RestaurantItem from './RestaurantItem';
import Navbar from './Navbar/Navbar'; 

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

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRestaurants(mockRestaurants);
    } else {
      const filtered = mockRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar /> 
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <Text style={styles.title}>Recommended Places</Text>
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantItem
            restaurant={item}
            onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: '#f4f6f8', 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#2c3e50', 
    marginVertical: 20, 
    textAlign: 'center', 
  },
  searchBarContainer: {
    marginVertical: 16, 
    borderRadius: 8,
    overflow: 'hidden',
    gap: 10,
  },
  flatList: {
    marginVertical: 16,
  },
  restaurantItem: {
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    marginBottom: 12, 
    padding: 16,
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3,
  },
  restaurantName: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#34495e', 
    marginBottom: 4,
  },
  restaurantDetails: {
    fontSize: 14,
    color: '#7f8c8d', 
  },
});

export default HomeScreen;
