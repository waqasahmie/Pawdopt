import responsive from "@/constants/Responsive";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, Platform } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function PasswordResetSuccessfully() {

  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Left Background Image */}
       <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

       {/* Bottom Right Background Image */}
       <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />
      
      <View style={styles.centerWrapper}>
        {/* Logo Icon */}
        <Image source={require("../../assets/images/SuccessTick.png")} style={styles.successIcon} />

        {/* Success Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>You’re All Set</Text>
          <Text style={styles.subtitle}>Your password has been successfully changed.</Text>
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={() => router.replace("/signin")}>
          <Text style={styles.continueText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: "100%",
  },
  topLeftImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "40%",
    resizeMode: "contain",
  },
  bottomRightImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "96%",
    height: "49%",
    resizeMode: "contain",
  },
  centerWrapper: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    transform: [{ translateY: "-50%" }],
  },
  successIcon: {
    width: 102, 
    height: 102, 
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    marginBottom: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, 
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueText: {
    color: "#fff",
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});