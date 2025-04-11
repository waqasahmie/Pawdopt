import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, ImageBackground } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

export default function GetStarted() {
  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(500)}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
    
        {/* Top Left Background Image */}
        <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />
    
        {/* Bottom Right Background Image */}
        <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />
    
        <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />
        <Text style={styles.title}>Let’s Get Started!</Text>
        <Text style={styles.subtitle}>Join us and find your new furry friend!</Text>
    
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color="#1877F2" style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="twitter" size={20} color="#1DA1F2" style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Twitter</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={20} color="#DB4437" style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={20} color="black" style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Apple</Text>
        </TouchableOpacity>
    
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signinButton}>
            <Text style={styles.signinText}>Sign in</Text>
          </TouchableOpacity>
        </View>
    
        <View style={styles.footer}>
          <Text style={styles.footerText}>Privacy Policy</Text>
          <Text style={styles.footerText2}> - </Text>
          <Text style={styles.footerText}>Terms Of Services</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
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
  pawIcon: {
    width: 61,
    height: 63,
    marginBottom: 10,
    marginTop: 55,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#939393",
    marginBottom: 20,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 90, // Change to 50 if needed
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    marginBottom: 15,
    marginVertical: 5,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.2, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 3, // For Android shadow
  },
  socialText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  socialIcon: {
    position: "absolute",
    left: 20, // Icon ko left side fix karne ke liye
  },
  signupButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.1, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 3, // For Android shadow
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signinButton: {
    backgroundColor: "#E5F1FD",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.1, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 3, // For Android shadow
  },
  signinText: {
    color: "#2BBFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  footerText: {
    color: "#808080",
    fontSize: 14,
  },
  footerText2: {
    color: "#808080",
    marginHorizontal: 20,
  },
});