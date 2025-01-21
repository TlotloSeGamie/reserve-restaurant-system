import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importing the icon library
import NavItems from "./NavItems"; 

const Navbar = () => {
  const navigation = useNavigation();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to control menu visibility

  const checkWindowWidth = () => {
    const windowWidth = Dimensions.get("window").width;
    if (windowWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setMobileNav(false);
    }
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", checkWindowWidth);
    checkWindowWidth();

    return () => subscription.remove();
  }, []);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <View style={styles.header}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.logo}
            source={require("./images/rtrs.png")} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuIcon}
          onPress={() => setShowMenu(!showMenu)} // Toggle menu visibility
        >
          <Icon name="bars" size={24} color="#FFFFFF" /> {/* Menu icon */}
        </TouchableOpacity>
      </View>

      {/* Menu Modal or Overlay */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showMenu}
        onRequestClose={() => setShowMenu(false)} // Close menu on backdrop press
      >
        <View style={styles.overlay}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowMenu(false)} // Close menu
          >
            <Icon name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <NavItems />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(146, 204, 255)", 
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 20,
  },
  nav: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 75,
    resizeMode: "contain",
  },
  navLinks: {
    fontSize: 12,
    color: "#FFFFFF", 
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
  },
  mobileNav: {
    width: "100%",
    height: "100%",
    maxWidth: 250,
    backgroundColor: "#FFFFFF", 
    justifyContent: "center",
    alignItems: "center",
  },
  mobileNavItems: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    padding: 10,
  },
});

export default Navbar;
