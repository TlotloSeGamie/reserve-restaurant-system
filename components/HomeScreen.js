import React from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import Navbar from './Navbar';

const restaurants = [
  { id: '1', name: 'Kimberley Steakhouse', location: 'Kimberley Mall', cuisine: 'Steakhouse', slots: ['12:00 PM', '1:00 PM', '2:00 PM'], image: require('../assets/restaurant-in.jpeg') },
  { id: '2', name: 'The Big Hole Bistro', location: 'Big Hole Museum Area', cuisine: 'South African', slots: ['6:00 PM', '7:00 PM', '8:00 PM'], image: require('../assets/restaurant-in.jpeg') },
  { id: '3', name: 'Savanna Delight', location: 'North Cape Mall', cuisine: 'Fusion', slots: ['11:30 AM', '1:30 PM', '3:00 PM'], image: require('../assets/restaurant-in.jpeg') },
  { id: '4', name: 'Kimberley Curry House', location: 'Hadison Park', cuisine: 'Indian', slots: ['12:00 PM', '1:00 PM', '2:00 PM'], image: require('../assets/restaurant-in.jpeg') },
  { id: '5', name: 'The Terrace Café', location: 'Flamingo Casino', cuisine: 'Continental', slots: ['6:00 PM', '7:30 PM', '9:00 PM'], image: require('../assets/restaurant-in.jpeg') },
];

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        {/* <Navbar /> */}
        <Text style={styles.recommendedTitle}> Recommended Places </Text>
  
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              style={({ pressed }) => [
                styles.card,
                { transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}
              onPress={() => navigation.navigate('Booking', { restaurant: item })}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.cuisine}>{item.cuisine}</Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                  onPress={() => navigation.navigate('Booking', { restaurant: item })}
                >
                  <Text style={styles.buttonText}>Book Now</Text>
                </Pressable>
              </View>
            </Pressable>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {    
      flex: 1,
    //   padding: 100,
      top: 15,
      paddingHorizontal: 16,
      backgroundColor: '#ffffff',
    },
    recommendedTitle: {  
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: '#2c3e50',
    },
    listContent: {
      paddingBottom: 20,
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      marginBottom: 14,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 180,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    textContainer: {
      padding: 16,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#34495e',
      marginBottom: 6,
    },
    location: {
      fontSize: 14,
      color: '#7f8c8d',
      marginBottom: 2,
    },
    cuisine: {
      fontSize: 14,
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#rgb(146, 204, 255)',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default HomeScreen;
  