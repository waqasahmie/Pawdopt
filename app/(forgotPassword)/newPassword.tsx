import React, { useEffect, useRef, useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, 
  Keyboard, TouchableWithoutFeedback,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import Animated, { FadeOut } from "react-native-reanimated";
import PasswordStrengthMeter from "@/components/utils/PasswordStrengthMeter";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";


export default function NewPassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const { signIn } = useSignIn();
  const { setActive } = useClerk();
  const router = useRouter();
  const toastRef = useRef<any>({});

  const handlePasswordChange = (text: React.SetStateAction<string>) => setPassword(text);
  const handleConfirmPasswordChange = (text: React.SetStateAction<string>) => setConfirmPassword(text);
  const resetPassword = async () => {
    try {
      if(!signIn) return;
      const result = await signIn.resetPassword({ password });
      
      if (result.createdSessionId) {
        // Use setActive from useClerk
        await setActive({ session: result.createdSessionId });
        router.replace("/(forgotPassword)/resetSuccessfully");
      }
    } catch (err) {
      toastRef.current.show({
        type: "error",
        title: "Reset Failed",
        description: "Password reset failed. Please try again.",
      });
    }
  };
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const isValidPassword = (password: string) => {
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    return Object.values(checks).every(Boolean);
  };

  // Handle keyboard dismiss on tap
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
    <Animated.View style={styles.container} exiting={FadeOut}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Back Button */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
              <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
            </TouchableOpacity>
          </View>

          {/* Logo Icon */}
          <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

          {/* Title & Subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Secure Your Account</Text>
            <Text style={styles.subtitle}>Almost there! Create a new password for your Pawdopt account to keep it secure. Remember to choose a strong and unique password.</Text>
          </View>

          {/* New Password Input */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>New Password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput 
              placeholder="Enter password"
              style={styles.input}
              placeholderTextColor="#939393"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />
            
           <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
             <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
           </TouchableOpacity>
          </View>
          {/* Error Message */}
          {!isValidPassword(password) && password.length > 0 && (
            <PasswordStrengthMeter password={password} />
          )}

          {/* Confirm Password Input */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Confirm New Password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput 
              placeholder="Enter password"
              style={styles.input}
              placeholderTextColor="#939393"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onBlur={() => setConfirmPasswordTouched(true)}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
              <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
            </TouchableOpacity>
          </View>
          {/* Error Message */}
          {!passwordsMatch && confirmPasswordTouched && password.length > 0 && (
            <Text style={styles.errorText}>Confirm Password does not match.</Text>
          )}

          {/* Continue Button */}
          {!isKeyboardVisible && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={[styles.continueButton, !passwordsMatch && styles.disabledButton]} disabled={!passwordsMatch} onPress={async () => {
              await resetPassword(); 
            }}>
              <Text style={styles.continueText}>Save New Password</Text>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={toastRef} />
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
  pawIcon: {
    width: 61,
    height: 63,
    marginBottom: 10,
    marginTop: 25,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
  },
  textContainer: {
    alignSelf: "flex-start",
    width: "100%",
  },
  title: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "600",
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    marginBottom: 20,
  },
  inputHeader: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  errorText: {
    color: "crimson",
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    textAlign: "left",
    width: "100%",
    left: 10,
  },
  eyeIcon: {
    padding: 10,
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
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
  continueText: {
    color: "#fff",
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});