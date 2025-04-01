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
import Icon from "react-native-vector-icons/FontAwesome";

const Navbar = () => {
  const navigation = useNavigation();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 

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
            source={require("../assets/rtrs.png")} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuIcon}
          onPress={() => setShowMenu(!showMenu)} 
        >
          <Icon name="bars" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={showMenu}
        onRequestClose={() => setShowMenu(false)} 
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowMenu(false)} 
          >
            <Icon name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(146, 204, 255)", 
    position: "relative",
    width: "100%",
    top: 10,
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
