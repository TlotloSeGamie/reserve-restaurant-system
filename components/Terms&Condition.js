import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>

      <View style={styles.section}>
        <Text style={styles.subHeading}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to our Restaurant Reservation App. By using our application, you agree to these terms and conditions. Please read them carefully before proceeding.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>2. Reservation Policy</Text>
        <Text style={styles.text}>
          Reservations are subject to availability and confirmation. The app provides an estimated time for your reservation, but we cannot guarantee exact times during peak hours.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>3. User Data Collection</Text>
        <Text style={styles.text}>
          We collect personal data, including your name, contact information, and preferences, to improve your experience. This data helps us customize reservations, provide recommendations, and enhance our services.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>4. Location Information</Text>
        <Text style={styles.text}>
          Our app uses your device's location to recommend nearby restaurants and improve reservation accuracy. Location data is only collected when you permit it, and it is handled in compliance with applicable privacy laws.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>5. Cancellation Policy</Text>
        <Text style={styles.text}>
          You can cancel your reservation up to 2 hours before the scheduled time without any penalty. Late cancellations or no-shows may result in restrictions on future bookings.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>6. Privacy Policy</Text>
        <Text style={styles.text}>
          Your data is stored securely and is only shared with third-party services necessary for the operation of this app. We do not sell or disclose your personal data to unauthorized entities.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>7. Updates to Terms</Text>
        <Text style={styles.text}>
          We reserve the right to modify these terms at any time. Changes will be communicated through the app. Continued use of the app constitutes acceptance of the updated terms.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>8. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about these terms, please contact our support team at support@restaurantapp.com.
        </Text>
      </View>

      <Text style={styles.footer}>Last Updated: January 2025</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2a2a2a',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2a2a2a',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  footer: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TermsAndConditions;
