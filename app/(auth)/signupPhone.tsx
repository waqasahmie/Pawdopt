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
  LogBox,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

export default function SignupPhone() {
  const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
  const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const { isLoaded, signUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const { setTempEmail, setTempPhone, setTempCallingCode, setTempCountryCode } = useAppContext();
  const [errorMessage, setErrorMessage] = useState("");

  // Function to check if the entered phone number is valid
  const isValidPhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(number);
  };
  useEffect(() => {
    setErrorMessage("");
  }, [phoneNumber]);
  // Handle keyboard dismiss on tap
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleContinue = async () => {
    if (!isLoaded || !isValidPhoneNumber(phoneNumber)) return;

    try {
      setIsLoading(true);
      const fullPhoneNumber = `+${callingCode}${phoneNumber}`;

      // Create sign-up attempt with phone number
      await signUp.create({
        phoneNumber: fullPhoneNumber,
      });

      // Prepare phone number verification
      await signUp.preparePhoneNumberVerification();
      setTempPhone(phoneNumber);
      setTempCallingCode(callingCode);
      setTempCountryCode(countryCode);
      setTempEmail(" ");
      router.push({
        pathname: "/(modals)/otpNumber",
        params: {
          from: "signupPhone",
          phone: fullPhoneNumber,
          signUpId: signUp.id, // Pass Clerk sign-up ID
        },
      });
    } catch (err: any) {
      if (
        err?.errors &&
        Array.isArray(err.errors) &&
        err.errors[0]?.code === "form_identifier_exists"
      ) {
        setErrorMessage("PhoneNumber already exist, try using different one.");
      } else {
        setErrorMessage("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" :undefined}
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
            <Text style={styles.title}>What’s your mobile number?</Text>
          </View>

          {/* Phone Input with Country Picker */}
          <View style={styles.InputContainer}>
            {/* Country Picker Button */}
            <TouchableOpacity
              style={styles.countryPicker}
              onPress={() => setVisible(true)}
            >
              <CountryPicker
                visible={visible}
                withFilter={true}
                withFlag={true}
                withCallingCode={true}
                withModal={true}
                countryCode={countryCode}
                onSelect={(country: Country) => {
                  setCountryCode((country?.cca2 as CountryCode) || "PK");
                  setCallingCode(country?.callingCode[0] || "92");
                  setVisible(false);
                }}
                onClose={() => setVisible(false)}
              />
              <Text style={styles.callingCode}>+{callingCode} ▼</Text>
            </TouchableOpacity>

            {/* Phone Number Input */}
            <TextInput
              style={styles.phoneNumberInput}
              placeholder="Enter phone number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>

          <Text style={styles.subsubtitle}>
            You will receive an SMS verification that may apply message and data
            rates.
          </Text>
          {errorMessage !== "" && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          {/* Continue Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !isValidPhoneNumber(phoneNumber) && styles.disabledButton,
              ]}
              disabled={!isValidPhoneNumber(phoneNumber) || isLoading}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>
                {isLoading ? "Sending..." : "Continue"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendContainer}
              onPress={() => router.push("/signup")}
            >
              <Text style={styles.resendText}>Use email, instead</Text>
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
    fontSize: Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  subsubtitle: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#787D7F",
    marginTop: 5,
    alignSelf:"flex-start",
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
  errorMessage:{
    color: "red", 
    marginTop: 8,
    fontSize:Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    alignSelf:"flex-start",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  callingCode: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  phoneNumberInput: {
    flex: 1,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginLeft: 5,
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
    padding: 15,
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
