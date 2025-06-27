import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PasswordStrengthMeter from "@/components/utils/PasswordStrengthMeter";
import { useUser } from "@clerk/clerk-expo";
import responsive from "@/constants/Responsive";
import { router } from "expo-router";
import Toast from "@/components/utils/toast";

export default function changePassword() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toastRef = useRef<any>({});
  
  const handleCurrentPasswordChange = (text: React.SetStateAction<string>) =>
    setCurrentPassword(text);
  const handlePasswordChange = (text: React.SetStateAction<string>) =>
    setPassword(text);
  const handleConfirmPasswordChange = (text: React.SetStateAction<string>) =>
    setConfirmPassword(text);

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const emptyCurrentPassword = currentPassword.length > 0;

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

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

  const handleSavePassword = async () => {

    if (!emptyCurrentPassword) {
      toastRef.current.show({
        type: "error",
        title: "Missing Current Password",
        description: "Please enter your current password.",
      });      
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Weak Password",
        "Your new password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    if (!passwordsMatch) {
      toastRef.current.show({
        type: "error",
        title: "Passwords Do Not Match",
        description: "Please make sure passwords match.",
      });
      
      return;
    }

    try {
      await user?.updatePassword({
        currentPassword: currentPassword,
        newPassword: password,
      });

      toastRef.current.show({
        type: "success",
        title: "Password Updated",
        description: "Your password was changed successfully.",
      });

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (err: any) {
      if (
        err?.errors?.some((e: any) => e.code === "password_validation_failed")
      ) {
        Alert.alert(
          "Weak Password",
          "Your new password does not meet the requirements."
        );
      } else if (
        err?.message?.toLowerCase().includes("incorrect password")
      ) {
        toastRef.current.show({
          type: "error",
          title: "Incorrect Password",
          description: "The current password you entered is wrong.",
        });        
      } else {
        toastRef.current.show({
          type: "error",
          title: "Update Failed",
          description: "Couldn’t update your password. Try again.",
        });
        
      }
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
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.navText}>Change Password</Text>
          </View>

          {/* Current Password Input */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Current Password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter current password"
              style={styles.input}
              placeholderTextColor="#939393"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={handleCurrentPasswordChange}
            />
            <TouchableOpacity
              onPress={toggleShowCurrentPassword}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showCurrentPassword ? "visibility" : "visibility-off"}
                size={18}
                color="#939393"
              />
            </TouchableOpacity>
          </View>

          {/* New Password Input */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>New Password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter new password"
              style={styles.input}
              placeholderTextColor="#939393"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={18}
                color="#939393"
              />
            </TouchableOpacity>
          </View>
          {!isValidPassword(password) && password.length > 0 && (
            <PasswordStrengthMeter password={password} />
          )}

          {/* Confirm Password Input */}
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Confirm New Password</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Confirm new password"
              style={styles.input}
              placeholderTextColor="#939393"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showConfirmPassword ? "visibility" : "visibility-off"}
                size={18}
                color="#939393"
              />
            </TouchableOpacity>
          </View>
          {!passwordsMatch && password.length > 0 && (
            <Text style={styles.errorText}>
              Confirm Password does not match.
            </Text>
          )}

          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => {router.push("/forgotPassword");}}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noteContainer}>
            <Image
              source={require("../../assets/images/noteExclaimation.png")}
              style={styles.noteIcon}
            />
            <Text style={styles.noteText}>
              Avoid using spaces, your name, email, or passwords you have used
              before.
            </Text>
          </View>

          {/* Continue Button */}
          {!isKeyboardVisible && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!passwordsMatch || !emptyCurrentPassword) &&
                  styles.disabledButton,
              ]}
              disabled={!passwordsMatch}
              onPress={handleSavePassword}
            >
              <Text style={styles.continueText}>Save New Password</Text>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={toastRef} />
    </SafeAreaView>
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
  navText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: 30,
  },
  textContainer: {
    alignSelf: "flex-start",
    width: "100%",
  },
  inputHeader: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "400",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  errorText: {
    color: "red",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    textAlign: "left",
    width: "100%",
  },
  eyeIcon: {
    padding: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  forgotPassword: {
    color: "#2BBFFF",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    marginBottom: 10,
  },
  noteContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#d3d3d3",
    width: "95%",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  noteIcon: {
    height: 16,
    width: 16,
  },
  noteText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    lineHeight: 10 * 1.5,
    marginLeft: 10,
    marginRight: 10,
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
