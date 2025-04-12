import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

type LogoutProps = {
  closeModal: () => void;
};

const screenHeight = Dimensions.get("window").height;

export const Logout = ({ closeModal }: LogoutProps) => {
    const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Animate the modal to position 0 (visible)
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]); // Only runs when the component mounts
  // When the modal closes, we animate it to slide down
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9, // Move the modal out of the screen (down)
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      closeModal(); // Call the closeModal prop to close the modal after animation
    });
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.indicator} />
      <Text style={styles.title}>Logout</Text>
      <View style={styles.line} />
      <Text style={styles.subTitle}>Are you sure you want to logout?</Text>
      <View style={styles.line} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <Text style={styles.cancelText}>No, Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Yes, Logout</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 50,
    gap: 20,
  },
  indicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginTop: 8,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 26,
    color: "#FF0900",
    fontWeight: "500",
  },
  line: {
    height: 1,
    width: "90%",
    // marginTop: 20,
    backgroundColor: "#F0F0F0",
  },
  subTitle: {
    // marginTop: 20,
    fontSize: 16,
    color: "#939393",
    textAlign: "center",
    fontWeight: "400",
    // paddingHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%", // Ensures proper spacing
    marginTop: 20,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.05, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 1, // For Android shadow
  },
  cancelButton: {
    width: 130,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#F2FBFF",
  },
  cancelText: {
    fontSize: 16,
    color: "#2BBFFF",
    fontWeight: "700",
  },
  logoutButton: {
    width: 130,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#2BBFFF",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
});
