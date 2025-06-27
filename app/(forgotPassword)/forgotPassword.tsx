import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import type { ResetPasswordEmailCodeFactor } from '@clerk/types';
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";

export default function ForgotPasswordEmailScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // Track email input
  const dismissKeyboard = () => Keyboard.dismiss();
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const toastRef = useRef<any>({});

  const sendResetCode = async () => {
    if (!signIn || !email) return;
  
    try {
      const newSignIn = await signIn.create({
        identifier: email,
        strategy: 'reset_password_email_code' as const,
      });
  
      const resetFactor = newSignIn.supportedFirstFactors?.find(
        (f) => f.strategy === 'reset_password_email_code'
      ) as ResetPasswordEmailCodeFactor | undefined;
  
      if (!resetFactor) {
        toastRef.current.show({
          type: "error",
          title: "Account Not Found",
          description: "Please check your email and try again.",
        });
        return;
      }
  
      await newSignIn.prepareFirstFactor({
        strategy: 'reset_password_email_code',
        emailAddressId: resetFactor.emailAddressId,
      });
  
      router.push({
        pathname: "/(modals)/otpEmail",
        params: {
          email,
          from: "forgotPassword", // or "signup"
        },
      });
      
  
    } catch (err: any) {
      if (err.errors && err.errors[0]?.message) {
        toastRef.current.show({
          type: "error",
          title: "Account Not Found",
          description: err.errors[0].message,
        });
      } else {
        toastRef.current.show({
          type: "error",
          title: "Account Not Found",
          description: "Please check your email and try again.",
        });
      }
    }
  };

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
            <TouchableOpacity onPress={() => navigation.goBack()} style = {{ zIndex : 1 }} >
              <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
            </TouchableOpacity>
          </View>

          {/* Logo Icon */}
          <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Forgot Your Password?</Text>
            <Text style={styles.subtitle}>We’ve got you covered. Enter your registered email to reset your password. We will send an OTP code to your email for the next steps.</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Your Registered Email?</Text>
          </View>
          <TextInput placeholder="waqasahmed@gmail.com" style={styles.input} placeholderTextColor="#939393" onChangeText={setEmail} value={email} />

          <View>
            <TouchableOpacity onPress={() => router.push('/forgotPasswordNumber')}>
              <Text style={styles.mobileNumber}>Use mobile number</Text>
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          {!isKeyboardVisible && (
          <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.continueButton, !email ? { backgroundColor: "#CCCCCC" } : null]}
            onPress={sendResetCode}
            disabled={!email}
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
    marginTop: 25,
    marginBottom: 10,
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
  input: {
    width: "100%",
    padding: 15, 
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    marginBottom: 5,
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
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