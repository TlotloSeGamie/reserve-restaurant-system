import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const RestaurantItem = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.restaurantItem} onPress={onPress}>
      {restaurant.image && (
        <Image source={restaurant.image} style={styles.image} />
      )}
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text>{restaurant.location} - {restaurant.cuisine}</Text>
      <Text style={styles.slots}>
        Available Slots: {restaurant.slots.join(', ')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  slots: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
});

export default RestaurantItem;
