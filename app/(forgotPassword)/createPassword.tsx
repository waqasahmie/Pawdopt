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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
import PasswordStrengthMeter from "@/components/utils/PasswordStrengthMeter";
import responsive from "@/constants/Responsive";

export default function SignupCreatePassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, setActive } = useSignUp();

  const handlePasswordChange = (text: React.SetStateAction<string>) =>
    setPassword(text);
  const toggleShowPassword = () => setShowPassword(!showPassword);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
            <Text style={styles.title}>Create your password.</Text>
            <Text style={styles.passwordHint}>
              Must be at least 8 characters, with one uppercase, one lowercase,
              one number, and one special character.
            </Text>
          </View>

          {/* Password Input Field */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter password"
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
          {/* Error Message */}
          {!isValidPassword(password) && password.length > 0 && (
            <PasswordStrengthMeter password={password} />
          )}

          {/* Terms & Conditions */}
          <Text
            style={[
              styles.subsubtitle,
              !isValidPassword(password) && styles.subsubtitleWithError,
            ]}
          >
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>

          {/* Continue Button Fixed at Bottom */}
          {!isKeyboardVisible && (
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  !isValidPassword(password) && styles.disabledButton,
                ]}
                disabled={!isValidPassword(password)}
                onPress={async () => {
                  if (!isValidPassword(password) || !signUp) return;

                  try {
                    await signUp.update({ password });

                    if (signUp.status === "complete") {
                      await setActive({ session: signUp.createdSessionId });
                      router.push("/(finalSteps)/rbac");
                    }
                  } catch (err) {
                    Alert.alert(
                      "Error",
                      "Failed to create account. Please try again."
                    );
                  }
                }}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: "transparent",
  },
  progressBar: {
    width: "50%",
    height: "100%",
    backgroundColor: "#2BBFFF", // Second half blue
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
  passwordHint: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#555",
    marginBottom: 20,
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
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
  },
  subsubtitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#000",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  subsubtitleWithError: {
    marginTop: 5,
  },
  linkText: {
    color: "#2BBFFF",
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
