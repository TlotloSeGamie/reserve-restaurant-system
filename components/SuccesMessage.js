import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Replaces ErrorIcon

const SuccessMessage = ({ isSuccessful, successMessage }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isSuccessful) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSuccessful]);

  return (
    isSuccessful && (
      <Animated.View style={[styles.success, { opacity: fadeAnim }]}>
        <Icon name="check-circle" size={20} color="#4CAF50" />
        <Text style={styles.successText}>{successMessage}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  success: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  successText: {
    fontFamily: "Inter-Light",
    color: "#4CAF50",
  },
});

export default SuccessMessage;
