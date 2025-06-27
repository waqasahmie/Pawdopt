import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import { SignInResource } from "@clerk/types";
import { useSignIn } from "@clerk/clerk-expo";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";

export default function ForgotPasswordPhoneScreen() {
  const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
  const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const { signIn, isLoaded } = useSignIn();
  const toastRef = useRef<any>({});
  
  const sendResetCodeByPhone = async ({
    signIn,
    fullPhoneNumber,
  }: {
    signIn?: SignInResource;
    fullPhoneNumber: string;
  }) => {
    if (!signIn || !fullPhoneNumber) return;
  
    try {
      // Start reset password flow
      const newSignIn = await signIn.create({
        identifier: fullPhoneNumber,
        strategy: "reset_password_phone_code",
      });
  
      const resetFactor = newSignIn.supportedFirstFactors?.find(
        (f) => f.strategy === "reset_password_phone_code"
      );
  
      if (!resetFactor) {
        toastRef.current.show({
          type: "error",
          title: "Account Not Found",
          description: "Please check your phone number and try again.",
        });
        return;
      }
  
      // Send the OTP code
      await newSignIn.prepareFirstFactor({
        strategy: "reset_password_phone_code",
        phoneNumberId: resetFactor.phoneNumberId,
      });
  
      // Navigate to OTP screen
      router.push({
        pathname: "/(modals)/otpNumber",
        params: {
          from: "forgotPasswordNumber",
          phone: fullPhoneNumber,
          signInId: newSignIn.id, 
        },
      });
    } catch (err:any) {
      toastRef.current.show({
        type: "error",
        title: "Account Not Found",
        description: err.errors[0].message,
      });
    }
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
  
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button (Positioned Below Status Bar) */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
              <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
            </TouchableOpacity>
          </View>

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
                visible={visible}  
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
            <TouchableOpacity onPress={() => router.push('/forgotPassword')}>
              <Text style={styles.mobileNumber}>Use email</Text>
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          {!isKeyboardVisible && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !phoneNumber ? { backgroundColor: "#CCCCCC" } : null,
              ]}
              onPress={() => {
                const fullPhone = `+${callingCode}${phoneNumber}`;
                if (signIn) {
                  sendResetCodeByPhone({ signIn, fullPhoneNumber: fullPhone });
                }
              }}
              disabled={!phoneNumber}
            >
              <Text style={styles.continueText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={toastRef} />
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
    justifyContent: "space-between", 
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
  },
  pawIcon: {
    width: 61,
    height: 63,
    marginBottom: 10,
    marginTop: 25,
  },
  textContainer: {
    width: "100%", 
  },
  title: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "600",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    marginBottom: 30,
  },
  inputHeader: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginBottom: 10,
    fontWeight: 500,
  },
  subsubtitle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
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
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  callingCode: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  phoneNumberInput: {
    flex: 1,
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginLeft: 5,
  },
  mobileNumber: {
    color: "#2BBFFF",
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginTop: 15,
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