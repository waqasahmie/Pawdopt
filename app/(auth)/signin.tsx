import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SignInScreen() {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button (Positioned Below Status Bar) */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style = {{ zIndex : 10 }} >
              <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
            </TouchableOpacity>
          </View>

          {/* Top Left Background Image */}
           <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

           {/* Bottom Right Background Image */}
           <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />

          {/* Logo Icon */}
          <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Image source={require("../../assets/images/paws.png")} style={styles.paws} />
            </View>
            <Text style={styles.subtitle}>A world of furry possibilities awaits you.</Text>
          </View>

          {/* Input Fields */}
          <TextInput placeholder="Email or Phone number" style={styles.input} placeholderTextColor="#939393" />
          <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#939393" />

          <View style={{ width: "90%", alignItems: "flex-end" }}>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Terms & Conditions Checkbox */}
          <View style={styles.termsContainer}>
            <TouchableOpacity style={[styles.checkbox, checked && styles.checkedBox]} onPress={() => setChecked(!checked)} > {checked && <Feather name="check" size={16} color="white" />} </TouchableOpacity>
            <Text style={styles.termsText}>I agree to Pawdopt <Text style={styles.linkText}>Terms & Conditions</Text></Text>
          </View>

          {/* Sign Up Link */}
          <Text style={styles.signupText}>Don’t have an account? <Text style={styles.linkText}>Sign up</Text></Text>

          {/* Social Logins */}

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>{"   "} or {"   "}</Text>
            <View style={styles.line} />
          </View>
          
          {/* Social Buttons */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={20} color="#DB4437" style={styles.socialIcon} />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="apple1" size={20} color="black" style={styles.socialIcon} />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>  
    </View>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Back button left & email right
    width: "100%",
    marginTop: 50,
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
    marginTop: 25,
  },
  textContainer: {
    alignSelf: "flex-start", // Aligns the container to the left
    width: "100%", // Ensures full width
    paddingHorizontal: 15, // Adjust if needed
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center", // Align text and icon in one row
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  paws: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#939393",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    paddingVertical: 15, // Adjust vertical padding
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 5,
  },
  forgotPassword: {
    color: "#2BBFFF",
    fontSize: 12,
    marginBottom: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Left align
    alignSelf: "flex-start", // Ensure it stays on the left
    marginBottom: 10,
    marginLeft: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#2BBFFF",
    marginRight: 10,
    alignItems: "center", // Center tick horizontally
    justifyContent: "center", // Center tick vertically
  },
  checkedBox: {
    backgroundColor: "#2BBFFF", // Change background when checked
    borderColor: "#2BBFFF",
  },
  termsText: {
    color: "#000",
    fontSize: 14,
  },
  linkText: {
    color: "#2BBFFF",
  },
  signupText: {
    color: "#000",
    marginTop: 30,
    marginBottom: 30,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#d3d3d3",
  },
  orText: {
    color: "#939393",
    marginVertical: 10,
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
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  socialIcon: {
    position: "absolute",
    left: 20, // Icon ko left side fix karne ke liye
  },
  bottomContainer: {
    position: "absolute",
    bottom: 50, // Change to 50 if needed
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});