import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";

export default function ForgotPasswordPhoneScreen() {
  const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
  const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  const dismissKeyboard = () => Keyboard.dismiss();
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button (Positioned Below Status Bar) */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style = {{ zIndex : 10 }}>
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
            <Text style={styles.title}>Forgot Your Password?</Text>
            <Text style={styles.subtitle}>We’ve got you covered. Enter your registered phone number to reset your password. We will send an OTP code to your number for the next steps.</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Your Registered Number?</Text>
          </View>

          <View style={styles.InputContainer}>
            {/* Country Picker Button */}
            <TouchableOpacity style={styles.countryPicker} onPress={() => setVisible(true)}>
            <CountryPicker 
              visible={visible || false}  // Default to false
              withFilter={true}
              withFlag={true}
              withCallingCode={true}
              withModal={true}
              countryCode={countryCode || "PK"}  // Default to "PK"
              onSelect={(country: Country) => {
                setCountryCode(country?.cca2 as CountryCode || "PK"); 
                setCallingCode(country?.callingCode[0] || "92");
                setVisible(false);
              }}
              onClose={() => setVisible(false)}
            />

              <Text style={styles.callingCode}>+{callingCode} ▼</Text>
            </TouchableOpacity>
            {/* Phone Number Input */}
            <TextInput
              style={styles.phoneNumberInput} placeholder="Enter phone number" keyboardType="numeric" value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>

          <Text style={styles.subsubtitle}>You will receive an SMS verification that may apply message and data rates.</Text>
          <View>
            <TouchableOpacity onPress={() => router.push('./forgotPassword')}>
              <Text style={styles.mobileNumber}>Use email</Text>
            </TouchableOpacity>
          </View>
            
          {/* Continue Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/(modals)/otpNumber')}>
              <Text style={styles.continueText}>Send OTP</Text>
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
    paddingVertical: 50,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Back button left & email right
    width: "100%",
    marginTop: Platform.OS === "ios" ? 0 : -20,
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
    width: "100%", // Ensures full width
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#939393",
    marginBottom: 30,
  },
  inputHeader: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 500,
  },
  subsubtitle: {
    fontSize: 14,
    color: "#787D7F",
    marginTop: 5,
  },
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    marginBottom: 5,
    paddingHorizontal: 15,
    padding: 5,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  callingCode: {
    fontSize: 16,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  mobileNumber: {
    color: "#2BBFFF",
    fontSize: 16,
    marginTop: 15,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, // Change to 50 if needed
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
    fontSize: 16,
    fontWeight: "600",
  },
});