import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons"; // ✅ Removed FontAwesome5 (no longer needed)

const Footer = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home"); // ✅ Set default active tab as "Home"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Track login state

  const menuItems = [
    { label: "Home", icon: "home", route: "Home", lib: FontAwesome },
    { label: "Cuisine", icon: "cutlery", route: "Cuisine", lib: FontAwesome },
    { label: "Reservations", icon: "bowl", route: "Reservations", lib: Entypo },
    { label: "Settings", icon: "settings-outline", route: "Settings", lib: Ionicons },
    {
      label: isLoggedIn ? "Profile" : "Login",
      icon: isLoggedIn ? "person-circle-outline" : "log-in-outline",
      route: isLoggedIn ? "Profile" : "Login",
      lib: Ionicons,
    },
  ];

  const handlePress = (item) => {
    setActiveTab(item.route);

    if (item.route === "Login") {
      // Simulating successful login
      setIsLoggedIn(true);
      navigation.navigate("Login");
    } else if (item.route === "Profile") {
      // ✅ Now correctly navigates to Profile screen
      navigation.navigate("Profile");
    } else {
      navigation.navigate(item.route);
    }
  };

  return (
    <View style={styles.footer}>
      {menuItems.map((item, index) => {
        const IconComponent = item.lib;
        const isActive = activeTab === item.route;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, isActive && styles.activeMenuItem]}
            onPress={() => handlePress(item)}
          >
            <IconComponent
              name={item.icon}
              size={28}
              color={isActive ? "#007BFF" : "#B0B0B0"}
            />
            <Text style={[styles.menuText, isActive && styles.activeMenuText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1e272e",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    transition: "all 0.3s ease-in-out",
  },
  activeMenuItem: {
    borderBottomWidth: 3,
    borderBottomColor: "#007BFF",
    transform: [{ scale: 1.1 }],
  },
  menuText: {
    marginTop: 5,
    fontSize: 8,
    color: "#B0B0B0",
    // fontFamily: "Roboto-Regular",
  },
  activeMenuText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Footer;
