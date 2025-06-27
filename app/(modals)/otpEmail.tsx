import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useSignIn } from "@clerk/clerk-expo";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";
export default function OTPVerification() {
  const { email, from } = useLocalSearchParams();
  const navigation = useNavigation();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const rawEmail = useLocalSearchParams().email;
  const emaill = Array.isArray(rawEmail) ? rawEmail[0] : rawEmail;
  const { signUp, setActive, isLoaded } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef<any>({});

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    if (name.length <= 2) return email;

    const maskedName =
      name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    return `${maskedName}@${domain}`;
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

  const signupVerifyCode = async () => {
    try {
      if (!signUp || !isLoaded) return;

      const fullCode = otp.join("");
      if (fullCode.length < 6) return;

      await signUp.attemptEmailAddressVerification({
        code: fullCode,
      });

      router.replace("/(forgotPassword)/createPassword");
    } catch (err) {
      toastRef.current.show({
        type: "error",
        title: "Invalid Code",
        description: "The OTP entered is incorrect",
      });
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;
    try {
      // resend the email verification code
      await signUp.create({
        emailAddress: email.toString(), 
      });
      await signUp.prepareEmailAddressVerification();
    } catch (error) {
      toastRef.current.show({
        type: "error",
        title: "Failed to resend code",
        description: "Please try again in a few seconds.",
      });
    }

  };

  const forgotVerifyCode = async () => {
    try {
      if (!signIn || !isSignInLoaded) return;
      // Use the joined OTP digits
      const fullCode = otp.join("");

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: fullCode,
      });

      if (result.status === "needs_new_password") {
        router.replace("/(forgotPassword)/newPassword");
      }
    } catch (err) {
      toastRef.current.show({
        type: "error",
        title: "Invalid Code",
        description: "The OTP entered is incorrect",
      });
    }
  };

  // Handle keyboard dismiss on tap
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
              <Text style={styles.navText}>Change email</Text>
            </TouchableOpacity>
          </View>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Enter authentication code</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit that we have sent via the email{" "}
              {email ? maskEmail(emaill) : ""}
            </Text>
          </View>


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
                onKeyPress={
                  ({ nativeEvent }) =>
                    nativeEvent.key === "Backspace" &&
                    handleBackspace("", index) 
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
                if (from === "forgotPassword") {
                  forgotVerifyCode();
                } else if (from === "signup") {
                  signupVerifyCode();
                } 
              }}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resendContainer}
              onPress={handleResendCode}
            >
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
    fontSize:  Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
    color: "#2BBFFF",
  },
  textContainer: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize:  Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize:  Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#000",
    marginBottom: 30,
    marginTop: 10,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap:6,
    width: "80%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    textAlign: "center",
    fontSize:  Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
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
    fontSize:  Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
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
    fontSize:  Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
