import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const ButtonHamburger = ({ text, color, mobileNav, isMobile, toggleMobileNav }) => {
  const buttonStyles = {
    backgroundColor: color || styles.wrapper.backgroundColor,
    borderColor: color || styles.wrapper.borderColor,
    color: color || styles.wrapper.color,
  };

  return (
    <>
      <TouchableOpacity style={[styles.wrapper, buttonStyles]} activeOpacity={0.7}>
        <View style={styles.iconSlot}>
        </View>
        <Text style={[styles.text, { color: buttonStyles.color }]}>{text}</Text>
      </TouchableOpacity>

      {isMobile && (
        <TouchableOpacity
          style={[styles.hamburger, mobileNav && styles.hamburgerActive]}
          onPress={toggleMobileNav}
        >
          <View style={styles.hamburgerSpan} />
          <View style={[styles.hamburgerSpan, mobileNav && styles.hamburgerSpanHidden]} />
          <View style={styles.hamburgerSpan} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#000", 
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  text: {
    fontFamily: "Montserrat-Bold",
    color: "#fff", 
    textAlign: "center",
  },
  iconSlot: {
    marginRight: 10,
  },

 
  hamburger: {
    cursor: "pointer",
    marginTop: 20,
  },
  hamburgerSpan: {
    width: 24,
    height: 4,
    marginBottom: 4,
    backgroundColor: "#fff", 
    borderRadius: 5,
    transition: "200ms ease-in",
  },
  hamburgerActive: {
    transform: [{ rotate: "45deg" }],
  },
  hamburgerSpanHidden: {
    opacity: 0,
    transform: [{ translateX: 15 }],
  },
});

export default ButtonHamburger;
 