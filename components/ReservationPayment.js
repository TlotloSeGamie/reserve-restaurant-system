import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import PayPalCheckout from './PayPalCheckout';

const ReservationPayment = () => {
  const handlePaymentSuccess = () => {
    console.log("Payment completed successfully!");
    // Navigate or update your app state here
  };

  return (
    <View style={styles.container}>
      <PayPalCheckout
        amount="50.00" // Replace with the reservation cost
        currency="USD"
        onSuccess={handlePaymentSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReservationPayment;
