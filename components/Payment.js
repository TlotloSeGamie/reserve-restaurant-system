import React, { useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Card, Button, Text, TextInput, Divider } from "react-native-paper";

const PaymentPage = ({ route, navigation }) => {
  const { restaurant, selectedSlot, date } = route.params;
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      alert("Payment complete");
      navigation.navigate("BookingSuccess");
    }, 5000);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Booking Details" />
        <Card.Content>
          <Text>Restaurant: {restaurant.name}</Text>
          <Text>Location: {restaurant.location}</Text>
          <Text>Cuisine: {restaurant.cuisine}</Text>
          <Text>Time Slot: {selectedSlot}</Text>
          <Text>Date: {date.toISOString().split("T")[0]}</Text>
          <Divider style={styles.divider} />
          <Text>Booking Fee: R150</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Payment Details" />
        <Card.Content>
          <TextInput
            label="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TextInput
            label="Expiry Date (MM/YY)"
            value={expiry}
            onChangeText={setExpiry}
          />
          <TextInput label="CVV" value={cvv} onChangeText={setCvv} />
          <TextInput label="Name on Card" value={name} onChangeText={setName} />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handlePayment}
        style={styles.button}
        disabled={loading} 
      >
        {loading ? <ActivityIndicator color="white" /> : "Pay Now"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { marginBottom: 20 },
  divider: { marginVertical: 10 },
  button: { marginTop: 20, backgroundColor: "#007BFF" },
});

export default PaymentPage;
