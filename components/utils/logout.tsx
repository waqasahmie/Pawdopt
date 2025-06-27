import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import responsive from "@/constants/Responsive";

type LogoutProps = {
  closeModal: () => void;
  onConfirmLogout: () => void; 
};

const screenHeight = Dimensions.get("window").height;

export const Logout = ({ closeModal ,onConfirmLogout }: LogoutProps) => {
    const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]); 
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9, 
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      closeModal(); 
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
        <TouchableOpacity style={styles.logoutButton} onPress={onConfirmLogout}>
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
    fontSize: Platform.OS === "ios" ? responsive.fontSize(25) : responsive.fontSize(20),
    color: "#FF0900",
    fontWeight: "500",
  },
  line: {
    height: 1,
    width: "90%",
    backgroundColor: "#F0F0F0",
  },
  subTitle: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    textAlign: "center",
    fontWeight: "400",
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
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
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
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#fff",
    fontWeight: "700",
  },
});
