import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavItem = ({ routeName, text, children }) => {
  const navigation = useNavigation();

  const changeRoute = () => {
    navigation.navigate(routeName);
  };

  return (
    <TouchableOpacity onPress={changeRoute} style={styles.navItem}>
      {children}
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10, 
    cursor: "pointer", 
    transitionDuration: "0.3s",
  },
  navItemHover: {
    color: "#A9A9A9", 
  },
});

export default NavItem;
