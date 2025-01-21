import React from "react";
import { View, StyleSheet } from "react-native";
import NavItem from "./NavItem";
import { Ionicons, MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";

const NavItems = ({ navigation }) => {
  return (
    <View style={styles.navItems}>
      <NavItem routeName="Reservations" text="Reservations">
        <MaterialIcons name="list" size={24} color="#4A4A4A" />
      </NavItem>
      <NavItem routeName="NewReservation" text="New Reservation">
        <Entypo name="bowl" size={24} color="#4A4A4A" />
      </NavItem>
      <NavItem routeName="Search" text="Search">
        <AntDesign name="search1" size={24} color="#4A4A4A" />
      </NavItem>
      <NavItem routeName="AddTable" text="Add Table">
        <Ionicons name="add-circle" size={24} color="#4A4A4A" />
      </NavItem>
      <NavItem 
        routeName="Account Settings" 
        text="Account Settings"
        onPress={() => navigation.navigate('AccountCenterStack')}
      >
        <Ionicons name="person-circle-outline" size={36} color="#4A4A4A" />
      </NavItem>
      <NavItem routeName="SavedLocations" text="Saved Locations">
        <Ionicons name="location-outline" size={24} color="#4A4A4A" />
      </NavItem>
      <NavItem
        routeName="Settings"
        text="Settings"
        onPress={() => navigation.navigate("Settings")} // Navigate to the Settings screen
      >
        <Ionicons name="settings-outline" size={24} color="#4A4A4A" />
      </NavItem>
      <NavItem routeName="Logout" text="Logout">
        <AntDesign name="logout" size={30} color="#4A4A4A" />
      </NavItem>
    </View>
  );
};

const styles = StyleSheet.create({
  navItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "20vh",
    padding: 20,
    borderRadius: 12,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  "@media (min-width: 1024px)": {
    navItems: {
      gap: 40,
    },
  },
});

export default NavItems;