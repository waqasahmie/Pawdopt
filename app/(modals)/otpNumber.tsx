import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";
export default function OTPVerification() {
  const navigation = useNavigation();
  const { from } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { signUp, isLoaded } = useSignUp();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSignIn();
  const [error, setError] = useState("");
  const { phone, signUpId } = useLocalSearchParams();
  const rawPhone = useLocalSearchParams().phone;
  const phonee = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;
  const toastRef = useRef<any>({});

  const maskPhoneNumber = (phone: string) => {
    const match = phone.match(/^(\+\d{1,3})(\d{0,})(\d{3})$/);
    if (!match) return phone;

    const [, countryCode, middle, lastThree] = match;
    const maskedMiddle = "*".repeat(middle.length);
    return `${countryCode}${maskedMiddle}${lastThree}`;
  };

  useEffect(() => {
    if (isLoaded && signUp && signUp.id !== signUpId) {
      signUp.reload();
    }
  }, [isLoaded, signUpId]);

  const verifyCode = async () => {
    const fullCode = otp.join("");
    if (fullCode.length !== 6) return;

    setIsLoading(true);
    setError("");
    try {
      if (from === "forgotPasswordNumber") {
        if (!signIn) return;

        const result = await signIn.attemptFirstFactor({
          strategy: "reset_password_phone_code",
          code: fullCode,
        });

        if (result.status === "complete") {
          // Navigate to password reset screen
          router.replace({
            pathname: "/(forgotPassword)/newPassword",
            params: { phone },
          });
        } else if (result.status === "needs_new_password") {
          router.replace({
            pathname: "/(forgotPassword)/newPassword",
            params: {
              signInId: signIn.id,
            },
          });
        }
      } else if (from === "signupPhone") {
        if (!signUp) return;

        const result = await signUp.attemptPhoneNumberVerification({
          code: fullCode,
        });

        if (
          result.status === "complete" ||
          result.status === "missing_requirements"
        ) {
          router.replace({
            pathname: "/(forgotPassword)/createPassword",
            params: { signUpId: signUp.id },
          });
        }
      }
    } catch (err) {
      toastRef.current.show({
        type: "error",
        title: "Invalid Code",
        description: "The OTP entered is incorrect",
      });
    } finally {
      setIsLoading(false);
    }
  };
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

  const handleResendCode = async () => {
    try {
      await signUp?.preparePhoneNumberVerification();
    } catch (err) {
      toastRef.current.show({
        type: "error",
        title: "Failed to resend code",
        description: "Please try again in a few seconds.",
      });
    }
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.navText}>Change number</Text>
            </TouchableOpacity>
          </View>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Enter authentication code</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit that we have sent to the phone number{" "}
              {maskPhoneNumber(phonee)}
            </Text>
          </View>

          {/* Input Fields */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={[
                  styles.otpInput,
                  digit ? styles.filledOtpInput : styles.emptyOtpInput,
                ]}
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
            <TouchableOpacity
              style={[
                styles.continueButton,
                (otp.join("").length !== 6 || isLoading) &&
                  styles.disabledButton,
              ]}
              disabled={otp.join("").length !== 6}
              onPress={() => {
                verifyCode();
              }}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resendContainer}>
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={toastRef} />
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
    marginTop: Platform.OS === "ios" ? 50 : 20,
  },
  navText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
    color: "#2BBFFF",
  },
  textContainer: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#000",
    marginBottom: 30,
    marginTop: 10,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    width: "80%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    textAlign: "center",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
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
    bottom: 50,
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
    backgroundColor: "transprent",
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
