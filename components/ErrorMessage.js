import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Replaces ErrorIcon

const ErrorMessage = ({ errorFlag, errorMessage }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (errorFlag) {
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
  }, [errorFlag]);

  return (
    errorFlag && (
      <Animated.View style={[styles.error, { opacity: fadeAnim }]}>
        <Icon name="error" size={20} color="#FF0000" />
        <Text style={styles.errorText}>{errorMessage}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  error: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 5,
    marginTop: 5,
    marginBottom: 15,
    color: "#FF0000", 
  },
  errorText: {
    fontFamily: "Inter-Light",
    color: "#FF0000",
  },
});

export default ErrorMessage;
