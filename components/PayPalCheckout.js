import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const PayPalCheckout = ({ amount, currency, onSuccess }) => {
  const [loading, setLoading] = useState(true);

  // Replace with your PayPal sandbox or production URL
  const PAYPAL_URL = "https://your-server.com/paypal/checkout"; 

  const handlePaymentResponse = (event) => {
    const { data } = event.nativeEvent;
    if (data === "success") {
      Alert.alert("Payment Successful", "Your payment was processed successfully.");
      onSuccess();
    } else if (data === "cancel") {
      Alert.alert("Payment Canceled", "You canceled the payment process.");
    } else {
      Alert.alert("Payment Error", "An error occurred during the payment process.");
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0070BA" />
          <Text>Loading PayPal Checkout...</Text>
        </View>
      )}
      <WebView
        source={{
          uri: `${PAYPAL_URL}?amount=${amount}&currency=${currency}`,
        }}
        onMessage={handlePaymentResponse}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled
        injectedJavaScript={`
          window.ReactNativeWebView.postMessage(
            document.getElementById('status').value
          );
        `}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
});

export default PayPalCheckout;
