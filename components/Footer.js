import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";

const Footer = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userDetails = await AsyncStorage.getItem("userDetails");
      setIsLoggedIn(!!userDetails);
    };

    checkLoginStatus();
  }, []);

  const handlePress = async (item) => {
    setActiveTab(item.route);

    if (item.route === "Login") {
      setIsLoggedIn(true);
      navigation.navigate("Login");
    } else {
      navigation.navigate(item.route);
    }
  };

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
  },
  activeMenuItem: {
    borderBottomWidth: 3,
    borderBottomColor: "#007BFF",
    transform: [{ scale: 1.1 }],
  },
  menuText: {
    marginTop: 5,
    fontSize: 10,
    color: "#B0B0B0",
  },
  activeMenuText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Footer;
