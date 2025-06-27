import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

export default function SignupEmail() {
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const { setTempEmail, setTempPhone } = useAppContext();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  // Handle email input change
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handleEmailSubmit = async () => {
    if (!isValidEmail(email)) return;
    if (!isLoaded) return;

    try {
      setLoading(true);
      await signUp.create({
        emailAddress: email,
      });
      await signUp.prepareEmailAddressVerification();

      setTempEmail(email);
      setTempPhone(" ");

      router.push({
        pathname: "/(modals)/otpEmail",
        params: { from: "signup", email },
      });
    } catch (err: any) {
      if (
        err?.errors &&
        Array.isArray(err.errors) &&
        err.errors[0]?.code === "form_identifier_exists"
      ) {
        setErrorMessage("Email already exist, try using different one.");
      } else {
        setErrorMessage("");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to check if the entered email is valid
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle keyboard dismiss on tap
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ zIndex: 10 }}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={16}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.emptyHalf} />
            <View style={styles.progressBar} />
          </View>

          {/* Title */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>What’s your email address?</Text>
          </View>

          {/* Email Input Field */}
          <TextInput
            placeholder="waqasahmie@gmail.com"
            style={styles.input}
            placeholderTextColor="#939393"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
          />
          {errorMessage !== "" && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          {/* Continue Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !isValidEmail(email) && styles.disabledButton,
              ]}
              disabled={!isValidEmail(email)}
              onPress={handleEmailSubmit}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendContainer}
              onPress={() => router.push("/signupPhone")}
            >
              <Text style={styles.resendText}>Use phone number, instead</Text>
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
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
  },
  progressBarContainer: {
    flexDirection: "row", 
    width: "97%",
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginTop: 30,
    overflow: "hidden",
  },
  emptyHalf: {
    width: "50%",
    height: "100%",
    backgroundColor: "#2BBFFF", // Keeps the first half empty
  },
  progressBar: {
    width: "50%",
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: 2,
  },
  textContainer: {
    width: "100%",
    marginTop: 30,
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  errorMessage:{
    color: "red", 
    marginTop: 8,
    fontSize:Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    alignSelf:"flex-start",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 50,
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
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
  continueText: {
    color: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
  resendContainer: {
    width: "100%",
    paddingTop: 15,
    alignItems: "center",
  },
  resendText: {
    marginTop: 10,
    color: "#2BBFFF",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
