import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the hook
import { FontAwesome, FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import Cuisine from "./Cuisine";

const Footer = ({ activeTab }) => {
  const navigation = useNavigation(); // Use the hook to access navigation
  const [showCuisineModal, setShowCuisineModal] = useState(false);

  const menuItems = [
    { label: "Home", icon: "home", route: "Home", lib: FontAwesome },
    { label: "Cuisines", icon: "concierge-bell", route: "FineDining", lib: FontAwesome5 },
    { label: "Explore", icon: "search", route: "Explore", lib: FontAwesome },
    { label: "Reservations", icon: "bowl", route: "Reservations", lib: Entypo },
    { label: "Profile", icon: "person-outline", route: "Profile", lib: Ionicons },
  ];

  const handlePress = (item) => {
    if (item.label === "Home") {
      navigation.navigate("Home");
    } else if (item.label === "Cuisines") {
      setShowCuisineModal(true);
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCuisineModal}
        onRequestClose={() => setShowCuisineModal(false)}
      >
        <View style={styles.modalContainer}>
          <Cuisine onCuisineSelect={() => setShowCuisineModal(false)} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCuisineModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#F9F9F9",
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
  },
  activeMenuItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  menuText: {
    marginTop: 5,
    fontSize: 12,
    color: "#B0B0B0",
    fontFamily: "Roboto-Regular",
  },
  activeMenuText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Footer;
