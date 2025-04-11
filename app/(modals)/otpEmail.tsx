import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
export default function OTPVerification() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Handle OTP input changes
  const handleInputChange = (text: string, index: number) => {
    if (text.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  // Handle Backspace key
  const handleBackspace = (text: string, index: number) => {
    if (text === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  // Handle keyboard dismiss on tap
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      style={styles.container}
    >
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex : 10}}>
          <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navText} >Change email</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Enter authentication code</Text>
          <Text style={styles.subtitle}>Enter the 4-digit that we have sent via the email  w********e@gmail.com</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={[styles.otpInput, digit ? styles.filledOtpInput : styles.emptyOtpInput]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" && handleBackspace("", index)
              }
            />
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.continueButton, otp.join("").length < 4 && styles.disabledButton]} disabled={otp.join("").length < 4} onPress={() => router.replace('/(forgotPassword)/newPassword')}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resendContainer}>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    marginTop: Platform.OS === "ios" ? 50 : 20,
  },
  navText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2BBFFF",
  },
  textContainer: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 30,
    marginTop: 10,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    textAlign: "center",
    fontSize: 22,
    borderRadius: 10,
  },
  emptyOtpInput: {
    borderColor: "#d3d3d3",
    backgroundColor: "#F9F9F9",
  },
  filledOtpInput: {
    borderColor: "#2BBFFF",
    backgroundColor: "#fff",
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 40,
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
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    backgroundColor: "transprent",
    width: "100%",
    paddingTop: 15,
    alignItems: "center",
  },
  resendText: {
    marginTop: 10,
    color: "#2BBFFF",
    fontSize: 16,
    fontWeight: "600",
  }
});