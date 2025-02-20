import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../Footer';

const AdminDashboard = ({ navigation }) => {
  const features = [
    { name: 'View Nearby Restaurants', icon: 'location-on', screen: 'NearbyRestaurants' },
    // { name: 'Add Restaurant', icon: 'add-business', screen: 'AddRestaurant' },
    // { name: 'View Users', icon: 'people', screen: 'ViewUsers' },
    // { name: 'Added Restaurants', icon: 'restaurant-menu', screen: 'AddedRestaurants' },
    // { name: 'Reservations', icon: 'event', screen: 'Reservations' },
    { name: 'Admin Profile', icon: 'person', screen: 'AdminProfile' },
    // { name: 'Settings', icon: 'settings', screen: 'Settings' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Greeting Section */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Welcome Back, Admin!</Text>
        <Text style={styles.greetingSubText}>Here’s your dashboard overview.</Text>
      </View>

      {/* Header */}
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Restaurants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>120</Text>
          <Text style={styles.statLabel}>Reservations</Text>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.activitiesContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityDate}>Jan 20, 2025</Text>
          <Text style={styles.activityDescription}>New reservation made for Restaurant A</Text>
        </View>
        <View style={styles.activityCard}>
          <Text style={styles.activityDate}>Jan 19, 2025</Text>
          <Text style={styles.activityDescription}>User account approved</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('AddRestaurant')}>
            <Icon name="add-business" size={30} color="white" />
            <Text style={styles.actionText}>Add Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('ViewUsers')}>
            <Icon name="people" size={30} color="white" />
            <Text style={styles.actionText}>View Users</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Reservations')}>
            <Icon name="event" size={30} color="white" />
            <Text style={styles.actionText}>View Reservations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={30} color="white" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feature Cards */}
      <View style={styles.featureContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => navigation.navigate(feature.screen)}
          >
            <Icon name={feature.icon} size={30} color="white" />
            <Text style={styles.featureText}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'darkgrey', // Dark grey for the main background
    padding: 20,
  },
  greetingContainer: {
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  greetingSubText: {
    fontSize: 14,
    color: 'slategray',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // White header text for contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'slategray',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionCard: {
    backgroundColor: 'slategray',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    elevation: 3,
  },
  actionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  activitiesContainer: {
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: 'slategray',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  activityDate: {
    fontSize: 12,
    color: 'white',
  },
  activityDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '45%',
    backgroundColor: 'slategray', // Slategray for feature cards
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  featureText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', // White text for feature cards
    textAlign: 'center',
  },
});

export default AdminDashboard;
